const Model = {
  namespace: 'validator',
  state: {
    rules: [],
  },
  reducers: {
    setValidators(state, { rules }) {
      return {
        ...state,
        rules,
      };
    },
  },
};

export default Model;
