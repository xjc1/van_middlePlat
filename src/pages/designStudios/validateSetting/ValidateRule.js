import React, { useEffect, useState } from 'react';
import { Form, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import Styles from './index.less';
import { useDrop } from '@/components/react-dnd';
import classNames from 'classnames';
import _ from 'lodash';
import { oneFormAction } from '@/utils/constantEnum';

function ValidateRule({ id, rule, onRuleChange = EmptyFn, allRules = [], onRemove = EmptyFn }) {
  const [formRef] = Form.useForm();
  const [vals, setVals] = useState(rule);
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
      switch (item.action) {
        case oneFormAction.setValidate:
          formRef.setFieldsValue({
            name: item.name,
          });
          setVals({
            ...vals,
            name: item.name,
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

  const nextRuleConfig = rule.name ? _.find(allRules, { name: rule.name }) : {};

  return (
    <div className={classNames(Styles.valiteRule, isOver && Styles.droping)} ref={dropRef}>
      <Form
        form={formRef}
        initialValues={vals}
        onValuesChange={changeVal => {
          const { rule: ruleGenerate = EmptyFn } = nextRuleConfig;
          const { name, id: vId, option } = { ...vals, ...changeVal };
          const optionMessage = option && ruleGenerate(option);
          setVals({
            name,
            id: vId,
            option,
            schema: { message: nextRuleConfig.message, ...optionMessage },
          });
        }}
      >
        <Form.Item name="name" label="校验器">
          <TSelect allowClear>
            {_.map(allRules, ({ name }) => (
              <TSelect.Option key={name} value={name} label={name}>
                {name}
              </TSelect.Option>
            ))}
          </TSelect>
        </Form.Item>
        {nextRuleConfig && nextRuleConfig.optionRender && nextRuleConfig.optionRender}
        <Button.Group className={Styles.valiteRuleOperate}>
          <Button
            type="primary"
            danger
            icon={<CloseOutlined />}
            size="small"
            onClick={() => {
              onRemove(id);
            }}
          />
        </Button.Group>
      </Form>
    </div>
  );
}

export default ValidateRule;
