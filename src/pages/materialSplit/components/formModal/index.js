import React, { PureComponent } from 'react';
import { Input, InputNumber, message } from 'antd';
import { ModalForm, TItem, TSelect, FormRules, TButton } from '@/components/tis_ui';
import {
  FileUpload,
  RelationCert,
  MatterMultiTable,
  ScenceMultiTable,
  TSearchSelector,
} from '@/components/bussinessComponents';
import { RESOLVEMATERIAL } from '@/services/api';
import _ from 'lodash';
import { materialSource as materialSourceConst } from '@/utils/constantEnum';
import { connect } from 'dva';

@connect(({ materialSplit }) => materialSplit)
class SplitMaterialAdd extends PureComponent {
  form = null;

  onChangeNum = 0;

  handleSubmit = () => {
    const { initialValues = {}, onCancel, reload } = this.props;
    const { id } = initialValues;
    this.form.current
      .validateFields()
      .then(
        async ({
                 customExample = [],
                 customEmpty = [],
                 examinePoint = [],
                 matterCode = [],
                 policyWords = [],
                 preScences = [],
                 matterId = {},
                 ...others
               }) => {
          const [customExamplePath, customExampleName] = customExample;
          const [customEmptyPath, customEmptyName] = customEmpty;
          const [examinePointPath, examinePointName] = examinePoint;
          const body = {
            matterId: matterId.value,
            customExample: customExamplePath,
            customExampleName,
            customEmpty: customEmptyPath,
            customEmptyName,
            examinePoint: examinePointPath,
            examinePointName,
            matterCode: _.map(matterCode, ({ value }) => value),
            policyWords: _.map(policyWords, ({ value }) => value),
            preScences: _.map(preScences, ({ value }) => value),
            ...others,
          };
          if (id) {
            await RESOLVEMATERIAL.updateResolveMaterialUsingPOST({ body: { ...body, id } });
          } else {
            await RESOLVEMATERIAL.addResolveMaterialUsingPOST({ body });
          }
          message.success('????????????');
          onCancel();
          reload({});
        },
      );
  };

  render() {
    const {
      initialValues = {},
      onCancel,
      title,
      originMaterial = [],
      disabled = true,
    } = this.props;
    return (
      <ModalForm
        onForm={form => {
          this.form = form;
        }}
        initialValues={initialValues}
        title={title}
        visible
        footer={
          <>
            <TButton.Button onClick={onCancel}>??????</TButton.Button>
            {!disabled && (
              <TButton.Button type="primary" onClick={this.handleSubmit}>
                ??????
              </TButton.Button>
            )}
          </>
        }
        onCancel={onCancel}
      >
        <TItem name="name" label="????????????" rules={[FormRules.required('??????????????????')]}>
          <Input disabled={disabled} />
        </TItem>
        <TItem
          name="matterId"
          label="????????????"
          rules={[FormRules.required('??????????????????????????????')]}
        >
          <TSearchSelector
            mode={null}
            disabled={disabled}
            type="matter"
            onChange={(val = {}) => {
              const { value } = val;
              const { dispatch } = this.props;
              if (this.onChangeNum > 0) {
                this.form.current.setFieldsValue({ parentId: undefined });
              }
              this.onChangeNum = this.onChangeNum + 1;
              if (value) {
                dispatch({
                  type: 'materialSplit/getOriginMaterial',
                  payload: {
                    id: value,
                  },
                });
              }
            }}
          />
        </TItem>
        <TItem
          name="parentId"
          label="??????????????????"
          rules={[FormRules.required('??????????????????????????????')]}
        >
          <TSelect disabled={disabled} showSearch optionFilterProp="label">
            {_.map(originMaterial, ({ id, name, condition }) => (
              <TSelect.Option key={id} value={id} label={name} title={`${name}_${condition}`}>
                {name}_{condition}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="fromWhere" label="????????????">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="materialFormat" label="????????????">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="action" label="????????????">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="format" label="????????????">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="sort" label="??????">
          <InputNumber disabled={disabled} min={1} />
        </TItem>
        <TItem name="detail" label="????????????">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="materialSource" label="????????????">
          <TSelect disabled={disabled}>
            {_.map(materialSourceConst, (v, k) => (
              <TSelect.Option key={k} value={v} label={materialSourceConst.$names[k]}>
                {materialSourceConst.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="originalNumber" label="????????????">
          <InputNumber disabled={disabled} min={1} />
        </TItem>
        <TItem name="memo" label="??????">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="linkedCert" label="????????????">
          <RelationCert disabled={disabled} />
        </TItem>
        <TItem name="customExample" label="????????????">
          <FileUpload disabled={disabled} download base64 allowClear />
        </TItem>
        <TItem name="customEmpty" label="????????????">
          <FileUpload disabled={disabled} download base64 allowClear />
        </TItem>
        <TItem name="result" label="??????">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="needDesc" label="????????????">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="matterCode" label="????????????">
          <MatterMultiTable disabled={disabled} showHeader />
        </TItem>
        <TItem name="policyWords" label="????????????">
          <TSearchSelector disabled={disabled} type="policyWords" />
        </TItem>
        <TItem name="preScences" label="????????????">
          <ScenceMultiTable disabled={disabled} showHeader />
        </TItem>
        <TItem name="examinePoint" label="??????????????????">
          <FileUpload
            fileTypeList={['doc', 'docx', 'xls', 'xlsx', 'pdf', 'ppt', 'pptx', 'txt', 'jpg']}
            disabled={disabled}
            download
            base64
            allowClear
          />
        </TItem>
      </ModalForm>
    );
  }
}

export default SplitMaterialAdd;
