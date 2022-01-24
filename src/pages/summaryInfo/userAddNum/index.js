import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  TButton,
  TTable,
  QueryBarCard,
  TItem,
  SummaryInfo,
  FormRules,
} from '@/components/tis_ui';
import { DatePicker } from 'antd';
import moment from 'moment';
import PageTab from '../pageTab';

const { userRoutes } = require('../../../../config/summaryInfoRoutes');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ userAddNum }) => userAddNum)
class Index extends PureComponent {
  queryForm = null;

  fetchUserAddNumWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userAddNum/fetchData',
      payload: {
        query,
      },
    });
  };

  disableDate = (current) => {
    return current && current > moment().subtract('days', 1).endOf('day'); // 不晚于昨天
  };

  render() {
    const { message, query } = this.props;
    const { addSum, addCompany, addPerson } = message;
    const { startTime, endTime, ...otherQuery } = query;
    return (
      <div>
        <PageTab tabList={Object.values(userRoutes)} value={userRoutes.userAddNum.rName} />
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

                    this.fetchUserAddNumWithQuery({
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
        </QueryBarCard>

        <SummaryInfo style={{ marginTop: 10 }}>
          <SummaryInfo.Text col={4} title="新增用户总数">
            {addSum}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="新增企业数">
            {addCompany}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="新增个人数" bordered={false}>
            {addPerson}
          </SummaryInfo.Text>
        </SummaryInfo>
      </div>
    );
  }
}

export default Index;
