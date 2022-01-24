import { useEffect, useState } from 'react';
import { CONVENIENCE, DICT, KERNEL, POLICY, SCENE, TRANSLATE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { commonObjectType } from '@/utils/constantEnum';

const fileIDGenerator = new IDGenerator('editFile');

const flatBy = (data = [], key) =>
  data.map(item => item[key]).filter(item => item !== null && item !== undefined);

function useSceneDetail(sceneId) {
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (sceneId) {
      getDetail(sceneId);
    }
  }, []);

  async function getDetail(id) {
    const res = await SCENE.getSceneDetailUsingGET(id);

    const {
      matters = [],
      department = [],
      recommendTag = [],
      type = [],
      windows = [],
      phone = [],
      nextMatter = [],
      relationMatchPolicy = [],
      relationMatchMatters = [],
      relationMatchService = [],
      relationMatchProject = [],
      relationArticles = [],
      noteFiles = [],
      writeNote = [],
      explanation = {},
      object,
    } = res;

    const { services = [], question = [], policy = [] } = explanation;

    // 获取值
    const [policyList, questionList, servicesList] = await Promise.all([
      // 获取政策详情
      POLICY.getPolicyByIdsUsingPOST({
        body: [...flatBy(relationMatchPolicy, 'rid'), ...flatBy(policy, 'rid')],
      }),
      // 获取问答详情
      KERNEL.getSynonymByIdsUsingPOST({
        body: flatBy(question, 'rid'),
      }),
      // 获取服务详情
      CONVENIENCE.getConveniencesByIdsUsingPOST({
        body: [...flatBy(relationMatchService, 'rid'), ...flatBy(services, 'rid')],
      }),
    ]);

    // 翻译值
    const [
      translateMatters,
      translateDeparts,
      translateRegions,
      translateProject,
      translateArticles,
      translateThreeType,
    ] = await Promise.all([
      // 翻译事项
      TRANSLATE.matterTranslateUsingPOST({
        body: [
          ...flatBy(matters, 'mid'),
          ...flatBy(nextMatter, 'rid'),
          ...flatBy(relationMatchMatters, 'rid'),
        ],
      }),
      // 翻译部门
      Code2Name(Promise.resolve({ content: department }), ['SHSSBMSH', 'name']),
      // 翻译行政区划
      Code2Name(
        Promise.resolve({
          content: [...windows, ...policyList, ...questionList, ...servicesList],
        }),
        ['SH00XZQH', 'regions'],
      ),
      // 翻译项目
      TRANSLATE.declareProjectTranslateUsingPOST({
        body: flatBy(relationMatchProject, 'rid'),
      }),
      // 翻译文章
      TRANSLATE.articleTranslateUsingPOST({
        body: flatBy(relationArticles, 'rid'),
      }),
      // 翻译三级分类
      DICT.batchTranslateDictPathByCodesUsingPOST({
        body: {
          rootCode: object === commonObjectType.legalPerson ? 'FRSJFL1000' : '1000',
          childCodes: flatBy(type, 'code'),
        },
      }),
    ]);

    const info = {
      ...res,
      matters: matters.map(item => ({
        ...item,
        label: translateMatters[item.mid],
        key: item.mid,
      })),
      department: department.map(item => ({
        ...item,
        key: item.name,
        label: translateDeparts.dictNames.SHSSBMSH[item.name],
      })),
      recommendTag: recommendTag.map(({ code }) => code),
      type: type.map(({ code }) => ({
        code,
        key: code,
        label: _.reduce(
          translateThreeType[code].slice(1),
          (path, { name }) => {
            return `${path + name}/`;
          },
          '',
        ).slice(0, -1),
      })),
      windows: windows.map((item, index) => ({
        ...item,
        key: index,
        regions: {
          value: item.regions,
          key: item.regions,
          label: translateRegions.dictNames.SH00XZQH[item.regions],
        },
      })),
      phone: phone.map((item, index) => ({ ...item, key: index })),
      nextMatter: nextMatter.map(({ rid }) => ({
        rid,
        label: translateMatters[rid],
        key: rid,
      })),
      relationMatchPolicy: relationMatchPolicy.map(({ rid }) => {
        const item = policyList.find(it => it.id === rid);
        return {
          ...item,
          label: item.name,
          key: item.id,
        };
      }),
      relationMatchMatters: relationMatchMatters.map(({ rid }) => ({
        rid,
        label: translateMatters[rid],
        key: rid,
      })),
      relationMatchService: relationMatchService.map(({ rid }) => {
        const item = servicesList.find(it => it.id === rid);
        return {
          ...item,
          label: item.name,
          key: item.id,
        };
      }),
      relationMatchProject: relationMatchProject.map(({ rid }) => ({
        rid,
        label: translateProject[rid],
        key: rid,
      })),
      relationArticles: relationArticles.map(({ rid }) => ({
        rid,
        label: translateArticles[rid],
        key: rid,
      })),
      noteFiles: noteFiles.map(({ name, file }) => ({ name, file, key: fileIDGenerator.next() })),
      writeNote: writeNote.map((item, index) => ({ ...item, key: index + item.content })),
      explanation: {
        services: services.map(({ rid }) => {
          const item = servicesList.find(it => it.id === rid);
          return {
            ...item,
            key: item.id,
            regions: translateRegions.dictNames.SH00XZQH[item.regions],
          };
        }),
        question: question.map(({ rid }) => {
          const item = questionList.find(it => it.id === rid);
          return {
            ...item,
            key: item.id,
            regions: translateRegions.dictNames.SH00XZQH[item.regions],
          };
        }),
        policy: policy.map(({ rid }) => {
          const item = policyList.find(it => it.id === rid);
          return {
            ...item,
            key: item.id,
            regions: translateRegions.dictNames.SH00XZQH[item.regions],
          };
        }),
      },
    };
    setDetail(info);
  }

  return detail;
}

export default useSceneDetail;
