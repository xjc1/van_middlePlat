import React, { useState } from 'react';
import _ from 'lodash';
import DialogOption from '@/pages/scenesQA/dialog/DialogOption';

function RadioOption({ items }) {
  const [checked, setChecked] = useState(null);

  return (
    <div>
      {_.map(items, ({ cid, title }) => (
        <DialogOption setChecked={setChecked} checked={checked === cid} id={cid} key={cid}>
          {title}
        </DialogOption>
      ))}
    </div>
  );
}

export default RadioOption;
