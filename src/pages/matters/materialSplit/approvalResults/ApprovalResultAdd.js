import React, { PureComponent } from 'react';
import _ from 'lodash';
import { EmptyFn, FormRules, ModalForm, TItem } from '@/components/tis_ui';
import { Input } from 'antd';
import { TSearchSelector, FileUpload } from '@/components/bussinessComponents';

class ApprovalResultAdd extends PureComponent {
  formRef = null;

  render() {
    const { selectedResult, onCancel = EmptyFn, onSave = EmptyFn } = this.props;
    return (
      <ModalForm
        onForm={formRef => {
          this.formRef = formRef;
        }}
        visible
        onOk={() => {
          this.formRef.current.validateFields().then(vals => {
            const { standardMaterialId = {}, file = [], ...others } = vals;
            const [filePath, fileName] = file;
            onSave({
              ...others,
              clienName: fileName,
              clienType: filePath && _.split(filePath, '.').pop(),
              clienst: filePath,
              standardMaterialId: standardMaterialId.value,
            });
          });
        }}
        onCancel={onCancel}
        initialValues={selectedResult}
        title="拆解审批结果材料"
      >
        <TItem name="standardMaterialId" label="关联标准材料" rules={[FormRules.required('必填')]}>
          <TSearchSelector type="standard_material" mode="single" />
        </TItem>
        <TItem name="name" label="审批结果名称" rules={[FormRules.required('必填')]}>
          <Input />
        </TItem>
        <TItem name="sdfs" label="送达方式">
          <Input />
        </TItem>
        <TItem name="sdqx" label="送达期限">
          <Input />
        </TItem>
        <TItem name="resultType" label="审批结果类型">
          <Input />
        </TItem>
        <TItem name="file" label="送达样本">
          <FileUpload download allowClear />
        </TItem>
      </ModalForm>
    );
  }
}

export default ApprovalResultAdd;
