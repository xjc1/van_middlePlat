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

export const relatedKeyToFormName = {
  [warningType.article]: 'relatedArticle',
  [warningType.convenience]: 'relatedService',
  [warningType.matter]: 'relatedMatter',
  [warningType.policyLibrary]: 'relatedPolicy',
  [warningType.project]: 'relatedProject',
  [warningType.scene]: 'relatedScene',
  [warningType.message]: 'relatedMessage',
};
