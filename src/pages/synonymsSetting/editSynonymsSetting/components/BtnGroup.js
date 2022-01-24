import React from 'react';
import { TButton } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

function BtnGroup({ onOk = EmptyFn, onCancel = EmptyFn, editAble = true }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <TButton.Button onClick={onCancel} style={{ marginRight: '20px' }}>
        取消
      </TButton.Button>
      {editAble &&
        <TButton.Button type="primary" onClick={onOk}>
          保存
       </TButton.Button>}
    </div>
  );
}

export default BtnGroup;
