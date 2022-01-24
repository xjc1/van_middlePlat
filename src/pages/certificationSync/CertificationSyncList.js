import React, { PureComponent } from 'react';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { certificationSyncStatus } from "@/utils/constantEnum";

class CertificationSyncList extends PureComponent {

  render() {
    const {
      list, total, pageSize,
      pageNum, dispatch, focusItem,
      onPageSizeChange = EmptyFn,
      className,
      loading,
      ...others
    } = this.props;
    return (
      <div className={className}>
        <TTable
          loading={loading}
          columns={[
            {
              title: '同步状态',
              dataIndex: 'status',
              render(status) {
                return certificationSyncStatus.$v_names[status];
              }
            }, {
              title: '未同步数',
              dataIndex: 'notSync',
            }, {
              title: '已同步数',
              dataIndex: 'already',
            },{
              title: '开始时间',
              dataIndex: 'btime',
            },{
              title: '结束时间',
              dataIndex: 'etime',
            },{
              title: '操作人员',
              dataIndex: 'operator',
            },
          ]}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: (page) => {
              onPageSizeChange({ page, size: pageSize });
            }
          }}
          rowKey="id" />
      </div>
    );
  }

}

export default CertificationSyncList;

