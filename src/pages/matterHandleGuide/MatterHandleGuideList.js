import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';

@connect(({ matterHandleGuide }) => matterHandleGuide)
class MatterHandleGuideList extends PureComponent {
  render() {
    const { list, pagination, className, columns } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          scroll={{ x: 1300 }}
          pagination={pagination}
          rowKey="id"
        />
      </div>
    );
  }
}

export default MatterHandleGuideList;
