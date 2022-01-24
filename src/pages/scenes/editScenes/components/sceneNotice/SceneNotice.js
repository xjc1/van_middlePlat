import React from 'react';
import _ from 'lodash';
import { TItem, RichText } from '@/components/tis_ui';
import UploadFiles from './UploadFiles';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function SceneNotice(props) {
  const { disabled } = props;

  return (
    <>
      <TItem name="scenesNotes" label="备注内容" {...layout}>
        <RichText base64 readOnly={disabled} />
      </TItem>
      <TItem name="noteFiles" label="主题文件上传" {...layout}>
        <UploadFiles sceneForm={props.sceneForm} disabled={disabled} />
      </TItem>
    </>
  );
}

export default SceneNotice;
