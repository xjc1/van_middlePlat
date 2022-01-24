import { modulesContentType } from '@/utils/constantEnum';
import { CONTENT_TYPE } from '@/components/bussinessComponents/Dict/TSearchSelector';

export const modulesContentTypeMapper = {
  [modulesContentType.SCENE]: CONTENT_TYPE.SCENE,
  [modulesContentType.ARTICLE]: CONTENT_TYPE.ARTICLE,
  [modulesContentType.MATTER]: CONTENT_TYPE.MATTER,
  [modulesContentType.POLICY]: CONTENT_TYPE.POLICYLIBRARY,
  [modulesContentType.POLICY_PROJECT]: CONTENT_TYPE.PROJECT,
  [modulesContentType.SERVICE]: CONTENT_TYPE.CONVENIENCE,
};

export const commonFormLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
