import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  TButton,
  TTable,
  QueryBarCard,
  TItem,
  SummaryInfo,
  FormRules,
  DateTools,
} from '@/components/tis_ui';
import { Select, DatePicker } from 'antd';
import _ from 'lodash';
import { summaryInfoUserType } from '@/utils/constantEnum';
import moment from 'moment';
import PageTab from '../pageTab';

const { behaviorRoutes } = require('../../../../config/summaryInfoRoutes');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ behaviorLoginNumEveryDay }) => behaviorLoginNumEveryDay)
class Index extends PureComponent {
  queryForm = null;

  columns = [
    {
      title: '日期',
      dataIndex: 'ymd',
      render: time => DateTools.transformDefaultFormat(time),
    },
    {
      title: '登录人数',
      dataIndex: 'sum',
    },
  ];

  fetchBehaviorLoginNumEveryDayWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'behaviorLoginNumEveryDay/fetchData',
      payload: {
        query,
      },
    });
  };

  disableDate = (current) => {
    return  current && current > moment().subtract('days',1).endOf('day'); // 不晚于昨天
  }

  render() {
    const { message, query } = this.props;
    const { startTime, endTime, ...otherQuery } = query;
    return (
      <div>
        <PageTab
          tabList={Object.values(behaviorRoutes)}
          value={behaviorRoutes.behaviorLoginNumEveryDay.rName}
        />
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={{
            ...otherQuery,
            timeSelect: startTime ? [moment(startTime), moment(endTime)] : undefined,
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(queryConditon => {
                    const { timeSelect = [], ...others } = queryConditon;
                    const [start, end] = timeSelect;
                    this.fetchBehaviorLoginNumEveryDayWithQuery({
                      query: {
                        ...others,
                        startTime: moment(start).format(dateFormat),
                        endTime: moment(end).format(dateFormat),
                      },
                    });
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
            <RangePicker disabledDate={this.disableDate} format={dateFormat} />
          </TItem>
          <TItem col={8} name="userType" label="用户类型">
            <Select>
              {_.map(summaryInfoUserType, (key, value) => (
                <Select.Option key={key} value={key}>
                  {summaryInfoUserType.$names[value]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        </QueryBarCard>

        <TTable
          style={{ marginTop: 10 }}
          columns={this.columns}
          dataSource={message}
          pagination={{
            defaultPageSize: 10,
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default Index;
