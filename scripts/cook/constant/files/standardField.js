module.exports = {
  namespace: 'standardField',
  dataType: [
    ['singleLine', 'single-line', '单行文本'], // [枚举名称,  code 唯一标识， 中文名称]
    ['multiLine', 'multi-line', '多行文本'],
    ['radio', 'radio', '单选框'],
    ['checkbox', 'checkbox', '多选框'],
    ['dropDownRadio', 'drop-down-radio', '下拉单选框'],
    ['dropDownCheckbox', 'drop-down-checkbox', '下拉多选框'],
    ['dictRadio', 'dict-radio', '单选字典'],
    ['dictCheckbox', 'dict-checkbox', '多选字典'],
    ['date', 'date', '日期'],
    ['dateRange', 'date-range', '日期区间'],
    ['numberInput', 'number-input', '数字框'],
  ],
};
