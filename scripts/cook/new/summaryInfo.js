const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const generateModel = require('./generateSummaryModal');

const summaryInfoType = {
  list: '列表',
  total: '总览',
};

function renderByInfoType(type) {
  if (type === summaryInfoType.list) {
    return `<TTable
    style={{ marginTop: 10 }}
    columns={this.columns}
    dataSource={message}
    pagination={{
      defaultPageSize: 10,
    }}
    rowKey="id"
  />`;
  } else {
    return `
    <SummaryInfo style={{ marginTop: 10 }}>
    <SummaryInfo.Text col={4} title="问答记录条数">
      682
    </SummaryInfo.Text>
    <SummaryInfo.Text col={4} title="问答记录企业条数">
      532
    </SummaryInfo.Text>
    <SummaryInfo.Text col={4} title="问答记录个人条数">
      148
    </SummaryInfo.Text>
    <SummaryInfo.Text col={4} title="问答记录游客条数" bordered={false}>
      148
    </SummaryInfo.Text>
  </SummaryInfo>
    `;
  }
}

function generateIndex(name, upperFirstName, type) {
  return `
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    TButton,
    TTable,
    QueryBarCard,
    TItem,
    SummaryInfo,
    FormRules,
    DateTools,
} from '@/components/tis_ui';
import { Select, DatePicker } from 'antd';
import _ from 'lodash';
import { summaryInfoUserType, summaryInfoFootprintType } from '@/utils/constantEnum';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

@connect(({ ${name} }) => ${name})
class Index extends PureComponent {
  queryForm = null;

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '登录次数',
      dataIndex: 'sums',
    },
    {
      title: '登录个人次数',
      dataIndex: 'personSums',
    },
    {
      title: '登录公司次数',
      dataIndex: 'companySums',
    },
    {
      title: '日期',
      dataIndex: 'date',
      render: time => DateTools.transformDefaultFormat(time),
    },
  ];


  fetch${upperFirstName}WithQuery = ({ query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: '${name}/fetchData',
      payload: {
         query
      }
    });
  }


  render() {
    const { message, query } = this.props;
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
      actions={
        <>
          <TButton.Output>导出</TButton.Output>
        </>}
      footer={
        <>
          <TButton.Search
            onClick={() => {
              this.queryForm.validateFields().then(queryConditon => {
                const { timeSelect = [], ...others } = queryConditon;
                const [startTime, endTime] = timeSelect;

                console.info({
                  ...others,
                  startTime: moment(startTime).format(dateFormat),
                  endTime: moment(endTime).format(dateFormat),
                });
                this.fetch${upperFirstName}WithQuery({
                  query: {
                    ...others,
                    startTime: moment(startTime).format(dateFormat),
                    endTime:  moment(endTime).format(dateFormat),
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
        <RangePicker format={dateFormat} />
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

${renderByInfoType(type)}
  
      </div>
    );
  }
}

export default Index;

    `;
}

module.exports = (dir, name, type) => {
  const upperFirstName = _.upperFirst(name);
  fs.writeFileSync(path.join(dir, 'index.js'), generateIndex(name, upperFirstName, type), {
    encoding: 'utf8',
  });
  fs.writeFileSync(
    path.join(dir, 'models', `${name}.js`),
    generateModel(name, upperFirstName, type),
    {
      encoding: 'utf8',
    },
  );
};
