import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Row,
  Table,
  Select,
  Modal,
  Form,
  Input,
  message,
  Typography,
  Tooltip,
  Divider,
} from 'antd';
import { ModalForm, TItem } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

const defaultPageSize = 4;

function AddCompare({ value = [], onChange = EmptyFn, disabled = false }) {
  const [visible, setVisible] = useState(false);

  let compareForm = null;

  const handledValue = value.map((item, index) => ({ key: index, ...item }));

  useEffect(() => {
    if (value.length > 0) {
      onChange(handledValue);
    }
  }, []);

  function handleCancel() {
    setVisible(false);
    compareForm.current.resetFields();
  }

  function handleSubmit() {
    compareForm.current.validateFields().then(vals => {
      onChange([...handledValue, { ...vals, key: handledValue.length + 1 }]);
      compareForm.current.resetFields();
      setVisible(false);
    });
  }

  return (
    <Row>
      <Col span={24}>
        {!disabled && (
          <Button type="primary" onClick={() => setVisible(true)}>
            添加
          </Button>
        )}
        <ModalForm
          onForm={form => {
            compareForm = form;
          }}
          title="添加对比项"
          visible={visible}
          onCancel={handleCancel}
          onOk={handleSubmit}
          width="45%"
        >
          <TItem name="compareItem" label="便捷对比项">
            <Input />
          </TItem>
          <TItem name="single" label="分开办">
            <Input />
          </TItem>
          <TItem name="union" label="一件办">
            <Input />
          </TItem>
        </ModalForm>
      </Col>
      <Col  span={24}>
        <Table
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '便捷对比项',
              dataIndex: 'compareItem',
              width: '25%',
              render: compareItem => (
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                    ellipsis: true,
                  }}
                >
                  <Tooltip title={compareItem}>{compareItem}</Tooltip>
                </Typography.Paragraph>
              ),
            },
            {
              title: '分开办',
              dataIndex: 'single',
            },
            {
              title: '一件办',
              dataIndex: 'union',
              width: '30%',
              render: union => (
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                    ellipsis: true,
                  }}
                >
                  <Tooltip title={union}>{union}</Tooltip>
                </Typography.Paragraph>
              ),
            },
            {
              title: '操作',
              align: 'center',
              width: 120,
              render: (text, record) => (
                <span style={{ display: disabled ? 'none' : 'block' }}>
                  <a
                    onClick={() => {
                      onChange(_.filter(handledValue, ({ key }) => key !== record.key));
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    删除
                  </a>
                </span>
              ),
            },
          ]}
          dataSource={handledValue}
          size="small"
          rowKey="key"
        />
      </Col>
    </Row>
  );
}

export default AddCompare;
