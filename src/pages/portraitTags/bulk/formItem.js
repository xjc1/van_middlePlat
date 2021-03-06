/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  appUserType,
  portraitLogicType,
  conditionObject,
  conditionType,
} from '@/utils/constantEnum';
import { FormRules, TButton, TItem } from '@/components/tis_ui';
import { Card, Select, Row, Input, DatePicker, Checkbox } from 'antd';
import _ from 'lodash';
import { METHODSCHEMAS } from '@/services/api';
import { DictSelect, FuncSchemaInput } from '@/components/bussinessComponents';
import AddSynonyms from '@/pages/portraitTags/EditPortraitTag/compontents/addSynonyms';
import AddSourceName from '@/pages/portraitTags/EditPortraitTag/compontents/assSourceName';
import AddThreeType from '@/pages/portraitTags/EditPortraitTag/compontents/addThreeType';
import DisplayPositionSelector from '@/pages/portraitTags/EditPortraitTag/compontents/displayPositionSelector';
import FunSelect from '@/pages/portraitTags/EditPortraitTag/compontents/funSelect';
import ConditionSelector from '@/pages/portraitTags/EditPortraitTag/compontents/ConditionSelector';

import style from './bulkForm.less';

const format = 'YYYY-MM-DD HH:mm:ss';

