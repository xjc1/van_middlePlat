import React from 'react';
import usePortraitTagDetail from './hooks/usePortraitTagDetail';
import EditPortraitTag from './EditPortraitTag';

function ViewPortraitTagPage(props) {
  const {
    match: {
      params: { tagId },
    },
  } = props;

  const { initialValues, initSchema, logicDesc, changeLogicDesc } = usePortraitTagDetail(tagId);

  return (
    initialValues && (
      <EditPortraitTag
        title="查看标签"
        logicDesc={logicDesc}
        changeLogicDesc={changeLogicDesc}
        initSchema={initSchema}
        initialValues={initialValues}
        editVisible={false}
        recordId={tagId}
      />
    )
  );
}

export default ViewPortraitTagPage;
