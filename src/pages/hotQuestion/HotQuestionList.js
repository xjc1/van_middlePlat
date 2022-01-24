import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

@connect(({ hotQuestion }) => hotQuestion)
class HotQuestionList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      dispatch,
      focusItem,
      onPageSizeChange = EmptyFn,
      className,
      ...others
    } = this.props;
    return (
      <div className={className}>
        <TTable
          bordered
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

export default HotQuestionList;
