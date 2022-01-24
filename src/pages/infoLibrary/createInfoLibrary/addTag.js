import React, { useState } from 'react';
import { Button, Col, Row, Table, Space } from 'antd';
import _ from 'lodash';
import { TItem } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import styles from '../infoLibrary.less';
import EditPopover from './formPopver';

const defaultPageSize = 4;

function AddTag({
  value = [],
  onChange = EmptyFn,
  columns = [],
  headClass,
  head = <div />,
  inputItem = <div />,
  title,
  placement,
  extra = <div />,
}) {
  const [data, setData] = useState(value);

  function handleChangeTags(vals) {
    setData(vals);
    onChange(vals);
  }

  return (
    <Row>
      <Col
        span={24}
        style={{
          marginBottom: 10,
        }}
        className={headClass}
      >
        {head}
        <EditPopover
          placement={placement}
          inputItem={inputItem}
          title={title}
          onFinish={(vals, form) => {
            handleChangeTags([...data, vals]);
            form.resetFields();
          }}
        >
          <Button type="primary">添加</Button>
        </EditPopover>
        {extra}
      </Col>
      <Col span={24}>
        <Table
          bordered
          rowKey={({ id, name }) => id || name}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            ...columns,
            {
              title: '操作',
              align: 'center',
              width: 150,
              render: (text, record, index) => (
                <Space>
                  <EditPopover
                    title="编辑字段信息"
                    placement="leftBottom"
                    inputItem={inputItem}
                    initialValues={record}
                    onFinish={it => {
                      const newData = [...data];
                      newData[index] = it;
                      handleChangeTags(newData);
                    }}
                  >
                    <a>编辑</a>
                  </EditPopover>
                  <a
                    style={{ color: '#ff7875' }}
                    onClick={() => {
                      handleChangeTags(data.filter((item, ind) => ind !== index));
                    }}
                  >
                    删除
                  </a>
                </Space>
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
