import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Spin } from 'antd';
import ModuleForm from './moduleForm';
import { CORE, DICT, MODULES } from '@/services/api';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

function translateDictId(ids = []) {
  if (ids.length > 0) {
    return DICT.batchTranslateDictByIdsUsingPOST({ body: ids });
  }
  return Promise.resolve([]);
}

function translateStrategy() {
  return Promise.all([
    CORE.findSuggestStrategyUsingGET({ params: { type: 'suggest' } }),
    CORE.findSuggestStrategyUsingGET({ params: { type: 'group' } }),
  ]).then(data => {
    const [suggest, group] = data;
    return {
      suggest,
      group,
    };
  });
}

const modulesFiltrateFieldDict = {
  regions: 'SH00XZQH',
  policyLevel: 'ZCJB0001',
  articleLevel: 'ZCJB0001',
  serviceType: 'BMFW1000,FRFWLX1000',
  category: 'articleCategories',

  $names: {
    regions: '行政区划',
    policyLevel: '政策级别',
    articleLevel: '文章级别',
    serviceType: '服务类型',
    category: '所属分类',
  },
};

function cleanModuleDetail(id) {
  return MODULES.getModuleDetailUsingGET(id)
    .then(data => {
      // 翻译各种关联类型对应的内容
      const { contentList = [] } = data;
      const translatePromises = _.map(
        contentList,
        ({ contentType, relatedContents, ...others }) => {
          return MODULES.getContentsByIdsUsingGET({
            params: { contentType, ids: relatedContents.join(','), isTranslation: true },
          }).then(relatedItems => {
            return {
              ...others,
              contentType,
              relatedContents: _.map(
                relatedItems,
                ({ name, id: relatedId, regions, isFound = true }) => {
                  return {
                    key: relatedId,
                    value: relatedId,
                    id: relatedId,
                    label: isFound ? name : <span style={{ color: 'red' }}>{name}</span>,
                    regions,
                  };
                },
              ),
            };
          });
        },
      );
      return Promise.all(translatePromises).then(result => {
        return {
          ...data,
          contentList: result,
        };
      });
    })
    .then(data => {
      // 翻译嵌套的字典
      const { contentList = [] } = data;
      const translatePromises = _.reduce(
        contentList,
        (result, { filtrateValues }) => {
          _.map(filtrateValues, ({ value: idObjects, field }) => {
            const ids = _.map(idObjects, ({ id: fid }) => fid);
            result.push(
              translateDictId(ids).then(words => {
                return {
                  field,
                  value: _.map(ids, fid => {
                    return { key: fid, label: words[fid] };
                  }),
                };
              }),
            );
          });
          return result;
        },
        [],
      );

      // 整合翻译后的数据结构到组件需要的数据结构
      return Promise.all(translatePromises).then(result => {
        // 将翻译后的内容转换成对象存储，方便通过hash方式读取
        const labelNames = _.reduce(
          result,
          (obj, { field, value }) => {
            _.forEach(value, ({ key, label }) => {
              // eslint-disable-next-line no-param-reassign
              obj[`${field}_${key}`] = label;
            });
            return obj;
          },
          {},
        );
        return {
          ...data,
          contentList: _.map(contentList, ({ filtrateValues, ...others }) => {
            return {
              ...others,
              filtrateValues: _.reduce(
                filtrateValues,
                (obj, { field, value: idObjects }) => {
                  const ids = _.map(idObjects, ({ id: fid }) => fid);
                  _.forEach(ids, val => {
                    const nextKey = `${field}_${val}`;
                    obj.push({
                      field,
                      fieldName: modulesFiltrateFieldDict.$names[field],
                      label: labelNames[nextKey],
                      key: nextKey,
                      value: val,
                    });
                  });
                  return obj;
                },
                [],
              ),
            };
          }),
        };
      });
    })
    .then(async data => {
      // 翻译置顶内容
      const { specialList = [], topList = [] } = data;
      const translatePromises = _.map(specialList, ({ contentType, itemId, specialType }) => {
        return MODULES.getContentsByIdsUsingGET({
          params: { contentType, ids: itemId.join(','), isTranslation: true },
        }).then(specialItems => {
          return {
            contentType,
            specialType,
            rowKey: `${contentType}_${specialType}`,
            // isFound标注是否数据库找得到 找不到的字段标红
            list: _.map(specialItems, ({ name, id: specialId, regions, isFound = true }) => {
              return {
                key: specialId,
                value: specialId,
                id: specialId,
                label: isFound ? name : <span style={{ color: 'red' }}>{name}</span>,
                regions,
              };
            }),
          };
        });
      });
      const transLateSpecialList = await Promise.all(translatePromises);
      const translateTopList = topList.length
        ? await MODULES.translateTopListUsingPOST({ body: topList })
        : topList;
      return {
        ...data,
        specialList: transLateSpecialList,
        topList: translateTopList,
      };
    })
    .then(data => {
      const { suggestStrategy = [], groupStrategy = [] } = data;
      return {
        ...data,
        suggestStrategy: suggestStrategy.map(item => ({
          ...item,
          key: IDGenerator.next(),
        })),
        groupStrategy: groupStrategy.map(item => ({
          ...item,
          key: IDGenerator.next(),
        })),
      };
    });
}

function EditModulePage({ match }) {
  const [params, setParams] = useState();

  useEffect(() => {
    (async () => {
      const { id } = match.params;
      const strategyObj = await translateStrategy();
      const nextDetail = await cleanModuleDetail(id);
      setParams({
        detail: nextDetail,
        strategyObj,
      });
    })();
  }, []);

  return params ? <ModuleForm strategyObj={params.strategyObj} detail={params.detail} /> : <Spin />;
}

export default EditModulePage;
export { cleanModuleDetail, translateStrategy };
