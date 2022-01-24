/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { FormRules, TItem, PopoverMultiTable } from '@/components/tis_ui';
import { FileUpload } from '@/components/bussinessComponents';
import { Input } from 'antd';

function ApprovalMultiTable(props) {
  const { disabled } = props;

  return (
    <TItem labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} {...props}>
      <PopoverMultiTable
        coverData={vals => {
          const { file } = vals;
          const [filePath, fileName] = file || [];
          return { ...vals, clienst: filePath, clienName: fileName };
        }}
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
            title: '审批结果名称',
            dataIndex: 'name',
          },
          {
            title: '送达方式',
            dataIndex: 'sdfs',
          },
          {
            title: '送达期限',
            dataIndex: 'sdqx',
          },
          {
            title: '审批结果类型',
            dataIndex: 'resultType',
          },
          {
            title: '审批结果样本名称',
            dataIndex: 'clienName',
          },
        ]}
      >
        <TItem name="name" label="审批结果名称" rules={[FormRules.required('必填')]}>
          <Input />
        </TItem>
        <TItem name="sdfs" label="送达方式">
          <Input />
        </TItem>
        <TItem name="sdqx" label="送达期限">
          <Input />
        </TItem>

        <TItem name="resultType" label="审批结果类型">
          <Input />
        </TItem>
        <TItem name="file" label="送达样本">
          <FileUpload download />
        </TItem>
      </PopoverMultiTable>
    </TItem>
  );
}

export default ApprovalMultiTable;
