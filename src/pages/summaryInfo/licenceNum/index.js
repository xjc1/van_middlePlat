import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  TButton,
  QueryBarCard,
  SummaryInfo,
} from '@/components/tis_ui';

@connect(({ licenceNum }) => licenceNum)
class Index extends PureComponent {
  queryForm = null;

  fetchLicenceNumWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'licenceNum/fetchData',
      payload: {
        query,
      },
    });
  };

  render() {
    const { message, query } = this.props;
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
                    this.fetchLicenceNumWithQuery({
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
          <SummaryInfo.Text col={4} title="证照数">
            { message }
          </SummaryInfo.Text>
        </SummaryInfo>
      </div>
    );
  }
}

export default Index;
