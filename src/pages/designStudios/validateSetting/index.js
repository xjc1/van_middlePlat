import React from 'react';
import _ from 'lodash';
import { Button } from 'antd';
import Styles from './index.less';
import ValidateRule from './ValidateRule';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { EmptyFn } from '@/components/tis_ui';

function Index({ formId, rules = [], onUpdate = EmptyFn, allRules = [] }) {
  function onValidateChange(id, validateValues) {
    onUpdate({
      rules: _.map(rules, rule => {
        if (rule.id === id) {
          return { ...rule, ...validateValues };
        }
        return rule;
      }),
    });
  }

  function onRemove(rmId) {
    onUpdate({
      rules: _.filter(rules, ({ id }) => id !== rmId),
    });
  }

  function newValidate() {
    onUpdate({
      rules: [...rules, { id: IDGenerator.nextName('validate', 10) }],
    });
  }

  return (
    <div className={Styles.validateSetting}>
      {_.map(rules, rule => (
        <ValidateRule
          key={rule.id}
          onRuleChange={onValidateChange}
          onRemove={onRemove}
          allRules={allRules}
          formId={formId}
          id={rule.id}
          rule={rule}
        />
      ))}
      <div className={Styles.valiteAddWrapper}>
        <Button type="primary" onClick={newValidate} icon={<PlusOutlined />} size="small">
          新建本地校验规则
        </Button>
      </div>
    </div>
  );
}

export default connect(({ validator }) => {
  return {
    allRules: validator.rules,
  };
})(Index);
