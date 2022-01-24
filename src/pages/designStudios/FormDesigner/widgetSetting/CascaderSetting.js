import React from 'react';
import { EmptyFn } from '@/components/tis_ui';
import InitialValueSetting from './InitialValueSetting';
import KVDataSourceSetting from '@/pages/designStudios/FormDesigner/widgetSetting/KVDataSourceSetting';

function CascaderSetting({
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
        staticType
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

CascaderSetting.validateAble = true;
CascaderSetting.linkAble = true;

export default CascaderSetting;
