import React, { PureComponent } from 'react';
import { confirmAble, TButton, utils } from '@/components/tis_ui';
import { Form, Tooltip } from 'antd';
import ThreeSevenLayoutForm from '@/layouts/ThreeSevenLayoutForm';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import _ from 'lodash';
import QuestionsBlock from './QuestionsBlock';
import AnswerBlock from './AnswerBlock';
import style from './index.less';
import { terminalType } from '@/utils/constantEnum';

const { Base64 } = utils;

const flatBy = (array = [], key) => array.map(it => it[key]);

@connect(({ chatLibrary, user }) => ({
  ...chatLibrary,
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class EditChartForm extends PureComponent {
  createForm = React.createRef();

  onValidateForm = () => {
    const { dispatch, formData } = this.props;
    this.createForm.current.validateFields().then(vals => {
      const richAnswer = _.map(vals.richAnswer, v => (v ? Base64.base64(v) : '')).filter(
        data => data !== '',
      );
      formData.category = vals.category ? vals.category : formData.category;
      formData.richAnswer = richAnswer;
      formData.attributionDepartment = vals.attributionDepartment;
      formData.question = _.map(vals.question, v => v).filter(data => data !== undefined);
      formData.questionExpression = _.map(vals.questionExpression, v => ({ id: v }));
      formData.expression = vals.expression;
      formData.clientType = vals.clientType;
      // 格式化文本 格式还原
      formData.answer = _.map(formData.answer, ({ content }) => content).filter(
        data => data !== undefined,
      );
      if (formData.id) {
        dispatch({ type: 'chatLibrary/editChatLib', payload: formData });
      } else {
        dispatch({ type: 'chatLibrary/addChatLib', payload: formData });
      }
      dispatch({ type: 'chatLibrary/reset' });
      router.replace('chatLibrary');
    });
  };

  back2list = confirmAble({
    confirmText: '警告',
    confirmContent: '现在放弃会丢弃已经填写的内容, 确定需要放弃并返回到聊天库列表吗?',
    onClick: () => {
      router.replace('chatLibrary');
      const { dispatch } = this.props;
      dispatch({ type: 'chatLibrary/reset' });
    },
  });

  back = () => {
    router.replace('chatLibrary');
    const { dispatch } = this.props;
    dispatch({ type: 'chatLibrary/reset' });
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'chatLibrary/reset' });
  }

  arrayToObject = arr => {
    if (_.isArray(arr)) {
      return _.reduce(
        arr,
        (result = {}, obj = {}) => {
          return { ...result, [obj.key]: obj.content };
        },
        {},
      );
    }
    return {};
  };

  render() {
    const { check, formData, edit, deptCode } = this.props;
    return (
      <>
        {edit && formData && (
          <Form
            style={{ height: '100%' }}
            ref={this.createForm}
            onFinish={this.onValidateForm}
            initialValues={{
              attributionDepartment: formData.id ? formData.attributionDepartment : [deptCode],
              clientType: formData.clientType ? formData.clientType : [terminalType.pc],
              category: formData.category,
              question: this.arrayToObject(formData.question),
              questionExpression: flatBy(formData.questionExpression, 'id'),
              richAnswer: this.arrayToObject(formData.richAnswer),
              expression: formData.expression,
            }}
          >
            <ThreeSevenLayoutForm left={<QuestionsBlock />} right={<AnswerBlock />} />
            <div className={style.formBtnGroup}>
              <Tooltip placement="left" title="保存">
                <TButton.Button
                  className={style.formBtnItem}
                  type="primary"
                  ghost={false}
                  shape="circle"
                  onClick={this.onValidateForm}
                  style={{
                    marginRight: 0,
                    display: check ? 'none' : 'block',
                  }}
                >
                  <CheckOutlined />
                </TButton.Button>
              </Tooltip>
              <Tooltip placement="left" title="返回">
                <TButton.Button
                  className={style.formBtnItem}
                  type="default"
                  ghost={false}
                  shape="circle"
                  onClick={check ? this.back : this.back2list}
                  style={{ marginRight: 0 }}
                >
                  <RollbackOutlined />
                </TButton.Button>
              </Tooltip>
            </div>
          </Form>
        )}
      </>
    );
  }
}

export default EditChartForm;
