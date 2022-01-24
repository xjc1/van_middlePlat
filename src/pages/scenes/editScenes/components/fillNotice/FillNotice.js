import React from 'react';
import { connect } from 'dva';
import { TItem } from '@/components/tis_ui';
import AddFillNotice from './AddFillNotice';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function SceneNotice(props) {
  const { sceneForm, disabled } = props;

  return (
    <TItem name="writeNote" label="填报须知" {...layout}>
      <AddFillNotice sceneForm={sceneForm} disabled={disabled} />
    </TItem>
  );
}

export default connect(scenes => ({ scenes }))(SceneNotice);
