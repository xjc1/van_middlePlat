import React from 'react';
import { Descriptions } from 'antd';

function LogDetail({ detail }) {
  return (
    <Descriptions title="日志详情" bordered column={1} size="small" labelStyle={{ width: 200 }}>
      <Descriptions.Item label="id">{detail.id}</Descriptions.Item>
      <Descriptions.Item label="用户id">{detail.userId}</Descriptions.Item>
      <Descriptions.Item label="日志等级">{detail.logLevel}</Descriptions.Item>
      <Descriptions.Item label="用户名称">{detail.userName}</Descriptions.Item>
      <Descriptions.Item label="接口或方法">{detail.method}</Descriptions.Item>
      <Descriptions.Item label="用户名称">{detail.opName}</Descriptions.Item>
      <Descriptions.Item label="操作时间">{detail.operationTime}</Descriptions.Item>
      <Descriptions.Item label="调用参数">{detail.params}</Descriptions.Item>
      <Descriptions.Item label="异常堆栈">{detail.stackTraces}</Descriptions.Item>
      <Descriptions.Item label="操作耗时">{detail.timeConsumption}</Descriptions.Item>
    </Descriptions>
  );
}

export default LogDetail;
