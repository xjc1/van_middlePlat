import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { TButton } from '@/components/tis_ui';
import Styles from './index.less';
import { CloseOutlined } from '@ant-design/icons';
import InterfaceFieldSelect from '@/pages/designStudios/components/InterfaceFieldSelect';

function PreEvent({ onEventsChange, onCloseEvent, formData, eid }) {
  const [formRef] = Form.useForm();
  const { ctxField = [] } = formData;
  return (
    <div className={Styles.preEvent}>
      <Form
        form={formRef}
        initialValues={formData}
        onValuesChange={() => {
          onEventsChange({ ...formRef.getFieldsValue(), id: eid });
        }}
      >
        <InterfaceFieldSelect ctxField={ctxField} />
      </Form>
      <Button.Group className={Styles.preEventOperate}>
        <TButton.Button
          type="primary"
          confirmText="确定要删除此API配置吗?"
          danger
          icon={<CloseOutlined />}
          onClick={() => onCloseEvent(eid)}
          size="small"
        />
      </Button.Group>
    </div>
  );
}

export default PreEvent;
