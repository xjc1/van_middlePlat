import React, { useCallback } from 'react';
import InputSetting from './InputSetting';
import { Divider, Form, InputNumber } from 'antd';
import { EmptyObj } from '@/components/tis_ui';
import classNames from 'classnames';
import SettingStyle from './widgetSetting.less';

function InputNumberSetting({ widgetConfig = EmptyObj, ...others }) {
  const [formRef] = Form.useForm();
  const { max, min } = widgetConfig;
  const onValuesChange = useCallback(() => {
    const { onUpdate } = others;
    formRef
      .validateFields()
      .then(nextVals => {
        onUpdate({
          widgetConfig: nextVals,
        });
      })
      .catch(() => {});
  }, [formRef]);

  return (
    <>
      <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionForm)}>
        <Divider orientation="left">数字控件设置</Divider>
        <Form
          form={formRef}
          initialValues={{
            max,
            min,
          }}
          onValuesChange={onValuesChange}
        >
          <Form.Item name="min" label="最小值">
            <InputNumber />
          </Form.Item>

          <Form.Item name="max" label="最大值">
            <InputNumber />
          </Form.Item>
        </Form>
      </div>
      <InputSetting {...others} />
    </>
  );
}

export default InputNumberSetting;
