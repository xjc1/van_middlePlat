import React, { useState } from 'react';
import { Button, Col, Row, Table, Space } from 'antd';
import _ from 'lodash';
import { TItem } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import styles from '../dimension.less';
import EditDimensionPopover from './EditDimensionPopover';

const defaultPageSize = 4;

function AddTag({ value = [], onChange = EmptyFn, editVisible = false }) {
  const [data, setData] = useState(value);

  //   useEffect(() => {
  //     onChange(value);
  //   }, value);

  function handleChangeTags(tags) {
    setData(tags);
    onChange(tags);
  }

  return (
    <Row>
      <Col>
        <TItem
          style={{
            marginBottom: 10,
          }}
        >
          <EditDimensionPopover
            title="添加维度标签"
            onFinish={(vals, form) => {
              const { otherWords = '' } = vals;
              const newWords = otherWords.split('|');
              handleChangeTags([...data, { ...vals, otherWords: newWords, key: Date.now() }]);
              form.resetFields();
            }}
          >
            <Button type="primary" disabled={!editVisible}>
              添加
            </Button>
          </EditDimensionPopover>
        </TItem>
      </Col>
      <Col span={24}>
        <Table
          disabled={!editVisible}
          bordered
          rowKey={(item,index) => item.label+index}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '标签',
              dataIndex: 'label',
              className: styles.addTable,
            },
            {
              title: '不同说法',
              dataIndex: 'otherWords',
              className: styles.addTable,
              render: text => text.join('|'),
            },
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: (text, record) => (
                <span>
                  {editVisible && (
                    <Space>
                      <EditDimensionPopover
                        title="编辑维度标签"
                        initialValues={{ ...record, otherWords: record.otherWords.join('|') }}
                        onFinish={({ label, otherWords }) => {
                          const { id } = record;
                          handleChangeTags(
                            _.map(data, item => {
                              if (item.id === id) {
                                return {
                                  ...item,
                                  label,
                                  key: Date.now(),
                                  otherWords: otherWords.split('|'),
                                };
                              }
                              return item;
                            }),
                          );
                        }}
                      >
                        <a>编辑</a>
                      </EditDimensionPopover>
                      <a
                        style={{ color: '#ff7875' }}
                        onClick={() => {
                          handleChangeTags(
                            _.filter(data, ({ key, id }) => {
                              if (id) {
                                return id !== record.id;
                              }
                              return key !== record.key;
                            }),
                          );
                        }}
                      >
                        删除
                      </a>
                    </Space>
                  )}
                </span>
              ),
            },
          ]}
          dataSource={data}
          size="small"
        />
      </Col>
    </Row>
  );
}

export default AddTag;
