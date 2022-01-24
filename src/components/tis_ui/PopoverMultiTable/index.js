/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, Popover, Form } from 'antd';
import _ from 'lodash';
import IDGenerator from '../utils/IDGenerator';
import EmptyFn from '../utils/EmptyFn';

const keyGenerator = new IDGenerator('popover');

function Index({
  title = '请选择',
  value = [],
  defaultPageSize = 4,
  children,
  actions,
  placement,
  coverData = vals => vals,
  extra = () => <div />,
  columns = [],
  showHeader = false,
  onChange = EmptyFn,
  disabled = false,
}) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const formatValue = value.map(it => {
      return { ...it, key: keyGenerator.next() };
    });
    onChange(formatValue);
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
            placement={placement}
            title={title}
            visible={visible}
            onVisibleChange={vis => setVisible(vis)}
            content={
              <div style={{ width: 600 }}>
                <Form
                  form={form}
                  initialValues={value}
                  onFinish={vals => {
                    const newData = coverData(vals);
                    const addKeyData = { ...newData, key: keyGenerator.next() };
                    onChange([...value, addKeyData]);
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
            {!disabled && <Button block>{title}</Button>}
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
              // width: 100,
              render: (text, record) => (
                <div>
                  <span>
                    <a
                      onClick={() => {
                        onChange(_.filter(value, ({ key }) => key !== record.key));
                      }}
                    >
                      删除
                    </a>
                  </span>
                  {extra(record)}
                </div>
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
