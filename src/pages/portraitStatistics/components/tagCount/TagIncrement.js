import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'dva';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import TagIncrementQueryBar from './TagIncrementQueryBar';

function TagIncrement({ userType }) {
  const dispatch = useDispatch();
  const { increments = [], portraitNum } = useSelector(
    ({ portraitStatistics }) => portraitStatistics,
  );
  const [queryCondition, setQueryCondition] = useState({});

  let [formRef] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'portraitStatistics/fetchTagIncrementData',
      payload: {
        object: userType,
        ...queryCondition,
      },
    });
  }, [userType, queryCondition]);
  return (
    <Row>
      <Col span={24}>
        <TagIncrementQueryBar
          onForm={form => {
            formRef = form;
          }}
          footer={
            <Button
              onClick={() => {
                formRef.validateFields().then(vals => {
                  const { timeRange } = vals;
                  const [startTime, endTime] = timeRange || [];
                  setQueryCondition(preState => ({
                    ...preState,
                    startTime: startTime && moment(startTime).format('YYYY/MM'),
                    endTime: startTime && moment(endTime).format('YYYY/MM'),
                  }));
                });
              }}
            >
              查询
            </Button>
          }
        />
      </Col>
      <Col span={12}>
        <Table
          columns={[
            { dataIndex: 'month', title: '时间' },
            { dataIndex: 'increment', title: '新增标签数' },
          ]}
          dataSource={increments}
          size="small"
          rowKey="id"
          bordered
          pagination={{ hideOnSinglePage: true, defaultPageSize: 999 }}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{portraitNum}</Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Col>
      <Col span={12}>
        <ReactECharts
          option={{
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'line',
                axis: 'y',
              },
              formatter: params => {
                const { axisValue } = params[0];
                return `标签数: ${axisValue}`;
              },
            },
            legend: {
              left: 'center',
              top: 'bottom',
              data: [],
            },
            toolbox: {
              show: false,
            },
            dataset: {
              source: [['category', 'value']].concat(
                increments.map(({ month, increment }) => [month, increment]),
              ),
            },
            // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
            xAxis: { type: 'category', boundaryGap: false },
            yAxis: {},
            series: [
              {
                type: 'line',
              },
            ],
          }}
        />
      </Col>
    </Row>
  );
}

export default TagIncrement;
