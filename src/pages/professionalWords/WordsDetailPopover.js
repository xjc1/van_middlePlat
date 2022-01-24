import React from 'react';
import { Popover } from 'antd';
import InputAddTable from './professionalWordsForm/InputAddTable';

function WordsDetailPopover({ value = {} }) {
  // const [popoverVisible, setPopoverVisible] = useState(false);
  return (
    <Popover
      trigger="click"
      placement="right"
      content={
        <div style={{ width: 400 }}>
          <p>同义词/近义词：</p>
          <InputAddTable value={value.synonym} disabled />
          <p style={{ marginTop: 16 }}>同音词：</p>
          <InputAddTable value={value.homophone} disabled />
        </div>
      }
    >
      <a>查看详情</a>
    </Popover>
  );
}

export default WordsDetailPopover;
