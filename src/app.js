import { fail, PAGEMENUS, SYS } from '@/services/api';
import { EventCenter } from '@/components/tis_ui';
import _ from 'lodash';
import router from '@/utils/tRouter';
import IframePages from "@/pages/iframeSystemPage";
import EmptyPage from "@/pages/iframeSystemPage/EmptyPage";
import Building from "@/pages/building";
import JumpSubPage from "@/pages/jumpSubPage";
import { subsystemsType } from "@/utils/constantEnum";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';

const SUB_SYSTEM_PAGE = {
  [subsystemsType.PAGE]: IframePages,
  [subsystemsType.BUILDING]: Building,
  [subsystemsType.LINK]: JumpSubPage,
};

let subSystems = [];

const redirectSso = () => {
  SYS.getSystemConfigUsingGET({ params: { code: 'dockingUser' } }).then((vals = {}) => {
    const { dockingUser = {} } = vals;
    const { failureCallbackAddress = '' } = dockingUser;
    window.location.href = failureCallbackAddress;
  });
};

EventCenter.on('401', () => {
  // 如果是sso登录就跳转sso登录页
  const loginType = localStorage.getItem('loginType');
  EventCenter.emit('cleanCache');
  if (loginType === 'sso') {
    redirectSso();
  } else {
    router.push('login');
  }
});

EventCenter.on('cleanCache', () => {
  // 清除所有token
  // localStorage.clear();
  localStorage.removeItem('loginType');
  localStorage.removeItem('antd-pro-authority');
  localStorage.removeItem('token');
});

EventCenter.on('goBack', () => {
  router.goBack();
});

// 把配置的子系统菜单插入到某人的菜单中, 这里不能用函数式编程, 只能修改原始值
function digRouters(routes, root = '') {
  const joinSystem = [];
  _.forEach(routes, (route, index) => {
    const systems = _.filter(subSystems, { position: route.rName });
    if (systems.length > 0) {
      joinSystem.push({ index: index + 1, root, systems: systems.reverse() });
    }
    if (route.routes) {
      const header = route.header && route.path;
      digRouters(route.routes, root || header);
    }
  });
  _.forEach(joinSystem, ({ index: indexes, systems: systems2 }) => {
    _.forEach(systems2, ({ name, url, menuId, childMenus, type }) => {
      const children =  _.map(childMenus, ({ name: cName, url: cUrl, menuId: cMenuId, type: cType }) => {
        return {
          authority: [cMenuId],
          path: `${root}/${menuId}/${cMenuId}`,
          name: cName,
          url: cUrl,
          rName: cMenuId,
          component: SUB_SYSTEM_PAGE[cType],
        };
      });
      routes.splice(indexes, 0, {
        authority: [menuId],
        path: `${root}/${menuId}`,
        name,
        url,
        rName: menuId,
        icon: 'BarChartOutlined',
        children,
      /*
      *  这里比较奇怪, 如果设上routers, 哪怕等于[], 会变成全屏,
      *  但是如果是子路由则没有关系, 如果有子路由必须设routes, 不然无效
      * */
        routes: childMenus.length > 0 ? children : undefined,
        component: childMenus.length > 0 ? EmptyPage : SUB_SYSTEM_PAGE[type],
      });
    });
  });
}

export function patchRoutes(routes) {
  digRouters(routes);
}

export function render(oldRender) {
  PAGEMENUS.findPageMenuTreeUsingGET({
    params: {
      needStatusFilter: true,
    }
  }).then((data) => {
    subSystems = data;
    oldRender();
  }).catch(e => {
    oldRender();
  });
}

export const dva = {
  config: {
    onError(error, dispatch) {
      console.error(error);
      error.preventDefault();
      fail(error);
    },
  },
};
