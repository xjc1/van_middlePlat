import React, { useEffect, useState } from 'react';
import { CodeEditor, FormRules, TItem, TSelect } from '@/components/tis_ui';
import { Input } from 'antd';
import _ from 'lodash';
import { connect } from 'dva';
import { standardFieldDataType } from '@/utils/constantEnum';

function BasicInfo({ categories = [], initDataType, disabled = false, layout = {}, dispatch }) {
  const [dataType, setDataType] = useState(initDataType);

  useEffect(() => {
    dispatch({
      type: 'standardFieldStore/fetchCategory',
    });
  }, []);

  return (
    <>
      <TItem name="name" label="字段名称" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="code" label="字段编码" {...layout}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="dataType" label="数据类型" rules={[FormRules.required('必填')]} {...layout}>
        <TSelect onChange={setDataType} disabled={disabled}>
          {_.map(standardFieldDataType, (key, value) => (
            <TSelect.Option key={key} value={key}>
              {standardFieldDataType.$names[value]}
            </TSelect.Option>
          ))}
        </TSelect>
      </TItem>
      {_.includes(
        [standardFieldDataType.dictRadio, standardFieldDataType.dictCheckbox],
        dataType,
      ) && (
        <TItem
          name="dictJson"
          label="字典JSON"
          rules={[FormRules.required('必填'), FormRules.json()]}
          {...layout}
        >
          <CodeEditor mode="json" height="300px" disabled={disabled} />
        </TItem>
      )}
      <TItem name="classification" label="字段分类" {...layout}>
        <TSelect showSearch optionLabelProp="label" disabled={disabled}>
          {_.map(categories, ({ id, name }) => (
            <TSelect.Option key={id} value={name} label={name}>
              {name}
            </TSelect.Option>
          ))}
        </TSelect>
      </TItem>
    </>
  );
}

export default connect(({ standardFieldStore }) => ({
  categories: standardFieldStore.categorys,
}))(BasicInfo);
