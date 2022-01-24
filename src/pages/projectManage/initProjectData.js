import { POLICY } from '@/services/api';
import _ from 'lodash';
import { treeAppendKey } from '@/utils/tools';

import { utils } from '@/components/tis_ui';

const { IDGenerator } = utils;

const idGenerator = new IDGenerator('timeIner');
const deptIDGenerator = new IDGenerator('dept');
const contactGenerator = new IDGenerator('contact');

const defaultRelatedItem = {
  key: 'defaultKey',
  isRoot: true,
  operator: 'and',
  children: [],
};

export default async function(res) {
  const {
    directPolicies = [],
    relatedPolicies = [],
    preProjects = [],
    preMatters = [],
    relationMatchService = [],
    relationMatchScene = [],
    relationMatchMatter = [],
    rankingCondition = [],
    restrictiveConditions = [],
    restrictiveConditionLegalPerson = [],
    downloadUrl: fileUrl,
    legalPersonPortraitTag = [],
    personalPortraitTag = [],
    timeTags = [],
    departments = [],
    form,
    code,
    personalUnnecessaryPortraitTag = [],
    legalPersonUnnecessaryPortraitTag = [],
    suggestTags = [],
    minimalConditionRelation = defaultRelatedItem,
  } = res;
  const newDownloadUrl = [fileUrl, form];

  if (relatedPolicies.length > 0) {
    const policy = await POLICY.getPolicyByIdsUsingPOST({
      body: relatedPolicies.map(({ id: rid }) => rid),
    });
    res.relatedPolicies = _.map(policy, ({ name, id: pid }) => {
      return {
        label: name,
        key: pid,
        value: pid,
      };
    });
  }

  if (departments && departments.length > 0) {
    res.departments = departments.map(({ deptName, address, contacts = [] }) => {
      return {
        deptName,
        address,
        contacts: _.map(contacts, item => {
          return {
            ...item,
            key: contactGenerator.next(),
          };
        }),
        key: deptIDGenerator.next(),
      };
    });
  }
  const newData = {
    ...res,
    mainCode: code && code.substring(0, 4),
    sonCode: code && code.substring(4, 7),
    grandsonCode: code && code.substring(7, 10),
    regionCode: code && `QH${code.substring(10, 16)}`,
    otherCode: code && code.substring(16, 25),
    downloadUrl: newDownloadUrl,
    directPolicies: directPolicies.map(it => it.id),
    preProjects: preProjects.map(it => it.id),
    preMatters: preMatters.map(it => it.id),
    relationMatchService: relationMatchService.map(it => it.id),
    relationMatchScene: relationMatchScene.map(it => it.id),
    relationMatchMatter: relationMatchMatter.map(it => it.id),
    restrictiveConditions: restrictiveConditions.map(it => it.id),
    rankingCondition: rankingCondition.map(it => it.id),
    restrictiveConditionLegalPerson: restrictiveConditionLegalPerson.map(it => it.id),
    personalPortraitTag: personalPortraitTag.map(({ tagId }) => tagId),
    legalPersonPortraitTag: legalPersonPortraitTag.map(({ tagId }) => tagId),
    personalUnnecessaryPortraitTag: personalUnnecessaryPortraitTag.map(({ tagId }) => tagId),
    legalPersonUnnecessaryPortraitTag: legalPersonUnnecessaryPortraitTag.map(({ tagId }) => tagId),
    timeTags: timeTags.map(item => {
      return { ...item, key: idGenerator.next() };
    }),
    suggestTags: suggestTags.map(name => ({ name })),
    minimalConditionRelation: treeAppendKey(_.compact([minimalConditionRelation]), true),
  };

  return newData;
}
