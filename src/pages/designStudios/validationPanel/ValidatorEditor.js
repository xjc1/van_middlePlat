import React from 'react';
import { Form, Input, Modal, Radio } from 'antd';
import { oneFormValidateType } from '@/utils/constantEnum';
import { EmptyFn, FormRules, CodeEditor } from '@/components/tis_ui';
import InterfaceSelect from '../components/InterfaceSelect';

console.log('-> InterfaceSelect2222', InterfaceSelect);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ValidatorEditor({ formData, onOk = EmptyFn, onFormDataChange }) {
  const [editorForm] = Form.useForm();

  return (
    <Modal
      title="编辑校验器"
      width="50%"
      visible
      maskClosable={false}
      onOk={() => {
        editorForm.validateFields().then(vals => {
          const { regexp, type, fx, ...others } = vals;
          onOk({
            type,
            rule: type === oneFormValidateType.regexp ? regexp : fx,
            ...others,
          });
        });
      }}
      onCancel={() => {
        onFormDataChange();
      }}
    >
      <Form
        {...layout}
        form={editorForm}
        initialValues={formData}
        onValuesChange={vals => {
          onFormDataChange({ ...formData, ...vals });
        }}
      >
        <Form.Item name="name" label="名称" rules={[FormRules.required('必填')]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item name="prompt" label="错误提示" rules={[FormRules.required('必填')]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item name="type" label="校验类型">
          <Radio.Group>
            <Radio value={oneFormValidateType.regexp}>{oneFormValidateType.$names.regexp}</Radio>
            <Radio value={oneFormValidateType.method}>{oneFormValidateType.$names.method}</Radio>
            <Radio value={oneFormValidateType.api}>{oneFormValidateType.$names.api}</Radio>
          </Radio.Group>
        </Form.Item>
        {formData.type === oneFormValidateType.regexp && (
          <Form.Item name="regexp" label="正则表达式" rules={[FormRules.required('必填')]}>
            <Input allowClear placeholder="/abc/" />
          </Form.Item>
        )}
        {formData.type === oneFormValidateType.method && (
          <Form.Item name="fx" label="函数校验" rules={[FormRules.required('必填')]}>
            <CodeEditor name="METHOD_VALIDATE" style={{ flex: 1 }} />
          </Form.Item>
        )}
        {formData.type === oneFormValidateType.api && (
          <InterfaceSelect fields={[{ name: 'responseField', label: '取值', type: 'boolean' }]} />
        )}
      </Form>
    </Modal>
  );
}

export default ValidatorEditor;
