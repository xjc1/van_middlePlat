import { useEffect, useState } from 'react';
import { POLICY } from '@/services/api';
import moment from 'moment';
import _ from 'lodash';
import { objectDict } from '@/constants';
import { treeAppendKey } from '@/utils/tools';

const defaultRelatedItem = {
  key: 'defaultKey',
  isRoot: true,
  operator: 'and',
  children: [],
};

function usePolicyDetail(policyId) {
  const [policyDetail, setPolicyDetail] = useState({});
  const [userType, setUserType] = useState(objectDict.personAndLegalPerson);
  useEffect(() => {
    POLICY.getPolicyDetailUsingGET(policyId).then((detail = {}) => {
      const {
        policyInfoPredicted = {},
        department = [],
        category = [],
        officialDocumentsTypes = [],
        expireTime,
        pubTime,
        relationMatchScene = [],
        relationMatchMatters = [],
        relationMatchService = [],
        relationPolicy = [],
        relationMatchProject = [],
        restrictiveCondition = [],
        restrictiveConditionLegalPerson = [],
        singleSelect = '',
        talentProject = [],
        downloadUrl,
        form: fileName,
        personalPortraitTag = [],
        legalPersonPortraitTag = [],
        personalUnnecessaryPortraitTag = [],
        files = [],
        legalPersonUnnecessaryPortraitTag = [],
        objectType,
        minimalConditionRelation = defaultRelatedItem,
      } = detail;
      if (policyInfoPredicted.expireTime === '') {
        policyInfoPredicted.longTime = true;
      }
      setUserType(objectType);
      setPolicyDetail({
        ...detail,
        objectType,
        policyInfoPredicted,
        department: department.map(it => it.id),
        category: category.map(it => it.id),
        officialDocumentsTypes: officialDocumentsTypes.map(it => it.id),
        expireTime: expireTime
          ? [moment(expireTime[0], 'YYYY-MM-DD'), moment(expireTime[1], 'YYYY-MM-DD')]
          : expireTime,
        pubTime: pubTime ? moment(pubTime, 'YYYY-MM-DD') : pubTime,
        relationMatchScene: relationMatchScene.map(it => it.aid),
        relationMatchMatters: relationMatchMatters.map(it => it.aid),
        relationMatchService: relationMatchService.map(it => it.aid),
        relationPolicy: relationPolicy.map(it => it.aid),
        relationMatchProject: relationMatchProject.map(it => it.aid),
        restrictiveCondition: restrictiveCondition.map(it => it.aid),
        restrictiveConditionLegalPerson: restrictiveConditionLegalPerson.map(it => it.aid),
        singleSelect: singleSelect.split(','),
        talentProject: talentProject.map(it => it.code),
        // 这里为了兼容旧的数据格式，如果files为空就把downloadUrl与form作为files的第一条数据
        files: files.length ? files.map(({ name, url }) => [url, name]) : [[downloadUrl, fileName]],
        personalPortraitTag: personalPortraitTag.map(({ tagId }) => tagId),
        legalPersonPortraitTag: legalPersonPortraitTag.map(({ tagId }) => tagId),
        personalUnnecessaryPortraitTag: personalUnnecessaryPortraitTag.map(({ tagId }) => tagId),
        legalPersonUnnecessaryPortraitTag: legalPersonUnnecessaryPortraitTag.map(
          ({ tagId }) => tagId,
        ),
        showPredict: true,
        minimalConditionRelation: treeAppendKey(_.compact([minimalConditionRelation]), true),
      });
    });
  }, []);
  return { policyDetail, userType, setUserType };
}

export default usePolicyDetail;
