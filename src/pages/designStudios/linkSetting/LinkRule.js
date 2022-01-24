import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { CloseOutlined, ApiTwoTone, RedoOutlined } from '@ant-design/icons';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import Styles from './index.less';
import { useDrop } from '@/components/react-dnd';
import classNames from 'classnames';
import _ from 'lodash';
import { oneFormAction, oneFormLinkEcho, oneFormLinkRule } from '@/utils/constantEnum';
import InterfaceFieldSelect, {
  LabelValueOptions,
  transformCtxField,
  transformReqField,
} from '@/pages/designStudios/components/InterfaceFieldSelect';

function LinkRule({ formId, id, rule, onRuleChange = EmptyFn, onRemove = EmptyFn }) {
  const [formRef] = Form.useForm();
  const [vals, setVals] = useState(rule);
  const [motion, setMotion] = useState(rule.so);

  useEffect(() => {
    if (rule !== vals) onRuleChange(id, vals);
  }, [vals]);

  const [{ isOver }, dropRef] = useDrop({
    accept: 'formElement',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.id === formId) {
        message.warning('不可自己联动自己');
        return;
      }
      switch (item.action) {
        case oneFormAction.moveElement:
          formRef.setFieldsValue({ source: item.id });
          setVals({
            ...vals,
            source: item.id,
          });
          break;
        default:
          break;
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: false }),
    }),
  });

  const onValuesChange = useCallback(() => {
    formRef.validateFields().then(values => {
      const { so } = values;
      setVals(values);
      setMotion(so);
    });
  }, [formRef]);

  function reset() {
    formRef.setFieldsValue({
      source: undefined,
      oper: undefined,
      so: undefined,
      equalVal: undefined,
    });
    setVals({});
  }

  const { oper, ctxField = {}, reqFields = {} } = vals;
  return (
    <div className={classNames(Styles.linkRule, isOver && Styles.droping)} ref={dropRef}>
      <Form
        form={formRef}
        initialValues={{
          ...vals,
          ctxField: transformCtxField(ctxField),
          reqFields: transformReqField(reqFields),
        }}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="source" label="观察字段">
          <Input
            allowClear
            prefix={<ApiTwoTone />}
            placeholder="拖拽左侧控件到此建立联动关系"
            disabled
          />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item name="oper" wrapperCol={{ span: 23 }}>
              <TSelect>
                {_.map(oneFormLinkRule, (v, k) => (
                  <TSelect.Option key={k} value={v} label={oneFormLinkRule.$names[k]}>
                    {oneFormLinkRule.$names[k]}
                  </TSelect.Option>
                ))}
              </TSelect>
            </Form.Item>
          </Col>
          {oper &&
            _.includes(
              [oneFormLinkRule.equal, oneFormLinkRule.bigger, oneFormLinkRule.smaller],
              oper,
            ) && (
              <Col span={12}>
                <Form.Item name="equalVal">
                  <Input placeholder="输入需要比较的值" allowClear />
                </Form.Item>
              </Col>
            )}
        </Row>
        <Form.Item name="so" label="自身动作">
          <TSelect>
            {_.map(oneFormLinkEcho, (v, k) => (
              <TSelect.Option key={k} value={v} label={oneFormLinkEcho.$names[k]}>
                {oneFormLinkEcho.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </Form.Item>

        {motion === oneFormLinkEcho.reset && (
          <InterfaceFieldSelect
            linkValueAble
            renderResponse={responseFields => <LabelValueOptions responseFields={responseFields} />}
          />
        )}

        <Button.Group className={Styles.linkRuleOperate}>
          <Button
            type="primary"
            danger
            icon={<CloseOutlined />}
            size="small"
            onClick={() => onRemove(id)}
          />
          <Button icon={<RedoOutlined />} size="small" onClick={reset} />
        </Button.Group>
      </Form>
    </div>
  );
}

export default LinkRule;
