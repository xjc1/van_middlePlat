import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, QueryBarCard, TItem, SummaryInfo, FormRules } from '@/components/tis_ui';
import { Select, DatePicker, message, InputNumber } from 'antd';
import commonDownload from '@/services/commonDownload';
import _ from 'lodash';
import { summaryInfoUrl } from '@/constants';
import { summaryInfoUserType } from '@/utils/constantEnum';
import moment from 'moment';
import ExportModal from '../exportModal';
import PageTab from '../pageTab';
import SynonymDetailList from './synonymDetailList';

const { synonymsRoutes } = require('../../../../config/summaryInfoRoutes');

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ synonymsSummary }) => synonymsSummary)
class Index extends PureComponent {
  queryForm = null;

  state = {
    exportLoading: false,
    exportVisible: false,
  };

  tabList = Object.values(synonymsRoutes); // 获取对应的路由

  disableDate = current => {
    return current && current > moment().endOf('day'); // 不晚于今天
  };

  fetchSynonymsSummaryWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'synonymsSummary/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  // 数据导出
  export = query => {
    this.setState({ exportLoading: true, exportVisible: false });
    commonDownload({
      options: { endPoint: '', preUrl: '' },
      url: summaryInfoUrl,
      name: '问答统计.xls',
      method: 'GET',
      condition: { ...query, method: synonymsRoutes.synonyms.method.export },
    }).then(() => {
      this.setState({ exportLoading: false });
      message.success('导出成功！');
    });
  };

  render() {
    const { message: messageInfo, query = {} } = this.props;
    const { startTime, endTime, ...otherQuery } = query;
    const { exportLoading, exportVisible } = this.state;
    const { total = {}, data = [] } = messageInfo || {};
    const { sum, companySum, personSum, visitorSum } = total;
    return (
      <div>
        <PageTab tabList={this.tabList} value={synonymsRoutes.synonyms.rName} />
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
                title="问答数据导出"
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
                      <InputNumber min={0} max={50000} />
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
                    const { timeSelect = [], ...others } = queryConditon;
                    const [start, end] = timeSelect;
                    this.fetchSynonymsSummaryWithQuery({
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
        </QueryBarCard>

        <SummaryInfo style={{ marginTop: 10 }}>
          <SummaryInfo.Text col={4} title="问答记录条数">
            {sum}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="问答记录企业条数">
            {companySum}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="问答记录个人条数">
            {personSum}
          </SummaryInfo.Text>
          <SummaryInfo.Text col={4} title="问答记录游客条数" bordered={false}>
            {visitorSum}
          </SummaryInfo.Text>
        </SummaryInfo>
        <SynonymDetailList data={data} />
      </div>
    );
  }
}

export default Index;
