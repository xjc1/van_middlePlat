import React, { PureComponent } from 'react';
import { Col, Row } from 'antd';
import PageTabLayout from './components/PageTabLayout';
import EditDisplayPosition from './components/displayPosition/EditDisplayPosition';

class Index extends PureComponent {
  render() {
    return (
      <PageTabLayout curPath="displayPosition_sourceManage">
        <Row style={{ background: '#fff', marginTop: 10, padding: 20 }}>
          <Col span={4} style={{ textAlign: 'right' }}>
            输出模块：
          </Col>
          <Col span={16}>
            <EditDisplayPosition />
          </Col>
        </Row>
      </PageTabLayout>
    );
  }
}

export default Index;
