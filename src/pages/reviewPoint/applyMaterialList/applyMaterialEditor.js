import React from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';
import { FileUpload, DictSelect } from '@/components/bussinessComponents';
import { EmptyFn, TFormList, TItem } from '@/components/tis_ui';

function ApplyMaterialEditor({ handleAdd = EmptyFn, handleEdit = EmptyFn, setSelectedItem, item }) {
  const [formRef] = Form.useForm();
  const { record, readonly = true } = item;

  return (
    <Modal
      title="申请材料"
      visible
      width="60%"
      onOk={() => {
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
      onCancel={() => {
        setSelectedItem(null);
      }}
    >
      <Form form={formRef} initialValues={record}>
        <Form.Item
          label="标准材料简称"
          name="stdName"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '标准材料简称必须设置!' }]}
        >
          <Input allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="具体可证明材料"
          name="name"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '具体可证明材料必须设置!' }]}
        >
          <Input allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="材料类型"
          name="type"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料类型必须设置!' }]}
        >
          <DictSelect dict="SYCLLX" disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="材料形式"
          name="form"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料形式必须设置!' }]}
        >
          <DictSelect dict="SYCLXS" disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="材料份数"
          name="copiesNumber"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料份数必须设置!' }]}
        >
          <InputNumber min={0} disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="收件必要性"
          name="necessity"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料份数必须设置!' }]}
        >
          <DictSelect dict="SYBYX" disabled={readonly} />
        </Form.Item>
        <Form.Item label="材料格式" name="format" labelCol={{ span: 8 }}>
          <DictSelect dict="SYCLGS" disabled={readonly} />
        </Form.Item>
        <Form.Item label="字体格式" name="fontFormat" labelCol={{ span: 8 }}>
          <DictSelect dict="SYZTGS" disabled={readonly} />
        </Form.Item>
        <Form.Item label="背景色" name="backgroundColor" labelCol={{ span: 8 }}>
          <Input allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="材料持有主体"
          name="entity"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料持有主体必须设置!' }]}
        >
          <DictSelect dict="SYCLZT" disabled={readonly} />
        </Form.Item>
        <Form.Item
          label="材料页数"
          name="pageTotal"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '材料页数必须设置!' }]}
        >
          <InputNumber min={1} disabled={readonly} />
        </Form.Item>
        <Form.Item label="每页审查要点" name="point" labelCol={{ span: 8 }}>
          <Input.TextArea allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item label="审查要点规则说明" name="rule" labelCol={{ span: 8 }}>
          <Input.TextArea allowClear disabled={readonly} />
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
        <Form.Item label="提示内容" name="tip" labelCol={{ span: 8 }}>
          <Input.TextArea allowClear disabled={readonly} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ApplyMaterialEditor;
