import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Avatar, Tag, notification, message } from 'antd';
import { OperateBar, TTable } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import { MinusOutlined, SyncOutlined, EditOutlined } from '@ant-design/icons';
import { commonStatus } from '@/utils/constantEnum';
import { hasAuth } from '@/utils/auth';
import { defaultPwd, adminPermission } from '@/constants';
import CreateUserModal from '@/pages/userManager/users/CreateUserModal';

@connect(({ users, department }) => ({
  ...users,
  flatDeparts: department.flatDeparts,
}))
class UsersList extends PureComponent {
  passwordForm = React.createRef();

  state = {
    modalVisible: false,
    currentRecord: null,
  };

  columns = [
    {
      title: '',
      dataIndex: 'avatarUrl',
      render: text => <Avatar src={text} />,
    },
    {
      title: '账号登录名',
      dataIndex: 'userName',
    },
    {
      title: '用户姓名',
      dataIndex: 'name',
    },
    {
      title: '部门',
      dataIndex: 'departNum',
      render: departmentId => {
        const { flatDeparts } = this.props;
        return flatDeparts[departmentId];
      },
    },
    {
      title: '角色',
      dataIndex: 'roles',
      width: 100,
      render: (text = []) => {
        return text.map(it => {
          const { roleName, id } = it;
          return (
            <Tag key={id} style={{ margin: 4 }} color="blue">
              {roleName}
            </Tag>
          );
        });
      },
    },
  ];

  adminColumns = [
    {
      title: '操作',
      key: 'action',
      width: 250,
      align: 'center',
      render: record => {
        const { userType } = record;
        const buttonDisable = userType === 0;
        return (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  disabled={buttonDisable}
                  icon={<EditOutlined />}
                  onClick={() => {
                    this.onEdit(record.id);
                  }}
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Button
                  disabled={buttonDisable}
                  style={{ color: buttonDisable ? 'grey' : '#ff7875' }}
                  icon={<MinusOutlined />}
                  confirmText="警告"
                  confirmContent="确定你要删除此用户吗?"
                  onClick={() => {
                    const { id } = record;
                    const { fetchUsers } = this.props;
                    KERNEL.removeUserUsingPOST(id, { userId: id }).then(() => {
                      fetchUsers({});
                      notification.success({
                        message: '成功删除',
                      });
                    });
                  }}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<SyncOutlined />}
              confirmText="警告"
              confirmContent="确定重置用户密码?"
              onClick={() => this.defautlResetPwd(record.id)}
            >
              重置密码
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers({ user: { status: commonStatus.VALID } });
  }

  defautlResetPwd = id => {
    KERNEL.adminUpdatePasswordUsingPOST({
      body: { userId: id },
    }).then(() => {
      message.success('操作成功');
    });
  };

  onEdit = async id => {
    const result = await KERNEL.queryUserDetailUsingGET(id);
    // const result = {id, userName: 'zhourb'}
    this.setState({
      modalVisible: true,
      currentRecord: result,
    });
  };

  render() {
    const { list, total, pageSize, pageNum, fetchUsers, query } = this.props;
    const { modalVisible, currentRecord } = this.state;
    let authColumns = this.columns;
    // 超级管理员才有的操作
    if (hasAuth(adminPermission)) {
      authColumns = [...this.columns, ...this.adminColumns];
    }
    return (
      <div>
        <TTable
          columns={authColumns}
          dataSource={list}
          pagination={{
            total,
            hideOnSinglePage: true,
            pageSize,
            current: pageNum,
            onChange: page => {
              fetchUsers({ query, page, pageSize });
            },
          }}
          rowKey="id"
        />
        {modalVisible && (
          <CreateUserModal
            title="用户编辑"
            visible
            initialValues={currentRecord}
            doClose={() => {
              this.setState({ modalVisible: false });
            }}
            onSuccess={() => {
              this.setState({ modalVisible: false });
              fetchUsers({});
            }}
          />
        )}
      </div>
    );
  }
}

export default UsersList;
