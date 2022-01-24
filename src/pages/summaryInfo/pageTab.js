import React from 'react';
import { Card, Radio } from 'antd';
import router from '@/utils/tRouter';

function PageTabs(props) {
  const { value, children, tabList = [{}] } = props;
  const handelPage = name => {
    router.push(name);
  };
  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Radio.Group
          value={value}
          buttonStyle="solid"
          size="normal"
          onChange={e => handelPage(e.target.value)}
        >
          {tabList.map(({ rName, name, alias }) => (
            <Radio.Button key={rName} value={rName}>{ alias || name}</Radio.Button>
          ))}
        </Radio.Group>
      </Card>
      {children}
    </>
  );
}

export default PageTabs;
