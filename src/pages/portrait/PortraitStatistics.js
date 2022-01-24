import React from 'react';
import { Card, Row, Col } from 'antd';
import { FundFilled, PieChartFilled } from '@ant-design/icons';
import styles from './portrait.less';

function PortraitStatistics({ total = 0, matchedNumber = 0 }) {
  return (
    <div style={{marginTop:10}}>
      <Row >
        <Col span={12}>
          <Card title="画像标签总数" bordered={false} >
            <FundFilled className={styles.icon} style={{ color: '#1890ff' }} />
            <span className={styles.text}>{total}</span>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="符合条件数" bordered={false} >
            <PieChartFilled className={styles.icon} style={{ color: '#3eaf7c' }} />
            <span className={styles.text}>{matchedNumber}</span>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PortraitStatistics;
