import React from 'react';
import { Row, Col, Descriptions } from 'antd';
import ReactECharts from 'echarts-for-react';
import _ from 'lodash';

function PortraitInfo({ info, typeName = '', tagTotal = 0 }) {
  const total = _.get(info, 'applicationSceneLinkedPortraitStatistics.total', 0);
  const numLinkedOn = _.get(info, 'applicationSceneLinkedPortraitStatistics.numLinkedOn', 0);
  const numLinkedNotOn = _.get(info, 'applicationSceneLinkedPortraitStatistics.numLinkedNotOn', 0);
  const linkPercentile = _.get(info, 'applicationSceneLinkedPortraitStatistics.percentile', {});
  const tagLinkTotal = _.get(info, 'portraitLinkedApplicationSceneStatistics.total', 0);
  const tagLinkDifferentNum = _.get(
    info,
    'portraitLinkedApplicationSceneStatistics.differentCombination',
    0,
  );
  const tagLinkPercentile = _.get(info, 'portraitLinkedApplicationSceneStatistics.percentile', {});
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Descriptions bordered size="small">
          <Descriptions.Item label={`总${typeName}数(上架)`} span={3}>
            {total}
          </Descriptions.Item>
          <Descriptions.Item label={`已关联画像${typeName}数(上架)`} span={3}>
            {numLinkedOn}
          </Descriptions.Item>
          <Descriptions.Item label={`已关联画像${typeName}数(下架)`} span={3}>
            {numLinkedNotOn}
          </Descriptions.Item>
        </Descriptions>
        <ReactECharts
          option={{
            tooltip: {
              trigger: 'item',
              formatter: '{b} : ({d}%)',
            },
            toolbox: {
              show: false,
            },
            dataset: {
              source: [['name', 'value']].concat([
                ['已关联', numLinkedOn],
                ['未关联', total - numLinkedOn],
              ]),
            },
            series: [
              {
                type: 'pie',
                minShowLabelAngle: 1,
                label: {
                  position: 'inner',
                  fontSize: 14,
                },
                labelLine: {
                  show: false,
                },
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
      <Col span={6}>
        <Descriptions bordered size="small" title={`每个上架${typeName}关联的画像个数分布`}>
          <Descriptions.Item label="平均数" span={3}>
            {linkPercentile.average}
          </Descriptions.Item>
          <Descriptions.Item label="最小" span={3}>
            {linkPercentile.min}
          </Descriptions.Item>
          <Descriptions.Item label="最大" span={3}>
            {linkPercentile.max}
          </Descriptions.Item>
          <Descriptions.Item label="25%" span={3}>
            {linkPercentile.firstQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="50%" span={3}>
            {linkPercentile.secondQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="75%" span={3}>
            {linkPercentile.thirdQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="95%" span={3}>
            {linkPercentile.fourthQuartile}
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
                    linkPercentile.min,
                    linkPercentile.firstQuartile,
                    linkPercentile.secondQuartile,
                    linkPercentile.thirdQuartile,
                    linkPercentile.max,
                  ],
                ],
              },
            ],
          }}
        />
      </Col>
      <Col span={6}>
        <Descriptions bordered size="small">
          <Descriptions.Item label={`总关联至${typeName}画像数`} span={3}>
            {tagLinkTotal}
          </Descriptions.Item>
          <Descriptions.Item label="不同画像组合数" span={3}>
            {tagLinkDifferentNum}
          </Descriptions.Item>
        </Descriptions>

        <ReactECharts
          option={{
            tooltip: {
              trigger: 'item',
              formatter: '{b} : ({d}%)',
            },
            toolbox: {
              show: false,
            },
            dataset: {
              source: [['name', 'value']].concat([
                ['已关联', tagLinkTotal],
                ['未关联', tagTotal - tagLinkTotal],
              ]),
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
      <Col span={6}>
        <Descriptions bordered size="small" title={`每个画像的关联上架${typeName}个数分布`}>
          <Descriptions.Item label="平均数" span={3}>
            {tagLinkPercentile.average}
          </Descriptions.Item>
          <Descriptions.Item label="最小" span={3}>
            {tagLinkPercentile.min}
          </Descriptions.Item>
          <Descriptions.Item label="最大" span={3}>
            {tagLinkPercentile.max}
          </Descriptions.Item>
          <Descriptions.Item label="25%" span={3}>
            {tagLinkPercentile.firstQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="50%" span={3}>
            {tagLinkPercentile.secondQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="75%" span={3}>
            {tagLinkPercentile.thirdQuartile}
          </Descriptions.Item>
          <Descriptions.Item label="95%" span={3}>
            {tagLinkPercentile.fourthQuartile}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={12}>
        <ReactECharts
          option={{
            title: [
              {
                text: `关联上架${typeName}盒须图`,
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
                    tagLinkPercentile.min,
                    tagLinkPercentile.firstQuartile,
                    tagLinkPercentile.secondQuartile,
                    tagLinkPercentile.thirdQuartile,
                    tagLinkPercentile.max,
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
