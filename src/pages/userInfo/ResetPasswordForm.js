import React from 'react';
import { EmptyFn, FormRules as Rules, TItem } from "@/components/tis_ui";
import { Button, Form, Input, message, Row } from "antd";
import { configUsed } from "@/utils/constantEnum";

function ResetPasswordForm({
                             onForm = EmptyFn,
                             loginValidation,
                             onSubmit = EmptyFn,
                             handleCancel = EmptyFn,
                             hasFooter = true,
                           }) {
  const [formRef] = Form.useForm();

  function onSubmitForm() {
    onSubmit(formRef);
  }

  onForm(formRef);

  return (
    <div>
      <Form form={formRef} onFinish={onSubmitForm}>
        <TItem name="oldPassword" label="原始密码" rules={[Rules.required('原始密码必填')]}>
          <Input type="password" />
        </TItem>
        <TItem
          name="newPassword"
          label="新密码"
          rules={[
            Rules.required('新密码必填'),
            // eslint-disable-next-line eqeqeq
            (loginValidation == configUsed.yes) && Rules.pwd(),
          ]}
        >
          <Input type="password" />
        </TItem>
        <TItem
          name="confirmPassword"
          label="确认新密码"
          rules={[Rules.required('确认密码必填')]}
        >
          <Input type="password" />
        </TItem>
        {
          hasFooter &&
          <Row>
            <TItem labelCol={{ span: 0 }}
                   style={{ textAlign: 'center' }}>
              <Button size="large" type="primary" htmlType="submit">
                提交
              </Button>
              <Button
                size="large"
                onClick={handleCancel}
                style={{
                  marginLeft: 8,
                }}
              >关闭</Button>
            </TItem>
          </Row>
        }
      </Form>
    </div>
  );
}

export default ResetPasswordForm;
