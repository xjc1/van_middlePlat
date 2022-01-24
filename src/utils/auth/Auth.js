function auth(params) {
  console.log("f(): evaluated");
  return function (target, propertyKey, descriptor) {
    console.log(target, propertyKey, descriptor, params);
  }
}


export default auth;
