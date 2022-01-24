import React, { useState } from 'react';
import { Button } from 'antd';

function ModalFormWrap({ children }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      {children(visible, () => setVisible(false))}
    </div>
  );
}

export default ModalFormWrap;
