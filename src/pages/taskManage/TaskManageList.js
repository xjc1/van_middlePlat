
import React, { PureComponent } from 'react';
import { connect } from "dva";
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';




@connect(({ taskManage, loading }) =>({...taskManage,   loading: loading.effects['taskManage/fetchList'],}))
class TaskManageList extends PureComponent {


  render() {
    const { list, total, pageSize,
    pageNum, dispatch, focusItem,
    onPageSizeChange = EmptyFn,className,
    loading,
    columns,
     ...others } = this.props;
    return (
      <div className={className}>
        <TTable
        {...others}
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

export default TaskManageList;

  