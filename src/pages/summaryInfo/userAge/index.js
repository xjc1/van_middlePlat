import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  TButton,
  QueryBarCard,
  SummaryInfo,
} from '@/components/tis_ui';
import moment from 'moment';
import PageTab from '../pageTab';

const { userRoutes } = require('../../../../config/summaryInfoRoutes');

const dateFormat = 'YYYY-MM-DD';

@connect(({ userAge }) => userAge)
class Index extends PureComponent {
  queryForm = null;

  fetchUserAgeWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userAge/fetchData',
      payload: {
        query,
      },
    });
  };

  render() {
    const { message, query } = this.props;
    const {
      addPersonAge1,
      addPersonAge2,
      addPersonAge3,
      addPersonAge4,
      addPersonAge5,
      addPersonAge6,
      addPersonAge7,
      addPersonAge8,
      addPersonAge9,
    } = message;
    const { startTime, endTime, ...otherQuery } = query;
    return (
      <div>
        <PageTab tabList={Object.values(userRoutes)} value={userRoutes.userAge.rName} />
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
                    this.fetchUserAgeWithQuery({
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
          <SummaryInfo.Text col={4} title="10-20年龄段">
           {addPersonAge1}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="21-30年龄段">
            {addPersonAge2}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="31-40年龄段">
            {addPersonAge3}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="41-50年龄段">
            {addPersonAge4}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="51-60年龄段">
            {addPersonAge5}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="61-70年龄段" bordered={false}>
            {addPersonAge6}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="71-80年龄段">
            {addPersonAge7}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="81-90年龄段">
            {addPersonAge8}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="大于90年龄段" bordered={false}>
            {addPersonAge9}
          </SummaryInfo.Text>
        </SummaryInfo>
      </div>
    );
  }
}

export default Index;
