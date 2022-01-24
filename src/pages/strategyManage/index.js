import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import StrategyManageQueryBar from './StrategyManageQueryBar';
import StrategyManageList from './StrategyManageList';
import styles from './strategyManage.less';

@connect(({ strategyManage }) => strategyManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
  };

  componentDidMount() {
    this.fetchStrategyManage({});
  }

  fetchStrategyManageWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'strategyManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchStrategyManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'strategyManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    return (
      <div>
        <StrategyManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchStrategyManageWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchStrategyManageWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <StrategyManageList
          className={styles.strategyManageList}
          onPageSizeChange={this.fetchStrategyManage}
        />
      </div>
    );
  }
}

export default Index;
