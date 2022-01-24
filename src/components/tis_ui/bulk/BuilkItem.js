/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';

import { Skeleton, Switch } from 'antd';
import TItem from '../Form/TItem';

const deaultLeftLayout = {
  col: 8,
  wrapperCol: { span: 8 },
  labelCol: { span: 16 },
};

const deaultRightLayout = {
  col: 16,
  wrapperCol: { span: 22 },
  labelCol: { span: 0 },
};

function Index({ label, children, layoutOptions = {}, ...others }) {
  const [editStatus, setEditStatus] = useState(false);
  const { leftLayout = deaultLeftLayout, rightLayout = deaultRightLayout } = layoutOptions;
  function renderItemByStatus(edit, child) {
    if (!edit) {
      return (
        <TItem {...rightLayout}>
          <Skeleton.Input />
        </TItem>
      );
    }
    return child;
  }
  return (
    <>
      <TItem label={label} {...leftLayout}>
        <Switch
          checked={editStatus}
          onChange={checked => {
            setEditStatus(checked);
          }}
        />
      </TItem>
      {renderItemByStatus(editStatus, children)}
    </>
  );
}

export default Index;
