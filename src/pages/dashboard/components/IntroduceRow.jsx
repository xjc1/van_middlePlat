import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import Trend from './Trend';
import authfn from '@/utils/auth/AuthFn';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { CORE } from '@/services/api';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => {
  const [stat, setStat] = useState({
    sceneTotal: 0,
    matterTotal: 0,
    policyLibraryTotal: 0,
    convenienceServiceTotal: 0,
    synonymTotal: 0,
    subscribeTotal: 0,
    applicationTotal: 0,
  });

  useEffect(() => {
    CORE.statUsingGET().then(
      ({
        sceneTotal,
        matterTotal,
        policyLibraryTotal,
        convenienceServiceTotal,
        synonymTotal,
        subscribeTotal,
        applicationTotal,
      }) => {
        setStat({
          sceneTotal,
          matterTotal,
          policyLibraryTotal,
          convenienceServiceTotal,
          synonymTotal,
          subscribeTotal,
          applicationTotal,
        });
      },
    );
  }, []);

  return (
    <Row gutter={24} type="flex">
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered
          title="主题数量"
          loading={loading}
          total={() => <span>{stat.sceneTotal}</span>}
          contentHeight={46}
        ></ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered
          loading={loading}
          title="事项数量"
          total={() => <span>{stat.matterTotal}</span>}
          contentHeight={46}
        ></ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered
          loading={loading}
          title="政策数量"
          total={() => <span>{stat.policyLibraryTotal}</span>}
          contentHeight={46}
        ></ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered
          loading={loading}
          title="服务数量"
          total={() => <span>{stat.convenienceServiceTotal}</span>}
          contentHeight={46}
        ></ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered
          loading={loading}
          title="问答数量"
          total={() => <span>{stat.synonymTotal}</span>}
          contentHeight={46}
        ></ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered
          loading={loading}
          title="订阅数量"
          total={() => <span>{stat.subscribeTotal}</span>}
          contentHeight={46}
        ></ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered
          loading={loading}
          title="应用数量"
          total={() => <span>{stat.applicationTotal}</span>}
          contentHeight={46}
        ></ChartCard>
      </Col>
    </Row>
  );
};

export default authfn('aaa-erere', IntroduceRow);
