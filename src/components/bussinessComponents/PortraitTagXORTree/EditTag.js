// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { ModalForm, EmptyFn, TItem, FormRules, TButton } from '@/components/tis_ui';
import PortraitTagDrawerSelect from '../PortraitTagDrawerSelect'


function EditTag({
  title = '编辑',
  handleCancel = EmptyFn,
  onFinish = EmptyFn,
  objectType,
  initialValues
}) {
  let form = null;
  const addCondition = () => {
    form.current.validateFields().then(values => {
      const { tagInfo } = values;
      onFinish(tagInfo);
    });
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
        <>
          <TButton.Button onClick={handleCancel}>取消</TButton.Button>
          <TButton.Button
            type="primary"
            onClick={() => {
      
                addCondition();
            }}
          >
            确定
          </TButton.Button>
        </>
      }
    >
        <TItem name="tagInfo" label="对应标签" rules={[FormRules.required('必填')]}>
        <PortraitTagDrawerSelect
            type={objectType}
            key={objectType}
          />
        </TItem>
    </ModalForm>
  );
}

export default EditTag;
