import PERMISSION from '@/utils/permissionEnum';
import _ from 'lodash';
import {authFilter} from '@/../scripts/cook/project/Setting.js'


const getAuthData = () => {
  const allPerimissions = _.map(PERMISSION.viewPermissions, it => it) || [];
  return allPerimissions.filter(it => authFilter.indexOf(it.key) < 0);
};

export default getAuthData;
