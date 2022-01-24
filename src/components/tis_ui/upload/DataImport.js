/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { message, Upload, notification } from 'antd';
import TButton from '../TButton';
import EmptyFn from '../utils/EmptyFn';
import useUnmount from '../hooks/useUnmount';

const baseUrl = '/uesop/api';
const defaultTypeList = ['xls', 'xlsx'];

function DataImport({
  action = '',
  btnText = 'Excel 导入',
  typeList = defaultTypeList,
  refresh = EmptyFn,
  data = {},
}) {
  const [loading, setLoading] = useState(false);

  const [safeExecute] = useUnmount();

  function beforeUpload(file) {
    const type = file.name.split('.').pop();
    const isValid = typeList.includes(type);
    if (!isValid) {
      message.error(`只能导入 ${typeList.join('/')} 文件`);
    }
    return isValid;
  }

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 导入成功`);
      const { data: responseData } = info.file.response;
      const dataString =
        typeof responseData === 'string' ? responseData : JSON.stringify(responseData);
      try {
        const formatData = JSON.parse(dataString, (key, value) => {
          return value === null ? undefined : value;
        });
        refresh(formatData || {});
      } catch (e) {
        /* Ignore */
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 导入失败`);
      const {
        data: { message: msg },
      } = info.file.response;
      notification.error({ message: msg });
    }
    safeExecute(setLoading)(false);
  }

  return (
    <Upload
      action={action && baseUrl + action}
      headers={{ Authorization: `Bearer ${localStorage.getItem('token')}` }}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      data={data}
    >
      <TButton.Input loading={loading}>{btnText}</TButton.Input>
    </Upload>
  );
}

export default DataImport;
