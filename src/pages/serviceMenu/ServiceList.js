import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';

@connect(({ service }) => service)
class ServiceList extends PureComponent {
  
  render() {
    const { columns, list, total, pageSize, pageNum, dispatch, loading, fetchList, ...others } = this.props;

    return (
      <div>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            showQuickJumper: true,
            onChange: page => {
              fetchList({ page, pageSize });
            },
          }}
          rowKey="id"
          {...others}
        />
      </div>
    );
  }
}

export default ServiceList;
