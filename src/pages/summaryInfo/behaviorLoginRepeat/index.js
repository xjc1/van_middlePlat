import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  TButton,
  TTable,
  QueryBarCard,
  TItem,
  FormRules,
} from '@/components/tis_ui';
import { DatePicker } from 'antd';
import moment from 'moment';
import PageTab from '../pageTab';

const { behaviorRoutes } = require('../../../../config/summaryInfoRoutes');

const dateFormat = 'YYYY';

@connect(({ behaviorLoginRepeat }) => behaviorLoginRepeat)
class Index extends PureComponent {
  queryForm = null;

  columns = [
    {
      title: '年',
      dataIndex: 'year',
    },
    {
      title: '月',
      dataIndex: 'month',
    },
    {
      title: '当月总登录数',
      dataIndex: 'allloginNum',
    },
    {
      title: '重复登录率',
      dataIndex: 'repeatloginProportions',
    },
    {
      title: '当月重复登录人数',
      dataIndex: 'repeatloginNum',
    },
  ];

  fetchBehaviorLoginRepeatWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'behaviorLoginRepeat/fetchData',
      payload: {
        query,
      },
    });
  };

  disableDate = (current) => {
    return current && current > moment().endOf('year'); // 不晚于当年
  };

  render() {
    const { message, query } = this.props;
    const { year, ...otherQuery } = query || {};
    return (
      <div>
        <PageTab
          tabList={Object.values(behaviorRoutes)}
          value={behaviorRoutes.behaviorLoginRepeat.rName}
        />
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={{ ...otherQuery, year: moment(year) }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(queryConditon => {
                    const { year, ...others } = queryConditon;

                    this.fetchBehaviorLoginRepeatWithQuery({
                      query: { year: moment(year).format(dateFormat), ...others },
                    });
                  });
                }}
              >
                获取
              </TButton.Search>
            </>
          }
        >
          <TItem col={8} name="year" label="选择日期" rules={[FormRules.required('日期必填')]}>
            <DatePicker disabledDate={this.disableDate} picker="year" format={dateFormat} />
          </TItem>
        </QueryBarCard>

        <TTable
          style={{ marginTop: 10 }}
          columns={this.columns}
          dataSource={message}
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
