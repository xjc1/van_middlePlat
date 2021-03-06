import { message, Button, Input, Form, Col, Row, Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import { FormRules as Rules, TItem } from '@/components/tis_ui';
import Captcha, { randomWord } from '@/components/captcha/Captcha';
import JSEncrypt from 'jsencrypt';
import styles from './style.less';

const key =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs6TY/eCGx5sI7sWNO58FmY3Eu5/IiXepzUVF6AH8rjqok6i6LoF9clRNG6sEtEfEQ6HAdpZv86ogrRO41UHRDVHclysQEQX9j5mAP4N3IOGrq3ahsdqqRhUoY5erEQ6YqVydwI47pBHNnYb1XMk1/mWhbVpNL6gRM5Grl5HGKbmhvC93DslmWub/yPYP9/p1PsdtgIk1qicsl2JxwYsPcV0scmLOC1Xchx01yQeWzcIlsfU63itALNDlUW6QJ92ZZCGgTyBwBc9GAQv79RkQ40CGn9yTDXJuZGjxPns7ZNHcIlcfOZrvoOpvc3eyNzA4+t4AEZ13I7gOibS62Kp+AQIDAQAB';

const encrypt = new JSEncrypt();
encrypt.setPublicKey(key);

class Login extends Component {
  loginForm = React.createRef();

  state = {
    type: 'account',
    captcha: '',
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    }
  };

  changeCaptcha = () => {
    this.setState({ captcha: randomWord(false, 4) });
  };

  componentDidMount() {
    this.changeCaptcha();
  }

  render() {
    const { dispatch } = this.props;
    const { captcha } = this.state;
    return (
      <Card className={styles.main}>
        <Form
          ref={this.loginForm}
          onFinish={vals => {
            const { captcha: validCaptcha } = this.state;
            const { captcha: nextcaptcha, password, ...payload } = vals;
            if (validCaptcha.toLowerCase() === nextcaptcha.toLowerCase()) {
              dispatch({
                type: 'login/login',
                payload: {
                  ...payload,
                  password: encrypt.encrypt(password),
                },
                onError: ({ msg }) => {
                  this.changeCaptcha();
                  this.loginForm.current.setFieldsValue({
                    captcha: '',
                  });
                  message.error(msg);
                },
              });
            } else {
              message.error('?????????????????????');
              this.changeCaptcha();
              this.loginForm.current.setFieldsValue({ captcha: '' });
            }
          }}
        >
          <Row>
            <TItem wrapperCol={{ span: 24 }} name="username">
              <Input placeholder="?????????" />
            </TItem>
            <TItem wrapperCol={{ span: 24 }} rules={[Rules.required('????????????')]} name="password">
              <Input.Password placeholder="??????" />
            </TItem>
            <Row>
              <Col span={15}>
                <Form.Item
                  name="captcha"
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 22 }}
                  rules={[
                    { len: 4, message: '???????????????4!' },
                    { required: true, message: '?????????????????????!' },
                  ]}
                >
                  <Input placeholder="?????????" />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Captcha
                  text={captcha}
                  onClick={() => {
                    this.changeCaptcha();
                    this.loginForm.current.setFieldsValue({ captcha: '' });
                  }}
                />
              </Col>
            </Row>

            <TItem style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }}>
              <Button block type="primary" htmlType="submit">
                ??????
              </Button>
            </TItem>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
