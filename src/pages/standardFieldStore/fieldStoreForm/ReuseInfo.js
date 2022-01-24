import React, { useState, useEffect } from 'react';
import { TItem, TSelect } from '@/components/tis_ui';
import { Input, Radio } from 'antd';
import { tableManageMultipleValues } from '@/utils/constantEnum';
import _ from 'lodash';
import { METHODSCHEMAS, PORTRAIT } from '@/services/api';
import { FuncSchemaInput } from '@/components/bussinessComponents';

function ReuseInfo({ formRef, disabled = false, layout = {} }) {
  const [tableData, setTableDate] = useState([]);
  const [fieldsData, setFieldsData] = useState([]);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [valueFunctions, setValueFunctions] = useState([]);
  const [functionSchema, setFunctionSchema] = useState([]);

  useEffect(() => {
    METHODSCHEMAS.findPreHandleMethodSchemaUsingGET().then(types => {
      const initType = formRef.getFieldValue(['useField', 'fieldDesc', 'type']);
      const initValueFnId = formRef.getFieldValue([
        'useField',
        'fieldDesc',
        'relatedFunction',
        'functionId',
      ]);
      const { children: initValueFunctions = [] } = types.find(({ key }) => key === initType) || {};
      const { schema: initFnSchema } =
        initValueFunctions.find(({ id }) => id === initValueFnId) || {};
      setFunctionSchema(initFnSchema);
      setValueFunctions(initValueFunctions);
      setFieldTypes(types);
    });
    PORTRAIT.getUsingTableListUsingGET({}).then(setTableDate);
  }, []);

  function handleSelectTableData(nextSelected = '') {
    const selectedTableData = tableData.find(({ enName }) => enName === nextSelected);
    const { tableSchema = '[]', fullName } = selectedTableData;
    formRef.setFieldsValue({ useField: { tableName: fullName } });
    try {
      const nextFieldsData = JSON.parse(tableSchema);
      setFieldsData(nextFieldsData);
    } catch (e) {
      setFieldsData([]);
    }
  }

  function handleFieldTypeChange(nextType = '') {
    const { children = [] } = fieldTypes.find(({ key }) => key === nextType) || {};
    setValueFunctions(children);
    formRef.setFieldsValue({
      useField: { fieldDesc: { relatedFunction: { functionId: undefined } } },
    });
    handleFunctionIdChange();
  }

  function handleFunctionIdChange(nextFnId = '') {
    const { schema } = valueFunctions.find(({ id }) => id === nextFnId) || {};
    setFunctionSchema(schema);
    formRef.setFieldsValue({
      useField: { fieldDesc: { relatedFunction: { values: undefined } } },
    });
  }

  return (
    <>
      <TItem name={['useField', 'tableAlias']} label="表别名" {...layout}>
        <TSelect
          onChange={handleSelectTableData}
          options={tableData.map(({ enName }) => ({ label: enName, value: enName }))}
          disabled={disabled}
        />
      </TItem>
      <TItem name={['useField', 'tableName']} label="表全名" {...layout}>
        <Input disabled />
      </TItem>
      <TItem name={['useField', 'field']} label="字段名" {...layout}>
        <TSelect
          options={fieldsData.map(({ field }) => ({ label: field, value: field }))}
          disabled={disabled}
        />
      </TItem>
      <TItem name={['useField', 'fieldDesc', 'type']} label="格式" {...layout}>
        <Radio.Group
          options={_.map(fieldTypes, type => ({
            label: type.name,
            value: type.key,
          }))}
          onChange={e => handleFieldTypeChange(e.target.value)}
          disabled={disabled}
        />
      </TItem>
      <TItem
        name={['useField', 'fieldDesc', 'relatedFunction', 'functionId']}
        label="取值"
        {...layout}
      >
        <TSelect
          onChange={handleFunctionIdChange}
          options={_.map(valueFunctions, way => ({
            label: way.cname,
            value: way.id,
          }))}
          disabled={disabled || valueFunctions.length === 0}
        />
      </TItem>
      {functionSchema && (
        <FuncSchemaInput
          parentName={['useField', 'fieldDesc', 'relatedFunction']}
          schema={functionSchema}
          formLayout={layout}
        />
      )}
      <TItem name={['useField', 'fieldDesc', 'dataFormat']} label="多条数据取值" {...layout}>
        <Radio.Group
          options={_.map(tableManageMultipleValues.$v_names, (v, k) => ({
            label: v,
            value: k,
          }))}
          disabled={disabled}
        />
      </TItem>
    </>
  );
}

export default ReuseInfo;
