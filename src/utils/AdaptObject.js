import _ from 'lodash';

function adaptObject(object) {
  if (_.endsWith(object, '#')) {
    return object;
  }
  return `${object}#`;
}
export default adaptObject;
