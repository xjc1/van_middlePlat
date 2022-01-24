import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { LICENSE } from '@/services/api';
import CreateCertificationManage from './editComponents/CreateCertificationManage';
import initData from './initData';

function EditCertificationManage(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (id) {
      getDetail(id);
    } else {
      setDetail({});
    }
  }, []);

  async function getDetail(recordId) {
    const res = await LICENSE.getLicenseDetailUsingGET(recordId);
    setDetail(initData(res));
  }

  return (
    <>
      {detail ? (
        <CreateCertificationManage
          {...props}
          initialValues={detail}
          editVisible
          title={id ? '编辑证照' : '新增证照'}
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default EditCertificationManage;
