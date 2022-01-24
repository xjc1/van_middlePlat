import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';
import moment from 'moment';
import { TButton, QueryBarCard, TItem, FormRules } from '@/components/tis_ui';
import { messageHistoryType } from '@/utils/constantEnum';
import PageTab from '../../pageTab';
import MessageSendListStatistic from './MessageSendListStatistic';
import { exportMsgList } from '@/pages/summaryInfo/messageStatistic/utils';

const { messageRoutes } = require('@/../config/summaryInfoRoutes');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const DATE_RANGE_LIMIT = 7;

@connect(({ messageListStatistic }) => messageListStatistic)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {
      startDate: moment()
        .subtract(DATE_RANGE_LIMIT, 'day')
        .format(dateFormat),
      expiryDate: moment().format(dateFormat),
      type: messageHistoryType.push,
    },
    exporting: false,
  };

  componentDidMount() {
    this.fetchStatisticData({});
  }

  fetchStatisticData = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'messageListStatistic/fetchData',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  disabledDate = current => {
    return current && current > moment().endOf('day');
  };

  exportMessageWithQuery = () => {
    this.setState({ exporting: true }, () => {
      const { query } = this.state;
      const { listInfo = {} } = this.props;
      const { pageNum, pageSize } = listInfo;
      exportMsgList({
        ...query,
        page: pageNum,
        pageSize,
      }).finally(() => {
        this.setState({ exporting: false });
      });
    });
  };

  render() {
    const { query = {}, exporting } = this.state;
    const { startDate, expiryDate, ...otherQuery } = query;
    return (
      <>
        <PageTab tabList={Object.values(messageRoutes)} value={messageRoutes.msgSend.rName} />
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={{
            timeSelect: [moment(startDate), moment(expiryDate)],
            ...otherQuery,
          }}
          actions={
            <TButton.Download loading={exporting} onClick={() => this.exportMessageWithQuery()}>
              下载
            </TButton.Download>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(({ timeSelect = [], ...others }) => {
                    const [start, end] = timeSelect;
                    const formatStartTime = moment(start).format(dateFormat);
                    const formatEndTime = moment(end).format(dateFormat);
                    this.setState(
                      {
                        query: {
                          ...query,
                          startDate: formatStartTime,
                          expiryDate: formatEndTime,
                          ...others,
                        },
                      },
                      () => {
                        this.fetchStatisticData({});
                      },
                    );
                  });
                }}
              >
                获取
              </TButton.Search>
            </>
          }
        >
          <TItem
            col={8}
            name="timeSelect"
            label="选择日期"
            rules={[FormRules.required('日期必填')]}
          >
            <RangePicker disabledDate={this.disabledDate} format={dateFormat} />
          </TItem>
        </QueryBarCard>
        <MessageSendListStatistic fetchList={this.fetchStatisticData} />
      </>
    );
  }
}

export default Index;
