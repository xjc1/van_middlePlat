import _ from 'lodash';

function adaptJson(val) {
  try {
    const preOjb = JSON.parse(val);
    if (_.isObject(preOjb)) {
      return preOjb;
    }
    return val;
  } catch (e) {
    return val;
  }
}

function forInJsonPath(obj, fn, parent, split = '_') {
  _.forIn(obj, (v, k) => {
    const nextV = adaptJson(v);
    const myPath = [parent, k].filter(Boolean).join(split);
    fn(k, myPath);
    if (_.isObject(nextV) && !_.isArray(nextV)) {
      forInJsonPath(nextV, fn, myPath, split);
    }
  });
}

export default function(obj, parent, split) {
  const paths = [];
  forInJsonPath(
    obj,
    (name, path) => {
      paths.push({
        name,
        path: `\${${path}}`,
      });
    },
    parent,
    split,
  );
  return paths;
}
