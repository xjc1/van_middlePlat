const Model = {
  namespace: 'interfaceManage',
  state: {
    apis: [],
  },
  reducers: {
    saveApis(state, { apis }) {
      return { ...state, apis };
    },
  },
};

export default Model;
