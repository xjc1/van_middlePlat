import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

@connect(({ dictDepartmentManage }) => dictDepartmentManage)
class DictDepartmentManageList extends PureComponent {
  render() {
    const {
      columns,
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      className,
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

export default DictDepartmentManageList;
