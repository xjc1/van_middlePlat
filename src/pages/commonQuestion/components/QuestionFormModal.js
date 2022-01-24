import React from 'react';
import { ModalForm, TButton } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import QuestionForm from '../questionForm';

function FormModal(props) {
  const {
    initData,
    handleCancel = EmptyFn,
    handelSubmit = EmptyFn,
    editVisible,
    title = '新增常用问句',
  } = props;
  let createForm = null;
  return (
    <ModalForm
      onForm={form => {
        createForm = form;
      }}
      visible
      title={title}
      maskClosable={false}
      handleCancel={handleCancel}
      initialValues={initData}
      footer={
        <>
          <TButton.Button onClick={handleCancel}>取消</TButton.Button>
          {editVisible && (
            <TButton.Button
              type="primary"
              ghost={false}
              onClick={() => {
                createForm.current.validateFields().then(vals => {
                  const { id } = initData || {};
                  handelSubmit(vals,id);
                });
              }}
            >
              提交
            </TButton.Button>
          )}
        </>
      }
    >
      <QuestionForm editVisible={editVisible} />
    </ModalForm>
  );
}

export default FormModal;
