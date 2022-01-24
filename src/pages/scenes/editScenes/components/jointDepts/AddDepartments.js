import React, { useState } from 'react';
import { connect } from 'dva';
import { Button, Col, Row, Table, Divider, message, Typography, Tooltip } from 'antd';
import _ from 'lodash';
import { DictSelect } from '@/components/bussinessComponents'
import EmptyFn from '@/utils/EmptyFn';
import { commonAuditState } from '@/utils/constantEnum';

const defaultPageSize = 4;

function AddDepartments({ value = [], onChange = EmptyFn, sceneForm, disabled }) {

  const handledValue = _.uniqBy(
    value.map(item => ({
      auditState: sceneForm.getFieldValue('isNeedAudit') || 0,
      advice: null,
      key: item.name || item.matterDepartment,
      name: item.name || item.matterDepartment,
      label: item.label || item.matterDepartmentLabel,
      ...item,
    })),
    'key'
  );

  const [selectedDepartment, setSelectedDepartment] = useState();

  function handleDepartmentSelect(department) {
    setSelectedDepartment(department);
  }

  function handleAdd() {
    if (!selectedDepartment) {
      message.error('不允许添加空值');
      return;
    }
    if (selectedDepartment && handledValue.some(({ key }) => key === selectedDepartment.key)) {
      message.error('请勿重复添加');
      return;
    }
    const department = {
      ...selectedDepartment,
      label: selectedDepartment.label,
      name: selectedDepartment.key,
      auditState: sceneForm.getFieldValue('isNeedAudit') || 0,
      advice: null,
    }
    onChange([...handledValue, department]);
    setSelectedDepartment();
  }

  function handleResetAuditState(record) {
    const currentDepartments = handledValue.map(item => ({ ...item }));
    onChange(currentDepartments.map(item => {
      if (item.key === record.key) {
        item.auditState = 0;
      }
      return item;
    }));
  }

  return (
    <Row>
      {
        !disabled &&
        <>
        <Col span={10} style={{marginRight: '20px'}}>
          <DictSelect dict="SHSSBMSH" value={selectedDepartment} showSearch optionFilterProp="label" labelInValue onChange={handleDepartmentSelect} />
        </Col>
        <Col>
          <Button type="primary" onClick={handleAdd}>
            添加
          </Button>
        </Col>
        </>
      }
      <Col span={24}>
        <Table
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '部门名称',
              dataIndex: 'label',
              width: '30%',
              render: label => (
                <Typography.Paragraph ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}>
                  <Tooltip title={label}>
                    { label }
                  </Tooltip>
                </Typography.Paragraph>
              )
            },
            {
              title: '审核状态',
              dataIndex: 'auditState',
              render: state => commonAuditState.$v_names[state]
            },
            {
              title: '审核意见',
              dataIndex: 'advice',
              width: '30%',
              render: advice => (
                <Typography.Paragraph ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}>
                  <Tooltip title={advice}>
                    { advice }
                  </Tooltip>
                </Typography.Paragraph>
              )
            },
            {
              title: '操作',
              align: 'center',
              width: 180,
              render: (text, record) => (
                <span style={{display: disabled ? 'none' : 'block'}}>
                  <a
                    onClick={() => {
                      onChange(_.filter(handledValue, ({ key }) => key !== record.key));
                    }}
                  >
                    删除
                  </a>
                  <Divider type="vertical" />
                  <a
                    onClick={() => {handleResetAuditState(record)}}
                  >
                    设置为未审核
                  </a>
                </span>
              ),
            },
          ]}
          dataSource={handledValue}
          size="small"
        />
      </Col>
    </Row>
  );
}

export default connect(({ scenes }) => ({ ...scenes }))(AddDepartments);
