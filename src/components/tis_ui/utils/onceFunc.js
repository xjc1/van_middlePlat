export default function () {
  let called = false;
  return function (fn) {
    if (!called) {
      fn();
      called = true;
    }
  };
}
