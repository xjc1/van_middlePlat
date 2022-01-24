import { FormRules, TItem } from '@/components/tis_ui';
import AddSourceName from '@/pages/portraitTags/EditPortraitTag/compontents/assSourceName';
import React, { useState } from 'react';
import AddSynonyms from '@/pages/portraitTags/EditPortraitTag/compontents/addSynonyms';
import AddThreeType from '@/pages/portraitTags/EditPortraitTag/compontents/addThreeType';
import {
  appUserType,
  conditionObject,
  conditionType,
  portraitLogicType,
  tableManageTableType,
} from '@/utils/constantEnum';
import { Checkbox, Input, Row, Select } from 'antd';
import _ from 'lodash';
import emptyFn from '@/utils/EmptyFn';
import ConditionSelector from '@/pages/portraitTags/EditPortraitTag/compontents/ConditionSelector';
import FunSelect from '@/pages/portraitTags/EditPortraitTag/compontents/funSelect';
import { FunctionConfigTree, FuncSchemaInput } from '@/components/bussinessComponents';
import UpdateCycle from '@/pages/portraitTags/EditPortraitTag/compontents/UpdateCycle';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function ExpandInfo({
  editVisible,
  formRef,
  resetCheckFun = emptyFn,
  changeLogicDesc = emptyFn,
  resetCheckValue = emptyFn,
  logicDesc,
  recordId,
  initSchema = [],
  object = appUserType.self,
  logicType = portraitLogicType.none,
  funcTableType,
  realtime = 0,
}) {
  const [objectType, setObjectType] = useState(object);
  const [logType, setLogType] = useState(logicType);
  const [tableType, setTableType] = useState(funcTableType);
  const [formSchema, setFormSchema] = useState(initSchema);
  const [realtimeJudgment, setRealtimeJudgment] = useState(realtime);
  const functionMethod = {
    clear: () => {},
  };
  // eslint-disable-next-line consistent-return
  const renderCondition = (type, judgeType, currentTableType) => {
    let result = '';
    if (judgeType === portraitLogicType.role) {
      result = (
        <TItem {...layout} name="conditionId" label="判断规则">
          <ConditionSelector
            changeLogicDesc={changeLogicDesc}
            showSearch
            key={`condition_${type}_${judgeType}`}
            disabled={!editVisible}
            optionFilterProp="label"
            object={
              appUserType.legalPerson === type ? conditionObject.legal : conditionObject.personal
            }
            type={conditionType.define}
            placeholder="请选择个人限定条件"
          />
        </TItem>
      );
    } else if (judgeType === portraitLogicType.function) {
      result = (
        <TItem
          {...layout}
          name={['relatedFunction', 'functionId']}
          label="函数配置"
          rules={[FormRules.required('必填')]}
          tip="请先选择库表类型"
        >
          <FunSelect
            changeLogicDesc={changeLogicDesc}
            type={type}
            tableType={currentTableType}
            key={`fun_${type}_${currentTableType}`}
            setFormSchema={setFormSchema}
            resetCheckValue={resetCheckValue}
            disabled={!editVisible || String(currentTableType) === 'undefined'}
          />
        </TItem>
      );
    }
    return result;
  };
  return (
    <>
      <TItem name="object" label="标签对象" rules={[FormRules.required('必填')]} {...layout}>
        <Select
          allowClear
          disabled={recordId}
          placeholder="请选择对象类型"
          onSelect={value => {
            functionMethod.clear();
            setObjectType(value);
            resetCheckFun();
            setFormSchema([]);
            changeLogicDesc('');
          }}
        >
          {_.map(appUserType, (v, k) => (
            <Select.Option key={k} value={v} label={appUserType.$names[k]}>
              {appUserType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="synonymInfos" label="标签同义词" {...layout}>
        <AddSynonyms editVisible={editVisible} formRef={formRef} />
      </TItem>
      <TItem name="sourceName" label="标签来源名称" {...layout}>
        <AddSourceName editVisible={editVisible} />
      </TItem>
      <TItem name="threeLevels" label="关联内容分类" {...layout}>
        <AddThreeType key={`${objectType}_threeLevels`} disabled={!editVisible} type={objectType} />
      </TItem>
      <Row>
        <TItem
          col={16}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          name="logicType"
          label="判断类型"
        >
          <Select
            allowClear
            disabled={!editVisible}
            placeholder="请选择"
            onChange={val => {
              setLogType(val);
              resetCheckFun();
              setFormSchema([]);
              changeLogicDesc('');
            }}
          >
            {_.map(portraitLogicType, (v, k) => (
              <Select.Option key={k} value={v} label={portraitLogicType.$names[k]}>
                {portraitLogicType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>

        <TItem col={6} labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} {...layout} name="useType">
          <Checkbox
            disabled={!editVisible}
            checked={realtimeJudgment}
            onChange={({ target }) => {
              // 更新表单数据
              formRef.setFieldsValue({ useType: Number(target.checked) });
              setRealtimeJudgment(target.checked);
            }}
          >
            实时判断
          </Checkbox>
        </TItem>
      </Row>
      {[portraitLogicType.function, portraitLogicType.multiLevel].includes(logType) && (
        <TItem name="tableType" label="库表类型" {...layout} rules={[FormRules.required('必填')]}>
          <Select
            disabled={!editVisible}
            onChange={val => {
              formRef.setFields([{ name: ['complexFunction'], value: undefined }]);
              resetCheckFun();
              setFormSchema([]);
              changeLogicDesc('');
              setTableType(val);
            }}
          >
            {_.map(tableManageTableType, (v, k) => (
              <Select.Option key={k} value={v}>
                {tableManageTableType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      )}
      {renderCondition(objectType, logType, tableType)}
      {logType === portraitLogicType.function && (
        <FuncSchemaInput
          parentName={['relatedFunction']}
          schema={formSchema}
          formLayout={layout}
          disabled={!editVisible}
        />
      )}

      {[portraitLogicType.function, portraitLogicType.multiLevel, portraitLogicType.role].includes(
        logType,
      ) && (
        <TItem {...layout} label="判断逻辑描述">
          <Input.TextArea value={logicDesc} disabled autoSize />
        </TItem>
      )}
      {logType === portraitLogicType.multiLevel && (
        <TItem
          name="complexFunction"
          {...layout}
          label="函数多级配置"
          rules={[FormRules.required('必填')]}
          tip="请先选择库表类型"
        >
          <FunctionConfigTree
            tableType={tableType}
            key={`complexFunction_${tableType}`}
            bindMethod={({ clear }) => {
              functionMethod.clear = clear;
            }}
            userType={objectType}
            disabled={!editVisible || String(tableType) === 'undefined'}
          />
        </TItem>
      )}
      {[portraitLogicType.function, portraitLogicType.multiLevel].includes(logType) && (
        <TItem
          name="updateCycle"
          {...layout}
          label="更新周期"
          required
          rules={[
            () => ({
              validator(rule, value) {
                const { value: dayValue, type } = value;
                if (!dayValue || !type) {
                  return Promise.reject(new Error('请选择更新周期'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <UpdateCycle disabled={!editVisible} />
        </TItem>
      )}
    </>
  );
}

export default ExpandInfo;
