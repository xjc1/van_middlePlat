import React from 'react';
import { Input } from 'antd';
import { ModalForm, TItem, TSelect, FormRules, TButton } from '@/components/tis_ui';
import { RESOLVEMATERIAL } from '@/services/api';
import _ from 'lodash';
import { materialAuditStatus } from '@/utils/constantEnum';

function AuditModal(props) {
  const { onCancel, initialValues, title, auditModalType = 'normal', reload } = props;
  const full = auditModalType === 'normal';
  let form = null;

  const handleSubmit = () => {
    form.current.validateFields().then(async vals => {
      await RESOLVEMATERIAL.editResolveMaterialAuditStatusUsingPOST({
        body: {
          id: initialValues.id,
          ...vals,
        },
      });
      onCancel();
      reload({});
    });
  };
  return (
    <ModalForm
      onForm={formRef => {
        form = formRef;
      }}
      initialValues={initialValues}
      title={title}
      visible
      footer={
        <>
          <TButton.Button onClick={onCancel}>取消</TButton.Button>
          {full && (
            <TButton.Button type="primary" onClick={handleSubmit}>
              提交
            </TButton.Button>
          )}
        </>
      }
      onCancel={onCancel}
    >
      {full && (
        <TItem name="auditState" label="审核状态" rules={[FormRules.required('审核状态必填')]}>
          <TSelect>
            {_.map(_.omit(materialAuditStatus, 'all'), (v, k) => (
              <TSelect.Option key={k} value={v} label={materialAuditStatus.$names[k]}>
                {materialAuditStatus.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      )}

      <TItem name="advise" label="审核意见">
        <Input.TextArea autoSize disabled={!full} />
      </TItem>

      {full && (
        <TItem name="auditTime" label="审核时间">
          <Input disabled />
        </TItem>
      )}
    </ModalForm>
  );
}

export default AuditModal;
