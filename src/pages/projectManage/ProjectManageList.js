import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

@connect(({ projectManage, loading }) => ({
  ...projectManage,
  loading: loading.effects['projectManage/fetchList'],
}))
class ProjectManageList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      columns,
      onPageSizeChange = EmptyFn,
      className,
      loading,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
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

export default ProjectManageList;
