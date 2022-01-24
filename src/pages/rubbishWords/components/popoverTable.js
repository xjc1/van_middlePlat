/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, Popover, Form, Space, Modal } from 'antd';
import _ from 'lodash';
import EmptyFn from '@/utils/EmptyFn';
import EditPopover from './editPopover'

function Index({
  title = '请选择',
  value = [],
  defaultPageSize = 4,
  children,
  actions,
  columns = [],
  showHeader = false,
  onChange = EmptyFn,
  disabled = false,
}) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    onChange(value);
  }, []);

  return (
    <Row>
      <Col span={6}>
        <div
          style={{
            marginBottom: 0,
          }}
        >
          <Popover
            title={title}
            visible={visible}
            onVisibleChange={vis => setVisible(vis)}
            content={
              <div style={{ width: 600 }}>
                <Form
                  form={form}
                 
     
                  onFinish={vals => {
                    onChange([...value, { ...vals }]);
                    form.resetFields();
                  }}
                >
                  <Row>{children}</Row>
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button type="primary" htmlType="submit" onClick={() => setVisible(false)}>
                      确定
                    </Button>
                  </div>
                </Form>
              </div>
            }
            trigger="click"
          >
            {!disabled && <Button type="primary">{title}</Button>}
            {actions}
          </Popover>
        </div>
      </Col>
      <Col span={24}>
        <Table
          bordered
          locale={{
            emptyText: '已选列表',
          }}
          showHeader={showHeader}
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            ...columns,
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: (text, record, index) => (
                <Space>
                <EditPopover disabled={disabled} record={record} index={index} setValue={(ind,vals) => {
                  const tem = [...value];
                  tem[ind] = vals;
                  onChange(tem);
                }}/>
                <span>
                  <Button
                    type="link"
                    disabled={disabled}
                    onClick={() => {
                      onChange(value.filter((item,itemIndex) => itemIndex !== index));
                    }}
                  >
                    删除
                  </Button>
                </span>
              </Space>
              ),
            },
          ]}
          dataSource={value}
          size="small"
          rowKey="key"
        />
      </Col>
    </Row>
  );
}

export default Index;
