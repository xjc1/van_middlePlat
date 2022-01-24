import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from "@/components/tis_ui";
import LogRecordsQueryBar from "./LogRecordsQueryBar";
import LogRecordsList from "./LogRecordsList";
import styles from './index.less';

@connect(({ logRecords }) => logRecords)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {}
  };

  componentDidMount() {
    this.fetchLogRecords({});
  }

  fetchLogRecordsWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'logRecords/fetchList',
      payload: {
        page, size, query
      }
    });
    this.setState({ query });
  };

  fetchLogRecords = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'logRecords/fetchList',
      payload: {
        page, size, query
      }
    });
  };

  render() {
    return (
      <div>
        <LogRecordsQueryBar
          onForm={(form) => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then((query) => {
                    const { dateRange = [], ...others } = query;
                    const [begin, end] = dateRange;
                    this.fetchLogRecordsWithQuery({
                      query: {
                        ...others,
                        begin: begin && begin.format('YYYY-MM-DD HH:mm:ss'),
                        end: end && end.format('YYYY-MM-DD HH:mm:ss'),
                      }
                    });
                  });
                }}
              >查询</TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchLogRecordsWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <LogRecordsList
          className={styles.logRecordsList}
          onPageSizeChange={this.fetchLogRecords}
        />
      </div>
    );
  }
}

export default Index;

