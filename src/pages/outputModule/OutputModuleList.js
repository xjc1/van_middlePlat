import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { EditOutlined, FileSearchOutlined, RollbackOutlined } from '@ant-design/icons';
import { appUserType } from '@/utils/constantEnum';
import { TAGOUTPUTS } from '@/services/api';
import { notification } from 'antd';
import router from '@/utils/tRouter';
import authEnum, { hasAuth } from '@/utils/auth';

@connect(({ outputModule, loading }) => ({
  ...outputModule,
  loading: loading.effects['outputModule/fetchList'],
}))
class OutputModuleList extends PureComponent {
  columns = [
    {
      title: '模块名称',
      dataIndex: 'name',
      width: '45%',
    },
    {
      title: '模块编码',
      dataIndex: 'code',
    },
    {
      title: '对象类型',
      dataIndex: 'object',
      render: type => appUserType.$v_names[type],
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      dataIndex: 'id',
      render: (id, record) => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                disabled={!hasAuth(authEnum.outputModule_edit_alias)}
                onClick={() =>
                  router.push({
                    name: `outputModule_edit`,
                    query: { id, object: record.object },
                  })
                }
                icon={<EditOutlined />}
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                danger
                disabled={!hasAuth(authEnum.outputModule_delete)}
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent="删除将不可能再恢复,确定删除吗?"
                onClick={() => this.handleDeleteOutputModule(id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() =>
              router.push({
                name: `outputModule_view`,
                query: { id, object: record.object },
              })
            }
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  handleDeleteOutputModule = id => {
    const { fetchList = EmptyFn, pageSize, pageNum } = this.props;
    TAGOUTPUTS.deleteTagOutputUsingPOST(id)
      .then(() => {
        notification.success({
          message: '删除成功',
        });
        fetchList({ page: pageNum, size: pageSize });
      })
      .catch(e => {
        notification.error({
          message: `删除失败，${e.msg}`,
        });
      });
  };

  render() {
    const { loading, list, total, pageSize, pageNum, fetchList = EmptyFn, className } = this.props;
    return (
      <div className={className}>
        <TTable
          loading={loading}
          columns={this.columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => fetchList({ page, size: pageSize }),
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default OutputModuleList;
