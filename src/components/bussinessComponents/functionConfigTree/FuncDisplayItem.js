import React from 'react';
import _ from 'lodash';
import FuncSchemeDisplay from './FuncSchemeDisplay';

function FuncDisplayItem({ value = '', schemaValues = [], methodList = [] }) {
  const selectValue = _.find(methodList, { key: value }) || {};
  const { schema: selectSchema = [] } = selectValue;
  return (
    <>
      <span>{selectValue.label}</span>
      <FuncSchemeDisplay schema={selectSchema} values={schemaValues} />
    </>
  );
}

export default FuncDisplayItem;
