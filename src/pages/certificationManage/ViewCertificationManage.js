import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { LICENSE } from '@/services/api';
import CreateCertificationManage from './editComponents/CreateCertificationManage';
import initData from './initData';

function ViewCertificationManage(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          editVisible={false}
          title="查看证照"
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default ViewCertificationManage;
