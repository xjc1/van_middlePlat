import React, { useEffect, useState } from 'react';
import { TSelect } from '@/components/tis_ui';
import emptyFn from '@/utils/EmptyFn';
import _ from 'lodash';
import { useDebounceFn } from 'ahooks';
import { CORE } from '@/services/api';

function FunSelect({
  value,
  onChange,
  tableType,
  setFormSchema = emptyFn,
  disabled,
  resetCheckValue = emptyFn,
  changeLogicDesc = emptyFn,
  type,
}) {
  const [options, setOptions] = useState([]);
  const { run: handleWordSearchDebounce } = useDebounceFn(handleWordSearch, { wait: 500 });

  const getFunctionData = async () => {
    CORE.findAllMethodSchemaUsingGET({ params: { page: 0, size: 20, type, tableType } })
      .then(items => {
        return _.map(items, ({ id, cname, description, ...others }) => ({
          ...others,
          label: cname,
          value: id,
          key: id,
          description,
          id,
        }));
      })
      .then(nextWords => setOptions(nextWords));
  };

  useEffect(() => {
    getFunctionData();
  }, []);

  // 根据名称模糊搜索
  function handleWordSearch(val) {
    CORE.findAllMethodSchemaUsingGET({
      params: { page: 0, size: 10, cname: val, type },
    })
      .then(items => {
        return _.map(items, ({ id, cname, ...others }) => ({
          ...others,
          label: cname,
          value: id,
          key: id,
          id,
        }));
      })
      .then(nextWords => setOptions(nextWords));
  }

  const handleSelect = val => {
    const { key: selectKey } = val || {};
    const selectValue = _.find(options, { key: selectKey });
    const { schema: selectSchema = [], description } = selectValue || {};
    onChange(val);
    setFormSchema(selectSchema);
    changeLogicDesc(description);
    resetCheckValue();
  };

  return (
    <TSelect
      disabled={disabled}
      placeholder="请输入函数名称"
      showSearch
      allowClear
      labelInValue
      value={value}
      optionFilterProp="children"
      onSearch={handleWordSearchDebounce}
      onChange={handleSelect}
    >
      {_.map(options, ({ key, label, description }) => (
        <TSelect.Option key={key} title={description}>
          {label}
        </TSelect.Option>
      ))}
    </TSelect>
  );
}

export default FunSelect;
