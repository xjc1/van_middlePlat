import React from 'react';
import { Form, Input, Modal } from 'antd';
import { DictSelect, FileUpload, MatterMultiTable } from '@/components/bussinessComponents';
import { EmptyFn, TFormList, TItem } from '@/components/tis_ui';

function ApplyConditionEditor({
                                handleAdd = EmptyFn,
                                handleEdit = EmptyFn,
                                setSelectedItem,
                                item,
                              }) {
  const [formRef] = Form.useForm();
  const { record, readonly = true } = item;

  return (
    <Modal
      title="申请条件"
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
          label="申请条件类型"
          name="type"
          labelCol={{ span: 8 }}
          rules={[{ required: true, message: '申请条件类型必须设置!' }]}
        >
          <DictSelect dict="SYSQTJ" disabled={readonly} />
        </Form.Item>
        <Form.Item label="申请条件审查要点" name="checkName" labelCol={{ span: 8 }}>
          <Input allowClear disabled={readonly} />
        </Form.Item>
        <Form.Item label="申请条件规则说明" name="checkRule" labelCol={{ span: 8 }}>
          <Input.TextArea allowClear disabled={readonly} />
        </Form.Item>
        <TFormList
          addText="审查要点材料样例"
          name="checkExample"
          labelCol={{ span: 8 }}
          disabled={readonly}
        >
          {({ isFirst, isSingle, name, ...others }) => {
            return (
              <TItem
                {...others}
                name={name}
                label={isFirst && '审查要点材料样例'}
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
        <Form.Item label="判断结果规则描述" name="checkTip" labelCol={{ span: 8 }}>
          <Input.TextArea allowClear disabled={readonly} />
        </Form.Item>
        <TItem name="preMatter" label="前置事项" labelCol={{ span: 8 }}>
          <MatterMultiTable showHeader disabled={readonly} />
        </TItem>
        <Form.Item label="提示内容" name="tip" labelCol={{ span: 8 }}>
          <Input.TextArea allowClear disabled={readonly} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ApplyConditionEditor;
