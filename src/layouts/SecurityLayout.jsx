import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { utils } from '@/components/tis_ui';

const { onceFunc } = utils;

const initPermissions = onceFunc();

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    // 获取系统参数配置
    dispatch({
      type: 'systemParamsConfig/fetchConfigList',
    });

    // 有 token 的时候才去获取当前用户信息
    if (localStorage.token && dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      // 获取所有根字典
      dispatch({
        type: 'global/getRootDict',
      });

      initPermissions(() => {
        // 把子模块的数据混入到权限表
        dispatch({
          type: 'roles/initPermissions',
        });
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const loginType = localStorage.getItem('loginType');
    const { children, loading, isLogin } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    // 通过校验：当用户已经登录时，通过
    const shouldPass = isLogin && localStorage.token;

    if ((!shouldPass && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!shouldPass && loginType !== 'sso') {
      return <Redirect to="/login" />;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  isLogin: user.isLogin,
  loading: loading.models.user,
}))(SecurityLayout);
