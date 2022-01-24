import React from 'react';
import PropTypes from 'prop-types';
import { AsySearchSelector } from '../../tis_ui';
import DictAssistant from '@/utils/DictAssistant';
import _ from 'lodash';
import {
  CONVENIENCE,
  MATTER,
  SCENE,
  TRANSLATE,
  POLICY,
  DECLAREPROJECT,
  CONDITION,
  LINKED,
  LAW,
  CORE,
  MESSAGES,
} from '@/services/api';

const CONTENT_TYPE = {
  POLICYWORDS: 'policyWords',
  SCENE: 'scene',
  MATTER: 'matter',
  CONVENIENCE: 'convenience',
  POLICYLIBRARY: 'policyLibrary',
  PROJECT: 'project',
  SYNONYM: 'synonym',
  ARTICLE: 'article',
  RESTRICTIVECONDITION: 'restrictiveCondition',
  RESTRICTIVECONDITIONLEGALPERSON: 'restrictiveConditionLegalPerson',
  LAW: 'law',
  STANDARD_MATERIAL: 'standard_material',
  MESSAGE: 'message',
  MINI_CONDITION: 'mini_condition',
  DATA_REUSE: 'data_reuse',
};

function TSearchSelector({ type, defaultSize = 200, objectType, ...others }, ref) {
  switch (type) {
    case CONTENT_TYPE.POLICYWORDS:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的百科词条"
          onTextSearch={DictAssistant.queryPolicyWordsWithMemo}
          onCode2Name={words => TRANSLATE.policyWordsTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.SCENE:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的主题"
          onTextSearch={text =>
            SCENE.getSceneListForLinkedUsingPOST({
              params: { size: defaultSize },
              body: { name: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name, regions, ...otherInfo }) => ({
                ...otherInfo,
                regions,
                label: regions ? `${name}_${regions}` : name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.sceneTranslateUsingPOST({ body: words })}
          {...others}
        />
      );

    case CONTENT_TYPE.MATTER:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的事项"
          onTextSearch={text =>
            MATTER.getMatterListForLinkedUsingPOST({
              params: { size: defaultSize },
              body: { name: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name, regions, ...otherInfo }) => ({
                ...otherInfo,
                regions,
                label: regions ? `${name}_${regions}` : name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.matterTranslateUsingPOST({ body: words })}
          {...others}
        />
      );

    case CONTENT_TYPE.CONVENIENCE:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的服务"
          onTextSearch={text =>
            CONVENIENCE.getConvenienceServiceListForLinkedUsingPOST({
              params: { size: defaultSize },
              body: { name: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name, regions, ...otherInfo }) => ({
                ...otherInfo,
                regions,
                label: regions ? `${name}_${regions}` : name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.convenienceServiceTranslateUsingPOST({ body: words })}
          {...others}
        />
      );

    case CONTENT_TYPE.POLICYLIBRARY:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的政策"
          onTextSearch={text =>
            POLICY.getPolicyManagementListForLinkedUsingPOST({
              params: { size: defaultSize },
              body: { name: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name, regions, ...otherInfo }) => ({
                ...otherInfo,
                regions,
                label: regions ? `${name}_${regions}` : name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.policyLibraryTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.PROJECT:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的项目"
          onTextSearch={text =>
            DECLAREPROJECT.getDeclareProjectListForLinkedUsingPOST({
              params: { size: defaultSize },
              body: { name: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name, regions, ...otherInfo }) => ({
                ...otherInfo,
                regions,
                label: regions ? `${name}_${regions}` : name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.declareProjectTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.SYNONYM:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的问题"
          onTextSearch={text =>
            LINKED.searchSynonymForLinkedUsingPOST({
              params: { size: defaultSize },
              body: { question: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name, regions, ...otherInfo }) => ({
                ...otherInfo,
                regions,
                label: regions ? `${name}_${regions}` : name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.synonymTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.ARTICLE:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的文章"
          onTextSearch={text =>
            LINKED.searchArticleForLinkedUsingPOST({
              params: { size: defaultSize },
              body: { name: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name, regions, ...otherInfo }) => ({
                ...otherInfo,
                regions,
                label: regions ? `${name}_${regions}` : name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.articleTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.RESTRICTIVECONDITION:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的个人推荐限定条件"
          onTextSearch={text =>
            CONDITION.findAllConditionUsingPOST({
              params: { size: defaultSize },
              body: { object: 0, name: text },
            }).then(it => {
              const { content: items } = it;
              return _.map(items, ({ id, name }) => ({
                label: name,
                value: id,
                key: id,
              }));
            })
          }
          onCode2Name={words => TRANSLATE.conditionTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.RESTRICTIVECONDITIONLEGALPERSON:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的法人推荐限定条件"
          onTextSearch={text =>
            CONDITION.findAllConditionUsingPOST({
              params: { size: defaultSize },
              body: { object: 1, name: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name }) => ({
                label: name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.conditionTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.LAW:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的法律依据"
          onTextSearch={text =>
            LAW.findAllLawBasicUsingPOST({
              params: { size: defaultSize },
              body: { name: text },
            }).then(({ content: items }) =>
              _.map(items, ({ id, name }) => ({
                label: name,
                value: id,
                key: id,
              })),
            )
          }
          onCode2Name={words => TRANSLATE.lawBasicTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.STANDARD_MATERIAL:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的标准材料"
          onTextSearch={text =>
            CORE.listStandardMaterialUsingGET({
              params: { size: defaultSize, name: !_.isEmpty(text) && text },
            }).then(({ content: items }) => {
              return _.map(items, ({ id, name }) => ({
                label: name,
                value: id,
                key: id,
              }));
            })
          }
          onCode2Name={words => TRANSLATE.standardMaterialTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.MESSAGE:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的消息"
          onTextSearch={text =>
            MESSAGES.getMessageListUsingPOST({
              params: { size: defaultSize },
              body: { title: !_.isEmpty(text) && text },
            }).then(({ content: items }) => {
              return _.map(items, ({ id, title }) => ({
                label: title,
                value: id,
                key: id,
              }));
            })
          }
          onCode2Name={words => MESSAGES.translateMessageUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.MINI_CONDITION:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的最小条件"
          onTextSearch={text =>
            CORE.getMinimalConditionListUsingGET({
              params: { size: defaultSize, name: !_.isEmpty(text) && text, objectType },
            }).then(({ content: items }) => {
              return _.map(items, ({ id, name }) => ({
                label: name,
                value: id,
                key: id,
              }));
            })
          }
          onCode2Name={words => TRANSLATE.minimalConditionTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    case CONTENT_TYPE.DATA_REUSE:
      return (
        <AsySearchSelector
          ref={ref}
          placeholder="请选择要添加的用数场景"
          onTextSearch={text =>
            CORE.findPageUsingGET({
              params: { size: defaultSize, name: !_.isEmpty(text) && text, objectType },
            }).then(({ content: items }) => {
              return _.map(items, ({ id, sceneName }) => ({
                label: sceneName,
                value: id,
                key: id,
              }));
            })
          }
          onCode2Name={words => TRANSLATE.sceneDataTranslateUsingPOST({ body: words })}
          {...others}
        />
      );
    default:
      return <AsySearchSelector ref={ref} {...others} />;
  }
}

const TSearchSelectorWithRef = React.forwardRef(TSearchSelector);

TSearchSelectorWithRef.propTypes = {
  /** 查询类型 */
  type: PropTypes.string,
  /** 最多获取多少条数据 */
  defaultSize: PropTypes.number,
};

export default TSearchSelectorWithRef;
export { CONTENT_TYPE };
/*
 * 入参: [id:string]
 * 多选模式: 返回值: [{ key:string, value:string, label:string}]
 * 单选模式: 返回值 { key:string, value:string, label:string }
 * */
