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
          message.success('提交成功');
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
            <TButton.Button onClick={onCancel}>取消</TButton.Button>
            {!disabled && (
              <TButton.Button type="primary" onClick={this.handleSubmit}>
                提交
              </TButton.Button>
            )}
          </>
        }
        onCancel={onCancel}
      >
        <TItem name="name" label="材料名称" rules={[FormRules.required('材料名称必填')]}>
          <Input disabled={disabled} />
        </TItem>
        <TItem
          name="matterId"
          label="对应事项"
          rules={[FormRules.required('必须选择一个对应事项')]}
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
          label="对应原始材料"
          rules={[FormRules.required('必须选择一个原始材料')]}
        >
          <TSelect disabled={disabled} showSearch optionFilterProp="label">
            {_.map(originMaterial, ({ id, name, condition }) => (
              <TSelect.Option key={id} value={id} label={name} title={`${name}_${condition}`}>
                {name}_{condition}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="fromWhere" label="材料出处">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="materialFormat" label="材料类型">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="action" label="材料条件">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="format" label="材料格式">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="sort" label="排序">
          <InputNumber disabled={disabled} min={1} />
        </TItem>
        <TItem name="detail" label="详细要求">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="materialSource" label="材料来源">
          <TSelect disabled={disabled}>
            {_.map(materialSourceConst, (v, k) => (
              <TSelect.Option key={k} value={v} label={materialSourceConst.$names[k]}>
                {materialSourceConst.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="originalNumber" label="材料份数">
          <InputNumber disabled={disabled} min={1} />
        </TItem>
        <TItem name="memo" label="备注">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="linkedCert" label="关联证照">
          <RelationCert disabled={disabled} />
        </TItem>
        <TItem name="customExample" label="样表文件">
          <FileUpload disabled={disabled} download base64 allowClear />
        </TItem>
        <TItem name="customEmpty" label="空表文件">
          <FileUpload disabled={disabled} download base64 allowClear />
        </TItem>
        <TItem name="result" label="结果">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="needDesc" label="收件要点">
          <Input disabled={disabled} />
        </TItem>
        <TItem name="matterCode" label="前置事项">
          <MatterMultiTable disabled={disabled} showHeader />
        </TItem>
        <TItem name="policyWords" label="百科词条">
          <TSearchSelector disabled={disabled} type="policyWords" />
        </TItem>
        <TItem name="preScences" label="前置主题">
          <ScenceMultiTable disabled={disabled} showHeader />
        </TItem>
        <TItem name="examinePoint" label="审查要点文件">
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
