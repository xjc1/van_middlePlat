import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';
import Styles from './index.less';
import { infoes, names } from '@/pages/designStudios/FormDesigner/wrappers';
import LayoutElement from '@/pages/designStudios/layoutPanel/LayoutElement';

function Index(props) {
  return (
    <Row className={Styles.layoutPanel}>
      <Col span={24}>
        <h4>布局</h4>
      </Col>
      {_.map(names, v => {
        return <LayoutElement key={v} {...infoes[v]} />;
      })}
    </Row>
  );
}

export default Index;
