import React from 'react';
import { Row, Col, Descriptions, Table } from 'antd';
import ReactECharts from 'echarts-for-react';

function PortraitInfo({ messageInfo = {} }) {
  const { messageColumns = [], messageDataSource = [], messagePercentile = {} } = messageInfo;

  return (
    <Row gutter={8}>
      <Col span={12}>
        <Table
          size="small"
          bordered
          pagination={false}
          dataSource={messageDataSource}
          rowKey="id"
          columns={messageColumns}
        />
        <Descriptions
          style={{ marginTop: 20 }}
          bordered
          size="small"
          title="每个上架且发布中的消息关联的的画像个数分布"
        >
          <Descriptions.Item label="平均数" span={3}>
            {messagePercentile.average}
          </Descriptions.Item>
          <Descriptions.Item label="最小" span={3}>
            {messagePercentile.min}
          </Descriptions.Item>
          <Descriptions.Item label="最大" span={3}>
            {messagePercentile.max}
          </Descriptions.Item>
          <Descriptions.Item label="25%" span={3}>
            {messagePercentile.firstQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="50%" span={3}>
            {messagePercentile.secondQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="75%" span={3}>
            {messagePercentile.thirdQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="95%" span={3}>
            {messagePercentile.fourthQuartile}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={12}>
        <ReactECharts
          option={{
            title: [
              {
                text: '画像关联盒须图',
                left: 'center',
              },
            ],
            grid: {
              left: '10%',
              right: '10%',
              bottom: '15%',
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              nameGap: 30,
              splitArea: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
            yAxis: {
              type: 'value',
              name: '',
              splitArea: {
                show: true,
              },
            },
            series: [
              {
                name: 'boxplot',
                type: 'boxplot',
                datasetIndex: 1,
                data: [
                  [
                    messagePercentile.min,
                    messagePercentile.firstQuartile,
                    messagePercentile.secondQuartile,
                    messagePercentile.thirdQuartile,
                    messagePercentile.max,
                  ],
                ],
              },
            ],
          }}
        />
      </Col>
    </Row>
  );
}

export default PortraitInfo;
