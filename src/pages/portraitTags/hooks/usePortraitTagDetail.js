/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { CONDITION, DICT, KERNEL, METHODSCHEMAS } from '@/services/api';
import { appUserType, portraitLogicType } from '@/utils/constantEnum';
import useUnmount from '@/components/tis_ui/hooks/useUnmount';
import { notification } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

const keyGenerator = new IDGenerator('fun_tree_init');

function treeAppendKey(tree, isRoot = true) {
  return _.map(tree, item => {
    const { children = [], ...others } = item;
    const formatItem = {
      ...others,
      isRoot,
      key: keyGenerator.next(),
      children: treeAppendKey(children, false),
    };
    return formatItem;
  });
}

const flatBy = (data = [], key) =>
  data.map(item => item[key]).filter(item => item !== null && item !== undefined);
const dataFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * @param {String} id 画像标签 id
 * @param {function(): Promise<{}>} customRequest 自定获取详情的接口
 */
function usePortraitTagDetail(id, customRequest = null) {
  const [initialValues, setInitialValues] = useState(null);
  const [initSchema, setInitSchema] = useState([]);
  const [logicDesc, setLogicDesc] = useState('');
  const [safeExecute] = useUnmount();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = customRequest
      ? await customRequest()
      : await KERNEL.getPortraitTagDetailUsingGET(id);
    const {
      synonyms = [],
      expireTime = '',
      createTime = '',
      updateTime = '',
      relatedFunction = {},
      conditionId,
      logicType,
      object,
      threeLevels = [],
      complexFunction, // 函数配置
      tagThemes = [],
      ...others
    } = res;
    let initConditionData = {};
    let initFunctionLabel;
    const { functionId, values: checkValues = [] } = relatedFunction;
    // 翻译三级分类
    const threeTypeDictNames = await DICT.batchTranslateDictPathByCodesUsingPOST({
      body: {
        rootCode: object === appUserType.legalPerson ? 'FRSJFL1000' : '1000',
        childCodes: flatBy(threeLevels, 'code'),
      },
    });

    // 初始化方法选择及逻辑描述
    if (functionId && logicType === portraitLogicType.function) {
      try {
        const {
          schema,
          cname,
          id: funId,
          description,
        } = await METHODSCHEMAS.findMethodSchemaByIdUsingGET(functionId);
        initFunctionLabel = { label: cname, value: functionId, key: funId };
        safeExecute(setInitSchema)(schema);
        safeExecute(setLogicDesc)(description);
      } catch (error) {
        notification.error({ message: error.msg });
      }
    }
    // 初始化条件标签及逻辑描述
    if (conditionId && logicType === portraitLogicType.role) {
      try {
        const { name, id: cdtId, description } = await CONDITION.findConditionInfoByIdUsingGET(
          conditionId,
        );
        initConditionData = { label: name, value: cdtId, key: cdtId };
        safeExecute(setLogicDesc)(description);
      } catch (error) {
        notification.error({ message: error.msg });
      }
    }
    const initSynonyms = synonyms.map(it => ({ name: it, key: it }));
    let threeLevelsTranslate;
    // 三级分类字典翻译
    try {
      threeLevelsTranslate = threeLevels.map(({ code }) => ({
        code,
        key: code,
        label: _.reduce(
          threeTypeDictNames[code].slice(1),
          (path, { name }) => {
            return `${path + name}/`;
          },
          '',
        ).slice(0, -1),
      }));
    } catch (error) {
      console.log('三级分类翻译:', error.message);
    }
    setInitialValues({
      ...others,
      conditionId: initConditionData,
      logicType,
      object,
      threeLevels: threeLevelsTranslate,
      synonyms: initSynonyms,
      expireTime: expireTime && moment(expireTime, dataFormat),
      createTime: createTime && moment(createTime, dataFormat),
      updateTime: updateTime && moment(updateTime, dataFormat),
      complexFunction: Array.isArray(complexFunction)
        ? treeAppendKey(complexFunction, true)
        : treeAppendKey(_.compact([complexFunction]), true),
      relatedFunction: { functionId: initFunctionLabel, values: checkValues },
      tagThemes: tagThemes.map(({ tagId }) => tagId),
    });
  }

  return {
    initialValues,
    initSchema,
    logicDesc,
    changeLogicDesc: setLogicDesc,
    reload: getData,
  };
}

export default usePortraitTagDetail;
