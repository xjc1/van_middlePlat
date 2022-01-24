import React from 'react';
import { EmptyFn } from '@/components/tis_ui';
import KVDataSourceSetting from './KVDataSourceSetting';
import InitialValueSetting from './InitialValueSetting';

function SelectSetting({
  dataSource = {},
  field,
  onUpdate = EmptyFn,
  ctxSchema = [],
  initialValue,
}) {
  return (
    <>
      <KVDataSourceSetting
        dataSource={dataSource}
        onUpdate={onUpdate}
        ctxSchema={ctxSchema}
        lableValueType
        field={field}
      />
      <InitialValueSetting
        onUpdate={onUpdate}
        ctxSchema={ctxSchema}
        field={field}
        initialValue={initialValue}
      />
    </>
  );
}

SelectSetting.validateAble = true;
SelectSetting.linkAble = true;

export default SelectSetting;
