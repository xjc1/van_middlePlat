import { useState, useEffect } from 'react';
import { MATTER, DICT } from '@/services/api';
import _ from 'lodash';

const flatBy = (data = [], key) =>
  data.map(item => item[key]).filter(item => item !== null && item !== undefined);
function arrToObj(data) {
  return _.reduce(
    data,
    (result, item) => {
      const res = result;
      Object.keys(item).forEach(key => {
        if (res[key]) {
          res[key].push(...item[key].filter(({ name }) => name));
        } else {
          res[key] = item[key];
        }
      });
      return res;
    },
    {},
  );
}
function useMatterDetail(matterId) {
  const [initData, setInitData] = useState();

  useEffect(() => {
    if (matterId) {
      getDetail(matterId);
    }
  }, []);

  async function getDetail(id) {
    const res = await MATTER.queryMatterDetailUsingGET(id);

    const {
      lawBasisArr = [],
      relationMatchService = [],
      relationMatchScene = [],
      relationMatchProject = [],
      relationMatchPolicy = [],
      relationMatchSynonym = [],
      relationMatchArticle = [],
      preMatter = [],
      afterMatter = [],
      applyNoticeFileInfo,
      applyNoticeFileName,
      limitNoticeFileInfo,
      limitNoticeFileName,
      legalBasisNoticeFileInfo,
      legalBasisNoticeFileName,

      rankingCondition = [],
      recommendTag = [],
      restrictiveConditionLegalPerson = [],
      restrictiveConditions = [],
      personalPortraitTag = [],
      legalPersonPortraitTag = [],
      type = [],
      threeLevelOfPortraitTag = [],
    } = res;

    // 翻译三级分类 与画像的三级分类 个人法人都取一起翻译
    const translateThreeType = arrToObj(
      await Promise.all(
        ['FRSJFL1000', '1000'].map(async rootCode => {
          const data = await DICT.batchTranslateDictPathByCodesUsingPOST({
            body: {
              rootCode,
              childCodes: flatBy(type.concat(threeLevelOfPortraitTag), 'code'),
            },
          });
          return data;
        }),
      ),
    );

    const handledInfo = {
      ...res,
      // 基本信息 tab
      lawBasisArr: flatBy(lawBasisArr, 'id'),

      // 事项拓展信息 tab
      relationMatchService: flatBy(relationMatchService, 'id'),
      relationMatchScene: flatBy(relationMatchScene, 'id'),
      relationMatchProject: flatBy(relationMatchProject, 'id'),
      relationMatchPolicy: flatBy(relationMatchPolicy, 'id'),
      relationMatchSynonym: flatBy(relationMatchSynonym, 'id'),
      relationMatchArticle: flatBy(relationMatchArticle, 'id'),
      preMatter: flatBy(preMatter, 'id'),
      afterMatter: flatBy(afterMatter, 'id'),
      applyNoticeFile: [applyNoticeFileInfo, applyNoticeFileName],
      limitNoticeFile: [limitNoticeFileInfo, limitNoticeFileName],
      legalBasisNoticeFile: [legalBasisNoticeFileInfo, legalBasisNoticeFileName],

      // 事项推荐信息 tab
      rankingCondition: flatBy(rankingCondition, 'id'),
      recommendTag: flatBy(recommendTag, 'code'),
      restrictiveConditions: flatBy(restrictiveConditions, 'id'),
      restrictiveConditionLegalPerson: flatBy(restrictiveConditionLegalPerson, 'id'),
      personalPortraitTag: flatBy(personalPortraitTag, 'tagId'),
      legalPersonPortraitTag: flatBy(legalPersonPortraitTag, 'tagId'),
      type: _.map(type, ({ code }) => ({
        code,
        key: code,
        label: _.reduce(
          translateThreeType[code].slice(1),
          (path, { name }) => {
            return `${path}${name}/`;
          },
          '',
        ).slice(0, -1),
      })),
      threeLevelOfPortraitTag: _.map(threeLevelOfPortraitTag, ({ code }) => ({
        code,
        key: code,
        label: _.reduce(
          translateThreeType[code].slice(1),
          (path, { name }) => {
            return `${path}${name}/`;
          },
          '',
        ).slice(0, -1),
      })),
    };
    setInitData(handledInfo);
  }
  return {
    initData,
    getDetail,
  };
}

export default useMatterDetail;
