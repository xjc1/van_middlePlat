import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

import _ from 'lodash';



@connect(({ commonQuestion }) => commonQuestion)
class CommonQuestionList extends PureComponent {
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
      columns,
      ...others
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

export default CommonQuestionList;
