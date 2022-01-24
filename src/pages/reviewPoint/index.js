import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import ReviewPointQueryBar from './ReviewPointQueryBar';
import ReviewPointList from './ReviewPointList';
import styles from './reviewPoint.less';
import TrackTool from '@/utils/TrackTool';

@connect(({ reviewPoint }) => reviewPoint)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchReviewPoint(this.state.query);
  }

  fetchReviewPointWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reviewPoint/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchReviewPoint = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'reviewPoint/fetchList',
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
        <ReviewPointQueryBar
          initialValues={this.state.query}
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchReviewPointWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchReviewPointWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <ReviewPointList
          className={styles.reviewPointList}
          onPageSizeChange={this.fetchReviewPoint}
        />
      </div>
    );
  }
}

export default Index;
