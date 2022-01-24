import React from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { FileUpload, DictSelect } from '@/components/bussinessComponents';
import { EmptyFn, TFormList, TItem, RichText } from '@/components/tis_ui';

function FormCheckChildEditor({
  handleAdd = EmptyFn,
  handleEdit = EmptyFn,
  onCancel = EmptyFn,
  item,
}) {
  const [formRef] = Form.useForm();
  const { record, readonly = true } = item;

  return (
    <Modal
      title="申请表单项"
      visible
      width="60%"
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          {!readonly && (
            <Button
              type="primary"
              onClick={() => {
                formRef.validateFields().then(vals => {
                  if (record.id) {
                    handleEdit(vals);
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
      onCancel={onCancel}
    >
      <Form form={formRef} initialValues={record}>
        <Form.Item
          label="表单项名称"
          name="itemName"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '标准材料简称必须设置!' }]}
        >
          <Input allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="主体"
          name="entity"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '具体可证明材料必须设置!' }]}
        >
          <DictSelect dict="SYBDZT" disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="表单项审查要点"
          name="point"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料类型必须设置!' }]}
        >
          <Input.TextArea allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="审查要点规则说明"
          name="rule"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料形式必须设置!' }]}
        >
          <Input.TextArea allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="常见错误"
          name="commonMistake"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料份数必须设置!' }]}
        >
          <RichText contentStyle={{ height: 200 }} base64 readOnly={readonly} />
        </Form.Item>
        <TFormList
          addText="添加审查要点图例"
          name="example"
          labelCol={{ span: 8 }}
          disabled={readonly}
        >
          {({ isFirst, isSingle, name, ...others }) => {
            return (
              <TItem
                {...others}
                name={name}
                label={isFirst && '审查要点图例'}
                wrapperCol={!isFirst && { offset: 8 }}
              >
                <FileUpload
                  fileTypeList={['jpg', 'png', 'jpge']}
                  download
                  allowClear
                  disabled={readonly}
                />
              </TItem>
            );
          }}
        </TFormList>
      </Form>
    </Modal>
  );
}

export default FormCheckChildEditor;
