import { TRANSLATE } from '@/services/api';
import _ from 'lodash';

function relationPolicyWords(id) {
  return TRANSLATE.policyWordsTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

function relationScenes(id) {
  return TRANSLATE.sceneTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

function relationMatter(id) {
  return TRANSLATE.matterTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

function relationConvenience(id) {
  return TRANSLATE.convenienceServiceTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

function relationPolicy(id) {
  return TRANSLATE.policyLibraryTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

function relationProject(id) {
  return TRANSLATE.declareProjectTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

function relationQuestion(id) {
  return TRANSLATE.synonymTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

function relationArticle(id) {
  return TRANSLATE.articleTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

function relationLaw(id) {
  return TRANSLATE.lawBasicTranslateUsingPOST({
    body: [id],
  }).then(obj => {
    return {
      value: id,
      label: obj[id],
    };
  });
}

export default {
  relationPolicyWords: _.memoize(relationPolicyWords),
  relationScenes: _.memoize(relationScenes),
  relationMatter: _.memoize(relationMatter),
  relationConvenience: _.memoize(relationConvenience),
  relationPolicy: _.memoize(relationPolicy),
  relationProject: _.memoize(relationProject),
  relationQuestion: _.memoize(relationQuestion),
  relationArticle: _.memoize(relationArticle),
  relationLaw: _.memoize(relationLaw),
};
