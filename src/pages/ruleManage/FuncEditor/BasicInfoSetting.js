import React, { Fragment } from 'react';
import { Input, Select } from 'antd';
import { FormCard, FormRules as Rules, TItem } from '@/components/tis_ui';
import _ from 'lodash';
import { appUserType, tableManageTableType } from '@/utils/constantEnum';
import TagTable from '@/pages/ruleManage/ruleForm/tagTable';

const { Option } = Select;

function BasicInfoSetting({ isCheck = false, isCustomFun = false, formRef }) {
  return (
    <Fragment>
      <FormCard title="函数基本信息" style={{ border: 'unset' }}>
        <TItem
          name="type"
          label="对象类型"
          rules={[Rules.required('对象类型必须选择')]}
          tip="只有自定义函数才能修改对象类型"
        >
          <Select
            onChange={() => {
              formRef.setFieldsValue({ func: [], useFields: [] });
            }}
            disabled={isCheck || !isCustomFun}
            allowClear
          >
            {_.map(appUserType, (v, k) => (
              <Option value={v} key={k}>
                {appUserType.$names[k]}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem name="tableType" label="库表类型" rules={[Rules.required('库表类型必须选择')]}>
          <Select
            onChange={() => {
              formRef.setFieldsValue({ func: [], useFields: [] });
            }}
            disabled={isCheck}
          >
            {_.map(tableManageTableType, (v, k) => (
              <Select.Option key={k} value={v}>
                {tableManageTableType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="cname" label="规则名称" rules={[Rules.required('规则名称必须填写')]}>
          <Input disabled={isCheck} />
        </TItem>
        <TItem name="portraitTags" label="关联标签">
          <TagTable disabled={isCheck} />
        </TItem>
        <TItem name="description" label="规则描述">
          <Input disabled={isCheck} />
        </TItem>
      </FormCard>
    </Fragment>
  );
}

export default BasicInfoSetting;
