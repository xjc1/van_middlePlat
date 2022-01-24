import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, DateTools } from '@/components/tis_ui';
import globalStyles from '@/global.less';
import { commonReview } from '@/utils/constantEnum';
import { Badge } from 'antd';

const statusColor = {
  0: 'blue',
  1: 'green',
};

@connect(({ subscription }) => subscription)
class SubscriptionList extends PureComponent {
  componentDidMount() {
    this.fetchSubscription({});
  }

  fetchSubscription({ page = 0, size = 10 }) {
    const { dispatch } = this.props;
    dispatch({
      type: 'subscription/fetchList',
      payload: {
        page,
        size,
      },
    });
  }

  handleRead = id => {};

  handleExamine = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'subscription/resetReviewViewView',
      payload: {
        reviewView: true,
        info: record,
        id: record.id,
      },
    });
  };

  handleRevoke = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'subscription/resetReviewViewView',
      payload: {
        reviewView: true,
        info: record,
        id: record.id,
      },
    });
  };

  render() {
    const { list, totalElements, size, page, ...others } = this.props;

    const columns = [
      {
        title: '模型编号',
        dataIndex: 'modelNumber',
        className: globalStyles.primaryColmn,
      },
      {
        title: '模型名字',
        dataIndex: 'modelName',
        className: globalStyles.primaryColmn,
      },
      {
        title: '订阅机构',
        dataIndex: 'department',
      },
      {
        title: '状态',
        dataIndex: 'review',
        render: review => {
          return <Badge color={statusColor[review]} text={commonReview.$v_names[review]} />;
        },
      },
      {
        title: '申请日期',
        dataIndex: 'subscribeTime',
        render: subscribeTime => {
          return subscribeTime && subscribeTime.startTime
            ? DateTools.transformDefaultFormat(subscribeTime.startTime)
            : '';
        },
      },
      {
        title: '有效期',
        dataIndex: 'subscribeTime',
        render: subscribeTime => {
          return subscribeTime && subscribeTime.endTime
            ? DateTools.transformDefaultFormat(subscribeTime.endTime)
            : '';
        },
      },
      {
        title: '操作',
        dataIndex: 'operator',
        render: (text, record) => (
          <span>
            {record.review === 0 ? (
              <a onClick={this.handleExamine.bind(this, record)}>审核</a>
            ) : record.review === 1 ? (
              <a onClick={this.handleRevoke.bind(this, record)} style={{ color: 'red' }}>
                撤销
              </a>
            ) : (
              ''
            )}
          </span>
        ),
      },
    ];

    return (
      <div>
        <TTable
          columns={columns}
          dataSource={list}
          pagination={{
            total: totalElements,
            hideOnSinglePage: false,
            pageSize: size,
            current: page,
            onChange: page => {
              this.fetchSubscription({ page: page, size: size });
            },
          }}
          rowKey={item => item.id}
          {...others}
        />
      </div>
    );
  }
}

export default SubscriptionList;
