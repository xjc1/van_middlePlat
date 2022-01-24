function generateStep3(name, upperFirstName) {

  return `
import { Button, Result } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const Step3 = props => {
  const { data, dispatch } = props;

  if (!data) {
    return null;
  }

  const onFinish = () => {
    dispatch({
      type: '${name}/reset',
    });
    dispatch({
      type: '${name}/saveCurrentStep',
      payload: 'base',
    });
  };

  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        创建另一个XXX
      </Button>
      <Button onClick={() => {
        dispatch({ type: '${name}/resetVisible', payload: false })
      }}>查看角色列表</Button>
    </>
  );
  return (
    <Result
      status="success"
      title="创建XXXXX成功"
      subTitle=""
      extra={extra}
      className={styles.result}
    />

  );
};

export default connect(({ ${name} }) => ({
  data: ${name}.step,
}))(Step3);

  `;
}

function generateStep3CSS() {
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

.uppercase {
  font-size: 12px;
}

  `;
}

module.exports = { generateStep3, generateStep3CSS };
