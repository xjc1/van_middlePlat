import React from 'react';
import { Tooltip } from 'antd';
import { EmptyFn } from '@/components/tis_ui';
import { DeleteOutlined } from '@ant-design/icons';
import PortraitTagDrawerSelect from '../PortraitTagDrawerSelect';

function TagNode({ onEdit = EmptyFn, objectType, tagInfo, disabled, onDelete = EmptyFn }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '15px' }}>
        <PortraitTagDrawerSelect
          customTranslate={values => {
            return new Promise(resolve => {
              resolve(values);
            });
          }}
          type={objectType}
          value={tagInfo}
          onChange={val => {
            onEdit(val);
          }}
          mode="single"
          disabled={disabled}
          key={objectType}
        />
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {!disabled && (
          <Tooltip title="删除">
            <DeleteOutlined onClick={onDelete} />
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default TagNode;
