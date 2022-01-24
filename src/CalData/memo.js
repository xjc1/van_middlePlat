import _ from 'lodash';

export default function(target, name, descriptor) {
  descriptor.value = _.memoize(descriptor.value);
  return descriptor;
}
