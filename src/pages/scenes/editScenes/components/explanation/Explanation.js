import React, { useState } from 'react';
import _ from 'lodash';
import { Tooltip, Typography } from 'antd';
import { TItem } from '@/components/tis_ui';
import AddExplanations from './AddExplanations';
import { policyUpDownStatus, terminalType } from '@/utils/constantEnum';

const tabKey = 'explanation';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const reviewState = {
  0: '审核未通过',
  1: '审核通过',
}

function Explanation(props) {
  const { disabled } = props;

  return (
    <>
      <TItem name={[tabKey, "services"]} label="关联服务" {...layout}>
        <AddExplanations
          type="convenience"
          disabled={disabled}
          columns={[
            {
              title: '服务名称',
              dataIndex: 'name',
              width: '30%',
              render: name => (
                <Typography.Paragraph ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}>
                  <Tooltip title={name} style={{width: '400px'}}>
                    {name}
                  </Tooltip>
                </Typography.Paragraph>
              )
            },
            {
              title: '编码',
              dataIndex: 'code',
            },
            {
              title: '终端类型',
              dataIndex: 'clientType',
              ellipsis: true,
              render: type => type.map(item => terminalType.$v_names[item]).join(' | ')
            },
            {
              title: '行政区划',
              dataIndex: 'regions',
            },
            {
              title: '上下架状态',
              dataIndex: 'status',
              render: status => policyUpDownStatus.$v_names[status]
            },
          ]}
        />
      </TItem>
      <TItem name={[tabKey, "question"]} label="关联问答" {...layout}>
        <AddExplanations
          type="synonym"
          disabled={disabled}
          columns={[
            {
              title: '问答名称',
              dataIndex: 'question',
              width: '30%',
              render: name => (
                <Typography.Paragraph ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}>
                  <Tooltip title={name} style={{width: '400px'}}>
                    {name}
                  </Tooltip>
                </Typography.Paragraph>
              )
            },
            {
              title: '终端类型',
              dataIndex: 'clientType',
              ellipsis: true,
              render: type => type ? type.map(item => terminalType.$v_names[item]).join(' | ') : null
            },
            {
              title: '行政区划',
              dataIndex: 'regions',
            },
            {
              title: '上下架状态',
              dataIndex: 'status',
              render: status => policyUpDownStatus.$v_names[status]
            },
            {
              title: '审核状态',
              dataIndex: 'review',
              render: state => reviewState[state]
            },
          ]}
        />
      </TItem>
      <TItem name={[tabKey, "policy"]} label="关联政策" {...layout}>
        <AddExplanations
          type="policyLibrary"
          disabled={disabled}
          columns={[
            {
              title: '政策名称',
              dataIndex: 'name',
              width: '30%',
              render: name => (
                <Typography.Paragraph ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}>
                  <Tooltip title={name} style={{width: '400px'}}>
                    {name}
                  </Tooltip>
                </Typography.Paragraph>
              )
            },
            {
              title: '终端类型',
              dataIndex: 'clientType',
              ellipsis: true,
              render: type => type ? type.map(item => terminalType.$v_names[item]).join(' | ') : null
            },
            {
              title: '行政区划',
              dataIndex: 'regions',
            },
            {
              title: '上下架状态',
              dataIndex: 'status',
              render: status => policyUpDownStatus.$v_names[status]
            },
            {
              title: '审核状态',
              dataIndex: 'review',
              render: state => reviewState[state]
            },
          ]}
        />
      </TItem>
    </>
  )
}

export default Explanation;