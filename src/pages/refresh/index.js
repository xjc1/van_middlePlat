import React, { Component } from 'react';
import { Row, Col, Card, Button, message } from 'antd';
import { ONEFORM } from '@/services/api';
import RefreshCard from './RefreshCard';

class Index extends Component {
  state = {
    isQaRefreshing: false,
    isShellRefreshing: false,
  };

  isUnmount = false;

  componentWillUnmount() {
    this.isUnmount = true;
  }

  handleRefreshAll = () => {
    this.handleRefreshQa();
    this.handleRefreshShell();
  };

  handleRefreshQa = () => {
    this.setState({
      isQaRefreshing: true,
    });
    ONEFORM.chatRefreshUsingGET({})
      .then(() => {
        if (!this.isUnmount) {
          message.success('刷新问答端成功');
          this.setState({ isQaRefreshing: false });
        }
      })
      .catch(() => {
        if (!this.isUnmount) {
          message.error('刷新问答端失败');
          this.setState({ isQaRefreshing: false });
        }
      });
  };

  handleRefreshShell = () => {
    this.setState({
      isShellRefreshing: true,
    });

    ONEFORM.shellRefreshUsingGET()
      .then(() => {
        if (!this.isUnmount) {
          message.success('刷新 shell 端成功');
          this.setState({ isShellRefreshing: false });
        }
      })
      .catch(() => {
        if (!this.isUnmount) {
          message.error('刷新 shell 端失败');
          this.setState({ isShellRefreshing: false });
        }
      });
  };


  render() {
    const { isQaRefreshing, isShellRefreshing } = this.state;

    return (
      <Card
        title={
          <Button
            type="primary"
            onClick={() => this.handleRefreshAll()}
            style={{ marginRight: '20px' }}
            disabled={isQaRefreshing && isShellRefreshing}
          >
            全部刷新
          </Button>
        }
      >
        <Row gutter={16}>
          <Col span={8}>
            <RefreshCard
              title="刷新问答端"
              loading={isQaRefreshing}
              onRefresh={() => {
                this.handleRefreshQa();
              }}
            />
          </Col>
          <Col span={8}>
            <RefreshCard
              title="刷新 shell 端"
              loading={isShellRefreshing}
              onRefresh={() => {
                this.handleRefreshShell();
              }}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Index;
