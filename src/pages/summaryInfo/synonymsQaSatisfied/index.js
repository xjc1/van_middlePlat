import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  TButton,
  QueryBarCard,
  SummaryInfo,
} from '@/components/tis_ui';
import PageTab from '../pageTab';

const { synonymsRoutes } = require('../../../../config/summaryInfoRoutes');


@connect(({ synonymsQaSatisfied }) => synonymsQaSatisfied)
class Index extends PureComponent {
  queryForm = null;

  tabList = Object.values(synonymsRoutes); // 获取对应的路由

  fetchSynonymsQaSatisfiedWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'synonymsQaSatisfied/fetchData',
      payload: {
        query,
      },
    });
  };

  render() {
    const { message } = this.props;
    const { sum, solveRate, satisfactionRate } = message || {};

    return (
      <div>
        <PageTab tabList = {this.tabList} value={synonymsRoutes.synonymsQaSatisfied.rName}/>
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(queryConditon => {
                    this.fetchSynonymsQaSatisfiedWithQuery({
                      query: queryConditon,
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
          <SummaryInfo.Text col={4} title="问答数">
            {sum}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="解决率">
            {solveRate}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="满意度">
            {satisfactionRate}
          </SummaryInfo.Text>
        </SummaryInfo>
      </div>
    );
  }
}

export default Index;
