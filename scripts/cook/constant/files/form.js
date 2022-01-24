module.exports = {
  namespace: 'form',

  type: [
    ['checkbox', 'checkbox', '多选'],
    ['radio', 'radio', '单选'],
  ],

  required: [
    ['unrequired', '0', '必填'],
    ['required', '1', '非必填'],
  ],

  yesNo: [
    ['yes', true, '是'],
    ['no', false, '否'],
  ],

  displayMode: [
    ['horizontal', 0, '横向'],
    ['vertical', 1, '纵向'],
  ],
};
