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
import { summaryInfoUserType, summaryInfoFootprintType } from '@/utils/constantEnum';
import moment from 'moment';
import PageTab from '../pageTab';

const { synonymsRoutes } = require('../../../../config/summaryInfoRoutes');

const dateFormat = 'YYYY-MM';

@connect(({ synonymsHotQuestion }) => synonymsHotQuestion)
class Index extends PureComponent {
  queryForm = null;

  // TODO 对接
  columns = [
    {
      title: '热门问题名称',
      dataIndex: 'qaQuestions',
      width:"80%",
      render:data=>(data||{}).question
    },
    {
      title: '访问量',
      dataIndex: 'count',
    },
  ];

  tabList = Object.values(synonymsRoutes); // 获取对应的路由

  disableDate = (current) => {
    return  current && current > moment().endOf('month'); // 不晚于当月
  }

  fetchSynonymsHotQuestionWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'synonymsHotQuestion/fetchData',
      payload: {
        query,
      },
    });
  };

  render() {
    const { message, query } = this.props;
    const { date, ...otherQuery } = query;
    return (
      <div>
        <PageTab tabList={this.tabList} value={synonymsRoutes.synonymsHotQuestion.rName} />
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={{
            ...otherQuery,
            timeSelect: date ? moment(date) : undefined,
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(queryConditon => {
                    const { timeSelect, ...others } = queryConditon;

                    this.fetchSynonymsHotQuestionWithQuery({
                      query: {
                        ...others,
                        date: moment(timeSelect).format(dateFormat),
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
            label="选择月份"
            rules={[FormRules.required('日期必填')]}
          >
            <DatePicker disabledDate={this.disableDate} picker="month" />
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
          dataSource={ message }
          pagination={{
            defaultPageSize: 10,
          }}
          rowKey={data=>data.qaQuestions.id}
        />
      </div>
    );
  }
}

export default Index;
