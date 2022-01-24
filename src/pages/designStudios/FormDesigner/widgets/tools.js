import React from 'react';
import _ from 'lodash';
import { Tag } from 'antd';

function getlabel(displayName, label, orderIndex) {
  const displayLabel = displayName || label;
  return (
    <div>
      {orderIndex && <Tag color="#2db7f5">{orderIndex}</Tag>} {displayLabel}
    </div>
  );
}

function fieldFullName({ nameSpace, name }) {
  return _.join(
    _.filter([nameSpace, name], item => item),
    '_',
  );
}

export { getlabel, fieldFullName };
