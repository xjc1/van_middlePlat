function emptyFn() {}

function EmptyAsyncFn() {
  return Promise.resolve();
}

export default emptyFn;
export { EmptyAsyncFn };
