import { Table, Button, Input, Divider, message } from 'antd';
import React from 'react';
import { TItem } from '@/components/tis_ui';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import _ from 'lodash';
import JsonInputPopover from './JsonInputPopover';
import FormPopover from './FormPopover';

function SampleData({ value = [], disabled, onChange, columns = [], limitSize = 10 }) {
  const newColumns = [
    ...columns,
    {
      title: '操作',
      dataIndex: 'key',
      fixed: 'right',
      width: 150,
      render: (text, record) => {
        return (
          !disabled && (
            <>
              <FormPopover
                initialValues={record}
                onFinish={(values, key) => {
                  const newValue = [...value];
                  const index = _.findIndex(value, { key });
                  newValue[index] = { ...values, key };
                  onChange(newValue);
                }}
                render={setVisible => (
                  <Button
                    type="link"
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    编辑
                  </Button>
                )}
              >
                {columns.map(({ title, dataIndex }) => (
                  <TItem name={dataIndex} label={title}>
                    <Input />
                  </TItem>
                ))}
              </FormPopover>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  const newValue = value.filter(({ key }) => key !== text);
                  onChange(newValue);
                }}
              >
                删除
              </Button>
            </>
          )
        );
      },
    },
  ];

  return (
    <>
      {!disabled && (
        <>
          <JsonInputPopover
            title="导入样例数据"
            example={`[{"name": "上海通办"}, {"name": "通办信息"}]`}
            onChange={(values = []) => {
              const limitSizeValue = values.slice(0, limitSize);
              if (values.length > limitSize) {
                message.info(`样例数据不超过${limitSize}条,此次导入已截取前${limitSize}条`);
              }
              onChange(limitSizeValue);
            }}
            btnText="导入样例数据"
          />
          <Divider type="vertical" />
          <FormPopover
            title="新增样例数据"
            placement="right"
            onFinish={val => {
              const newValue = [...value, { ...val, key: IDGenerator.next('sampleData') }];
              if (newValue.length > limitSize) {
                message.error(`样例数据不能超过${limitSize}条`);
                return;
              }
              onChange(newValue);
            }}
            render={setVisible => (
              <Button
                type="primary"
                onClick={() => {
                  setVisible(true);
                }}
              >
                新增
              </Button>
            )}
          >
            {columns.map(({ title, dataIndex }) => (
              <TItem name={dataIndex} key={dataIndex} label={title}>
                <Input />
              </TItem>
            ))}
          </FormPopover>
        </>
      )}
      {columns.length > 0 && (
        <Table scroll={{ x: '100%' }} dataSource={value} columns={newColumns} />
      )}
    </>
  );
}

export default SampleData;
