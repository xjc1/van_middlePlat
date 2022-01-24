import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PORTRAIT } from '@/services/api';
import { message } from 'antd';
import { TButton, OperateBar } from '@/components/tis_ui';
import { appUserType, tableManageTableType } from '@/utils/constantEnum';
import router from '@/utils/tRouter';

import { EditOutlined, FileSearchOutlined, RollbackOutlined } from '@ant-design/icons';

import TableManageQueryBar from './TableManageQueryBar';
import TableManageList from './TableManageList';
import styles from './tableManage.less';
import TrackTool from '@/utils/TrackTool';
import authEnum, { Auth, hasAuth } from '@/utils/auth';

@connect(({ tableManage }) => tableManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  columns = [
    {
      title: '库表英文名',
      dataIndex: 'enName',
    },
    {
      title: '库表中文名',
      dataIndex: 'cnName',
    },
    {
      title: '对象类型',
      dataIndex: 'objectType',
      render: text => appUserType.$v_names[text],
    },
    {
      title: '库表类型',
      dataIndex: 'type',
      render: text => tableManageTableType.$v_names[text],
    },

    {
      title: '应用函数数',
      dataIndex: 'functionCount',
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: record => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                disabled={!hasAuth(authEnum.tableManage_edit_alias)}
                icon={<EditOutlined />}
                onClick={() => this.onEdit(record.id)}
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                danger
                confirmText="警告"
                disabled={!hasAuth(authEnum.tableManage_delete)}
                confirmContent="删除将不可能再恢复,确定删除吗?"
                icon={<RollbackOutlined />}
                onClick={() => this.handleDelete(record.id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button icon={<FileSearchOutlined />} onClick={() => this.onView(record.id)}>
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  componentDidMount() {
    this.fetchTableManage({});
  }

  onView = tableId => {
    router.push({
      name: 'tableManage_view',
      params: { tableId }
    });
  };

  onEdit = tableId => {
    router.push({
      name: 'tableManage_edit',
      params: { tableId }
    });
  };

  onCreate = () => {
    router.push({
      name: 'tableManage_new',
    });
  };

  handleDelete = tableId => {
    PORTRAIT.removeTableUsingPOST(tableId).then(() => {
      message.success('删除成功');
      this.fetchTableManage({});
    });
  };

  fetchTableManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchTableManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'tableManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    return (
      <div>
        <TableManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <Auth auth={authEnum.tableManage_edit_alias}>
                <TButton.Create onClick={this.onCreate}>新增库表</TButton.Create>
              </Auth>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchTableManageWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchTableManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <TableManageList
          columns={this.columns}
          className={styles.tableManageList}
          onPageSizeChange={this.fetchTableManage}
        />
      </div>
    );
  }
}

export default Index;
