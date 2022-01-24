import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { QueryBarCard, SummaryInfo, TButton } from '@/components/tis_ui';

@connect(({ oneformNum }) => oneformNum)
class Index extends PureComponent {
  queryForm = null;

  fetchOneformNumWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'oneformNum/fetchData',
      payload: {},
    });
  };

  render() {
    const { message } = this.props;
    const { temporary, sub, sum } = message;
    return (
      <div>
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(() => {
                    this.fetchOneformNumWithQuery({
                      query: {},
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
          <SummaryInfo.Text col={4} title="总数">
            {temporary}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="提交数">
            {sub}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="暂存数">
            {sum}
          </SummaryInfo.Text>
        </SummaryInfo>
      </div>
    );
  }
}

export default Index;
