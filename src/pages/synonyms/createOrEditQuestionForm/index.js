import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { TabForm } from '@/components/tis_ui';
import SynonymsBasicInfo from '@/pages/synonyms/createOrEditQuestionForm/SynonymsBasicInfo';
import SynonymsExpand from '@/pages/synonyms/createOrEditQuestionForm/SynonymsExpand';
import _ from 'lodash';
import { notification } from 'antd';
import Base64 from '../../../utils/Base64';

const handleRelation = data => {
  const result = [];
  if (data && data.length > 0) {
    data.forEach(item => {
      result.push({ id: item.key });
    });
  }
  return result;
};

function Index(props) {
  const { initFormData = {}, check, edit, dispatch } = props;
  let tabForm = null;
  const [formRef, setFormRef] = useState(null);

  function handleSubmit(values) {
    const { category = [], content, answer } = values;
    const formatData = {
      ...values,
      relationMatchMatters: handleRelation(values.relationMatchMatters),
      relationMatchPolicy: handleRelation(values.relationMatchPolicy),
      relationMatchProject: handleRelation(values.relationMatchProject),
      relationMatchScene: handleRelation(values.relationMatchScene),
      relationMatchService: handleRelation(values.relationMatchService),
      relationMatchArticle: handleRelation(values.relationMatchArticle),
      category: category.map(it => ({ id: it })),
      id: initFormData.id,
      answer: _.isArray(answer) ? _.compact(answer) : _.compact([answer]),
      status: initFormData.status ? initFormData.status : 0,
      content: content ? Base64.base64(content) : undefined,
    };
    if (dispatch) {
      dispatch({
        type: 'createQuestionForm/submitStepForm',
        payload: formatData,
        redirect: 'synonyms',
      });
      dispatch({
        type: 'createQuestionForm/resetVisible',
        payload: false,
      });
    }
  }

  function validateForm() {
    formRef
      .validateFields()
      .then(values => {
        handleSubmit(values);
      })
      .catch(err => {
        if (err.errorFields && err.errorFields.length) {
          notification.error({
            message: '????????????????????????????????????',
          });
        }
      });
  }

  const renderTitleName = () => {
    if (check) {
      return '????????????';
    }
    if (edit) {
      return '????????????';
    }
    return '????????????';
  };

  useEffect(() => {
    setFormRef(tabForm);
  }, [tabForm]);

  return (
    <TabForm
      onForm={form => {
        tabForm = form;
      }}
      title={renderTitleName()}
      btnOption={{
        onOk: validateForm,
        okText: initFormData.id ? '????????????' : '????????????',
        disabled: check,
      }}
      initialValues={{ source: '????????????', ...initFormData }}
      defaultTabKey="synonymsBasicInfo"
    >
      <SynonymsBasicInfo check={check} title="????????????" tabKey="synonymsBasicInfo" />
      <SynonymsExpand check={check} title="????????????" tabKey="synonymsExpand" />
    </TabForm>
  );
}

export default connect(({ createQuestionForm, synonyms }) => ({
  ...synonyms,
  ...createQuestionForm,
  ...createQuestionForm.step,
}))(Index);
