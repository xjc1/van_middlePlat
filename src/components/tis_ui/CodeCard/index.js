/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Card } from 'antd';

function CodeCard({ className, children }) {
  return (
    <div className={className}>
      <Card size="small" bodyStyle={{ padding: '10px 0' }}>
        {children}
      </Card>
    </div>
  );
}

export default CodeCard;
