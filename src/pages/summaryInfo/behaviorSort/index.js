import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  TButton,
  TTable,
  QueryBarCard,
  TItem,
  FormRules,
  utils,
} from '@/components/tis_ui';
import { Select, DatePicker } from 'antd';
import _ from 'lodash';
import { summaryInfoUserType, summaryInfoFootprintType } from '@/utils/constantEnum';
import moment from 'moment';
import PageTab from '../pageTab';

const { behaviorRoutes } = require('../../../../config/summaryInfoRoutes');

const { IDGenerator } = utils;

const sortIdGenerator = new IDGenerator('sortID');

const dateFormat = 'YYYY-MM-DD';

@connect(({ behaviorSort }) => behaviorSort)
class Index extends PureComponent {
  queryForm = null;

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'fid',
    },
    {
      title: '点击量',
      dataIndex: 'cou',
    },
  ];

  fetchBehaviorSortWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'behaviorSort/fetchData',
      payload: {
        query,
      },
    });
  };

  disableDate = (current) => {
    return  current && current > moment().endOf('day'); // 不晚于今天
  }

  render() {
    const { message, query } = this.props;
    const { date, ...otherQuery } = query;
    const newDataSource = _.flatten(_.map(message, ({ data }) => JSON.parse(data)));
    const newDataSourceWithID = _.map(newDataSource, item => ({
      ...item,
      id: sortIdGenerator.next(),
    }));
    return (
      <div>
        <PageTab tabList={Object.values(behaviorRoutes)} value={behaviorRoutes.behaviorSort.rName} />
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={{
            ...otherQuery,
            date: date ? moment(date) : undefined,
          }}
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(queryConditon => {
                    const { date, userType, ...others } = queryConditon;
                    const currentDay =  moment().endOf('day').format(dateFormat)
                    this.fetchBehaviorSortWithQuery({
                      query: {
                        userType: userType==="all"? undefined:userType,
                        ...others,
                        date: moment(date).format(dateFormat),
                        today: currentDay === moment(date).format(dateFormat) ? 'today' : undefined
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
          <TItem col={8} name="date" label="选择日期" rules={[FormRules.required('日期必填')]}>
            <DatePicker disabledDate={this.disableDate}  format={dateFormat} />
          </TItem>
          <TItem col={8} name="userType" label="用户类型">
            <Select allowClear>
              {_.map(summaryInfoUserType, (key, value) => (
                <Select.Option key={key} value={key}>
                  {summaryInfoUserType.$names[value]}
                </Select.Option>
              ))}
            </Select>
          </TItem>

          <TItem col={8} name="type" label="足迹类型">
            <Select allowClear>
              {_.map(summaryInfoFootprintType, (key, value) => (
                <Select.Option key={key} value={key}>
                  {summaryInfoFootprintType.$names[value]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        </QueryBarCard>

        <TTable
          style={{ marginTop: 10 }}
          columns={this.columns}
          dataSource={newDataSourceWithID}
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
