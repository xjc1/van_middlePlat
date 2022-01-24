import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import RolesQuerybar from './RolesQueryBar';
import RolesList from './RolesList';
import styles from './roles.less';
import CreateRoleModal from './compontents/createRole';
import { pageStatus as pageEnum } from '@/utils/constantEnum';

@connect(({ roles }) => ({ ...roles }))
class Index extends PureComponent {
  queryForm = null;

  state = {
    modalVisible: false,
    pageStatus: pageEnum.new,
    currentRecord: {},
  };

  componentDidMount() {
    this.fetchRoles({});
  }

  fetchRoles = ({ query = {}, page = 0, size = 5 }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'roles/fetchList',
      payload: {
        query,
        params: { page, size },
      },
    });
  };

  reload = () => {
    const { size, pageNum, query } = this.props;
    this.fetchRoles({ query, page: pageNum, size });
  };

  handleCancel = () => {
    this.setState({ modalVisible: false, currentRecord: {} });
  };

  onEdit = record => {
    this.setState({ currentRecord: record, modalVisible: true, pageStatus: pageEnum.edit });
  };

  render() {
    const { modalVisible, currentRecord } = this.state;
    const { viewPermissions = '' } = currentRecord;
    const initData = { ...currentRecord, viewPermissions: viewPermissions.split(',').filter(it => !!it) };
    return (
      <div>
        <Fragment>
          <RolesQuerybar
            onForm={form => {
              this.queryForm = form;
            }}
            actions={
              <>
                <TButton.Create
                  onClick={() =>
                    this.setState({
                      modalVisible: true,
                      pageStatus: pageEnum.new,
                      currentRecord: {},
                    })
                  }
                >
                  新增角色
                </TButton.Create>
              </>
            }
            footer={
              <>
                <TButton.Search
                  onClick={() => {
                    this.queryForm.validateFields().then(query => {
                      console.info(query);
                      this.fetchRoles({
                        query,
                      });
                    });
                  }}
                >
                  查询
                </TButton.Search>
                <TButton.Reset
                  onClick={async () => {
                    // 重置数据
                    this.queryForm.resetFields();
                    this.fetchRoles({});
                  }}
                >
                  重置
                </TButton.Reset>
              </>
            }
          />
          <RolesList
            fetchRoles={this.fetchRoles}
            className={styles.rolesList}
            onEdit={this.onEdit}
          />
        </Fragment>
        {modalVisible && (
          <CreateRoleModal
            handleCancel={this.handleCancel}
            initData={initData}
            editVisible
            pageStatus={this.state.pageStatus}
            reload={this.reload}
          />
        )}
      </div>
    );
  }
}

export default Index;
