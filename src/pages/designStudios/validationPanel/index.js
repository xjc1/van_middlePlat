import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { message } from 'antd';
import Styles from './index.less';
import QueryBar from './queryBar';
import ValidationList from './validationList';
import defaultValidate from './defaultValidates';
import { CORE } from '@/services/api';
import { oneFormValidateType } from '@/utils/constantEnum';
import ValidatorEditor from '@/pages/designStudios/validationPanel/ValidatorEditor';

const defaultFx = `function(val) {




    // 校验函数必须返回一个boolean类型
    return false;
}`;

function Index({ rules, dispatch }) {
  const [formData, setFormData] = useState();

  useEffect(() => {
    fetchList({});
  }, []);

  function fetchList({ page = 0, size = 100000 }) {
    CORE.getValidationRulesUsingGET({ params: { page, size } }).then(({ content }) => {
      dispatch({
        type: 'validator/setValidators',
        rules: [...defaultValidate, ...content],
      });
    });
  }

  function onCreate(body) {
    const { name } = body;
    if (_.find(rules, { name })) {
      message.error(`此校验器名称已经存在[${name}]`);
      return;
    }
    CORE.createValidationRuleUsingPOST({ body })
      .then(() => {
        message.success('添加成功');
        setFormData();
        fetchList({});
      })
      .catch(e => {
        message.error(`添加失败，${e.msg}`);
      });
  }

  function onQuery() {}

  return (
    <div className={Styles.validationPanel}>
      <QueryBar onQuery={onQuery} />
      <ValidationList
        onCreate={() => setFormData({ type: oneFormValidateType.regexp, fx: defaultFx })}
        onEdit={() => {}}
        fetchList={fetchList}
        data={_.map(rules, item => {
          return {
            ...item,
            key: item.name,
          };
        })}
      />

      {formData && (
        <ValidatorEditor onOk={onCreate} formData={formData} onFormDataChange={setFormData} />
      )}
    </div>
  );
}

export default connect(({ validator }) => {
  return { rules: validator.rules };
})(Index);
