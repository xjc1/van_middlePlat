import React from 'react';
import _ from 'lodash';
import { getAuth } from '../../models/user';

function hasAuth(currentAuth) {
  const allUserAuth = getAuth();
  if (Array.isArray(currentAuth)) {
    return !!_.intersection(currentAuth, allUserAuth).length;
  }
  return !!_.intersection([currentAuth], allUserAuth).length;
}

function authCheck(auth, children, empty = <></>) {


  // re
  if (hasAuth(auth)) {
    return children;
  }
  // 如果权限不通过 给定默认返回的值
  return empty;
}

export default authCheck;
export { hasAuth };
