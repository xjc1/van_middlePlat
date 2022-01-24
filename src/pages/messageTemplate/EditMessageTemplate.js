import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { MESSAGEMODULES } from '@/services/api';
import CreateMessageTemplate from './editComponents/CreateMessageTemplate';
import initData from './initData';

function EditMessageTemplateInfo(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [messageTemplateInfo, setMessageTemplateInfo] = useState(null);

  useEffect(() => {
    if (id) {
      getDetail(id);
    } else {
      setMessageTemplateInfo({});
    }
  }, []);

  async function getDetail(recordId) {
    const res = await MESSAGEMODULES.getMessageModuleDetailUsingGET(recordId);
    const newData = await initData(res);
    setMessageTemplateInfo(newData);
  }

  return (
    <>
      {messageTemplateInfo ? (
        <CreateMessageTemplate
          {...props}
          initialValues={messageTemplateInfo}
          disabled={false}
          title={id ? '编辑消息模板' : '新增消息模板'}
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default EditMessageTemplateInfo;
