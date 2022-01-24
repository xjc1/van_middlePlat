import React, { useCallback } from 'react';
import { Divider, Form, Input } from 'antd';
import classNames from 'classnames';
import SettingStyle from './widgetSetting.less';
import { CodeEditor, EmptyFn } from '@/components/tis_ui';

function CustomerSetting({ componentName, componentInfo = {}, onUpdate = EmptyFn }) {
  const [formRef] = Form.useForm();

  const onValuesChange = useCallback(() => {
    formRef
      .validateFields()
      .then(({ componentInfo: componentInfoStr, ...others }) => {
        let nextInfo = {};
        try {
          nextInfo = JSON.parse(componentInfoStr);
        } catch (e) {
          console.log('-> e', e);
        }
        onUpdate({
          extraData: {
            ...others,
            componentInfo: nextInfo,
          },
        });
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(e => {});
  }, [formRef]);

  return (
    <>
      <div className={classNames(SettingStyle.widgetSection)}>
        <Divider orientation="left">自定义组件配置</Divider>
        <Form
          form={formRef}
          layout="vertical"
          initialValues={{
            componentName,
            componentInfo: JSON.stringify(componentInfo, null, 2),
          }}
          onValuesChange={onValuesChange}
        >
          <Form.Item label="组件名称" name="componentName">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="拓展信息" name="componentInfo">
            <CodeEditor mode="json" name="CONTEXT_SETTING" height="300px" style={{ flex: 1 }} />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default CustomerSetting;
