import React from 'react';
import { EmptyFn } from '@/components/tis_ui';
import InitialValueSetting from './InitialValueSetting';
import DataSourceSetting from './DataSourceSetting';

function InputSetting({
  dataSource = {},
  onUpdate = EmptyFn,
  ctxSchema = [],
  initialValue,
  field,
}) {
  return (
    <div>
      <DataSourceSetting
        dataSource={dataSource}
        onUpdate={onUpdate}
        ctxSchema={ctxSchema}
        noneType
        field={field}
      />
      <InitialValueSetting
        onUpdate={onUpdate}
        ctxSchema={ctxSchema}
        field={field}
        initialValue={initialValue}
      />
    </div>
  );
}

InputSetting.validateAble = true;
InputSetting.linkAble = true;

export default InputSetting;
