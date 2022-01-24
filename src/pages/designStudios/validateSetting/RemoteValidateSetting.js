import React, { useCallback } from 'react';
import { Col, Form, Row } from 'antd';
import InterfaceFieldSelect, {
  transformCtxField,
  transformReqField,
} from '@/pages/designStudios/components/InterfaceFieldSelect';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import Styles from '@/pages/designStudios/widgetWrapperView/index.less';
import _ from 'lodash';

function RemoteValidateSetting({ onUpdate = EmptyFn, ctxField, validator = {} }) {
  const { ctxField: lastCtxField, reqFields, validateField, api } = validator;

  const [formRef] = Form.useForm();

  const onValuesChange = useCallback(() => {
    formRef.validateFields().then(values => {
      onUpdate({
        ...values,
      });
    });
  }, [formRef]);

  return (
    <Form
      form={formRef}
      initialValues={{
        ctxField: transformCtxField(lastCtxField),
        reqFields: transformReqField(reqFields),
        validateField,
        api,
      }}
      onValuesChange={onValuesChange}
    >
      <InterfaceFieldSelect
        ctxField={ctxField}
        valueAble
        renderResponse={responseFields => (
          <Row>
            <Col span={24}>
              <Form.Item name="validateField" label="校验字段">
                <TSelect showSearch className={Styles.fieldSelect} placeholder="返回数据">
                  {_.map(responseFields, ({ pathKey, desPath }) => {
                    const pathKeyChain = _.join(pathKey, '.');
                    const desPathChain = _.join(desPath, '.');
                    return (
                      <TSelect.Option key={pathKeyChain} value={pathKeyChain} label={desPathChain}>
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
    </Form>
  );
}

export default RemoteValidateSetting;
