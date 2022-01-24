function generateStep1(name, upperFirstName) {
  return `
import { Button, Divider, Input, Row } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { FormRules as Rules, TForm } from "@/components/tis_ui";

@connect(({ ${name} }) => ${name}.step)
class Step1 extends PureComponent {
  createForm = null;

  onValidateForm = () => {
    const { dispatch } = this.props;
    const { validateFields } = this.createForm;
    validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: '${name}/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: '${name}/saveCurrentStep',
          payload: 'p2',
        });
      }
    });
  };

  render() {
    const { demoForm, demoForm2 } = this.props;
    return (
      <Fragment>
        <Form
          className={styles.stepForm}
          onForm={(form) => {
            this.createForm = form
          }}
         >
         <Row>
         <TItem
              name="demoForm"
              label="demoForm"
              rules={[Rules.required('demoForm必填')]}
           >
              <Input/>
            </TItem>
            <TItem
              name="demoForm2"
              label="demoForm2"
              rules={[Rules.required('demoForm2必填')]}
           >
              <Input/>
            </TItem>
            <TItem col={24} labelCol={{span: 0}}} style={{textAlign:'center', marginTop: 40}}>
              <Button type="primary" onClick={this.onValidateForm}>
                下一步
              </Button>
            </TItem>
            </Row>
         </Form>

        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />
        <div className={styles.desc}>
          <h4>XXXXX</h4>
          <p>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </p>
        </div>
      </Fragment>
    );
  }


}

export default Step1;

  `;
}

function generateStep1CSS() {
  return `
  @import '~antd/es/style/themes/default.less';

.stepForm {
  max-width: 500px;
  margin: 40px auto 0;
}

.stepFormText {
  margin-bottom: 24px;
  :global {
    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }
}

.result {
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 0 8px;
}

.desc {
  padding: 0 56px;
  color: @text-color-secondary;
  h3 {
    margin: 0 0 12px 0;
    color: @text-color-secondary;
    font-size: 16px;
    line-height: 32px;
  }
  h4 {
    margin: 0 0 4px 0;
    color: @text-color-secondary;
    font-size: 14px;
    line-height: 22px;
  }
  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}

@media screen and (max-width: @screen-md) {
  .desc {
    padding: 0;
  }
}

.information {
  line-height: 22px;
  :global {
    .ant-row:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .label {
    padding-right: 8px;
    color: @heading-color;
    text-align: right;
    @media screen and (max-width: @screen-sm) {
      text-align: left;
    }
  }
}

.money {
  font-weight: 500;
  font-size: 20px;
  font-family: 'Helvetica Neue', sans-serif;
  line-height: 14px;
}

.uppercase {
  font-size: 12px;
}
`;
}

module.exports = { generateStep1, generateStep1CSS };
