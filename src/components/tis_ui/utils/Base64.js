class Base64 {
  // base64编码
  base64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  // base64解码
  decodeBase64(str) {
    try {
      return decodeURIComponent(escape(window.atob(str)));
    } catch (e) {
      return str;
    }
  }
}

export default new Base64();
