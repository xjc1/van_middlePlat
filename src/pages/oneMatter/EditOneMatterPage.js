import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { UNION } from '@/services/api';
import EditOneMatter from './editOneMatter';

function EditOneMatterPage(props) {
  const {
    match: {
      params: { oneMatterId },
    },
  } = props;
  const [oneMatterInfo, setOneMatterInfo] = useState(null);

  useEffect(() => {
    if (oneMatterId) {
      getDetail(oneMatterId);
    }

    async function getDetail(id) {
      const info = await UNION.getOneUnionProcessUsingGET(id);
      setOneMatterInfo(info);
    }
  }, []);
  return (
    <>
      {oneMatterInfo && oneMatterInfo.id ? (
        <EditOneMatter {...props} oneMatterInfo={oneMatterInfo} title="编辑" />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default EditOneMatterPage;
