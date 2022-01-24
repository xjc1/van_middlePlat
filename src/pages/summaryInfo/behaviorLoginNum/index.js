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
import { DatePicker } from 'antd';
import moment from 'moment';
import PageTab from '../pageTab';

const { behaviorRoutes } = require('../../../../config/summaryInfoRoutes');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ behaviorLoginNum }) => behaviorLoginNum)
class Index extends PureComponent {
  queryForm = null;

  columns = [
    {
      title: '日期',
      dataIndex: 'ymd',
      render: time => DateTools.transformDefaultFormat(time),
    },
    {
      title: '登录总次数',
      dataIndex: 'sums',
    },
    {
      title: '个人登录次数',
      dataIndex: 'personSums',
    },
    {
      title: '企业登录次数',
      dataIndex: 'companySums',
    },
    {
      title: '登录总次数(去重)',
      dataIndex: 'sum',
    },
    {
      title: '个人登录次数(去重)',
      dataIndex: 'personSum',
    },
    {
      title: '企业登录次数(去重)',
      dataIndex: 'companySum',
    },
  ];

  fetchbehaviorLoginNumWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'behaviorLoginNum/fetchData',
      payload: {
        query,
      },
    });
  };

  disableDate = (current) => {
    return current && current > moment().subtract('days', 0).endOf('day'); // 不晚于今天
  };

  render() {
    const { message = {}, query } = this.props;
    const { startTime, endTime } = query;
    const { total = {}, data = [] } = message;
    return (
      <div>
        <PageTab
          tabList={Object.values(behaviorRoutes)}
          value={behaviorRoutes.behaviorLoginNum.rName}
        />
        <QueryBarCard
          initialValues={startTime ? { timeSelect: [moment(startTime), moment(endTime)] } : {}}
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(queryConditon => {
                    const { timeSelect = [], ...others } = queryConditon;
                    const [start, end] = timeSelect;
                    const formatStartTime = moment(start).format(dateFormat);
                    const formatEndTime = moment(end).format(dateFormat);
                    const currentDay = moment().endOf('day').format(dateFormat);
                    this.fetchbehaviorLoginNumWithQuery({
                      query: {
                        ...others,
                        startTime: formatStartTime,
                        endTime: formatEndTime,
                        today: [formatStartTime, formatEndTime].indexOf(currentDay) > -1 ? 'today' : undefined
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
        </QueryBarCard>

        <SummaryInfo style={{ marginTop: 10 }}>
          <SummaryInfo.Text col={4} title="登录总次数">
            {total.sums}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="个人登录次数">
            {total.personSums}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="企业登录次数">
            {total.companySums}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="登录总次数(去重)">
            {total.sum}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="个人登录次数(去重)">
            {total.personSum}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="企业登录次数(去重)">
            {total.companySum}
          </SummaryInfo.Text>
        </SummaryInfo>

        <TTable
          style={{ marginTop: 10 }}
          columns={this.columns}
          dataSource={data}
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
