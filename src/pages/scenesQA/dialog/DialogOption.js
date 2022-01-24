import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

function DialogOption({ checked, setChecked, id, children }) {
  console.info(id);
  return (
    <CheckableTag
      checked={checked}
      onChange={() => {
        setChecked(id);
      }}
    >
      {children}
    </CheckableTag>
  );
}

export default DialogOption;
