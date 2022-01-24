import React, { useCallback } from 'react';
import { Divider, Form, Radio, Tag } from 'antd';
import InterfaceFieldSelect, {
  transformCtxField,
  transformReqField,
  LabelValueOptions,
} from '@/pages/designStudios/components/InterfaceFieldSelect';
import Styles from '@/pages/designStudios/widgetWrapperView/index.less';
import { EmptyFn, TSelect, CodeEditor } from '@/components/tis_ui';
import _ from 'lodash';
import { infoes } from '@/pages/designStudios/FormDesigner/widgets';
import classNames from 'classnames';
import SettingStyle from './widgetSetting.less';
import KVItems from '@/pages/designStudios/FormDesigner/widgetSetting/KVItems';

function KVDataSourceSetting({
  dataSource = {},
  onUpdate = EmptyFn,
  ctxSchema = [],
  field,
  noneType = false,
  staticType = false,
  lableValueType = false,
}) {
  const [formRef] = Form.useForm();
  const {
    dataSourceType = 'none',
    ctxField = [],
    reqFields = [],
    staticItems = [],
    ...others
  } = dataSource;

  const onValuesChange = useCallback(() => {
    formRef.validateFields().then(nextVals => {
      onUpdate({
        dataSource: nextVals,
      });
    });
  }, [formRef]);

  return (
    <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionDatasource)}>
      <Divider orientation="left">数据源配置</Divider>
      <Form
        form={formRef}
        initialValues={{
          dataSourceType,
          staticItems,
          ...others,
          ctxField: transformCtxField(ctxField),
          reqFields: transformReqField(reqFields),
        }}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="dataSourceType">
          <Radio.Group className={Styles.radioGroup}>
            {noneType && <Radio value="none">无</Radio>}
            {staticType && <Radio value="static">JSON数据</Radio>}
            {lableValueType && <Radio value="lableValueType">键值数据</Radio>}
            <Radio value="dynamic">动态数据</Radio>
            <Radio value="ctx">上下文</Radio>
          </Radio.Group>
        </Form.Item>

        {dataSourceType === 'static' && (
          <div>
            <Form.Item name="staticData">
              <CodeEditor
                name="METHOD_VALIDATE"
                mode="json"
                height="300px"
                placeholder={infoes[field].placeholder}
                style={{ flex: 1 }}
              />
            </Form.Item>
          </div>
        )}

        {dataSourceType === 'lableValueType' && <KVItems name="staticItems" items={staticItems} />}

        {dataSourceType === 'dynamic' && (
          <InterfaceFieldSelect
            renderResponse={responseFields => <LabelValueOptions responseFields={responseFields} />}
          />
        )}
        {dataSourceType === 'ctx' && (
          <Form.Item name="ctxDatasource">
            <TSelect allowClear>
              {_.map(ctxSchema, ({ pathKey }) => {
                const ctxKey = pathKey.join('.');
                return (
                  <TSelect.Option value={ctxKey} key={ctxKey} label={ctxKey}>
                    <Tag color="orange">上下文</Tag>
                    {ctxKey}
                  </TSelect.Option>
                );
              })}
            </TSelect>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}

export default KVDataSourceSetting;
