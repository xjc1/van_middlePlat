import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';

@connect(({ dimension }) => dimension)
class DimensionList extends PureComponent {
  componentDidMount() {
    this.fetchDimension();
  }

  fetchDimension(page = 0, pageSize = 10) {
    const { dispatch, condition } = this.props;
    dispatch({
      type: 'dimension/fetchList',
      payload: {
        page,
        size: pageSize,
      },
      condition,
    });
  }

  render() {
    const { list, total, pageSize, columns, page, dispatch, focusItem, ...others } = this.props;
    return (
      <div>
        <TTable
          columns={columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: page,
            onChange: current => {
              this.fetchDimension(current, pageSize);
            },
          }}
          rowKey="id"
          {...others}
        />
      </div>
    );
  }
}

export default DimensionList;
