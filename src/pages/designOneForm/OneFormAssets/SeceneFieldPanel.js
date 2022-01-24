import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';
import Styles from '@/pages/designStudios/fieldPanel/index.less';
import FieldElement from '@/pages/designStudios/fieldPanel/FieldElement';
import { connect } from 'dva';

function SeceneFieldPanel({ list = [] }) {
  return (
    <Row className={Styles.filedPanel}>
      <Col span={24}>
        <h4>字段</h4>
      </Col>
      {_.map(list, item => {
        const { id } = item;
        return <FieldElement key={id} {...item} />;
      })}
    </Row>
  );
}

export default connect(({ fieldStore, formDesigner }) => {
  return {
    list: fieldStore.list,
    formDetail: formDesigner.formDetail,
  };
})(SeceneFieldPanel);
