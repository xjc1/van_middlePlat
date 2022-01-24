import router from '@/utils/tRouter';
import { modulesContentType } from '@/utils/constantEnum';
import { message } from 'antd';
import { SCENE } from '@/services/api';

const getSceneIdBySid = sid => {
  return SCENE.getSceneDetailByScenesIdUsingGET(sid).then(data => {
    const { id } = data;
    return id;
  });
};

export const handleViewByTypeAndId = (type, id) => {
  switch (type) {
    case modulesContentType.SCENE:
      getSceneIdBySid(id).then(sceneId => {
        router.push({ name: 'scenes_view', params: { sceneId } });
      });
      break;
    case modulesContentType.MATTER:
      router.push({ name: 'matters_edit', params: { matterid: id } });
      break;
    case modulesContentType.POLICY_PROJECT:
      router.push({ name: 'projectManage_view', params: { id } });
      break;
    case modulesContentType.POLICY:
      router.push({ name: 'policyContent_view', params: { policyId: id } });
      break;
    case modulesContentType.SERVICE:
      router.push({ name: 'service_view', params: { serviceid: id } });
      break;
    case modulesContentType.ARTICLE:
      router.push({ name: 'article_view', params: { articleId: id } });
      break;
    default:
      message.error('暂不支持此类型!');
  }
};

export const handleEditByTypeAndId = (type, id) => {
  switch (type) {
    case modulesContentType.SCENE:
      getSceneIdBySid(id).then(sceneId => {
        router.push({ name: 'scenes_edit', params: { sceneId } });
      });
      break;
    case modulesContentType.MATTER:
      router.push({ name: 'matters_edit', params: { matterid: id } });
      break;

    case modulesContentType.POLICY_PROJECT:
      router.push({ name: 'projectManage_edit', params: { id } });
      break;
    case modulesContentType.POLICY:
      router.push({
        name: 'policyContent_edit',
        params: { policyId: id }
      });
      break;
    case modulesContentType.SERVICE:
      router.push({ name: 'service_edit', params: { serviceid: id } });
      break;
    case modulesContentType.ARTICLE:
      router.push({ name: 'article_edit', params: { articleId: id } });
      break;
    default:
      message.error('暂不支持此类型!');
  }
};
