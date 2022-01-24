import React, { PureComponent } from 'react';
import { connect } from 'dva';
import SubscriptionQueryBar from '@/pages/subscription/SubscriptionQueryBar';
import { TButton } from '@/components/tis_ui';
import SubscriptionList from '@/pages/subscription/SubscriptionList';
import styles from './subscription.less';
import ReviewModel from './reviewModel';
import { Button } from 'antd';

@connect(({ subscription }) => subscription)
class Index extends PureComponent {
  queryForm = null;

  query = ({ page = 0, size = 10 }) => {
    const params = this.queryForm.getFieldsValue();
    const { dispatch } = this.props;
    dispatch({
      type: 'subscription/fetchList',
      payload: {
        page,
        size,
        ...params,
      },
    });
  };

  resetData = () => {
    this.queryForm.resetFields();
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'subscription/resetInitial' });
  }

  render() {
    const { reviewView } = this.props;

    return (
      <div>
        <SubscriptionQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search onClick={this.query}>查询</TButton.Search>

              <TButton.Reset onClick={this.resetData}>重置</TButton.Reset>
            </>
          }
        />

        <SubscriptionList className={styles.subscriptionList} />

        {reviewView && <ReviewModel />}
      </div>
    );
  }
}

export default Index;
