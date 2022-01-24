/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'dva';

@connect(({ user: { currentUser } }) => ({
  permissions: currentUser.permissions,
  // permissions: ['hasAuth'],
}))
class WrapComponent extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
  }

  static propTypes = {
    auth: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  };

  static defaultProps = {
    permissions: [],
  };

  hasAuth = currentAuth => {
    const { permissions } = this.props;
    if (Array.isArray(currentAuth)) {
      return _.intersection(currentAuth, permissions).length;
    }
    return _.intersection([currentAuth], permissions).length;
  };

  render() {
    const { auth, children } = this.props;
    if (this.hasAuth(auth)) {
      return children;
    } else {
      return <></>;
    }
  }
}

export default WrapComponent;
