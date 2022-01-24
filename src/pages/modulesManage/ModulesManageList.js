import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { EditOutlined, FileSearchOutlined, RollbackOutlined } from '@ant-design/icons';
import { appUserType, modulesContentType } from '@/utils/constantEnum';
import { MODULES } from '@/services/api';
import globalStyles from '@/global.less';
import { message } from 'antd';
import router from '@/utils/tRouter';
import authEnum, { hasAuth } from '@/utils/auth';

@connect(({ modulesManage, loading }) => ({
  ...modulesManage,
  loading: loading.effects['modulesManage/fetchList'],
}))
class ModulesManageList extends PureComponent {
  columns = [
    {
      title: '模块名称',
      dataIndex: 'name',
      width: '30%',
      className: globalStyles.primaryColmn,
    },
    {
      title: '模块编码',
      dataIndex: 'code',
    },
    {
      title: '对象类型',
      dataIndex: 'object',
      render: object => appUserType.$v_names[object],
    },
    {
      title: '覆盖内容类型',
      dataIndex: 'contentType',
      render: (types = []) => {
        return types.map(type => modulesContentType.$v_names[type]).join();
      },
    },
    {
      title: '操作',
      align: 'center',
      width: '200',
      render: record => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                disabled={!hasAuth(authEnum.modules_edit_alias)}
                icon={<EditOutlined />}
                onClick={() => router.push({ name: 'modules_edit', params: { id: record.id } })}
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                disabled={!hasAuth(authEnum.modules_delete)}
                danger
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent="删除模块将不可能再恢复，确定删除吗？"
                onClick={() => this.handleDelete(record.id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() => router.push({ name: 'modules_view', params: { id: record.id } })}
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  handleDelete(id) {
    const { pageNum, pageSize, fetchList = EmptyFn } = this.props;
    MODULES.deleteModuleUsingPOST(id)
      .then(() => {
        message.success('删除模块成功');
        fetchList({ page: pageNum, size: pageSize });
      })
      .catch(err => {
        message.success(`删除模块失败，${err.msg}`);
      });
  }

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;
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
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default ModulesManageList;
