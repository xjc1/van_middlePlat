import React, { useState } from 'react';
import _ from 'lodash';
import { Table, Button, Popover, Form, Input, Space, InputNumber } from 'antd';
import { EmptyFn, FormRules, TItem, utils } from '@/components/tis_ui';
import { useUpdateEffect } from 'ahooks';
import Styles from '../settingPanel.less';

const { IDGenerator } = utils;

const askIdGenerator = new IDGenerator('ask');

function UserAsk({ value = [], onChange = EmptyFn }) {
  const [formRef] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const [items, setItems] = useState(() => {
    return _.map(value, item => {
      return {
        ...item,
        id: item.id ? item.id : askIdGenerator.next(),
      };
    });
  });

  useUpdateEffect(() => {
    onChange(items);
  }, [items]);

  return (
    <div className={Styles.userAsk}>
      <Table
        title={() => {
          return (
            <div className={Styles.userAskTitle}>
              <span>用户话术</span>
              <Popover
                placement="left"
                visible={visible}
                content={
                  <div className={Styles.userAskAddForm}>
                    <Form
                      form={formRef}
                      initialValues={{
                        threshold: 0.9
                      }}
                      onFinish={vals => {
                        setItems([...items, { ...vals, id: askIdGenerator.next() }]);
                        setVisible(false);
                        formRef.resetFields();
                      }}
                    >
                      <TItem
                        name="content"
                        label="相似问"
                        rules={[FormRules.required('相似问必填')]}
                      >
                        <Input />
                      </TItem>
                      <TItem name="threshold" label="阈值" rules={[FormRules.required('阈值必填')]}>
                        <InputNumber style={{ width: '100%' }} min={0} max={1} step={0.01} />
                      </TItem>
                      <TItem label=" " colon={false}>
                        <Space className={Styles.userAskFormBtn}>
                          <Button
                            size="middle"
                            onClick={() => {
                              setVisible(false);
                              formRef.resetFields();
                            }}
                          >
                            取消
                          </Button>
                          <Button type="primary" size="middle" htmlType="submit">
                            添加
                          </Button>
                        </Space>
                      </TItem>
                    </Form>
                  </div>
                }
                title="添加用户话术"
                trigger="click"
              >
                <Button
                  type="link"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  添加
                </Button>
              </Popover>
            </div>
          );
        }}
        rowKey="id"
        columns={[
          {
            title: '相似问',
            dataIndex: 'content',
            key: 'content',
          },
          {
            title: '阈值',
            dataIndex: 'threshold',
            key: 'threshold',
            width: 120,
            render(val, record) {
              return (
                <InputNumber
                  value={val}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={nextVal => {
                    setItems(
                      _.map(value, nextRecord => {
                        if (nextRecord.id === record.id) {
                          return {
                            ...nextRecord,
                            threshold: nextVal,
                          };
                        }
                        return nextRecord;
                      }),
                    );
                  }}
                />
              );
            },
          },
          {
            title: '操作',
            render: (text, record) => (
              <div>
                <span>
                  <a
                    onClick={() => {
                      setItems(_.filter(value, ({ id }) => id !== record.id));
                    }}
                  >
                    删除
                  </a>
                </span>
              </div>
            ),
          },
        ]}
        bordered
        size="small"
        dataSource={items}
      />
    </div>
  );
}

export default UserAsk;
