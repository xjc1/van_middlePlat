import React, { useState } from 'react';
import EditPortraitTag from './EditPortraitTag';
import { appUserType, sourceType, tagsSourceType, portraitLogicType } from '@/utils/constantEnum';

function CreatePortraitTagPage() {
  const initialValues = {
    object: appUserType.self,
    sourceType: tagsSourceType.scene,
    inputType: sourceType.recordByHand,
    logicType: portraitLogicType.none,
  };
  const [logicDesc, changeLogicDesc] = useState('');
  return (
    initialValues && (
      <EditPortraitTag
        title="新增标签"
        logicDesc={logicDesc}
        changeLogicDesc={changeLogicDesc}
        initialValues={initialValues}
        okText="创建标签"
      />
    )
  );
}

export default CreatePortraitTagPage;
