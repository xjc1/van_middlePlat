import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Table, Input, Select } from 'antd';
import _ from 'lodash';
import { TItem, FormRules } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { KERNEL } from '@/services/api';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import FormPopover from './formPopover';

import styles from './tabs.less';

const defaultPageSize = 4;
const KeyGenerator = new IDGenerator('sourceType');

function AddSourceName({ value = [], onChange = EmptyFn, editVisible = true }) {
  const [currentRecord, setCurrentRecord] = useState();
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    getSourceList();
  }, []);
  async function getSourceList() {
    const list = await KERNEL.findAllSourcesUsingGET();
    setSourceList(list);
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
            <Button
              type="primary"
              onClick={() => {
                setCurrentRecord({});
              }}
            >
              添加
            </Button>
          )}
          {currentRecord && (
            <FormPopover
              title={`${currentRecord.key ? '编辑' : '添加'}标签来源名称`}
              initialValues={currentRecord}
              onCancel={() => setCurrentRecord()}
              onFinish={vals => {
                const { name, introduce, sourceType } = vals;
                const { key: recordKey } = currentRecord;
                let newValue = [...value];
                // 有key说明是编辑
                if (recordKey) {
                  const index = value.findIndex(({ key }) => key === recordKey);
                  newValue.splice(index, 1, vals);
                } else {
                  newValue = [...value, { name, sourceType, introduce, key: KeyGenerator.next() }];
                }
                onChange(newValue);
                setCurrentRecord();
              }}
            >
              <TItem name="sourceType" label="标签来源类型" rules={[FormRules.required('必填')]}>
                <Select placeholder="请选择标签来源类型" allowClear>
                  {_.map(sourceList, ({ name, code }) => (
                    <Select.Option key={code} value={code} label={name}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </TItem>
              <TItem name="name" label="标签来源名称">
                <Input />
              </TItem>
              <TItem name="introduce" label="来源说明">
                <Input />
              </TItem>
            </FormPopover>
          )}
        </TItem>
      </Col>
      <Col span={24}>
        <Table
          disabled={!editVisible}
          bordered
          pagination={{
            defaultPageSize,
          }}
          rowKey="key"
          columns={[
            {
              title: '标签来源名称',
              dataIndex: 'name',
              className: styles.addTable,
            },
            {
              title: '来源类型',
              dataIndex: 'sourceType',
              className: styles.addTable,
              render: text => {
                const typeObj = _.find(sourceList, { code: text }) || { name: text };
                return typeObj.name;
              },
            },
            {
              title: '来源说明',
              dataIndex: 'introduce',
              className: styles.addTable,
            },
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: (text, record) => (
                <span>
                  {editVisible && (
                    <>
                      <a
                        style={{ marginRight: 16 }}
                        onClick={() => {
                          setCurrentRecord(record);
                        }}
                      >
                        编辑
                      </a>
                      <a
                        onClick={() => {
                          onChange(_.filter(value, ({ key }) => record.key !== key));
                        }}
                      >
                        删除
                      </a>
                    </>
                  )}
                </span>
              ),
            },
          ]}
          dataSource={value.map(item => ({
            ...item,
            key: KeyGenerator.next(),
          }))}
          size="small"
        />
      </Col>
    </Row>
  );
}

export default AddSourceName;
