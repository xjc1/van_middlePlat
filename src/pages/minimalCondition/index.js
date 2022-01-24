import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import MinimalConditionQueryBar from './MinimalConditionQueryBar';
import MinimalConditionList from './MinimalConditionList';
import styles from './minimalCondition.less';

@connect(({ minimalCondition }) => minimalCondition)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'minimalCondition/fetchList',
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
        <MinimalConditionQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Edit
                onClick={() => {
                  router.push('minimalCondition_bulk');
                }}
              >
                批量操作
              </TButton.Edit>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.setState({ query }, () => this.fetchList({}));
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.setState({ query: {} }, () => this.fetchList({}));
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />
        <MinimalConditionList className={styles.minimalConditionList} fetchList={this.fetchList} />
      </div>
    );
  }
}

export default Index;
