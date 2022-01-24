import React, { useCallback } from 'react';
import { Divider, Form, Input, Radio } from 'antd';
import { EmptyFn } from '@/components/tis_ui';
import classNames from 'classnames';
import SettingStyle from './unitSetting.less';
import InterfaceFieldSelect from '@/pages/designStudios/components/InterfaceFieldSelect';

function ButtonSetting({ text, buttonType = 'default', clickType, onUpdate = EmptyFn }) {
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
        <Divider orientation="left">按钮配置</Divider>
        <Form
          form={formRef}
          layout="vertical"
          initialValues={{
            text,
            buttonType,
            clickType,
          }}
          onValuesChange={onValuesChange}
        >
          <Form.Item label="显示文字" name="text">
            <Input allowClear />
          </Form.Item>

          <Form.Item label="确认提示" name="confirm">
            <Input placeholder="未空表示不需要确认提示." allowClear />
          </Form.Item>

          <Form.Item label="按钮类型" name="buttonType">
            <Radio.Group>
              <Radio value="default">默认</Radio>
              <Radio value="primary">主要</Radio>
              <Radio value="warning">警告</Radio>
              <Radio value="danger">危险</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="点击操作" name="clickType">
            <Radio.Group>
              <Radio value="custom">定制</Radio>
              <Radio value="api">接口</Radio>
            </Radio.Group>
          </Form.Item>

          {clickType === 'api' && <InterfaceFieldSelect />}
        </Form>
      </div>
    </>
  );
}

export default ButtonSetting;
