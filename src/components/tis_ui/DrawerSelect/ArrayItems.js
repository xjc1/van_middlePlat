/* eslint-disable import/no-extraneous-dependencies */
import React, { memo } from 'react';
import _ from 'lodash';
import { Button, Divider } from 'antd';
import classNames from 'classnames';
import TagItem from '../DrawerSelect/TagItem';
import EmptyFn from '../utils/EmptyFn';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import Styles from './index.less';
import animate from 'animate.css';

function ArrayItems({
  groups = [],
  excludeItems = [],
  onAddGroup = EmptyFn,
  onCollapseGroup = EmptyFn,
  onSelectedTag = EmptyFn,
  onUnSelectedTag = EmptyFn,
}) {
  return (
    <>
      {_.map(groups, ({ name, id, open, children = [] }) => {
        const currentItems = _.map(children, item => {
          return {
            ...item,
            selected: !!_.find(excludeItems, ({ id: compareId }) => compareId === item.id),
          };
        });
        if (!open && _.isEmpty(children)) {
          return (
            <Button
              className={Styles.groupDrawerGroupName}
              onClick={() => {
                onAddGroup(id);
              }}
              type="text"
              key={id}
            >
              {name}
            </Button>
          );
        }
        return (
          <div
            key={id}
            className={classNames(Styles.groupDrawerGroup, animate.animated, animate.fadeIn)}
          >
            <Divider
              orientation="left"
              className={Styles.groupDrawerHeader}
              onClick={() => {
                onCollapseGroup(id);
              }}
            >
              <Button type="link">{name}</Button>
              <VerticalAlignTopOutlined className={Styles.groupDrawerCollapseIcon} />
            </Divider>
            {_.map(currentItems, ({ name: tagName, id: tagId, selected = false }) => {
              return (
                <TagItem
                  type={selected && 'selected'}
                  onSelectedTag={() => {
                    if (selected) {
                      onUnSelectedTag({ id: tagId, name: tagName });
                    } else {
                      onSelectedTag({ id: tagId, name: tagName });
                    }
                  }}
                  key={tagId}
                  text={tagName}
                  id={tagId}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default memo(ArrayItems);
