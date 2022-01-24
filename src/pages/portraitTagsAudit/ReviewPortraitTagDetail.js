import React, { useState } from 'react';
import EditPortraitTag from '@/pages/portraitTags/EditPortraitTag';
import usePortraitTagDetail from '@/pages/portraitTags/hooks/usePortraitTagDetail';
import { PORTRAIT } from '@/services/api';
import { notification, Spin } from 'antd';
import { ReviewModalForm } from '@/components/bussinessComponents';
import router from '@/utils/tRouter';
import { AuditOutlined } from '@ant-design/icons';

function ReviewPortraitTagDetail(props) {
  const {
    match: {
      params: { tagId },
    },
  } = props;

  const { initialValues, initSchema, logicDesc, changeLogicDesc } = usePortraitTagDetail(
    tagId,
    getDetail,
  );
  const [auditRecord, setAuditRecord] = useState(null);

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
    <>
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
        okText="审核"
        formBtnOptions={{
          disabled: false,
          onOk: () => setAuditRecord(initialValues),
          okIcon: <AuditOutlined />,
        }}
      />
      {auditRecord && (
        <ReviewModalForm
          elementId={auditRecord.id}
          onClose={() => setAuditRecord(null)}
          onOk={() => {
            setAuditRecord(null);
            router.goBack();
          }}
          initialValues={{
            stage: auditRecord.title,
            ...auditRecord,
          }}
        />
      )}
    </>
  ) : (
    <Spin />
  );
}

export default ReviewPortraitTagDetail;
