import Request from '@/utils/request';
import { summaryInfoUrl } from '@/constants';
import { notification } from 'antd';
import _ from 'lodash';

const { BASE_URL = '' } = process.env;
const prefixes = `${BASE_URL}/uesop`;

export default {
  getDictionary(body, resolve, reject) {
    return Request(`${prefixes}/api/v1.0/policyStore/getDictionary/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: JSON.stringify(body),
    }).then(dicResp => {
      if (dicResp.status !== 'success') {
        reject(dicResp);
      } else {
        const {
          data: {
            body: { rows = [] },
          },
        } = dicResp;
        resolve(rows);
      }
    });
  },

  getDictionaryUseId(id, resolve, reject) {
    return Request(`${prefixes}/api/v1.0/policyStore/getNextLevelDictionary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      params: { id },
    }).then(dicResp => {
      if (dicResp.status !== 'success') {
        reject(dicResp);
      } else {
        const {
          data: { body = [] },
        } = dicResp;
        resolve(body);
      }
    });
  },

  getPolicyWords(body) {
    return Request(`${prefixes}/api/v1.0/policyStore/getPolicyWordsSelect`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
  },

  getChildDictionary(code, resolve, reject) {
    return this.getDictionary(
      {
        condition: { status: '0', deleteFlag: 0, parentcode: code },
      },
      resolve,
      reject,
    );
  },

  getTreeDictionary(code, resolve, reject) {
    return this.getDictionary(
      {
        condition: { status: '0', deleteFlag: 0, rootCode: _.isArray(code) ? undefined : code },
        parentCode: _.isArray(code) ? code : [code],
      },
      resolve,
      reject,
    );
  },

  getDictsionary(codes, resolve, reject) {
    return this.getDictionary(
      {
        condition: { status: '0', deleteFlag: 0, code: { $in: codes } },
      },
      resolve,
      reject,
    );
  },

  getDictionaryById(id, resolve, reject) {
    return this.getDictionary(
      {
        condition: { status: '0', deleteFlag: 0, _id: id },
      },
      resolve,
      reject,
    );
  },

  getQaVersion() {
    return Request(`${preApi}/webqa/version`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  },
  getJavaVersion() {
    return Request(`${preApi}/uesop/api/kernel/version`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  },

  getsummaryInfo({ params = {} }) {
    return Request(summaryInfoUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      params,
    }).then((data = {}) => {
      const { result } = data;
      if (result !== 0) {
        notification.error({ message: '操作失败' });
      } else {
        notification.success({ message: '操作成功' });
      }
      return data;
    });
  },
};
