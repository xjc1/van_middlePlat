/* eslint-disable class-methods-use-this */
import BaseEntity from '../BaseEntity';

export default class Slot extends BaseEntity {

  formData({ id, isRequired, regExp, name }) {
    return {
      name,
      slotId: id,
      require: isRequired,
      recognition: [
        {
          args: regExp,
        }
      ]
    };
  }

  initData({ name, slotId, require, recognition }) {
    const [firstPiece] = recognition;
    return {
      id: slotId,
      name,
      isRequired: require,
      regExp: firstPiece.args,
    };
  }
}
