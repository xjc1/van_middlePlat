import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar } from '@/components/tis_ui';
import { EditOutlined, FileSearchOutlined, RollbackOutlined } from '@ant-design/icons';
import { DICTAUTH } from '@/services/api';
import authEnum, { Auth, hasAuth } from '@/utils/auth';

import CreateModal from './components/formodal';
import DictDepartmentManageQueryBar from './DictDepartmentManageQueryBar';
import DictDepartmentManageList from './DictDepartmentManageList';
import styles from './dictDepartmentManage.less';

@connect(({ dictDepartmentManage }) => dictDepartmentManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    currentRecord: null,
    title: '',
    editAble: false,
    query: {},
  };

  columns = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: (text, record) => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                icon={<EditOutlined />}
                disabled={!hasAuth(authEnum.departmentDict_edit_alias)}
                onClick={() => this.onEdit(record.id, true)}
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                danger
                icon={<RollbackOutlined />}
                confirmText="警告"
                disabled={!hasAuth(authEnum.departmentDict_delete)}
                confirmContent="删除将不可能再恢复,确定删除吗?"
                onClick={() => this.onDelete(record.id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() => this.onEdit(record.id, false)}
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  componentDidMount() {
    this.fetchDictDepartmentManage({});
  }

  fetchDictDepartmentManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dictDepartmentManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchDictDepartmentManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'dictDepartmentManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  onEdit = (recordId, editAble = false) => {
    DICTAUTH.findDictAuthByIdUsingGET(recordId).then((data = {}) => {
      const { dicts = [], ...others } = data;
      const formatData = {
        ...others,
        dicts: dicts.map(({ id, rootId }) => ({ rootId, childIds: [id] })),
      };

      this.setState({ currentRecord: formatData, title: '编辑', editAble });
    });
  };

  onDelete = recordId => {
    DICTAUTH.deleteDictAuthByIdUsingPOST(recordId).then(() => {
      this.fetchDictDepartmentManage({});
    });
  };

  handleCancel = () => {
    this.setState({ currentRecord: null, title: '' });
  };

  reload = () => {
    this.fetchDictDepartmentManageWithQuery({});
  };

  render() {
    const { currentRecord, title: modalTitle, editAble } = this.state;
    return (
      <div>
        <DictDepartmentManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.departmentDict_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    this.setState({ currentRecord: {}, editAble: true });
                  }}
                >
                  新增
                </TButton.Create>
              </Auth>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchDictDepartmentManageWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchDictDepartmentManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />
        {currentRecord && (
          <CreateModal
            initData={currentRecord}
            title={modalTitle}
            handleCancel={this.handleCancel}
            reload={this.reload}
            editAble={editAble}
          />
        )}
        <DictDepartmentManageList
          columns={this.columns}
          className={styles.dictDepartmentManageList}
          onPageSizeChange={this.fetchDictDepartmentManage}
        />
      </div>
    );
  }
}

export default Index;
