import { Button, Result } from 'antd';
import React from 'react';
import router from '@/utils/tRouter'; // 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉,你访问的地址无法找到,请检查地址是否正确."
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        返回首页
      </Button>
    }
  ></Result>
);

export default NoFoundPage;
