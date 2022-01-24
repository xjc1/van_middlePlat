import { warningType } from '@/utils/constantEnum';

export const commonRelatedKeys = [
  warningType.article,
  warningType.convenience,
  warningType.matter,
  warningType.policyLibrary,
  warningType.project,
  warningType.scene,
  warningType.message,
];

export const typeNameToNum = {
  scene: 0,
  matter: 1,
  convenience: 3,
  policyLibrary: 4,
  article: 5,
  project: 6,
  message: 10,
};

export const relatedKeyToFormName = {
  [warningType.article]: 'relatedArticle',
  [warningType.convenience]: 'relatedService',
  [warningType.matter]: 'relatedMatter',
  [warningType.policyLibrary]: 'relatedPolicy',
  [warningType.project]: 'relatedProject',
  [warningType.scene]: 'relatedScene',
  [warningType.message]: 'relatedMessage',
};
