import React, { useState } from 'react';
import { Form, Input, Popover, Tooltip } from 'antd';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import EditCondition from '@/components/bussinessComponents/conditionDesigner/EditCondition';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function ContentPopup({ onEdit = EmptyFn, objectType, conditionItem = {}, onDelete = EmptyFn }) {
  const { conditionInfo = {} } = conditionItem;
  const { conditionName, content } = conditionInfo;
  const [showEditPopup, SetShowEditPopup] = useState();
  const contentPopup = (
    <Form initialValues={{ content }}>
      <TItem name="content" label="原文" rules={[FormRules.required('必填')]}>
        <Input.TextArea disabled />
      </TItem>
    </Form>
  );
  return (
    <div style={{ display: 'flex' }}>
      <Popover content={contentPopup}>
        <div style={{ marginRight: '15px' }}>{conditionName}</div>
      </Popover>
      <div style={{ marginRight: '15px' }}>
        <Tooltip title="编辑">
          <EditOutlined onClick={() => SetShowEditPopup(true)} />
        </Tooltip>
      </div>
      <div>
        <Tooltip title="删除">
          <DeleteOutlined onClick={onDelete} />
        </Tooltip>
      </div>
      {showEditPopup && (
        <EditCondition
          objectType={objectType}
          conditionItem={conditionItem}
          onFinish={values => {
            onEdit(values);
            SetShowEditPopup(false);
          }}
          onCancel={() => {
            SetShowEditPopup(false);
          }}
        />
      )}
    </div>
  );
}

export default ContentPopup;
