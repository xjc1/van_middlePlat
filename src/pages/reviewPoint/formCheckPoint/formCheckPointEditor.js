import React from 'react';
import { Form, Input, Modal, Space, Button } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import { EmptyFn } from '@/components/tis_ui';

function FormCheckPointEditor({
  handleAdd = EmptyFn,
  handleEdit = EmptyFn,
  onCancel = EmptyFn,
  item,
}) {
  const [formRef] = Form.useForm();
  const { record, readonly = true } = item;

  return (
    <Modal
      title="申请条件"
      visible
      width="60%"
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          {!readonly && (
            <Button
              type="primary"
              onClick={() => {
                formRef.validateFields().then(vals => {
                  if (record.id) {
                    handleEdit({
                      ...vals,
                      id: record.id,
                    });
                  } else {
                    handleAdd(vals);
                  }
                });
              }}
            >
              确定
            </Button>
          )}
        </Space>
      }
    >
      <Form form={formRef} initialValues={record}>
        <Form.Item
          label="表单名称"
          name="name"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '申请条件类型必须设置!' }]}
        >
          <Input allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item label="表单类型" name="type" labelCol={{ span: 8 }}>
          <DictSelect dict="SYBDLX" disabled={readonly} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormCheckPointEditor;
