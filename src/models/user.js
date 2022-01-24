import React from 'react';
import { AUTH, KERNEL, KEYPAIRS, SYS } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import PERMISSION from '@/utils/permissionEnum';
import { adminPermission } from '@/constants';
import { message, Modal } from 'antd';
import { intersection } from 'lodash';
import { EventCenter } from '@/components/tis_ui';
import { systemConfigs } from '@/utils/constantEnum';
import ResetPasswordForm from "@/pages/userInfo/ResetPasswordForm";
import rsa from "@/utils/rsa";

let authArray = [];

let pwdWarring = '';

function checkCredentialsExpiredAfter({ credentialsExpiredAfter }) {
  return new Promise((resolve) => {
    if (credentialsExpiredAfter >= 0 && credentialsExpiredAfter <= 7) {
      Modal.info({
        title: '重要提示',
        content: (
          <div>
            <p>{`您的密码已临近过期（剩余：${credentialsExpiredAfter}天），请及时修改密码。`}</p>
          </div>
        ),
        onOk() {
          resolve(true);
        },
      });
    }
    if (credentialsExpiredAfter < 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let formRef = null;
      Modal.error({
        title: '您的密码已经过期, 请重置密码.',
        content: (
          <ResetPasswordForm hasFooter={false}
                             onForm={(ref) => {
                               formRef = ref;
                             }} />
        ),
        onOk(close) {
          KEYPAIRS.getRsaPublicKeyUsingPOST().then(({ publicKey }) => {
            formRef.validateFields().then(vals => {
              if (vals.newPassword !== vals.confirmPassword) {
                message.error('两次输入的密码不一致，请重新输入');
                formRef.setFieldsValue({ confirmPassword: '' });
              } else {
                KERNEL.userUpdatePasswordUsingPOST({
                  body: {
                    oldPassword: rsa(publicKey, vals.oldPassword),
                    newPassword: rsa(publicKey, vals.newPassword),
                  }
                }).then(() => {
                  formRef.resetFields();
                  close();
                  message.success('密码修改成功.');
                  resolve(true);
                });
              }
            });
          });
        },
        okText: '确认',
      });
    }
    if (credentialsExpiredAfter > 7) {
      resolve(true);
    }
  });
}

const UserModel = {
  namespace: 'user',
  state: {
    token: '',
    currentUser: {},
    isLogin: false,
  },
  effects: {
    * fetchCurrent({ needCheck = true }, { put }) {
      const res = yield AUTH.getUserInfoUsingGET({});
      const data = yield SYS.getSystemConfigUsingGET({
        params: { code: systemConfigs.defaultDept },
      });
      const {
        credentialsExpiredAfter,
        admin = false,
        username,
      } = res;
      if (needCheck && !admin && !(pwdWarring === username)) {
        yield checkCredentialsExpiredAfter({ credentialsExpiredAfter, needCheck });
        pwdWarring = username;
      }
      const newResult = { ...res };
      // 超级管理员给所有权限 并给admin专有权限标识
      if (admin) {
        const { permissions = [] } = res;
        const adminAuth = [...PERMISSION.permissionKeys, adminPermission];
        newResult.permissions = adminAuth;
        // admin给默认部门
        newResult.dept = {
          departNum: data.defaultDept,
          ...res.dept,
          parentDepartmentId: '0',
        };
        // 判断数据库admin权限是否完整
        const bothHas = intersection(permissions, adminAuth);
        // 数据库权限不全则更新
        if (bothHas.length !== adminAuth.length) {
          yield KERNEL.updateAdminPermissionsUsingPOST({ body: adminAuth });
        }
      }
      authArray = newResult.permissions;
      // 首次就加载部门信息
      yield put({
        type: 'department/fetchAll',
      });
      // 加载系统名称
      yield put({
        type: 'systemParamsConfig/fetchTitle',
      });

      yield put({
        type: 'saveCurrentUser',
        payload: {
          token: localStorage.getItem('token'),
          isLogin: true,
          currentUser: newResult,
        },
      });
    },

    * changePassword({ payload }) {
      try {
        yield KERNEL.userUpdatePasswordUsingPOST({ body: payload });
        message.success('密码修改成功');
      } catch (e) {
        message.error(`密码修改失败, [${e.msg}]`);
      }
    },
  },
  reducers: {
    saveCurrentUser(state, { payload: { token, currentUser, isLogin, menus = [] } }) {
      localStorage.setItem('token', token);
      setAuthority(currentUser.permissions);
      return { ...state, token, currentUser, isLogin, menus };
    },

    deleteCurrentUser(state) {
      EventCenter.emit('cleanCache');
      return { ...state, currentUser: {}, isLogin: false };
    },
  },
};
export default UserModel;

const getAuth = () => [...authArray];

export { getAuth };
