import { appUserType } from '@/utils/constantEnum';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { DICT } from '@/services/api';
import _ from 'lodash';

const portraitIDGenerator = new IDGenerator('portraitId');

export async function dataInit(response) {
  const threeLevelsLegalCodes = response
    .filter(it => it.object == appUserType.legalPerson)
    .map(({ threeLevels = [] }) => threeLevels.map(({ code }) => code));
  const threeLevelsSelfCodes = response
    .filter(it => it.object == appUserType.self)
    .map(({ threeLevels = [] }) => threeLevels.map(({ code }) => code));
  // 翻译三级分类
  const threeTypeLegalDictNames = await DICT.batchTranslateDictPathByCodesUsingPOST({
    body: {
      rootCode: '1000',
      childCodes: _.flattenDeep(threeLevelsLegalCodes),
    },
  });
  const threeTypeSelfDictNames = await DICT.batchTranslateDictPathByCodesUsingPOST({
    body: {
      rootCode: 'FRSJFL1000',
      childCodes: _.flattenDeep(threeLevelsSelfCodes),
    },
  });
  const threeTypeDictNames = Object.assign({}, threeTypeLegalDictNames, threeTypeSelfDictNames);
  const result = response.map(item => ({
    ...item,
    threeLevels: item.threeLevels.map(({ code }) => ({
      code,
      key: code,
      label: _.reduce(
        threeTypeDictNames[code].slice(1),
        (path, { name }) => {
          return `${path + name}/`;
        },
        '',
      ).slice(0, -1),
    })),
    uuid: portraitIDGenerator.next(),
  }));
  return result;
}
