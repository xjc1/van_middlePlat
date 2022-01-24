import React from 'react';
import usePortraitTagDetail from './hooks/usePortraitTagDetail';
import EditPortraitTag from './EditPortraitTag';

function EditPortraitTagPage(props) {
  const {
    match: {
      params: { tagId },
    },
  } = props;

  const { initialValues, initSchema, logicDesc, changeLogicDesc, reload } = usePortraitTagDetail(
    tagId,
  );

  return (
    initialValues && (
      <EditPortraitTag
        title="编辑标签"
        changeLogicDesc={changeLogicDesc}
        initSchema={initSchema}
        initialValues={initialValues}
        logicDesc={logicDesc}
        recordId={tagId}
        okText="提交更改"
        reload={reload}
      />
    )
  );
}

export default EditPortraitTagPage;
