import React, { useState } from 'react';
import { Input, Button } from 'antd';
import _ from 'lodash';
import { STANDARDFIELDCLASSIFICATIONS } from '@/services/api';
import classNames from 'classnames';
import { EmptyFn, confirmAble } from '@/components/tis_ui';
import { DeleteOutlined } from '@ant-design/icons';
import Styles from './index.less';

function Index({
  items = [],
  selectedID,
  onSelected = EmptyFn,
  onAddCategory = EmptyFn,
  refresh = EmptyFn,
  showAddCategory = true,
}) {
  const [selectStr, setSelectStr] = useState();

  const currentItems = selectStr
    ? _.filter(items, ({ name = '' }) => name.includes(selectStr))
    : items;

  const handleDelete = id => {
    confirmAble({
      confirmText: '提示',
      confirmContent: '确定删除此字段分类？',
      onClick: () => {
        STANDARDFIELDCLASSIFICATIONS.deleteStandardFieldClassificationUsingPOST(id).then(() => {
          refresh();
        });
      },
    })();
  };

  return (
    <div className={Styles.categoryList}>
      <div className={Styles.categoryListToolbar}>
        {showAddCategory && (
          <Button type="primary" className={Styles.categoryListAddBtn} onClick={onAddCategory}>
            添加分类
          </Button>
        )}
        <Input.Search
          placeholder="查询分类"
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
        全部分类
      </h3>
      <ul>
        {_.map(currentItems, item => {
          const { name, id, fieldNum = 0 } = item;
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
                <em className={classNames(fieldNum > 0 && Styles.categoryListFieldNumStrong)}>
                  {fieldNum}
                </em>
                )
              </span>
              <div
                style={{
                  float: 'right',
                  lineHeight: '24px',
                }}
              >
                <DeleteOutlined
                  title="删除字段分类"
                  style={{ color: 'red' }}
                  onClick={() => handleDelete(id)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
