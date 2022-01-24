import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, TTable, QueryBarCard, TItem, FormRules, DateTools } from '@/components/tis_ui';
import { Select, DatePicker, message } from 'antd';
import _ from 'lodash';
import { summaryInfoUserType, summaryInfoFootprintType } from '@/utils/constantEnum';
import { summaryInfoUrl } from '@/constants';
import commonDownload from '@/services/commonDownload';
import moment from 'moment';

const { behaviorRoutes } = require('../../../../config/summaryInfoRoutes');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ behaviorFootPrintEveryDay }) => behaviorFootPrintEveryDay)
// TODO 联调
class Index extends PureComponent {
  queryForm = null;

  state = {
    exportVisible: false,
    exportLoading: false,
  }

  columns = [
    {
      title: '日期',
      dataIndex: 'date',
      render: time => DateTools.transformDefaultFormat(time),
    },
    {
      title: '访问量',
      dataIndex: 'num',
    },
  ];

  fetchBehaviorFootPrintEveryDayWithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'behaviorFootPrintEveryDay/fetchData',
      payload: {
        query,
      },
    });
  };

  // 数据导出
  export = query => {
    this.setState({ exportLoading: true });
    commonDownload({
      options: { endPoint: '', preUrl: '' },
      url: summaryInfoUrl,
      name: '主题记录数据.xls',
      method: 'GET',
      condition: {...query, method: behaviorRoutes.behaviorFootPrintEveryDay.method.export},
    }).then(() => {
      this.setState({ exportLoading: false, exportVisible: false });
      message.success('导出成功！');
    });
  };

  disableDate = (current) => {
    return  current && current > moment().subtract('days',1).endOf('day'); // 不晚于昨天
  }


  render() {
    const { message: messageInfo, query } = this.props;
    const { exportLoading, exportVisible} = this.state;
    const { startTime, endTime, ...otherQuery } = query;
    return (
      <div>

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

                    this.fetchBehaviorFootPrintEveryDayWithQuery({
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
          <TItem col={8} name="userType" label="用户类型">
            <Select>
              {_.map(summaryInfoUserType, (key, value) => (
                <Select.Option key={key} value={key}>
                  {summaryInfoUserType.$names[value]}
                </Select.Option>
              ))}
            </Select>
          </TItem>

          <TItem col={8} name="type" label="足迹类型">
            <Select>
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
          dataSource={messageInfo}
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
