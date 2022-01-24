import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';
import Styles from './index.less';
import FieldElement from './FieldElement';
import demoData from './demo';

function Index() {
  return (
    <Row className={Styles.filedPanel}>
      <Col span={24}>
        <h4>字段</h4>
      </Col>
      {_.map(demoData, item => {
        const { name } = item;
        return <FieldElement key={name} {...item} />;
      })}
    </Row>
  );
}

export default Index;
