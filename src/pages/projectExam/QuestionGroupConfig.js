import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Modal, message } from 'antd';
import _ from 'lodash';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { FormRules, TItem, TSelect } from '@/components/tis_ui';
import classNames from 'classnames';
import { connect } from 'dva';
import uiStyles from '@/components/tis_ui/tis.less';
import Styles from './QuestionGroupConfig.less';

const formLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

function hasSameGroupId(groups, nextId) {
  return _.filter(groups, ({ id }) => id === nextId).length > 0;
}

function QuestionGroupConfig({ questions = [], questionGroups, dispatch }) {
  const [initialVal, setInitialVal] = useState();

  const [formRef] = Form.useForm();

  useEffect(() => {
    setInitialVal(
      _.reduce(
        questionGroups,
        (result, group) => {
          const { id, name = '', questionIds = [] } = group;
          return {
            ...result,
            [id]: {
              name,
              questionIds,
            },
          };
        },
        {},
      ),
    );
  }, []);

  return (
    <div className={classNames(Styles.questionGroupConfigFull, uiStyles.innerboxScroll)}>
      {initialVal && (
        <Form
          initialValues={initialVal}
          form={formRef}
          onValuesChange={(val, vals) => {
            dispatch({
              type: 'policyExam/updateQuestionGroups',
              payload: vals,
            });
          }}
        >
          {_.map(questionGroups, (group, index) => {
            const { id } = group;
            return (
              <div key={id} style={{ position: 'relative' }}>
                <Divider orientation="left" style={{ paddingTop: 20 }}>
                  分组{index + 1} - [{id}]
                  <Button
                    type="danger"
                    shape="circle"
                    icon={<CloseOutlined />}
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      right: 10,
                      top: 15,
                    }}
                    onClick={() => {
                      Modal.confirm({
                        title: '确定要删除此分组吗?',
                        onOk() {
                          dispatch({
                            type: 'policyExam/reduceQuestionGroup',
                            id: group.id,
                          });
                        },
                      });
                    }}
                  />
                </Divider>
                <TItem col={22} name={[id, `name`]} label="分组名称" {...formLayout}>
                  <Input />
                </TItem>
                <TItem col={22} name={[id, `questionIds`]} label="题目" {...formLayout}>
                  <TSelect mode="multiple" style={{ width: '100%' }} placeholder="请选择题目">
                    {_.map(questions, ({ id: currentId, name }) => {
                      return <TSelect.Option key={currentId}>{name}</TSelect.Option>;
                    })}
                  </TSelect>
                </TItem>
              </div>
            );
          })}
        </Form>
      )}
      <Divider orientation="center" style={{ paddingTop: 15 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            let groupForm = null;
            Modal.confirm({
              title: '创建一个新的题目组?',
              content: (
                <Form
                  ref={form => {
                    groupForm = form;
                  }}
                >
                  <TItem
                    tip="此ID有可能会关联体检返回值中的字段,请设计一个非中文有意义的名字"
                    col={24}
                    name="newGroupId"
                    label="组ID"
                    rules={[FormRules.required('必填'), FormRules.codeAndNum()]}
                  >
                    <Input />
                  </TItem>
                </Form>
              ),
              onOk(close) {
                groupForm.validateFields().then(({ newGroupId }) => {
                  if (!hasSameGroupId(questionGroups, newGroupId)) {
                    dispatch({
                      type: 'policyExam/addQuestionGroup',
                      id: newGroupId,
                    });
                    close();
                  } else {
                    message.error('已经有相同id的组存在');
                  }
                });
              },
            });
          }}
        >
          添加新分组
        </Button>
      </Divider>
    </div>
  );
}

export default connect(({ policyExam }) => ({
  questions: policyExam.questions,
  questionGroups: policyExam.questionGroups,
}))(QuestionGroupConfig);
