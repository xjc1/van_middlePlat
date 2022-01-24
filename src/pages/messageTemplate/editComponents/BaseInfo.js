import React from 'react';
import { TItem, TabForm, FormRules, TSelect, CodeEditor, TButton } from '@/components/tis_ui';
import { Input, Select, Space, Table } from 'antd';
import EmptyFn from '@/utils/EmptyFn';
import { ToolOutlined } from '@ant-design/icons';
import _ from 'lodash';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const dataTypes = {
  JSON: 'json',
};

function BaseInfo(props) {
  const { disabled, onScanJson = EmptyFn, fieldsList = [] } = props;

  return (
    <TabForm.Tab {...props}>
      <TItem name="moduleTitle" label="模版标题" rules={[FormRules.required('必填')]} {...layout}>
        <Input placeholder="请输入模版标题" disabled={disabled} />
      </TItem>
      <TItem name="moduleId" label="模版编码" rules={[FormRules.required('必填')]} {...layout}>
        <Input placeholder="请输入模版编码" disabled={disabled} />
      </TItem>
      <TItem name="format" label="数据格式" rules={[FormRules.required('必填')]} {...layout}>
        <TSelect disabled={disabled} allowClear={false}>
          {_.map(dataTypes, (v, k) => (
            <Select.Option key={k} value={v}>
              {k}
            </Select.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem
        name="source"
        label="字段"
        rules={[FormRules.required('必填'), FormRules.json()]}
        {...layout}
      >
        <CodeEditor mode="json" height="300px" disabled={disabled} />
      </TItem>
      <TItem colon={false} label=" " {...layout}>
        <Space>
          <TButton.Search
            icon={<ToolOutlined />}
            disabled={disabled}
            onClick={() => onScanJson('不可识别的数据')}
          >
            自动检测
          </TButton.Search>
        </Space>
      </TItem>
      <TItem colon={false} label=" " {...layout}>
        <Table
          bordered
          size="small"
          dataSource={fieldsList}
          rowKey="path"
          columns={[
            {
              title: '字段名称',
              dataIndex: 'name',
              ellipsis: true,
            },
            {
              title: '参数名',
              dataIndex: 'path',
              ellipsis: true,
            },
          ]}
        />
      </TItem>
    </TabForm.Tab>
  );
}

export default BaseInfo;
