import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';

const SortDirections = {
  ascend: 0,
  descend: 1,
};

@connect(({ policyContent }) => policyContent)
class PolicyContentList extends PureComponent {
  state = {
    sortName: undefined,
    sortRegulation: undefined,
  };

  componentDidMount() {
    this.fetchPolicyContent({});
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyContent/clear',
    });
  }

  fetchPolicyContent({ page = 0, pageSize = 10, sortConditions = {} }) {
    const { dispatch, condition, query } = this.props;
    const { sortName, sortRegulation } = this.state;
    const newCondition = {
      ...query,
      ...condition,
      sortName,
      sortRegulation: SortDirections[sortRegulation],
      ...sortConditions,
    };
    dispatch({
      type: 'policyContent/fetchList',
      payload: {
        page,
        size: pageSize,
      },
      condition: newCondition,
    });
  }

  render() {
    const {
      list,
      total,
      pageSize,
      page,
      dispatch,
      focusItem,
      columns,
      className,
      ...others
    } = this.props;
    const { sortName, sortRegulation } = this.state;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          showSorterTooltip={false}
          onChange={(pagination, filter, sorter) => {
            const { order, column: sortColumn } = sorter;
            const { dataIndex } = sortColumn || {};
            if (sortName !== dataIndex || order !== sortRegulation) {
              this.fetchPolicyContent({
                sortConditions: { sortName: dataIndex, sortRegulation: SortDirections[order] },
              });
            }
            this.setState({ sortName: dataIndex, sortRegulation: order });
          }}
          // sortDirections={[0, 1]}
          pagination={{
            total,
            pageSize,
            current: page,
            onChange: current => {
              this.fetchPolicyContent({ page: current, pageSize });
            },
          }}
          rowKey="id"
          {...others}
        />
      </div>
    );
  }
}

export default PolicyContentList;
