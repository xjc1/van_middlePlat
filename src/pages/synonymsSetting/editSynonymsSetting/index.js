import React from 'react';
import { Modal } from 'antd';
import { qaSettingName } from '@/utils/constantEnum';
import EmptyFn from '@/utils/EmptyFn';
import { connect } from 'dva';
import _ from 'lodash';
import Greeting from './forms/Greeting';
import NoAnswer from './forms/NoAnswer';
import Satisfaction from './forms/Satisfaction';
import Voice from './forms/VOICE';
import authEnum, { authCheck } from '@/utils/auth';

function Index(props) {
  const { type = '', finish = EmptyFn, deptCode } = props;

  function renderForm() {
    const editAble = authCheck(authEnum.synonymsSetting_edit_alias, true, false);
    const deleteAble = authCheck(authEnum.synonymsSetting_delete, true, false);

    switch (type) {
      case qaSettingName.GREETING:
        return (
          <Greeting
            attributionDepartment={deptCode}
            editAble={editAble}
            deleteAble={deleteAble}
            {...props}
          />
        );
      case qaSettingName.NOANSWER:
        return (
          <NoAnswer
            attributionDepartment={deptCode}
            editAble={editAble}
            deleteAble={deleteAble}
            {...props}
          />
        );
      case qaSettingName.SATISFACTION:
        return (
          <Satisfaction
            attributionDepartment={deptCode}
            editAble={editAble}
            deleteAble={deleteAble}
            {...props}
          />
        );
      case qaSettingName.VOICE:
        return (
          <Voice
            attributionDepartment={deptCode}
            editAble={editAble}
            deleteAble={deleteAble}
            {...props}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Modal
      title={type && `编辑 —— ${qaSettingName.$v_names[type]}`}
      visible
      okText="提交"
      onCancel={finish}
      maskClosable={false}
      width="80%"
      style={{ color: 'black' }}
      bodyStyle={{
        padding: '10px',
      }}
      footer={null}
    >
      {renderForm()}
    </Modal>
  );
}

export default connect(({ user }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))(Index);
