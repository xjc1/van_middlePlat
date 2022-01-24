import React, { PureComponent } from 'react';
import { connect } from "dva";
import { Tag } from 'antd';
import { TTable } from '@/components/tis_ui';

const columns = [
  {
    title: '权限名称',
    dataIndex: 'permissionName',
  },
  {
    title: '规则',
    dataIndex: 'rule',
  },
  {
    title: '操作范围',
    dataIndex: 'oper',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (text) => <Tag color="lime">{text}</Tag>
  },
];


@connect(({ permission }) => permission)
class PermissionsList extends PureComponent {


  render() {
    const { list =[], total, pageSize, pageNum, dispatch, focusItem,fetchList,  ...others } = this.props;
    const list2 = _.map(list, (item) => {
      return {...item, oper:'可读'}
    })
    return (
      <div>
        <TTable
          columns={columns}
          dataSource={list2}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: (page) => {
              fetchList({ page, pageSize })
            }
          }}
          rowKey="id"
          {...others} />
      </div>
    );
  }

}

export default PermissionsList;

