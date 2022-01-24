import React, { PureComponent } from 'react';
import { FileSearchOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import checkRolePermission from './checkRolePermission';

@connect(({ roles }) => roles)
class RolesList extends PureComponent {
  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },

    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 250,
      render: (text, record) => {
        const { onEdit } = this.props;
        return (
          <OperateBar>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => checkRolePermission(record)}
            >
              查看权限
            </OperateBar.Button>
            <OperateBar.Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
              编辑
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  render() {
    const {
      list = [],
      total,
      size,
      query,
      pageNum,
      dispatch,
      fetchRoles,
      focusItem,
      ...others
    } = this.props;
    return (
      <div>
        <TTable
          columns={this.columns}
          dataSource={list}
          pagination={{
            total,
            pageSize: size,
            current: pageNum,
            onChange: page => {
              fetchRoles({ page, size, query });
            },
          }}
          rowKey="id"
          {...others}
        />
      </div>
    );
  }
}

export default RolesList;
