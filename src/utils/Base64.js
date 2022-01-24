class Base64 {
  // base64编码
  base64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  // base64解码
  decodeBase64(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }
}

export default new Base64();
