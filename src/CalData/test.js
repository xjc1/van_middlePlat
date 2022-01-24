import CalData from './index';
import _ from 'lodash';

const $data = CalData({
  a: {
    val: 22,
    set: _.memoize(val => {
      return val - 1;
    }),
    get: _.memoize(val => {
      return val + 1;
    }),
  },
  bb: {
    val: 77,
    set: _.memoize(val => {
      return val - 1;
    }),
    get: _.memoize(val => {
      return val + 1;
    }),
  },
});

export default $data;
