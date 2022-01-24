import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tabs, Descriptions, message } from 'antd';
import { configUsed, userUserType } from '@/utils/constantEnum';
import _ from "lodash";
import ResetPasswordForm from "./ResetPasswordForm";
import { KEYPAIRS } from "@/services/api";
import rsa from '@/utils/rsa';

const { TabPane } = Tabs;

@connect(({ user, systemParamsConfig }) => ({
  ...user,
  loginValidation: _.get(systemParamsConfig, 'systemConfig.loginValidation', configUsed.no),
}))
class Index extends PureComponent {

  render() {
    const { currentUser, loginValidation, handleCancel, dispatch } = this.props;
    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="个人信息" key="1">
          <Descriptions title="个人基本信息">
            <Descriptions.Item label="登录名" span={3}>
              {currentUser.username}
            </Descriptions.Item>
            <Descriptions.Item label="用户名" span={3}>
              {currentUser.name}
            </Descriptions.Item>
            <Descriptions.Item label="用户类型" span={3}>
              {userUserType.$v_names[currentUser.userType]}
            </Descriptions.Item>
            <Descriptions.Item label="部门" span={3}>
              {currentUser.dept ? currentUser.dept.departmentName : ''}
            </Descriptions.Item>
            <Descriptions.Item label="邮箱" span={3}>
              {currentUser.email}
            </Descriptions.Item>
            <Descriptions.Item label="电话" style={{ display: 'none' }} span={3}>
              {currentUser.phone}
            </Descriptions.Item>
            <Descriptions.Item label="身份证" style={{ display: 'none' }} span={3}>
              {currentUser.userId}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间" span={3}>
              {currentUser.createTime}
            </Descriptions.Item>
          </Descriptions>
        </TabPane>
        <TabPane tab="密码修改" key="2">
          <ResetPasswordForm loginValidation={loginValidation}
                             onSubmit={(formRef) => {
                               KEYPAIRS.getRsaPublicKeyUsingPOST().then(({ publicKey }) => {
                                 formRef.validateFields().then(vals => {
                                   if (vals.newPassword !== vals.confirmPassword) {
                                     message.error('两次输入的密码不一致，请重新输入');
                                     formRef.setFieldsValue({ confirmPassword: '' });
                                   } else {
                                     dispatch({
                                       type: 'user/changePassword',
                                       payload: {
                                         oldPassword: rsa(publicKey, vals.oldPassword),
                                         newPassword: rsa(publicKey, vals.newPassword),
                                       },
                                     });
                                     formRef.resetFields();
                                     handleCancel();
                                   }
                                 });
                               });

                             }}
                             handleCancel={handleCancel} />
        </TabPane>
      </Tabs>
    );
  }
}

export default Index;
