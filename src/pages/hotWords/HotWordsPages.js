import React from 'react';
import { Card, Radio } from 'antd';
import router from '@/utils/tRouter';

function HotWordsAskTabs(props) {
  const { value, children } = props;
  const handelPage = type => {
    switch (type) {
      case 'hotWords':
        router.push('hotWordsManage');
        break;
      case 'commonQuestion':
        router.push('commonQuestion');
        break;
      default:
        router.push('hotWordsManage');
        break;
    }
  };
  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Radio.Group
          value={value}
          defaultValue="hotWords"
          buttonStyle="solid"
          size="normal"
          onChange={e => handelPage(e.target.value)}
        >
          <Radio.Button value="hotWords">热词管理</Radio.Button>
          <Radio.Button value="commonQuestion">常见问句</Radio.Button>
        </Radio.Group>
      </Card>
      {children}
    </>
  );
}

export default HotWordsAskTabs;
