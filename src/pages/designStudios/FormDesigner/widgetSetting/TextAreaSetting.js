import React, { useCallback } from 'react';
import { Divider, Form, InputNumber } from 'antd';
import { EmptyFn } from '@/components/tis_ui';
import DataSourceSetting from '@/pages/designStudios/FormDesigner/widgetSetting/DataSourceSetting';
import InitialValueSetting from '@/pages/designStudios/FormDesigner/widgetSetting/InitialValueSetting';
import classNames from 'classnames';
import SettingStyle from '@/pages/designStudios/FormDesigner/widgetSetting/widgetSetting.less';

function TextAreaSetting({
  dataSource = {},
  onUpdate = EmptyFn,
  ctxSchema = [],
  initialValue,
  widgetConfig = {},
  field,
}) {
  const [formRef] = Form.useForm();

  const onValuesChange = useCallback(() => {
    formRef.validateFields().then(vals => {
      onUpdate({
        widgetConfig: vals,
      });
    });
  }, [formRef]);

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
        staticTextArea
        initialValue={initialValue}
      />
      <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionDatasource)}>
        <Divider orientation="left">表格配置</Divider>
        <Form
          form={formRef}
          initialValues={{
            ...widgetConfig,
          }}
          onValuesChange={onValuesChange}
        >
          <Form.Item name="rowsNum" label="行数">
            <InputNumber min={1} max={100} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default TextAreaSetting;
