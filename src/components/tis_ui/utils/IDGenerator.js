/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { nanoid, customAlphabet } from 'nanoid';

const nanoid2 = customAlphabet(
  '1234567890abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ_',
  10,
);

class IDGenerator {
  current = 1;

  prefix = '';

  constructor(prefix) {
    this.prefix = prefix;
  }

  static getPiece(idStr) {
    const pieces = _.chain(idStr)
      .split('_')
      .filter(piece => piece)
      .value();
    return pieces[pieces.length - 1];
  }

  next(val) {
    this.current += 1;
    return [this.prefix, this.current, val].join('_');
  }

  static next(prefix = '', size = 20) {
    return [prefix, nanoid(size)].join('_');
  }

  static nextName(prefix = '', size = 20) {
    return [prefix, nanoid2(size)].join('_');
  }
}

export default IDGenerator;
