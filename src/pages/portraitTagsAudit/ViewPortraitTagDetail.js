import React from 'react';
import EditPortraitTag from '@/pages/portraitTags/EditPortraitTag';
import usePortraitTagDetail from '@/pages/portraitTags/hooks/usePortraitTagDetail';
import { PORTRAIT } from '@/services/api';
import { notification, Spin } from 'antd';

function ViewPortraitTagDetail(props) {
  const {
    match: {
      params: { tagId },
    },
  } = props;

  const { initialValues, initSchema, logicDesc, changeLogicDesc } = usePortraitTagDetail(
    tagId,
    getDetail,
  );

  async function getDetail() {
    try {
      return await PORTRAIT.getReviewObjectDetailUsingGET(tagId);
    } catch (e) {
      notification.error({
        message: '获取详情失败',
      });
    }
    return {};
  }

  return initialValues ? (
    <EditPortraitTag
      title="查看标签"
      logicDesc={logicDesc}
      changeLogicDesc={changeLogicDesc}
      initSchema={initSchema}
      initialValues={initialValues}
      editVisible={false}
      recordId={tagId}
      onlyCurrentReview
      isAuditPage
    />
  ) : (
    <Spin />
  );
}

export default ViewPortraitTagDetail;
