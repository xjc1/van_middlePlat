import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';
import Styles from './index.less';
import { infoes, names } from '@/pages/designStudios/FormDesigner/widgets';
import WidgetElement from './WidgetElement';

function Index(props) {
  return (
    <Row className={Styles.widgetPanel}>
      <Col span={24}>
        <h4>控件</h4>
      </Col>
      {_.map(names, v => {
        return <WidgetElement key={v} {...infoes[v]} />;
      })}
    </Row>
  );
}

export default Index;
