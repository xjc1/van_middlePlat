import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import EmptyFn from '@/utils/EmptyFn';
import _ from 'lodash';

function BigFieldBox({
  fields,
  onCancel,
  modelName = '',
  selectedRowKeys = [],
  size = 15,
  onCheck = EmptyFn,
  onChange = EmptyFn,
}) {
  const chunks = _.chunk(fields, size);
  const [fieldChunks, setFieldChunks] = useState(_.map(chunks, () => []));

  return (
    <Modal
      visible
      width={500 * chunks.length + 200}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      title={<div>{modelName}</div>}
      bodyStyle={{
        background: '#dddddd',
      }}
      onCancel={onCancel}
    >
      <div
        style={{
          paddingRight: 10,
          display: 'flex',
        }}
      >
        {_.map(chunks, (chunk, index) => (
          <Table
            key={index}
            style={{
              minWidth: 500,
              margin: 5,
            }}
            pagination={{
              pageSize: size,
              hideOnSinglePage: true,
            }}
            columns={[
              {
                title: '关键词标签',
                dataIndex: 'labelName',
              },
              {
                title: '关键词值',
                dataIndex: 'typeId',
              },
              {
                title: '分类',
                dataIndex: 'typename',
              },
              {
                title: '一表受理模型',
                dataIndex: 'modelName',
                render: () => <span>{modelName}</span>,
              },
            ]}
            rowKey="descriptionId"
            size="small"
            dataSource={chunk}
            rowSelection={{
              selectedRowKeys,
              onChange: rowKeys => {
                fieldChunks[index] = rowKeys;
                setFieldChunks([...fieldChunks]);
                onCheck(_.concat(...fieldChunks));
              },
            }}
            bordered
          />
        ))}
      </div>
    </Modal>
  );
}

export default BigFieldBox;
