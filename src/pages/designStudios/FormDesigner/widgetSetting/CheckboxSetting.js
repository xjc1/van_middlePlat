import React, { useState } from 'react';
import { EmptyFn } from '@/components/tis_ui';
import classNames from 'classnames';
import SettingStyle from '@/pages/designStudios/FormDesigner/widgetSetting/widgetSetting.less';
import { Button, Divider, Space } from 'antd';
import SliderStep from '@/pages/designStudios/widgetWrapperView/sliderStep';
import _ from 'lodash';
import InitialValueSetting from './InitialValueSetting';
import KVDataSourceSetting from './KVDataSourceSetting';

function CheckboxSetting({
  dataSource = {},
  field,
  onUpdate = EmptyFn,
  ctxSchema = [],
  initialValue,
}) {
  const [changeCol] = useState(() =>
    _.debounce(nextCol => {
      onUpdate({
        itemSpan: SliderStep[nextCol],
      });
    }, 500),
  );

  return (
    <>
      <KVDataSourceSetting
        dataSource={dataSource}
        onUpdate={onUpdate}
        ctxSchema={ctxSchema}
        mode="json"
        lableValueType
        field={field}
      />
      <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionDatasource)}>
        <Divider orientation="left">多选框样式</Divider>
        <Space>
          <Button type="link" onClick={() => changeCol(3)}>
            1栏布局
          </Button>
          <Button type="link" onClick={() => changeCol(2)}>
            2栏布局
          </Button>
          <Button type="link" onClick={() => changeCol(1)}>
            3栏布局
          </Button>
          <Button type="link" onClick={() => changeCol(0)}>
            4栏布局
          </Button>
        </Space>
      </div>
      <InitialValueSetting
        onUpdate={onUpdate}
        ctxSchema={ctxSchema}
        field={field}
        initialValue={initialValue}
      />
    </>
  );
}

CheckboxSetting.validateAble = true;
CheckboxSetting.linkAble = true;

export default CheckboxSetting;
