import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import _ from 'lodash';
import ContentModal from './ContentModal';
import { TTable, utils } from '@/components/tis_ui';
import styles from './index.less';
import { modulesContentType, modulesCoverage } from '@/utils/constantEnum';

const { IDGenerator } = utils;

const idGenerator = new IDGenerator('content');

function AddContent({ onChange, disabled = false, value = [] }) {
  const [dataSource, setDataSource] = useState(() => {
    return _.map(value, item => {
      return { ...item, key: idGenerator.next() };
    });
  });

  const [contentItem, setContentItem] = useState();
  const columns = [
    {
      title: '内容类型',
      dataIndex: 'contentType',
      render: contentType => modulesContentType.$v_names[contentType],
    },
    {
      title: '覆盖范围',
      dataIndex: 'rangeType',
      render: rangeType => modulesCoverage.$v_names[rangeType],
    },
    {
      title: '操作',
      render: record => (
        <>
          <Button
            type="link"
            onClick={() => {
              setContentItem(record);
            }}
          >
            {disabled ? '查看' : '编辑'}
          </Button>
          <Button
            type="link"
            danger
            disabled={disabled}
            onClick={() => {
              setDataSource(
                _.filter(value, item => {
                  return item.key !== record.key;
                }),
              );
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    onChange(dataSource);
  }, [dataSource]);

  const validateRangeSelect = vals => {
    const { rangeType, filtrateValues = [], relatedContents = [] } = vals;
    if (rangeType === modulesCoverage.CUSTOMIZE) {
      if (!filtrateValues.length && !relatedContents.length) {
        message.warning('筛选条件至少选择一个');
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Button
        disabled={disabled}
        className={styles.addButton}
        type="primary"
        onClick={() => setContentItem({})}
      >
        添加
      </Button>
      <TTable columns={columns} dataSource={dataSource} rowKey="key" />
      {contentItem && (
        <ContentModal
          content={contentItem}
          disabled={disabled}
          onOk={data => {
            // 根据选择的范围 如果自定义的话 过滤条件至少配置一个
            const canSubmit = validateRangeSelect(data);
            if (!canSubmit) {
              return;
            }
            if (contentItem.key) {
              setDataSource(
                _.map(dataSource, item => {
                  if (item.key === contentItem.key) {
                    return { ...data, key: contentItem.key };
                  }
                  return item;
                }),
              );
            } else {
              setDataSource([...dataSource, { ...data, key: idGenerator.next() }]);
            }
            setContentItem();
          }}
          onCancel={() => setContentItem()}
        />
      )}
    </>
  );
}

export default AddContent;
