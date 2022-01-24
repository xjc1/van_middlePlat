
import React, { PureComponent } from 'react';
import { connect } from "dva";
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';


@connect(({ rubbishWords, loading }) => ({ ...rubbishWords, loading: loading.effects['rubbishWords/fetchList'], }))
class RubbishWordsList extends PureComponent {

  render() {
    const { list, total, pageSize,
      pageNum, dispatch, focusItem,
      loading,
      onPageSizeChange = EmptyFn, className, columns,
      ...others } = this.props;
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
            onChange: (page) => {
              onPageSizeChange({ page, size: pageSize })
            }
          }}
          rowKey="id" />
      </div>
    );
  }

}

export default RubbishWordsList;

