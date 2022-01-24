// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

export default function(arr) {
  if (_.isArray(arr) && arr.length === 0) {
    return true;
  }
  return false;
}
