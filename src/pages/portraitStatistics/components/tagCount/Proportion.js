import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'dva';
import ReactECharts from 'echarts-for-react';
import ProportionQueryBar from './ProportionQueryBar';

function Proportion({ userType }) {
  const dispatch = useDispatch();
  const { percentages = [], portraitTagSum } = useSelector(
    ({ portraitStatistics }) => portraitStatistics,
  );
  const [queryCondition, setQueryCondition] = useState({});

  let [formRef] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'portraitStatistics/fetchTagProportionData',
      payload: {
        object: userType,
        ...queryCondition,
      },
    });
  }, [userType, queryCondition]);
  return (
    <Row>
      <Col span={24}>
        <ProportionQueryBar
          userType={userType}
          onForm={form => {
            formRef = form;
          }}
          footer={
            <Button
              onClick={() => {
                formRef.validateFields().then(vals => {
                  const { category } = vals;
                  setQueryCondition(preState => ({
                    ...preState,
                    category,
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
            { dataIndex: 'category', title: '标签分类' },
            { dataIndex: 'num', title: '标签数' },
            { dataIndex: 'percentage', title: '占比' },
            { dataIndex: 'coverageOfPerson', title: '覆盖用户群' },
          ]}
          dataSource={percentages}
          size="small"
          rowKey="id"
          bordered
          pagination={{ hideOnSinglePage: true, defaultPageSize: 999 }}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{portraitTagSum}</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>100%</Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Col>
      <Col span={12}>
        <ReactECharts
          option={{
            tooltip: {
              trigger: 'item',
              formatter: '{b} : ({d}%)',
            },
            legend: {
              orient: 'vertical',
              left: 'left',
            },
            toolbox: {
              show: false,
            },
            dataset: {
              source: [['name', 'value']].concat(
                percentages.map(({ category, num }) => [category, num]),
              ),
            },
            series: [
              {
                type: 'pie',
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                },
              },
            ],
          }}
        />
      </Col>
    </Row>
  );
}

export default Proportion;
