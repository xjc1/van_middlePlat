import React from 'react';
import { Input, message } from 'antd';
import { EmptyFn, FormRules, ModalForm, TButton, TItem, TSelect } from '@/components/tis_ui';
import { commonAuditState } from '@/utils/constantEnum';
import { PORTRAIT } from '@/services/api';

function ReviewModalForm({ elementId = '', onClose = EmptyFn, onOk = EmptyFn, ...others }) {
  let formRef = null;

  function handleSubmit() {
    formRef.current.validateFields().then((values = {}) => {
      const { status, comments } = values;
      if (status === commonAuditState.audited) {
        passAudit(comments);
      } else {
        refuseAudit(comments);
      }
    });
  }

  function passAudit(comments = '') {
    PORTRAIT.reviewPassUsingPOST({ body: { elementId, comments } })
      .then(() => {
        message.success('成功通过审核');
        onOk();
      })
      .catch(e => {
        message.error(`通过审核失败，${e.msg}`);
      });
  }

  function refuseAudit(comments = '') {
    PORTRAIT.reviewRefuseUsingPOST({ body: { elementId, comments } })
      .then(() => {
        message.success('成功驳回审核');
        onOk();
      })
      .catch(e => {
        message.error(`驳回审核失败，${e.msg}`);
      });
  }

  return (
    <ModalForm
      title="审核"
      visible
      onForm={form => {
        formRef = form;
      }}
      handleCancel={onClose}
      footer={
        <>
          <TButton.Button onClick={onClose}>取消</TButton.Button>
          <TButton.Button type="primary" onClick={handleSubmit}>
            提交
          </TButton.Button>
        </>
      }
      {...others}
    >
      <TItem name="stage" label="阶段">
        <Input disabled />
      </TItem>
      <TItem name="status" label="审核状态" rules={[FormRules.required('必填')]}>
        <TSelect>
          <TSelect.Option value={commonAuditState.audited}>通过</TSelect.Option>
          <TSelect.Option value={commonAuditState.refused}>驳回</TSelect.Option>
        </TSelect>
      </TItem>
      <TItem name="comments" label="审核意见">
        <Input.TextArea />
      </TItem>
    </ModalForm>
  );
}

export default ReviewModalForm;
