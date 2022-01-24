
const Model = {
  namespace: 'dashboard',
  state: {
    list: [],
    focusItem: null,
  },
  effects: {
    *fetchList({ payload }, { call, put }) {

    },
  },
  reducers: {
    selectedItem(state, {item}) {
      return {...state, focusItem: item};
    },

    unSelected(state) {
      return {...state, focusItem: null};
    },

    saveList(state, {list}) {
      return {...state, list, focusItem: null};
    }
  },
};
export default Model;
  