import React, { useState } from 'react';
import { Switch } from 'antd';

function PreViewSwitch({ defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <span>
      <Switch
        size="small"
        style={{
          marginRight: 10,
        }}
        checked={checked}
        onChange={() => {
          const nextChecked = !checked;
          setChecked(nextChecked);
        }}
      />
      预览模式
    </span>
  );
}

export default PreViewSwitch;
