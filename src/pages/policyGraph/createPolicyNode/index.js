import React from 'react';
import { Modal, Form, Row, Button, Space } from 'antd';
import PolicyNameInput from './PolicyNameInput';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';

function Index({ onCancel = EmptyFn, onSubmit = EmptyFn, focusItem }) {
  const [formRef] = Form.useForm();

  return (
    <Modal
      title="新增政策节点"
      visible
      destroyOnClose
      width={800}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button
            type="primary"
            onClick={() => {
              formRef.validateFields().then(values => {
                const { policyInfo = {}, idLinked, ...others } = values;
                onSubmit({
                  ...policyInfo,
                  ...others,
                  policyId: focusItem.id,
                });
              });
            }}
          >
            确定
          </Button>
        </Space>
      }
      onCancel={onCancel}
    >
      <Form form={formRef}>
        <Row>
          <TItem name="policyInfo" label="政策名称" rules={[FormRules.required('必填')]}>
            <PolicyNameInput />
          </TItem>
          <TItem label="关联政策">
            <span>{focusItem?.name}</span>
          </TItem>
          <TItem name="relationType" label="关系类型">
            <DictSelect dict="TPGXLX" />
          </TItem>
        </Row>
      </Form>
    </Modal>
  );
}

export default Index;
