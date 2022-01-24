import React, { PureComponent } from 'react';
import { Row, Input, Select, InputNumber } from 'antd';
import { FormRules, ModalForm, TItem } from '@/components/tis_ui';
import _ from 'lodash';
import { commonYesNo } from '@/utils/constantEnum';
import { connect } from 'dva';
import { adaptText } from '@/utils/AdaptiveHelper';

@connect(({ split }) => split)
class OriginalMaterialAdd extends PureComponent {
  form = null;

  render() {
    const { material = {}, title, dispatch, onCancel } = this.props;
    const isCreate = !material.id;
    const text = isCreate ? `创建${title}` : `编辑${title}`;
    return (
      <ModalForm
        onForm={form => {
          this.form = form;
        }}
        initialValues={material}
        title={adaptText(text)}
        visible
        onOk={() => {
          const {
            matter: { id },
          } = this.props;
          this.form.current.validateFields().then(vals => {
            if (isCreate) {
              dispatch({
                type: 'split/addMaterial',
                payload: {
                  matterId: id,
                  ...vals,
                },
              });
            } else {
              dispatch({
                type: 'split/updateMaterial',
                payload: {
                  matterId: id,
                  id: material.id,
                  ...vals,
                },
              });
            }
            onCancel();
          });
        }}
        onCancel={onCancel}
      >
        <Row>
          <TItem name="name" label="材料名称" rules={[FormRules.required('必须选择一个原始材料')]}>
            <Input />
          </TItem>
          <TItem name="materialGuid" label="材料GUID">
            <Input />
          </TItem>
          <TItem name="materialFormat" label="材料类型">
            <Input />
          </TItem>
          <TItem name="condition" label="材料情形">
            <Input />
          </TItem>
          <TItem name="fromWhere" label="材料出处">
            <Input />
          </TItem>
          <TItem name="detail" label="详细要求">
            <Input />
          </TItem>
          <TItem name="format" label="材料格式">
            <Input />
          </TItem>
          <TItem name="need" label="必要性">
            <Input />
          </TItem>
          <TItem name="needDesc" label="必要性描述">
            <Input />
          </TItem>
          <TItem name="downloadUrl" label="下载地址">
            <Input />
          </TItem>
          <TItem name="emptyUrl" label="空表下载地址">
            <Input />
          </TItem>
          <TItem name="memo" label="备注">
            <Input />
          </TItem>
          <TItem name="formStandard" label="形式标准">
            <Input />
          </TItem>
          <TItem name="sourceDesc" label="来源渠道说明">
            <Input />
          </TItem>
          <TItem name="submission" label="提交方式">
            <Input />
          </TItem>
          <TItem name="sheetName" label="表格名称">
            <Input />
          </TItem>
          <TItem name="copyNumber" label="复印件份数">
            <InputNumber />
          </TItem>
          <TItem name="originalNumber" label="原件份数">
            <InputNumber />
          </TItem>
          <TItem name="paperMaterialNum" label="纸质材料份数">
            <InputNumber />
          </TItem>
          <TItem name="materialApply" label="是否为申请表">
            <Select>
              {_.map(commonYesNo, (v, k) => (
                <Select.Option key={k} value={v} label={commonYesNo.$names[k]}>
                  {commonYesNo.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        </Row>
      </ModalForm>
    );
  }
}

export default OriginalMaterialAdd;
