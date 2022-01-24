import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

@connect(({ tableManage }) => tableManage)
class TableManageList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      className,
      columns,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              onPageSizeChange({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default TableManageList;
