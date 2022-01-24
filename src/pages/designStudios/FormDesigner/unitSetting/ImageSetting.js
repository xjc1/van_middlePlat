import React, { useCallback } from 'react';
import { Divider, Form, Input } from 'antd';
import { EmptyFn } from '@/components/tis_ui';
import classNames from 'classnames';
import SettingStyle from './unitSetting.less';

function ImageSetting({ src = '', onUpdate = EmptyFn }) {
  const [formRef] = Form.useForm();

  const onValuesChange = useCallback(() => {
    formRef.validateFields().then(nextVals => {
      onUpdate({
        extraData: nextVals,
      });
    });
  }, [formRef]);

  return (
    <>
      <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionCommon)}>
        <Divider orientation="left">banner配置</Divider>
        <Form
          form={formRef}
          layout="vertical"
          initialValues={{
            src,
          }}
          onValuesChange={onValuesChange}
        >
          <Form.Item label="图片地址" name="src">
            <Input allowClear />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default ImageSetting;
