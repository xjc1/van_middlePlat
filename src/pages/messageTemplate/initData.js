import { messageSendTypeBack } from '@/utils/constantEnum';
import MessgeTypeConfig from '@/components/bussinessComponents/messgeTypeConfig';
import _ from 'lodash';
import { utils } from '@/components/tis_ui';

const { IDGenerator } = utils;

const historyId = new IDGenerator('h');

function InitData(data) {
  const { sendType = 0, contents = [], editHistory = [], ...others } = data;

  return {
    ...others,
    sendType: messageSendTypeBack[sendType].split(',').map(Number),
    contents: _.map(contents, MessgeTypeConfig.initData),
    editHistory: _.map(editHistory, item => ({ ...item, key: historyId.next() })),
  };
}

export default InitData;
