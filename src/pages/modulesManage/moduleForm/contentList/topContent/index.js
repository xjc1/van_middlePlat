import React, { useState } from 'react';
import { Button, Table } from 'antd';
import styles from '../addContent/index.less';
import { modulesContentType, modulesSpecialType } from '@/utils/constantEnum';
import _ from 'lodash';
import ContentListModal from './ContentListModal';
import { EmptyFn } from '@/components/tis_ui';

function TopContent({ value = [], disabled, onChange = EmptyFn }) {
  const [selectedItem, setSelectedItem] = useState();

  const columns = [
    {
      title: '内容类型',
      dataIndex: 'contentType',
      render: type => modulesContentType.$v_names[type],
    },
    {
      title: '内容数',
      render: (text, record) => record.list.length,
    },
    {
      title: '特殊列表',
      dataIndex: 'specialType',
      render: text => modulesSpecialType.$v_names[text],
    },
    {
      title: '操作',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => setSelectedItem(record)}>
            {disabled ? '查看' : '编辑'}
          </Button>
          <Button
            type="link"
            danger
            disabled={disabled}
            onClick={() =>
              onChange(
                value.filter(
                  ({ contentType, specialType }) =>
                    !(contentType === record.contentType && specialType === record.specialType),
                ),
              )
            }
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  function handleChangeContentList(nextVal) {
    const contentTypeDetail = value.find(
      ({ contentType: type, specialType }) =>
        type === nextVal.contentType && specialType === nextVal.specialType,
    );
    if (contentTypeDetail) {
      onChange(
        value
          .map(item => {
            if (
              item.contentType !== contentTypeDetail.contentType ||
              item.specialType !== contentTypeDetail.specialType
            ) {
              return item;
            }
            // 是否是编辑情况
            if (
              !selectedItem.hasOwnProperty('contentType') ||
              !selectedItem.hasOwnProperty('specialType')
            ) {
              const { list: currentList } = contentTypeDetail;
              const { list: nextList } = nextVal;
              return {
                ...contentTypeDetail,
                list: _.unionBy([...currentList, ...nextList], 'key'),
              };
            }
            return { ...contentTypeDetail, ...nextVal };
          })
          .filter(({ list }) => list.length),
      );
    } else {
      onChange([...value, { ...nextVal, rowKey: `${nextVal.contentType}_${nextVal.specialType}` }]);
    }
    setSelectedItem();
  }

  return (
    <>
      <Button
        disabled={disabled}
        className={styles.addButton}
        type="primary"
        onClick={() => setSelectedItem({})}
      >
        添加
      </Button>

      <Table columns={columns} dataSource={value} pagination={false} rowKey="rowKey" />

      {selectedItem && (
        <ContentListModal
          initialValues={selectedItem}
          title={selectedItem.hasOwnProperty('contentType') ? '编辑内容' : '添加内容'}
          onOk={handleChangeContentList}
          onCancel={() => setSelectedItem()}
          disabled={disabled}
        />
      )}
    </>
  );
}

export default TopContent;
