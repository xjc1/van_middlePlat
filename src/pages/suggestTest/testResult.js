import React from 'react';
import { Tabs } from 'antd';
import UserTag from './components/UserTag';
import SuggestResult from './components/SuggestResult';

const { TabPane } = Tabs;

function TestResult({ data = {}, dictNames }) {
  return (
    <div style={{ marginTop: 16, padding: 16, background: '#fff' }}>
      <Tabs defaultActiveKey="userTag">
        <TabPane tab="满足的用户画像标签" key="userTag">
          <UserTag value={data.userTags} />
        </TabPane>
        <TabPane tab="推荐结果" key="suggestResult">
          <SuggestResult value={data.suggest} dictNames={dictNames} />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default TestResult;
