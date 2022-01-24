import React, { useEffect } from 'react';
import { TreeSelect } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';

function item2treeNode(roots, group) {
  return _.map(roots, department => ({
    value: department.departNum,
    key: department.departNum,
    title: department.departmentName,
    children: item2treeNode(group[department.id], group),
  }));
}

function DepartmentTreeSelect({ list = [], dispatch, currentUser, ...others }) {
  useEffect(() => {
    if (list.length === 0) {
      dispatch({
        type: 'department/fetchAll',
      });
    }
  }, []);

  const { dept } = currentUser;
  const groups = _.groupBy(list, 'parentDepartmentId');
  return (
    <>
      {list.length > 0 && (
        <TreeSelect
          getPopupContainer={triggerNode => triggerNode.parentElement}
          treeData={list.length > 0 ? item2treeNode(groups[dept.parentDepartmentId], groups) : []}
          {...others}
        />
      )}
    </>
  );
}

export default connect(({ department, user }) => ({
  list: department.list,
  currentUser: user.currentUser,
}))(DepartmentTreeSelect);
