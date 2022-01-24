import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

@connect(({ materialSplit, loading }) => ({
  ...materialSplit,
  loading:
    loading.effects['materialSplit/fetchList'] ||
    loading.effects['materialSplit/getMaterialDetail'],
}))
class MaterialSplitList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      className,
      columns,
      loading,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          scroll={{ x: '100%' }}
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

export default MaterialSplitList;
