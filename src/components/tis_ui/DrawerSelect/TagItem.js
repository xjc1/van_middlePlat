/* eslint-disable import/no-extraneous-dependencies */
import React, { memo } from 'react';
import { Tag } from 'antd';
import EmptyFn from '../utils/EmptyFn';

const COLORS = {
  active: '#108ee9',
  selected: 'blue',
};

function TagItem({ text, id, closable = false, type, onSelectedTag = EmptyFn, onClose }) {
  return (
    <Tag
      onClick={() => {
        onSelectedTag(id);
      }}
      onClose={onClose}
      color={COLORS[type]}
      closable={closable}
      style={{ marginBottom: 5, cursor: 'pointer' }}
    >
      {text}
    </Tag>
  );
}

export default memo(TagItem);
