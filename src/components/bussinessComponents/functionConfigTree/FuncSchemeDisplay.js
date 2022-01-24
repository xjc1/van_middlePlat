import React from 'react';
import { Typography, Space } from 'antd';

function FuncSchemeDisplay({ schema = [], values = [] }) {
  return schema
    .map(item => ({ ...item, key: item.key ? item.key : Math.random() }))
    .map(({ name, key }, index) => {
      return (
        <Space direction="horizontal" key={key}>
          <Typography>
            <Typography.Text style={{ marginLeft: 6 }} type="secondary">
              {name}
            </Typography.Text>
            <Typography.Text style={{ marginLeft: 6 }} code>
              {values[index]}
            </Typography.Text>
          </Typography>
        </Space>
      );
    });
}

export default FuncSchemeDisplay;
