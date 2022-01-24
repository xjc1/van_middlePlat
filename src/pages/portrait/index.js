import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import PortraitQueryBar from './PortraitQueryBar';
import PortraitStatistics from './PortraitStatistics';
import { PORTRAITTAGS } from '@/services/api';
import styles from './portrait.less';

class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    total: 0,
    matchedNumber: 0,
  };

  fetch = async () => {
    const {
      query: { name = '' },
    } = this.state;

    PORTRAITTAGS.getTagListUsingGET({ params: { name } }).then(res => {
      console.log('res', res);
      const { total = 0, matchedNumber = 0 } = res;
      this.setState({ total, matchedNumber });
    });
  };

  render() {
    const { query, total, matchedNumber } = this.state;

    return (
      <div>
        <PortraitQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    console.info(query);
                    this.setState({ query }, () => this.fetch());
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.setState({ query: {} });
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        {query.name && <PortraitStatistics total={total} matchedNumber={matchedNumber} />}
      </div>
    );
  }
}

export default Index;
