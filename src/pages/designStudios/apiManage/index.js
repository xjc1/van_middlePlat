import React from 'react';
import { connect } from 'dva';
import ProjectList from './projectList';
import ApiList from './apiList';

function Index({ project }) {
  const isShowSubPage = project !== '' && project !== null && project !== undefined;
  return isShowSubPage ? <ApiList /> : <ProjectList />;
}

export default connect(({ apiManage }) => apiManage)(Index);
