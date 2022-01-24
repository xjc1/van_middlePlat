import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import KnowledgeLibWorkOrderQueryBar from './KnowledgeLibWorkOrderQueryBar';
import KnowledgeLibWorkOrderList from './KnowledgeLibWorkOrderList';
import styles from './knowledgeLibWorkOrder.less';
import TrackTool from '@/utils/TrackTool';

@connect(({ knowledgeLibWorkOrder }) => knowledgeLibWorkOrder)
class KnowledgeLibWorkOrder extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchWorkOrderCommit({});
  }

  fetchWorkOrderCommitWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledgeLibWorkOrder/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchWorkOrderCommit = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledgeLibWorkOrder/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    const { actions, operate } = this.props;
    return (
      <div>
        <KnowledgeLibWorkOrderQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={actions}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    console.log('query', query);
                    this.fetchWorkOrderCommitWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchWorkOrderCommitWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <KnowledgeLibWorkOrderList
          operate={operate}
          className={styles.knowledgeLibWorkOrderList}
          onPageSizeChange={this.fetchWorkOrderCommit}
        />
      </div>
    );
  }
}

export default KnowledgeLibWorkOrder;
