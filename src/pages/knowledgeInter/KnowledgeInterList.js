import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';


@connect(({ knowledgeInter }) => knowledgeInter)
class KnowledgeInterList extends PureComponent {
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
      query,
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
              onPageSizeChange({ page, size: pageSize, query });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default KnowledgeInterList;
