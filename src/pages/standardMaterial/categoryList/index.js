import React, { useState } from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import Styles from './index.less';
import classNames from 'classnames';
import { EmptyFn } from '@/components/tis_ui';

function Index({ items = [], selectedID, onSelected = EmptyFn }) {
  const [selectStr, setSelectStr] = useState();

  const currentItems = selectStr
    ? _.filter(items, ({ name = '' }) => name.includes(selectStr))
    : items;

  return (
    <div className={Styles.categoryList}>
      <div className={Styles.categoryListToolbar}>
        <Input.Search
          placeholder="请输入要检索的分类"
          allowClear
          onSearch={str => {
            setSelectStr(str);
          }}
        />
      </div>
      <h3
        onClick={() => {
          onSelected({});
        }}
      >
        发证部门
      </h3>
      <ul>
        {_.map(currentItems, item => {
          const { name, id, num = 0 } = item;
          return (
            <li
              key={id}
              className={classNames(
                selectedID && selectedID === id && Styles.categoryListLiSelected,
              )}
              onClick={() => {
                onSelected(item);
              }}
            >
              <span>
                {name} (
                <em className={classNames(num > 0 && Styles.categoryListFieldNumStrong)}>{num}</em>)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
