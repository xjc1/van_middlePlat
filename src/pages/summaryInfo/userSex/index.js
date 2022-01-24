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

const { userRoutes } = require('../../../../config/summaryInfoRoutes');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ userSex }) => userSex)
class Index extends PureComponent {
  queryForm = null;

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '登录次数',
      dataIndex: 'sums',
    },
    {
      title: '登录个人次数',
      dataIndex: 'personSums',
    },
    {
      title: '登录公司次数',
      dataIndex: 'companySums',
    },
    {
      title: '日期',
      dataIndex: 'date',
      render: time => DateTools.transformDefaultFormat(time),
    },
  ];

  fetchUserSexWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userSex/fetchData',
      payload: {
        query,
      },
    });
  };

  render() {
    const { message, query } = this.props;
    const { addPersonMan, addPersonWoman } = message;
    const { startTime, endTime, ...otherQuery } = query;
    return (
      <div>
        <PageTab tabList={Object.values(userRoutes)} value={userRoutes.userSex.rName} />
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
                    this.fetchUserSexWithQuery({
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
          <></>
        </QueryBarCard>

        <SummaryInfo style={{ marginTop: 10 }}>
          <SummaryInfo.Text col={4} title="男性用户数">
            {addPersonMan}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="女性用户数" borded={false}>
            {addPersonWoman}
          </SummaryInfo.Text>
        </SummaryInfo>
      </div>
    );
  }
}

export default Index;
