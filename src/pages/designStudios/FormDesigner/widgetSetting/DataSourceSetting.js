import React, { useCallback } from 'react';
import { Col, Divider, Form, Input, Radio, Row, Tag } from 'antd';
import InterfaceFieldSelect, {
  transformCtxField,
  transformReqField,
} from '@/pages/designStudios/components/InterfaceFieldSelect';
import Styles from '@/pages/designStudios/widgetWrapperView/index.less';
import { QuestionOutlined, SwapLeftOutlined } from '@ant-design/icons';
import { EmptyFn, TSelect, CodeEditor } from '@/components/tis_ui';
import _ from 'lodash';
import { infoes } from '@/pages/designStudios/FormDesigner/widgets';
import classNames from 'classnames';
import SettingStyle from './widgetSetting.less';

function DataSourceSetting({
  dataSource = {},
  onUpdate = EmptyFn,
  ctxSchema = [],
  field,
  noneType = false,
  staticType = false,
}) {
  const [formRef] = Form.useForm();
  const {
    dataSourceType = 'none',
    mode = 'text',
    ctxField = [],
    reqFields = [],
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
          ...others,
          ctxField: transformCtxField(ctxField),
          reqFields: transformReqField(reqFields),
        }}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="dataSourceType">
          <Radio.Group className={Styles.radioGroup}>
            {noneType && <Radio value="none">无</Radio>}
            {staticType && <Radio value="static">静态数据</Radio>}
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

        {dataSourceType === 'dynamic' && (
          <InterfaceFieldSelect
            renderResponse={responseFields => (
              <Row>
                <Col span={11}>
                  <Input prefix={<QuestionOutlined />} placeholder="控件值" disabled />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                  <SwapLeftOutlined style={{ fontSize: '18px' }} />
                </Col>
                <Col span={11}>
                  <Form.Item name="$value">
                    <TSelect showSearch className={Styles.fieldSelect} placeholder="上下文字段">
                      {_.map(responseFields, ({ pathKey, desPath }) => {
                        const pathKeyChain = _.join(pathKey, '.');
                        const desPathChain = _.join(desPath, '.');
                        return (
                          <TSelect.Option
                            key={pathKeyChain}
                            value={pathKeyChain}
                            label={desPathChain}
                          >
                            <div>{desPathChain}</div>
                          </TSelect.Option>
                        );
                      })}
                    </TSelect>
                  </Form.Item>
                </Col>
              </Row>
            )}
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

export default DataSourceSetting;
