import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';
import Styles from '../layoutPanel/index.less';
import { infoes, names } from '@/pages/designStudios/FormDesigner/units';
import UnitElement from './UnitElement';

function Index() {
  return (
    <Row className={Styles.layoutPanel}>
      <Col span={24}>
        <h4>小组件</h4>
      </Col>
      {_.map(names, v => {
        return <UnitElement key={v} {...infoes[v]} />;
      })}
    </Row>
  );
}

export default Index;
