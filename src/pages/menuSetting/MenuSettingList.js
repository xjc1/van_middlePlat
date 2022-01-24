import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

@connect(({ menuSetting, loading }) => ({
  ...menuSetting,
  loading: loading.effects['menuSetting/fetchList'],
}))
class MenuSettingList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      columns,
      onPageSizeChange = EmptyFn,
      loading,
      className,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          loading={loading}
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

export default MenuSettingList;
