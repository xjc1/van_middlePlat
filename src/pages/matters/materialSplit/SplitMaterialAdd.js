import React, { PureComponent } from 'react';
import { Input, InputNumber, Button } from 'antd';
import { ModalForm, TItem, TSelect, FormRules } from '@/components/tis_ui';
import {
  FileUpload,
  RelationCert,
  MatterMultiTable,
  ScenceMultiTable,
  TSearchSelector,
  DictSelect,
} from '@/components/bussinessComponents';
import _ from 'lodash';
import { materialSource as materialSourceConst } from '@/utils/constantEnum';
import { connect } from 'dva';

function changeMaterial({
                          examinePoint,
                          examinePointName,
                          customEmpty,
                          customEmptyName,
                          customExample,
                          customExampleName,
                          materialSource,
                          standardMaterialId,
                          ...others
                        }) {
  return {
    examinePoint: [examinePoint, examinePointName],
    customEmpty: [customEmpty, customEmptyName],
    customExample: [customExample, customExampleName],
    materialSource: materialSource ? parseInt(materialSource, 10) : materialSource,
    standardMaterialId: [standardMaterialId],
    ...others,
  };
}

@connect(({ split }) => split)
class SplitMaterialAdd extends PureComponent {
  form = null;

  render() {
    const { material = {}, onCancel, title, dispatch, orginalMaterial = [] } = this.props;
    const isCreate = !material.id;
    const text = isCreate ? `创建${title}` : `编辑${title}`;
    return (
      <ModalForm
        onForm={form => {
          this.form = form;
        }}
        initialValues={changeMaterial(material)}
        title={text}
        visible
        onOk={() => {
          const {
            matter: { id },
          } = this.props;
          this.form.current
            .validateFields()
            .then(
              ({
                 customExample = [],
                 customEmpty = [],
                 examinePoint = [],
                 matterCode = [],
                 policyWords = [],
                 preScences = [],
                 standardMaterialId = {},
                 ...others
               }) => {
                const [customExamplePath, customExampleName] = customExample;
                const [customEmptyPath, customEmptyName] = customEmpty;
                const [examinePointPath, examinePointName] = examinePoint;
                const body = {
                  matterId: id,
                  customExample: customExamplePath,
                  customExampleName,
                  customEmpty: customEmptyPath,
                  customEmptyName,
                  examinePoint: examinePointPath,
                  examinePointName,
                  matterCode: _.map(matterCode, ({ value }) => value),
                  policyWords: _.map(policyWords, ({ value }) => value),
                  preScences: _.map(preScences, ({ value }) => value),
                  standardMaterialId: standardMaterialId.value,
                  ...others,
                };
                if (isCreate) {
                  dispatch({
                    type: 'split/addResolveMaterial',
                    payload: {
                      matterId: id,
                      ...body,
                    },
                  });
                } else {
                  dispatch({
                    type: 'split/updateResolveMaterial',
                    payload: {
                      matterId: id,
                      id: material.id,
                      ...body,
                    },
                  });
                }
                onCancel();
              },
            );
        }}
        onCancel={onCancel}
      >
        <TItem name="standardMaterialId" label="关联标准材料">
          <TSearchSelector type="standard_material" mode="single" />
        </TItem>
        <div style={{ textAlign: 'center' }}>
          <Button
            type="link"
            onClick={() => {
              const standardMaterialIds = this.form.current.getFieldValue('standardMaterialId');
              const standardMaterialId = _.isArray(standardMaterialIds)
                ? _.head(standardMaterialIds)
                : standardMaterialIds;
              if (standardMaterialId && standardMaterialId.label) {
                this.form.current.setFieldsValue({ name: standardMaterialId.label });
              }
            }}
          >
            设置关联标准材料名称为材料名称
          </Button>
        </div>
        <TItem name="name" label="材料名称" rules={[FormRules.required('必须选择一个原始材料')]}>
          <Input />
        </TItem>
        <TItem name="materialSubject" label="材料主体">
          <DictSelect
            dict="SYCLZT"
            rootDict="SYCLZT"
            dictType="tree"
            showSearch
            treeNodeFilterProp="title"
          />
        </TItem>
        <TItem name="fromWhere" label="材料出处">
          <Input />
        </TItem>
        <TItem name="materialFormat" label="材料类型">
          <Input />
        </TItem>
        <TItem name="action" label="材料条件">
          <Input />
        </TItem>
        <TItem name="format" label="材料格式">
          <Input />
        </TItem>
        <TItem name="sort" label="排序">
          <InputNumber min={1} />
        </TItem>
        <TItem name="detail" label="详细要求">
          <Input />
        </TItem>
        <TItem name="materialSource" label="材料来源">
          <TSelect>
            {_.map(materialSourceConst, (v, k) => (
              <TSelect.Option key={k} value={v} label={materialSourceConst.$names[k]}>
                {materialSourceConst.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="originalNumber" label="材料份数">
          <InputNumber min={1} />
        </TItem>
        <TItem name="memo" label="备注">
          <Input />
        </TItem>
        <TItem name="exemptForm" label="免交形式">
          <DictSelect dict="MJXS" />
        </TItem>
        <TItem name="linkedCert" label="关联证照">
          <RelationCert />
        </TItem>
        <TItem name="customExample" label="样表文件">
          <FileUpload download base64 allowClear />
        </TItem>
        <TItem name="customEmpty" label="空表文件">
          <FileUpload download base64 allowClear />
        </TItem>
        <TItem name="result" label="结果">
          <Input />
        </TItem>
        <TItem name="needDesc" label="收件要点">
          <Input />
        </TItem>
        <TItem
          name="parentId"
          label="对应原始材料"
          rules={[FormRules.required('必须选择一个原始材料')]}
        >
          <TSelect showSearch optionFilterProp="label">
            {_.map(orginalMaterial, ({ id, name, condition }) => (
              <TSelect.Option key={id} value={id} label={name} title={`${name}_${condition}`}>
                {name}_{condition}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="matterCode" label="前置事项">
          <MatterMultiTable showHeader />
        </TItem>
        <TItem name="policyWords" label="百科词条">
          <TSearchSelector type="policyWords" />
        </TItem>
        <TItem name="preScences" label="前置主题">
          <ScenceMultiTable showHeader />
        </TItem>
        <TItem name="examinePoint" label="审查要点文件">
          <FileUpload
            fileTypeList={['doc', 'docx', 'xls', 'xlsx', 'pdf', 'ppt', 'pptx', 'txt', 'jpg']}
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
