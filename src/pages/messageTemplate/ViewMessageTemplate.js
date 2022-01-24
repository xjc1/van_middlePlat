import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import CreateMessageTemplate from './editComponents/CreateMessageTemplate';
import initData from './initData';
import { MESSAGEMODULES } from '@/services/api';

function ViewMessageTemplate(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [messageTemplateInfo, setMessageTemplateInfo] = useState(null);

  useEffect(() => {
    if (id) {
      console.log('-> id', id);
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
          disabled
          title="消息模板"
        />
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Spin />
        </Card>
      )}
    </>
  );
}

export default ViewMessageTemplate;
