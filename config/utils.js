function adaptText(text) {

  return function (str) {
    return text[str] || str;
  };

}

module.exports = {
  adaptText,
};
