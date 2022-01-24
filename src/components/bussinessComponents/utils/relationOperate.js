import {
  CONVENIENCE,
  DECLAREPROJECT,
  LAW,
  MATTER,
  POLICY,
  POLICYWORDS,
  SCENE,
  KERNEL,
  ARTICLE
} from '@/services/api';
import _ from 'lodash';
import { Code2Name } from '@/utils/DictTools';

const defaultSize = 10;
const defaultStatus = 1;
const defaultPageNum = 0;

function relationPolicyWords({text,pageNum=defaultPageNum,...othersInfo}){
  return Code2Name(POLICYWORDS.listPolicyWordsUsingPOST({
    params:{page:pageNum,size:defaultSize},
    body:{
      name:text,
      status:defaultStatus,
      ...othersInfo
    },
  }),['SH00XZQH', 'regions']).then(({content:items,dictNames,totalElements})=>({
    data:_.map(items,
    (({name,regions,id,...others})=>({
        ...others,
        label:name,
        value:id,
        key:id,
        regions:dictNames.SH00XZQH[regions],
      }))),
    totalElements,
    })
  )
}

function relationScenes({text,pageNum=defaultPageNum,...othersInfo}){
  return Code2Name(SCENE.getSceneListUsingPOST({
    params:{page:pageNum,size:defaultSize},
    body:{
      name:text,
      status:defaultStatus,
      ...othersInfo
    },
  }),['SH00XZQH', 'regions']).then(({content:items,dictNames,totalElements})=>({
    data:_.map(items,
    (({name,regions,id,...others})=>({
        ...others,
        label:name,
        value:id,
        key:id,
        regions:dictNames.SH00XZQH[regions],
      }))),
    totalElements,
    })
  )
}

function relationMatter({text,pageNum=defaultPageNum,...othersInfo}){
  return Code2Name(MATTER.listMatterUsingPOST({
    params:{
      size:defaultSize,
      page:pageNum
    },
    body:{
      name:text,
      status:defaultStatus,
      ...othersInfo
    }
  }),['SH00XZQH', 'regions']).then(({content:items,totalElements,dictNames})=>(
    {
      data:_.map(items,({name,id,regions,...others})=>({
        ...others,
        label:name,
        key:id,
        value:id,
        regions:dictNames.SH00XZQH[regions],
      })),
      totalElements
    })
  )
}

function relationConvenience({text,pageNum=defaultPageNum,...othersInfo}) {
  return Code2Name(CONVENIENCE.getConvenienceListUsingPOST({
    params:{page:pageNum,size:defaultSize},
    body:{
      name:text,
      status:defaultStatus,
      ...othersInfo
    }
  }),['SH00XZQH', 'regions']).then(({content:items,totalElements,dictNames})=>(
    {
      data:_.map(items,({name,id,regions,...others})=>({
        ...others,
        label:name,
        key:id,
        value:id,
        regions:dictNames.SH00XZQH[regions],
      })),
      totalElements
    })
  )
}

function relationPolicy({text,pageNum=defaultPageNum,...othersInfo}) {
  return Code2Name(POLICY.listPolicyUsingPOST({
    params:{page:pageNum,size:defaultSize},
    body:{
      name:text,
      status:defaultStatus,
      ...othersInfo
    }
  }),['SH00XZQH','regions']).then(({content:items,totalElements,dictNames})=>(
    {
      data:_.map(items,({name,id,regions,...others})=>({
        ...others,
        label:name,
        key:id,
        value:id,
        regions:dictNames.SH00XZQH[regions],
      })),
      totalElements
    })
  )
}

function relationProject({text,pageNum=defaultPageNum,...othersInfo}){
  return Code2Name(DECLAREPROJECT.findAllProjectsUsingPOST({
    params:{page:pageNum,size:defaultSize},
    body:{
      name:text,
      status:defaultStatus,
      ...othersInfo
    }
  }),['SH00XZQH','regions']).then(({content:items,totalElements,dictNames})=>(
    {
      data:_.map(items,({name,id,regions,...others})=>({
        ...others,
        label:name,
        key:id,
        value:id,
        regions:dictNames.SH00XZQH[regions],
      })),
      totalElements
    })
  )
}

function relationQuestion({text,pageNum=defaultPageNum,...othersInfo}){
  return Code2Name(KERNEL.findAllSynonymUsingPOST({
    params:{
      size:defaultSize,
      page:pageNum
    },
    body:{
      question:text,
      status:defaultStatus,
      ...othersInfo
    }
  }),['SH00XZQH', 'regions']).then(({content:items,totalElements,dictNames})=>(
    {
      data:_.map(items,({question,id,regions,...others})=>({
        ...others,
        label:question,
        key:id,
        value:id,
        regions:regions&&dictNames.SH00XZQH[regions],
      })),
      totalElements
    }
  ))
}

function relationArticle( {text,pageNum=defaultPageNum,...othersInfo}){
  return Code2Name(ARTICLE.getArticlelistUsingPOST({
    params:{
      size:defaultSize,
      page:pageNum
    },
    body:{
      name:text,
      status:defaultStatus,
      ...othersInfo
    }
  }),['SH00XZQH', 'regions']).then(({content:items,totalElements,dictNames})=>(
    {
      data:_.map(items,({name,id,regions,...others})=>({
        ...others,
        label:name,
        key:id,
        value:id,
        regions:regions&&dictNames.SH00XZQH[regions],
      })),
      totalElements
    }
  ))
}

function relationLaw({ text }) {
  return LAW.findAllLawBasicUsingPOST({
    params: { size: defaultSize },
    body: { name: text },
  }).then(({ content: items }) =>
    _.map(items, ({ id, name }) => ({
      label: name,
      value: id,
      key: id,
    })),
  );
}

export default {
  relationPolicyWords,
  relationScenes,
  relationMatter,
  relationConvenience,
  relationPolicy,
  relationProject,
  relationQuestion,
  relationArticle,
  relationLaw,
};
