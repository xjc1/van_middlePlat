import React from 'react';
import { TItem, PopoverMultiTable } from '@/components/tis_ui';
import { Input } from 'antd';

function AddFile(props) {
  const { disabled } = props;

  return (
    <PopoverMultiTable
      {...props}
      title="添加"
      placement="right"
      showHeader
      disabled={disabled}
      extra={record => {
        const { clienst, clienName } = record;
        return (
          clienst && (
            <span style={{ padding: '0px 6px' }}>
              <a href={clienst} download={clienName} target="_blank">
                下载样本
              </a>
            </span>
          )
        );
      }}
      columns={[
        {
          title: '主题名称',
          dataIndex: 'name',
        },
        {
          title: '链接地址',
          dataIndex: 'url',
        },
      ]}
    >
      <TItem name="name" label="主题名称">
        <Input allowClear />
      </TItem>
      <TItem name="url" label="主题地址">
        <Input allowClear />
      </TItem>
    </PopoverMultiTable>
  );
}

export default AddFile;
