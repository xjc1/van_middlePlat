import React, { useState } from 'react';
import _ from 'lodash';
import { Table, Button, Popover, Form, Input, Space, Select } from 'antd';
import { EmptyFn, FormRules, TItem, utils } from '@/components/tis_ui';
import { useUpdateEffect } from 'ahooks';
import { connect } from "dva";
import Styles from './slotConfig.less';

const { IDGenerator } = utils;

const slotIdGenerator = new IDGenerator('slot');

function SlotConfig({ value = [], slots = [], onChange = EmptyFn }) {
  const [formRef] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const [items, setItems] = useState(() => {
    return _.map(value, item => {
      return {
        ...item,
        id: item.id ? item.id : slotIdGenerator.next(),
      };
    });
  });

  useUpdateEffect(() => {
    onChange(items);
  }, [items]);

  return (
    <div className={Styles.slotConfig}>
      <Table
        title={() => {
          return (
            <div className={Styles.slotConfigTitle}>
              <span>槽位配置</span>
              <Popover
                placement="left"
                visible={visible}
                content={
                  <div className={Styles.slotConfigAddForm}>
                    <Form
                      form={formRef}
                      onFinish={vals => {
                        setItems([...items, { ...vals, id: slotIdGenerator.next() }]);
                        setVisible(false);
                        formRef.resetFields();
                      }}
                    >
                      <TItem
                        name="slotId"
                        label="槽位名称"
                        rules={[FormRules.required('槽位名称')]}
                      >
                        <Select width="100%">
                          {
                            _.map(slots, ({ id, name: slotName }) => <Select.Option key={id}
                                                                                    value={id}>{slotName}</Select.Option>)
                          }
                        </Select>
                      </TItem>
                      <TItem name="value" label="槽位值" rules={[FormRules.required('槽位值必填')]}>
                        <Input style={{ width: '100%' }} />
                      </TItem>
                      <TItem label=" " colon={false}>
                        <Space className={Styles.slotConfigFormBtn}>
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
                title="添加槽位"
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
            title: '槽位名称',
            dataIndex: 'slotId',
            key: 'slotId',
            render(slotId) {
                return _.find(slots, { id: slotId})?.name;
            }
          },
          {
            title: '槽位名称',
            dataIndex: 'value',
            key: 'value',
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

export default connect(({ dialogStudios }) => {
  const { slots = [] } = dialogStudios;
  return {
    slots,
  };
})(SlotConfig);
