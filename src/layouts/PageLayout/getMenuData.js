import React from 'react';
import _ from 'lodash';
// import { Icon as LegacyIcon } from '@ant-design/compatible';
import LegacyIcon from '@/utils/typeToIcon'
import { Menu } from 'antd';
import isDeepEqual from 'lodash.isequal';
import memoizeOne from 'memoize-one';
import Link from 'umi/link';
import Authorized from '@/utils/Authorized';

function RenderMenu(route) {
  if (!route) {
    return;
  }
  const { icon, children, path, name } = route;

  return children && children.length ? (
    <Menu.SubMenu
      key={path}
      title={
        <span>
          {icon && <LegacyIcon type={icon} />}
          <span>{name}</span>
        </span>
      }
    >
      {_.map(children, sub => RenderMenu(sub))}
    </Menu.SubMenu>
  ) : (
    <Menu.Item key={path}>
      <Link to={path}>
        {icon && <LegacyIcon type={icon} />}
        <span>{name}</span>
      </Link>
    </Menu.Item>
  );
}

function formater({ data }) {
  const items = data
    .filter(item => {
      if (!item) {
        return false;
      }
      if (item.hideInMenu) {
        return false;
      }
      if (item.routes) {
        return true;
      }
      if (item.name) {
        return true;
      }
      return false;
    })
    .map(routeItem => {
      const result = routeItem;
      if (routeItem.hideChildrenInMenu) {
        delete result.routes;
      }
      if (routeItem.routes) {
        const children = formater({
          data: routeItem.routes,
        });
        result.children = children;
      }
      return result;
    });
  return items;
}

const menuData = menuList => {
  return menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuData(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });
};

const memoizeOneFormatter = memoizeOne(formater, isDeepEqual);
export default routes => {
  let originalMenuData = memoizeOneFormatter({
    data: routes,
  });

  originalMenuData = menuData(originalMenuData);

  return _.map(originalMenuData, data => RenderMenu(data));
};
