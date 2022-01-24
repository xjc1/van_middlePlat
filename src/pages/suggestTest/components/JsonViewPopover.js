import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import JsonView from 'react-json-view';

function JsonViewPopover({ value = [], btnText, title, ...others }) {
  const [popoverVisible, setPopoverVisible] = useState(false);
  return (
    <Popover
      {...others}
      title={title}
      visible={popoverVisible}
      content={
        <>
          <JsonView style={{ maxHeight: 600, width: 900, overflow: 'scroll' }} src={value} />
        </>
      }
      trigger="click"
      onVisibleChange={visible => setPopoverVisible(visible)}
    >
      <Button type="primary">{btnText}</Button>
    </Popover>
  );
}

export default JsonViewPopover;
