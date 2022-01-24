import React from 'react';
import EditPortraitTag from '@/pages/portraitTags/EditPortraitTag';
import usePortraitTagDetail from '@/pages/portraitTags/hooks/usePortraitTagDetail';
import { PORTRAIT } from '@/services/api';
import { notification, Spin } from 'antd';
import router from '@/utils/tRouter';

function EditPortraitTagDetail(props) {
  const {
    match: {
      params: { tagId },
    },
  } = props;

  const { initialValues, initSchema, logicDesc, reload, changeLogicDesc } = usePortraitTagDetail(
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

  function customSubmit(value) {
    const { tagId: reviewId, title, reviewStatus } = initialValues;
    PORTRAIT.updateReviewObjectDetailUsingPOST({
      body: {
        id: tagId,
        ...value,
        tagId: reviewId,
        title,
        reviewStatus,
      },
    })
      .then(() => {
        notification.success({
          message: '成功修改标签内容',
        });
        router.goBack();
      })
      .catch(e => {
        notification.error({
          message: `修改失败，${e.msg}`,
        });
      });
  }

  return initialValues ? (
    <EditPortraitTag
      title="编辑标签"
      changeLogicDesc={changeLogicDesc}
      initSchema={initSchema}
      initialValues={initialValues}
      logicDesc={logicDesc}
      recordId={tagId}
      okText="提交更改"
      reload={reload}
      customSubmit={customSubmit}
      onlyCurrentReview
      isAuditPage
    />
  ) : (
    <Spin />
  );
}

export default EditPortraitTagDetail;
