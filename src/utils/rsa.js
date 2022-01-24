import JSEncrypt from 'jsencrypt';

export default  function rsa(pubKey, content) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(pubKey);
  return encryptor.encrypt(content);
}
