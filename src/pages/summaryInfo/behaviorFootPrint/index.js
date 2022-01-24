import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  TButton,
  QueryBarCard,
  TItem,
  SummaryInfo,
  FormRules,
} from '@/components/tis_ui';
import {Select, DatePicker, InputNumber, message} from 'antd';
import _ from 'lodash';
import { summaryInfoUserType, summaryInfoFootprintType } from '@/utils/constantEnum';
import moment from 'moment';
import PageTab from '../pageTab';
import FootPointEveryDayList from './footPointEveryDayList'
import ExportModal from "../exportModal";
import commonDownload from '@/services/commonDownload';
import { summaryInfoUrl } from '@/constants';

const { behaviorRoutes } = require('../../../../config/summaryInfoRoutes');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ footPrint }) => footPrint)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    exportVisible: false,
    exportLoading: false,
  };

  fetchFootPrintWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'footPrint/fetchData',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchFootPrint = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'footPrint/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  disableDate = (current) => {
    return  current && current > moment().endOf('day'); // 不晚于昨天
  }; // 数据导出


  export = query => {
    this.setState({ exportLoading: true });
    commonDownload({
      options: { endPoint: '', preUrl: '' },
      url: summaryInfoUrl,
      name: '主题记录数据.xls',
      method: 'GET',
      condition: {...query, method: behaviorRoutes.behavior.method.export},
    }).then(() => {
      this.setState({ exportLoading: false, exportVisible: false });
      message.success('导出成功！');
    });
  };

  render() {
    const { message: resMessage, query } = this.props;
    const { startTime, endTime, ...otherQuery } = query;
    const { totalCount, data=[] } = resMessage || {};
    const { exportLoading, exportVisible} = this.state;
    return (
      <div>
        <PageTab tabList={Object.values(behaviorRoutes)} value={behaviorRoutes.behavior.rName} />
        <QueryBarCard
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={{
            ...otherQuery,
            timeSelect: startTime ? [moment(startTime), moment(endTime)] : undefined,
          }}

          actions={
            <>
              <ExportModal
                onClose={() => {
                  this.setState({ exportVisible: false });
                }}
                initialValues={{ userType: 'all', curPage: 1, pageSize: 20 }}
                title="主题记录数据导出"
                visible={exportVisible}
                onSubmit={vals => {
                  const { timeSelect = [], ...otherVals } = vals;
                  const [start, end] = timeSelect;
                  this.export({
                    ...otherVals,
                    startTime: moment(start).format(dateFormat),
                    endTime: moment(end).format(dateFormat),
                  });
                }}
                formItem={
                  <>
                    <TItem name="curPage" label="当前页码" rules={[FormRules.required()]}>
                      <InputNumber min={0} />
                    </TItem>
                    <TItem name="pageSize" label="每页条数" rules={[FormRules.required()]}>
                      <InputNumber min={0} />
                    </TItem>
                    <TItem name="timeSelect" label="选择日期" rules={[FormRules.required()]}>
                      <RangePicker disabledDate={this.disableDate} format={dateFormat} />
                    </TItem>
                    <TItem name="userType" label="用户类型">
                      <Select>
                        {_.map(summaryInfoUserType, (key, value) => (
                          <Select.Option key={key} value={key}>
                            {summaryInfoUserType.$names[value]}
                          </Select.Option>
                        ))}
                      </Select>
                    </TItem>
                  </>
                }
              >
                <TButton.Output
                  loading={exportLoading}
                  onClick={() => {
                    this.setState({ exportVisible: true });
                  }}
                >
                  导出
                </TButton.Output>
              </ExportModal>
            </>
          }

          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(queryConditon => {
                    const { timeSelect = [], userType, ...others } = queryConditon;
                    const [start, end] = timeSelect;
                    const  formatStartTime = moment(start).format(dateFormat);
                    const  formatEndTime =  moment(end).format(dateFormat);
                    const currentDay =  moment().endOf('day').format(dateFormat)
                    this.fetchFootPrintWithQuery({
                      query: {
                        userType: userType==='all'? undefined:userType,
                        ...others,
                        startTime: formatStartTime,
                        endTime: formatEndTime,
                        today: [formatStartTime, formatEndTime].indexOf(currentDay) > -1 ? 'today' : undefined
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

        <SummaryInfo style={{ marginTop: 10 }}>
          <SummaryInfo.Text col={4} title="足迹数">
            {totalCount}
          </SummaryInfo.Text>
        </SummaryInfo>
        <FootPointEveryDayList data={data}/>
      </div>
    );
  }
}

export default Index;