function FormItem({ item, data, setData, layout, index, form, recover, onDelete }) {
  const [formSchema, setFormSchema] = useState();
  const [logicDesc, setLogicDesc] = useState();
  const [objectType, setObjectType] = useState(item.object);
  const [useType, setUseType] = useState(item.useType);

  function resetCheckFun() {
    form.setFields([
      { name: [item.uuid, 'relatedFunction', 'values'], value: undefined },
      { name: [item.uuid, 'relatedFunction', 'functionId'], value: undefined },
    ]);
    setFormSchema();
  }

  function resetCheckValue() {
    form.setFields([{ name: [item.uuid, 'relatedFunction', 'values'], value: undefined }]);
  }

  function handelCheck(status) {
    form.setFields([{ name: [item.uuid, 'useType'], value: Number(status) }]);
    setUseType(status);
  }

  useEffect(() => {
    initFun();
  }, []);

  async function initFun() {
    const functionId = _.get(item, 'relatedFunction.functionId');
    if (functionId) {
      const {
        schema,
        cname,
        id: funId,
        description,
      } = await METHODSCHEMAS.findMethodSchemaByIdUsingGET(functionId);

      const initFunctionLabel = { label: cname, value: functionId, key: funId };
      const temp = data[index];
      const relatedFunction = _.get(temp, 'relatedFunction');
      form.setFields([
        {
          name: [item.uuid, 'relatedFunction'],
          value: { ...relatedFunction, functionId: initFunctionLabel },
        },
      ]);
      setFormSchema(schema);
      setLogicDesc(description);
    }
  }

  // eslint-disable-next-line consistent-return
  const renderCondition = (type, judgeType) => {
    if (judgeType === portraitLogicType.role) {
      switch (type) {
        case appUserType.self:
          return (
            <TItem {...layout} name={[item.uuid, 'conditionId']} label="????????????">
              <ConditionSelector
                changeLogicDesc={setLogicDesc}
                showSearch
                key="personal"
                // mode="multiple"
                optionFilterProp="label"
                object={conditionObject.personal}
                type={conditionType.define}
                placeholder="???????????????????????????"
              />
            </TItem>
          );
        case appUserType.legalPerson:
          console.log('????????????????????????2');

          return (
            <TItem {...layout} name={[item.uuid, 'conditionId']} label="????????????">
              <ConditionSelector
                changeLogicDesc={setLogicDesc}
                showSearch
                key="legal"
                optionFilterProp="label"
                object={conditionObject.legal}
                type={conditionType.define}
                placeholder="???????????????????????????"
              />
            </TItem>
          );
        default:
          return (
            <TItem {...layout} name={[item.uuid, 'conditionId']} label="????????????">
              <ConditionSelector
                changeLogicDesc={setLogicDesc}
                showSearch
                key="personal"
                optionFilterProp="label"
                object={conditionObject.personal}
                type={conditionType.define}
                placeholder="???????????????????????????"
              />
            </TItem>
          );
      }
    } else if (judgeType === portraitLogicType.function) {
      switch (type) {
        case appUserType.self:
          return (
            <TItem
              {...layout}
              name={[item.uuid, 'relatedFunction', 'functionId']}
              label="????????????"
              rules={[FormRules.required('??????')]}
            >
              <FunSelect
                changeLogicDesc={setLogicDesc}
                type={appUserType.self}
                key="siglePerson"
                setFormSchema={setFormSchema}
                resetCheckValue={resetCheckValue}
              />
            </TItem>
          );
        case appUserType.legalPerson:
          return (
            <TItem
              {...layout}
              name={[item.uuid, 'relatedFunction', 'functionId']}
              label="????????????"
              rules={[FormRules.required('??????')]}
            >
              <FunSelect
                changeLogicDesc={setLogicDesc}
                type={appUserType.legalPerson}
                key="legalPerson"
                setFormSchema={setFormSchema}
                resetCheckValue={resetCheckValue}
              />
            </TItem>
          );
        default:
          return (
            <TItem
              {...layout}
              name={[item.uuid, 'relatedFunction', 'functionId']}
              label="????????????"
              rules={[FormRules.required('??????')]}
            >
              <FunSelect
                changeLogicDesc={setLogicDesc}
                type={appUserType.self}
                key="singlePerson"
                setFormSchema={setFormSchema}
                resetCheckValue={resetCheckValue}
              />
            </TItem>
          );
      }
    }
  };
  return (
    <Card key={`${item.uuid}_card`} bordered className={style.hoverStyle}>
      <div style={{ width: 100, margin: 'auto', marginBottom: 20 }}>
        {item.isOpen ? (
          <TButton.Button
            type="primary"
            onClick={() => {
              data[index]['isOpen'] = false;
              setData([...data]);
            }}
          >
            ??????
          </TButton.Button>
        ) : (
          <TButton.Button
            onClick={() => {
              data[index]['isOpen'] = true;
              setData([...data]);
            }}
          >
            ??????
          </TButton.Button>
        )}
      </div>
      <div style={{ display: item.isOpen && 'none' }}>
        <TItem
          name={[item.uuid, 'object']}
          label="????????????"
          rules={[FormRules.required('??????????????????')]}
          {...layout}
        >
          <Select
            allowClear
            disabled={item.disabled}
            onSelect={value => {
              setObjectType(value);
              resetCheckFun();
            }}
          >
            {_.map(_.omit(appUserType, 'selfAndLegalPerson'), (v, k) => (
              <Select.Option key={k} value={v} label={appUserType.$names[k]}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem
          name={[item.uuid, 'category']}
          label="????????????"
          rules={[FormRules.required('??????????????????')]}
          {...layout}
        >
          <Input placeholder="?????????????????????" disabled={item.disabled} />
        </TItem>
        <TItem
          name={[item.uuid, 'name']}
          label="????????????"
          rules={[FormRules.required('??????????????????')]}
          {...layout}
        >
          <Input placeholder="?????????????????????" disabled={item.disabled} />
        </TItem>
        <Row>
          <TItem
            name={[item.uuid, 'expireTimeType']}
            label="???????????????"
            col={12}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
          >
            <Select allowClear placeholder="????????????????????????" disabled={item.disabled}>
              <Select.Option key={1} value={1} label="????????????">
                ????????????
              </Select.Option>
              <Select.Option key={2} value={2} label="??????????????????">
                ??????????????????
              </Select.Option>
            </Select>
          </TItem>
          {item.expireTime && (
            <TItem
              name={[item.uuid, 'expireTime']}
              col={12}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 16 }}
            >
              <DatePicker
                style={{ width: '100%' }}
                format={format}
                showTime
                disabled={item.disabled}
              />
            </TItem>
          )}
        </Row>
        <TItem name={[item.uuid, 'regions']} label="??????????????????" {...layout}>
          <DictSelect
            multiple
            showSearch
            allowClear
            treeNodeFilterProp="title"
            dictType="tree"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="SH00XZQH"
            disabled={item.disabled}
          />
        </TItem>
        <TItem name={[item.uuid, 'shareDept']} label="????????????" {...layout}>
          <DictSelect
            multiple
            showSearch
            allowClear
            treeNodeFilterProp="title"
            dictType="tree"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="SHSSBMSH"
            disabled={item.disabled}
          />
        </TItem>
        <Row>
          <TItem
            col={16}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15 }}
            name={[item.uuid, 'logicType']}
            rules={[FormRules.required('??????????????????')]}
            label="????????????"
          >
            <Select
              disabled={item.disabled}
              placeholder="?????????"
              onChange={() => {
                resetCheckFun();
                setFormSchema([]);
                setLogicDesc('');
              }}
            >
              {_.map(portraitLogicType, (v, k) => (
                <Select.Option key={k} value={v} label={portraitLogicType.$names[k]}>
                  {portraitLogicType.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>

          <TItem
            col={6}
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            {...layout}
            name={[item.uuid, 'useType']}
          >
            <Checkbox
              disabled={item.disabled}
              checked={useType}
              onChange={({ target }) => {
                handelCheck(Number(target.checked));
              }}
            >
              ????????????
            </Checkbox>
          </TItem>
        </Row>
        {renderCondition(objectType, item.logicType)}
        <FuncSchemaInput
          parentName={[item.uuid, 'relatedFunction']}
          schema={formSchema}
          formLayout={layout}
        />
        <TItem {...layout} label="??????????????????">
          <Input.TextArea value={logicDesc} disabled autoSize />
        </TItem>
        <TItem name={[item.uuid, 'synonymInfos']} label="???????????????" {...layout}>
          <AddSynonyms formRef={form} editVisible={!item.disabled} />
        </TItem>
        <TItem name={[item.uuid, 'sourceName']} label="??????????????????" {...layout}>
          <AddSourceName editVisible={!item.disabled} />
        </TItem>
        <TItem name={[item.uuid, 'threeLevels']} label="??????????????????" {...layout}>
          <AddThreeType disabled={item.disabled} />
        </TItem>
        <TItem name={[item.uuid, 'displayPosition']} label="????????????" {...layout}>
          <DisplayPositionSelector editVisible={!item.disabled} />
        </TItem>

        <div style={{ width: 100, margin: 'auto' }}>
          {item.disabled ? (
            <TButton.Button type="primary" onClick={() => recover(item, index)}>
              ??????
            </TButton.Button>
          ) : (
            <TButton.Delete onClick={() => onDelete(item, index)}>??????</TButton.Delete>
          )}
        </div>
      </div>
    </Card>
  );
}

export default FormItem;
