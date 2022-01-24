import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { DatePicker } from 'antd';
import moment from 'moment';
import { TButton, QueryBarCard, TItem, FormRules, TSelect } from '@/components/tis_ui';
import { messageHistoryType, messageStatus } from '@/utils/constantEnum';
import PageTab from '../pageTab';
import MessageListStatistic from './MessageListStatistic';
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
    },
    exporting: false,
  };

  componentDidMount() {
    const { query = {} } = this.state;
    const { type = messageHistoryType.pull } = this.props;
    this.setState({ query: { ...query, type } }, () => this.fetchStatisticData({}));
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
    const { activeTab = messageRoutes.msgList.rName } = this.props;
    const { query = {}, exporting } = this.state;
    const { type, startDate, expiryDate, ...otherQuery } = query;
    return (
      <>
        <PageTab tabList={Object.values(messageRoutes)} value={activeTab} />
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
          <TItem col={8} name="status" label="消息状态">
            <TSelect>
              {_.map(_.omit(messageStatus, 'allRevoked'), (v, k) => (
                <TSelect.Option key={k} value={v} label={messageStatus.$names[k]}>
                  {messageStatus.$names[k]}
                </TSelect.Option>
              ))}
            </TSelect>
          </TItem>
        </QueryBarCard>
        <MessageListStatistic msgType={type} fetchList={this.fetchStatisticData} />
      </>
    );
  }
}

export default Index;
