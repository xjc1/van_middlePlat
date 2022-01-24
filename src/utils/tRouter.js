import { router } from 'umi';
import querystring from 'querystring';
import _ from 'lodash';
import pathHash from './pathHash';

function getQuery(query) {
  if (query) {
    return `?${querystring.stringify(query)}`;
  }
  return '';
}

function generatePath(address) {
  const adapterAddress = _.isString(address) ? { name: address } : address;
  const { name, params = {}, query } = adapterAddress;
  const path = pathHash[name];
  if (path) {
    const paths = _.split(path, '/:');
    const routePath = _.map(paths, (str) => params[str] ? params[str] : str).join('/');
    return routePath + getQuery(query);
  }
  throw new Error(`can not found this route name [${name}]`);
}

export default {
  push(address) {
    const nextPath = generatePath(address);
    router.push(nextPath);
  },
  goBack() {
    router.goBack();
  },
  replace(address) {
    const nextPath = generatePath(address);
    router.replace(nextPath);
  },
  path(address) {
    return generatePath(address);
  }
};
