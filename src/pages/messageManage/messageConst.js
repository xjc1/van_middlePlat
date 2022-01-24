import { messageContentType } from '@/utils/constantEnum';

export const commonRelatedKeys = [
  messageContentType.article,
  messageContentType.convenience,
  messageContentType.matter,
  messageContentType.policyLibrary,
  messageContentType.project,
  messageContentType.scene,
];

export const relatedKeyToFormName = {
  [messageContentType.article]: 'relatedArticle',
  [messageContentType.convenience]: 'relatedService',
  [messageContentType.matter]: 'relatedMatter',
  [messageContentType.policyLibrary]: 'relatedPolicy',
  [messageContentType.project]: 'relatedProject',
  [messageContentType.scene]: 'relatedScene',
};
