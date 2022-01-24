import { Table, Button, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { EmptyFn, TItem } from '@/components/tis_ui';
import _ from 'lodash';
import FormPopover from './FormPopover';
import { commonAbsence } from '@/utils/constantEnum';

// tis表不可编辑字段，不可删除
function SchemaTable({
  value = [],
  onChange,
  disabled,
  setSampleDataColumns = EmptyFn,
  isTis = false,
}) {
  const columns = [
    { title: '字段名', dataIndex: 'field' },
    { title: '字段类型', dataIndex: 'type' },
    { title: '注释', dataIndex: 'comment' },
    {
      title: '用户唯一标识',
      dataIndex: 'isUnique',
      render: text => commonAbsence.$v_names[text] || text,
    },
    {
      title: '操作',
      dataIndex: 'key',
      width: 200,
      render: (text, record) => {
        return (
          <>
            <FormPopover
              initialValues={record}
              onFinish={(values, key) => {
                const newValue = [...value];
                const index = _.findIndex(value, { key });
                newValue[index] = { ...values, key };
                onChange(newValue);
              }}
              render={setVisible =>
                !disabled && (
                  <>
                    <Button
                      type="link"
                      onClick={() => {
                        setVisible(true);
                      }}
                    >
                      编辑
                    </Button>
                    <Button
                      type="link"
                      disabled={isTis}
                      onClick={() => {
                        const newValue = value.filter(({ key }) => key !== text);
                        onChange(newValue);
                      }}
                    >
                      删除
                    </Button>
                  </>
                )
              }
            >
              <TItem name="field" label="字段名">
                <Input disabled />
              </TItem>
              <TItem name="type" label="字段类型">
                <Input disabled={isTis} />
              </TItem>
              <TItem name="comment" label="注释">
                <Input />
              </TItem>
              <TItem name="isUnique" label="用户唯一标识">
                <Select>
                  {_.map(commonAbsence, (key, v) => (
                    <Select.Option key={key} value={key}>
                      {commonAbsence.$names[v]}
                    </Select.Option>
                  ))}
                </Select>
              </TItem>
            </FormPopover>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const sampleDataColumns = value.map(({ field }) => ({
      title: field,
      dataIndex: field,
      width: 200,
    }));
    setSampleDataColumns(sampleDataColumns);
  }, [JSON.stringify(value)]);

  return (
    <Table
      pagination={{ showSizeChanger: true, pageSizeOptions: [5, 100, 200], defaultPageSize: 5 }}
      dataSource={value}
      columns={columns}
    />
  );
}

export default SchemaTable;
