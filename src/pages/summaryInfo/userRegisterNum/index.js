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
import moment from 'moment';
import PageTab from '../pageTab';

const { userRoutes } = require('../../../../config/summaryInfoRoutes');

const dateFormat = 'YYYY-MM-DD';

@connect(({ userRegisterNum, loading }) => ({
  ...userRegisterNum,
  loading: loading.effects['userRegisterNum/fetchData'],
}))
class Index extends PureComponent {
  queryForm = null;

  fetchUserRegisterNumWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userRegisterNum/fetchData',
      payload: {
        query,
      },
    });
  };

  render() {
    const { message, query, loading } = this.props;
    const { addSum, addCompany, addPerson } = message;
    const { startTime, endTime, ...otherQuery } = query;
    return (
      <div>
        <PageTab tabList={Object.values(userRoutes)} value={userRoutes.user.rName} />
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={{
            ...otherQuery,
            timeSelect: startTime ? [moment(startTime), moment(endTime)] : undefined,
          }}
          // actions={
          //   <>
          //     <TButton.Output>导出</TButton.Output>
          //   </>
          // }
          footer={
            <>
              <TButton.Search
                loading={loading}
                onClick={() => {
                  this.queryForm.validateFields().then(queryConditon => {
                    const { timeSelect, ...others } = queryConditon;

                    this.fetchUserRegisterNumWithQuery({
                      query: {
                        ...others,
                        startTime: moment('1970-01-01').format(dateFormat),
                        endTime: moment()
                          .subtract('days', 1)
                          .format(dateFormat),
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
          {/* <TItem
            col={8}
            name="timeSelect"
            label="选择日期"
            rules={[FormRules.required('日期必填')]}
          >
            <RangePicker format={dateFormat} />
          </TItem> */}
          {/* <TItem col={8} name="userType" label="用户类型">
            <Select>
              {_.map(summaryInfoUserType, (key, value) => (
                <Select.Option key={key} value={key}>
                  {summaryInfoUserType.$names[value]}
                </Select.Option>
              ))}
            </Select>
          </TItem> */}
          <></>
        </QueryBarCard>

        <SummaryInfo style={{ marginTop: 10 }}>
          <SummaryInfo.Text col={4} title="用户总数">
            {addSum}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="企业数">
            {addCompany}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="个人数" bordered={false}>
            {addPerson}
          </SummaryInfo.Text>
        </SummaryInfo>
      </div>
    );
  }
}

export default Index;
