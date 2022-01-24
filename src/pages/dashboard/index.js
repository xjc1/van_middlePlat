import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva';
import { Typography, Divider, Form, Button } from 'antd';
import moment from 'moment';
import PageLoading from './components/PageLoading';

import { CORE } from '@/services/api';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));

const { Title, Paragraph, Text } = Typography;

const visitData = [];
const beginDay = new Date().getTime();
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];

for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

@connect(({ dashboard }) => dashboard)
class Index extends PureComponent {
  queryForm = null;

  render() {
    return (
      <div>
        <Typography>
          <Title level={3}>内容运营监控</Title>
          <Divider />
          <Paragraph>
            <Suspense fallback={<PageLoading />}>
              <IntroduceRow visitData={visitData} />
            </Suspense>
          </Paragraph>
        </Typography>
      </div>
    );
  }
}

export default Index;
