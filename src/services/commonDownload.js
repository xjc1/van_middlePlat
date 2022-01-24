import Request from '@/utils/request';
// import { options } from './api';
import { message } from 'antd';

const { BASE_URL = '' } = process.env;
const defaultOptions = { endPoint: `${BASE_URL}/uesop`, preUrl: '/api' };

function download({
  url,
  name,
  method = 'GET',
  condition,
  options = defaultOptions,
  errorText = '下载失败',
}) {
  const { endPoint, preUrl } = options;
  const requestConfig = {
    method,
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  if (method === 'POST' && condition) {
    requestConfig.data = condition;
  }
  if (method === 'GET' && condition) {
    requestConfig.params = condition;
  }
  return Request(`${endPoint}${preUrl}${url}`, requestConfig).then(blob => {
    // 返回Object则说明出错
    if (Object.prototype.toString.call(blob) === '[object Response]') {
      message.error(blob.statusText || errorText);
    }
    if (blob.size > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(blob);
      // eslint-disable-next-line func-names
      reader.onload = function(e) {
        const a = document.createElement('a');
        a.download = name;
        a.href = e.target.result;
        a.click();
      };
    }
  });
}

export default download;
