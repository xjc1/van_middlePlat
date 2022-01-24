import React, { useState } from 'react';
import { Button, Col, Row, Table, Popover, Form, Select, Divider } from 'antd';
import _ from 'lodash';
import { TItem, FormRules } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import styles from './tabs.less';
import { KERNEL } from '@/services/api';

const defaultPageSize = 4;

function AddSynonyms({ value = [], onChange = EmptyFn, editVisible = true, formRef }) {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const [optionData, setOptionData] = useState([]);

  function onSearch(text) {
    if (text && text !== '') {
      const fieldValue = formRef.getFieldValue();
      const params = { name: text, object: fieldValue.object };
      KERNEL.getPortraitTagPageListUsingPOST({ params }).then(resp => {
        const { content = [] } = resp;
        setOptionData(content);
      });
    }
  }

  return (
    <Row>
      <Col>
        <TItem
          style={{
            marginBottom: 10,
          }}
        >
          {editVisible && (
            <Button type="primary" onClick={() => setVisible(true)}>
              添加
            </Button>
          )}
          <Popover
            title="添加标签同义词"
            visible={visible}
            content={
              <div style={{ width: 600 }}>
                <Form
                  form={form}
                  initialValues={value}
                  onFinish={vals => {
                    const selectData = _.find(optionData, { id: vals.name }) || {};
                    const { name, category, id } = selectData;
                    onChange([...value, { tagName: name, tagCategory: category, tagId: id }]);
                    form.resetFields();
                    setVisible(false);
                  }}
                >
                  <TItem name="name" label="标签同义词" rules={[FormRules.required('必填')]}>
                    <Select
                      showSearch
                      placeholder="请输入标签名称查询"
                      optionFilterProp="children"
                      onSearch={onSearch}
                    >
                      {optionData.map(({ id, name }) => (
                        <Select.Option value={id} key={id}>
                          {' '}
                          {name}{' '}
                        </Select.Option>
                      ))}
                    </Select>
                  </TItem>
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button
                      onClick={() => {
                        setVisible(false);
                      }}
                    >
                      取消
                    </Button>
                    <Divider type="vertical" />
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                  </div>
                </Form>
              </div>
            }
            trigger="click"
          />
        </TItem>
      </Col>
      <Col span={24}>
        <Table
          disabled={!editVisible}
          bordered
          rowKey="tagId"
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '标签同义词',
              dataIndex: 'tagName',
              className: styles.addTable,
            },
            {
              title: '同义词分类',
              dataIndex: 'tagCategory',
            },
            {
              title: '操作',
              dataIndex: 'tagId',
              width: 100,
              render: delId => (
                <span>
                  {editVisible && (
                    <a
                      onClick={() => {
                        onChange(_.filter(value, ({ tagId }) => tagId !== delId));
                      }}
                    >
                      删除
                    </a>
                  )}
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

export default AddSynonyms;
