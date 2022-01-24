import React, { Component } from 'react';
import { Row, Col, Card, message } from 'antd';
import { ONEFORM } from '@/services/api';
import PageTabLayout from './PageTabLayout';
import RefreshCard from '../../refresh/RefreshCard';

class FreshRegular extends Component {
  state = {
    isRegularRefresh: false,
  };

  isUnmount = false;

  componentWillUnmount() {
    this.isUnmount = true;
  }

  onRefreshRegular = () => {
    this.setState({
      isRegularRefresh: true,
    });

    ONEFORM.chatRefreshUsingGET({ params: { refreshType: 5 } })
      .then(() => {
        if (!this.isUnmount) {
          message.success('刷新规则成功');
          this.setState({ isRegularRefresh: false });
        }
      })
      .catch(() => {
        if (!this.isUnmount) {
          message.error('刷新规则失败');
          this.setState({ isRegularRefresh: false });
        }
      });
  };

  render() {
    const { isRegularRefresh } = this.state;

    return (
      <PageTabLayout curPath="displayPosition_freshRegular">
        <Card title="刷新规则">
          <Row gutter={16}>
            <Col span={8}>
              <RefreshCard
                title="刷新规则"
                loading={isRegularRefresh}
                onRefresh={() => {
                  this.onRefreshRegular();
                }}
              />
            </Col>
          </Row>
        </Card>
      </PageTabLayout>
    );
  }
}

export default FreshRegular;
