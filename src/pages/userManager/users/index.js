import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import UsersQueryBar from './UsersQueryBar';
import UsersList from './UsersList';
import styles from './users.less';
import layoutSytles from '@/layouts/PageLayout/layout.less';
import DepartmentTree from '@/pages/userManager/department/DepartmentTree';
import CreateUserModal from '@/pages/userManager/users/CreateUserModal';
import { hasAuth } from '@/utils/auth';
import { adminPermission } from '@/constants';

@connect(({ users, department }) => ({
  ...users,
  departments: department.list,
}))
class Index extends PureComponent {
  queryForm = null;

  state = {
    createModal: false,
  };

  componentDidMount() {
    this.fetchDepartment({});
  }

  fetchDepartment() {
    const { dispatch } = this.props;
    dispatch({
      type: 'department/fetchList',
    });
  }

  fetchAndFilterUsers = ({ query = {}, page = 0, size = 5 }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/fetchAndFilterList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    const { createModal } = this.state;
    const {
      query: { departmentId },
    } = this.props;
    return (
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.treeLeftGrid}>
          <DepartmentTree
            selectedKeys={[departmentId]}
            onSelect={([id]) => {
              if (id) {
                this.fetchAndFilterUsers({ query: { departmentId: id } });
              }
            }}
          />
        </div>
        <div className={layoutSytles.rightGrid}>
          <UsersQueryBar
            onForm={form => {
              this.queryForm = form;
            }}
            actions={
              <>
                {hasAuth(adminPermission) && (
                  <TButton.Create
                    onClick={() => {
                      this.setState({ createModal: true });
                    }}
                  >
                    创建
                  </TButton.Create>
                )}
              </>
            }
            footer={
              <>
                <TButton.Search
                  onClick={() => {
                    this.queryForm.validateFields().then(user => {
                      this.fetchAndFilterUsers({ query: user });
                    });
                  }}
                >
                  查询
                </TButton.Search>
                <TButton.Reset
                  onClick={() => {
                    this.queryForm.resetFields();
                    const condition = this.queryForm.getFieldsValue();
                    this.fetchAndFilterUsers({ query: condition });
                  }}
                >
                  重置
                </TButton.Reset>
              </>
            }
          />
          <UsersList fetchUsers={this.fetchAndFilterUsers} className={styles.usersList} />
        </div>
        <CreateUserModal
          title="创建新用户"
          visible={createModal}
          doClose={() => {
            this.setState({ createModal: false });
          }}
          onSuccess={() => {
            this.setState({ createModal: false });
            this.fetchAndFilterUsers({});
          }}
        />
      </div>
    );
  }
}

export default Index;
