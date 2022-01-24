import React from 'react';
import { Input, Button, InputNumber, notification } from 'antd';
import { EmptyFn, FormRules, ModalForm, TItem } from '@/components/tis_ui';
import { UploadImageUseFs } from '@/components/bussinessComponents';
import { CORE, EXPRESSIONS } from '@/services/api';

function Index({ title = '', info = {}, handleClose = EmptyFn, disabled }) {
  let formRef = null;
  const { icon = {}, staticIcon = {} } = info;
  const iconField = icon.url || icon.name ? [icon.url, icon.name] : [];
  const staticIconField =
    staticIcon.url || staticIcon.name ? [staticIcon.url, staticIcon.name] : [];

  const initialValues = {
    ...info,
    icon: iconField,
    staticIcon: staticIconField,
  };

  const footer = [
    <Button key="cancel" onClick={handleClose}>
      取消
    </Button>,
    <Button key="submit" type="primary" onClick={handleSubmit}>
      提交
    </Button>,
  ];

  function handleSubmit() {
    formRef.current.validateFields().then((values = {}) => {
      const { icon: nextIcon = [], staticIcon: nextStaticIcon = [] } = values;
      const [url, name] = nextIcon;
      const [staticIconUrl, staticIconName] = nextStaticIcon;
      const newInfo = {
        ...values,
        icon: { url, name },
        staticIcon: { url: staticIconUrl, name: staticIconName },
      };
      if (info.id) handleUpdate({ ...info, ...newInfo });
      else handleCreate(newInfo);
    });
  }

  function handleCreate(value) {
    CORE.createExpressionUsingPOST({ body: value })
      .then(() => {
        handleClose();
        notification.success({
          message: '成功新增',
        });
      })
      .catch(() => {
        notification.error({
          message: '新增失败',
        });
      });
  }

  function handleUpdate(nextInfo = {}) {
    EXPRESSIONS.updateExpressionUsingPOST({ body: nextInfo })
      .then(() => {
        handleClose();
        notification.success({
          message: '成功更新',
        });
      })
      .catch(() => {
        notification.error({
          message: '更新失败',
        });
      });
  }

  return (
    <ModalForm
      title={title}
      visible
      onForm={form => {
        formRef = form;
      }}
      onCancel={handleClose}
      initialValues={initialValues}
      hideRequiredMark={disabled}
      width="45%"
      footer={disabled ? footer.slice(0, 1) : footer}
    >
      <TItem name="name" label="表情名称" rules={[FormRules.required('必填')]}>
        <Input disabled={disabled} maxLength={5} />
      </TItem>
      <TItem name="alias" label="表情标识" rules={[FormRules.required('必填')]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="icon" label="上传表情" rules={[FormRules.required('必传')]}>
        <UploadImageUseFs />
      </TItem>
      <TItem name="staticIcon" label="静态图标" rules={[FormRules.required('必传')]}>
        <UploadImageUseFs />
      </TItem>
      <TItem name="sort" label="排序">
        <InputNumber min={0} disabled={disabled} />
      </TItem>
    </ModalForm>
  );
}

export default Index;
