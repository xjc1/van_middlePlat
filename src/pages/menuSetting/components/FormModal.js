import React from 'react';
import { Button, message } from 'antd';
import { ModalForm, EmptyFn } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import MenuForm from './MenuForm';
import router from '@/utils/tRouter';

function FormModal({
  title,
  initialValues = {},
  handleCancel = EmptyFn,
  onFinish = EmptyFn,
  disabled,
  menuTree = [],
  isFromTag = false,
}) {
  let form = null;
  const onSubmit = () => {
    const { id } = initialValues;
    form.current.validateFields().then(values => {
      onFinish(values, id);
    });
  };

  const copyParent = async () => {
    const parentId = form.current.getFieldValue('parentId');
    if (!parentId) {
      message.error('请选择上级菜单');
      return;
    }
    const parentDetail = await KERNEL.getSpaceMenuUsingGET(parentId);
    const { objectType, clientType, regions } = parentDetail;
    form.current.setFieldsValue({ objectType, clientType, regions });
  };

  return (
    <ModalForm
      onForm={formRef => {
        form = formRef;
      }}
      initialValues={initialValues}
      visible
      title={title}
      maskClosable={false}
      handleCancel={handleCancel}
      width="50%"
      footer={
        <div>
          <Button onClick={handleCancel}>取消</Button>
          {!disabled && (
            <Button type="primary" onClick={onSubmit}>
              提交
            </Button>
          )}
          {isFromTag && (
            <Button type="primary" onClick={() => router.goBack()}>
              返回标签
            </Button>
          )}
        </div>
      }
    >
      <MenuForm copyParent={copyParent} menuTree={menuTree} disabled={disabled} />
    </ModalForm>
  );
}

export default FormModal;
