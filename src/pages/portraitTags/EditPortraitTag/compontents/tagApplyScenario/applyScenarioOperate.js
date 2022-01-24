import { portraitApplyScenario } from '@/utils/constantEnum';
import {
  ARTICLE,
  CONVENIENCE,
  DECLAREPROJECT,
  MATTER,
  NOTIFY,
  POLICY,
  KERNEL,
  TRANSLATE,
} from '@/services/api';
import authEnum, { hasAuth } from '@/utils/auth';
import router from '@/utils/tRouter';

/**
 * 应用场景弹窗内容的配置对象
 * [key] 对应的应用场景常量值
 * view 可选 查看页面地址
 * edit 可选 编辑页面地址
 * request 数据回显的接口，（如不做单独处理）要求返回结构为：[{ id: name }]
 * hasPermission 可选 是否有编辑页面的权限，默认为 true
 */
const applyScenarioOperate = {
  [portraitApplyScenario.MATTER]: {
    edit: id => router.path({ name: 'matters_edit', params: { matterid: id } }),
    request: ids => MATTER.getTagApplyScenarioInfoUsingPOST({ body: ids }),
    hasPermission: hasAuth(authEnum.matters_edit),
  },
  [portraitApplyScenario.POLICY]: {
    view: id => router.path({ name: 'policyContent_view', params: { policyId: id } }),
    edit: id => router.path({ name: 'policyContent_edit', params: { policyId: id } }),
    request: ids => POLICY.getTagApplyScenarioInfoUsingPOST({ body: ids }),
    hasPermission: hasAuth(authEnum.policyContent_edit),
  },
  [portraitApplyScenario.SERVICE]: {
    view: id => router.path({ name: 'service_view', params: { serviceid: id } }),
    edit: id => router.path({ name: 'service_edit', params: { serviceid: id } }),
    request: ids => CONVENIENCE.getTagApplyScenarioInfoUsingPOST({ body: ids }),
    hasPermission: hasAuth(authEnum.service_edit),
  },
  [portraitApplyScenario.PROJECT]: {
    view: id => router.path({ name: 'projectManage_view', params: { id } }),
    edit: id => router.path({ name: 'projectManage_edit', params: { id } }),
    request: ids => DECLAREPROJECT.getTagApplyScenarioInfoUsingPOST({ body: ids }),
    hasPermission: hasAuth(authEnum.projectManage_edit),
  },
  [portraitApplyScenario.ARTICLE]: {
    view: id => router.path({ name: 'article_view', params: { id } }),
    edit: id => router.path({ name: 'article_edit', params: { id } }),
    request: ids => ARTICLE.getTagApplyScenarioInfoUsingPOST({ body: ids }),
    hasPermission: hasAuth(authEnum.article_edit),
  },
  [portraitApplyScenario.MESSAGE]: {
    view: id => router.path({ name: 'message_view', query: { id } }),
    edit: id => router.path({ name: 'message_edit', query: { id } }),
    request: ids => NOTIFY.getTagApplyScenarioInfoUsingPOST({ body: ids }),
    hasPermission: hasAuth(authEnum.message_edit),
  },
  [portraitApplyScenario.MENUCONFIG]: {
    view: id => router.path({ name: 'menuSetting', query: { id, type: 'view' } }),
    edit: id => router.path({ name: 'menuSetting', query: { id } }),
    request: ids => KERNEL.getTagApplyScenarioInfoUsingPOST({ body: ids }),
    hasPermission: hasAuth(authEnum.menuSetting_edit),
  },
  [portraitApplyScenario.OUTPUT]: {
    view: id => router.path({ name: 'outputModule_view', query: { id } }),
    edit: id => router.path({ name: 'outputModule_edit', query: { id } }),
  },
  [portraitApplyScenario.SCENE_GUIDE]: {
    edit: id => router.path({ name: 'scenesQA_none', params: { scenesId: id } }),
    request: ids => TRANSLATE.sceneTranslateUsingPOST({ body: ids }),
  },
  [portraitApplyScenario.SCENE_CONDITION]: {
    edit: id => router.path({ name: 'conditions', params: { scenesId: id } }),
    request: ids => TRANSLATE.sceneTranslateUsingPOST({ body: ids }),
  },
};

export default applyScenarioOperate;
