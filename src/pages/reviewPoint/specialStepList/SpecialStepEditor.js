import React from 'react';
import { Form, Input, Modal } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import { EmptyFn } from '@/components/tis_ui';

function SpecialStepEditor({ handleAdd = EmptyFn, handleEdit = EmptyFn, setSelectedItem, item }) {
  const [formRef] = Form.useForm();
  const { record = {}, readonly = true } = item;

  return (
    <Modal
      title="特别程序"
      visible
      width="50%"
      onOk={() => {
        formRef.validateFields().then(vals => {
          if (record.id) {
            handleEdit(record.id, vals);
          } else {
            handleAdd(vals);
          }
        });
      }}
      onCancel={() => {
        setSelectedItem(null);
      }}
    >
      <Form form={formRef} initialValues={record}>
        <Form.Item
          label="特别程序类型"
          name="type"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '特别程序类型必须设置!' }]}
        >
          <DictSelect dict="SYTBCX" disabled={readonly} />
        </Form.Item>
        <Form.Item label="特别程序审查要点" name="checkPoint" labelCol={{ span: 8 }}>
          <Input.TextArea allowClear disabled={readonly} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SpecialStepEditor;
