import React, { useState } from 'react';
import { Button, Col, Row, Table, Popover, Form, Input } from 'antd';
import _ from 'lodash';
import { TItem, FormRules, TSelect } from '@/components/tis_ui';
import TCheckbox from '@/components/tis_ui/Form/TCheckbox';
import EmptyFn from '@/utils/EmptyFn';
import { appUserType, formYesNo } from '@/utils/constantEnum';

const defaultPageSize = 4;

function AddObjectType({ fieldsList = [], value = [], onChange = EmptyFn, disabled }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const alreadySelected = value.map(({ value: key }) => key);

  function handleVisibleChange(nextVisible) {
    setVisible(nextVisible);
  }

  return (
    <Row>
      <Col>
        <TItem
          style={{
            marginBottom: 0,
          }}
        >
          <Popover
            title="添加对象类型"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            content={
              <div style={{ width: 600 }}>
                <Form
                  form={form}
                  initialValues={value}
                  onFinish={vals => {
                    const { sendAll, ...others } = vals;
                    const val = {
                      sendAll: !!sendAll,
                      ...others,
                    };
                    onChange([...value, val]);
                    setVisible(false);
                    form.resetFields();
                  }}
                >
                  <TItem name="value" label="对象类型" rules={[FormRules.required('必填')]}>
                    <TSelect>
                      {_.map(_.omit(appUserType, 'selfAndLegalPerson'), (v, k) => (
                        <TSelect.Option key={k} value={v} disabled={alreadySelected.includes(v)}>
                          {appUserType.$names[k]}
                        </TSelect.Option>
                      ))}
                    </TSelect>
                  </TItem>
                  <Form.Item dependencies={['sendAll']} noStyle>
                    {({ getFieldValue }) => {
                      const sendAll = getFieldValue('sendAll');
                      return (
                        !sendAll && (
                          <>
                            <TItem
                              name="name"
                              label="字段选择"
                              rules={[FormRules.required('必填')]}
                            >
                              <TSelect>
                                {_.map(fieldsList, ({ path }) => (
                                  <TSelect.Option key={path} value={path}>
                                    {path}
                                  </TSelect.Option>
                                ))}
                              </TSelect>
                            </TItem>
                            <TItem name="code" label="字典值" rules={[FormRules.required('必填')]}>
                              <Input />
                            </TItem>
                          </>
                        )
                      );
                    }}
                  </Form.Item>
                  <TItem name="sendAll" label="全部转发">
                    <TCheckbox />
                  </TItem>
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                  </div>
                </Form>
              </div>
            }
            trigger="click"
          >
            <Button disabled={disabled} type="primary">
              添加
            </Button>
          </Popover>
        </TItem>
      </Col>
      <Col span={24}>
        <Table
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          rowKey="value"
          columns={[
            {
              title: '对象类型',
              dataIndex: 'value',
              render(text) {
                return appUserType.$v_names[text] || text;
              },
            },
            {
              title: '字段',
              dataIndex: 'name',
            },
            {
              title: '字典值',
              dataIndex: 'code',
            },
            {
              title: '全部转发',
              dataIndex: 'sendAll',
              render: sendAll => formYesNo.$v_names[sendAll],
            },
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: (text, record) => (
                <span style={{ display: disabled ? 'none' : 'block' }}>
                  <a
                    onClick={() => {
                      const formatValue = _.filter(value, ({ value: key }) => key !== record.value);
                      onChange(formatValue);
                    }}
                  >
                    删除
                  </a>
                </span>
              ),
            },
          ]}
          dataSource={value}
          size="small"
        />
      </Col>
    </Row>
  );
}

export default AddObjectType;
