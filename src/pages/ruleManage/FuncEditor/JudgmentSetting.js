import React, { Fragment } from 'react';
import { Input, Select } from 'antd';
import { FunctionConfigTree } from '@/components/bussinessComponents/index';
import { FormCard, FormRules as Rules, TItem } from '@/components/tis_ui';
import JudgeFieldForm from '@/pages/ruleManage/FuncEditor/JudgeFieldForm';
import { METHODSCHEMAS } from '@/services/api';
import _ from 'lodash';
import { appUserType } from '@/utils/constantEnum';

async function getBaseMethodList() {
  const allMethod = await METHODSCHEMAS.findBaseMethodSchemaUsingGET({});
  return _.map(allMethod, ({ id, cname, description, ...others }) => ({
    ...others,
    label: cname,
    value: id,
    key: id,
    description,
    id,
  }));
}

function JudgmentSetting({ isCheck, useField, objectType = appUserType.self, tableType }) {
  return (
    <Fragment>
      <FormCard title="函数判断规则" style={{ border: 'unset' }}>
        <TItem name="useFields" label="判断字段" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <JudgeFieldForm isCheck={isCheck} objectType={objectType} tableType={tableType} />
        </TItem>
        <TItem name="func" label="判断规则">
          <FunctionConfigTree
            isRequire={false}
            disabled={isCheck}
            userType={objectType}
            getMethods={getBaseMethodList}
            extraFormItems={
              <>
                <TItem
                  name="useField"
                  label="字段选择"
                  rules={[Rules.required('必须选择一个字段')]}
                >
                  <Select>
                    {useField.map(({ name, tableAlias, field, key }) => (
                      <Select.Option value={key} key={key}>
                        {name}_{tableAlias}_{field}
                      </Select.Option>
                    ))}
                  </Select>
                </TItem>
                <TItem name="name" label="参数提示名称">
                  <Input />
                </TItem>
              </>
            }
          />
        </TItem>
      </FormCard>
    </Fragment>
  );
}

export default JudgmentSetting;
