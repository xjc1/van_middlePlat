import _ from 'lodash';
import { KERNEL, PAGEMENUS } from '../services/api';
import PERMISSION from '@/utils/permissionEnum';

const Model = {
  namespace: 'roles',
  state: {
    list: [],
    query: { roleName: '' },
    total: 0,
    size: 0,
    pageNum: 0,
    focusItem: null,
  },
  effects: {
    * initPermissions(nothing, { put }) {
      const data = yield PAGEMENUS.findPageMenuTreeUsingGET({
        params: {
          needStatusFilter: true,
        }
      });
      if (!_.isEmpty(data)) {
        yield put({
          type: 'mixPermissions',
          subSystems: data,
        });
      }
    },

    * fetchList({ payload: { params, query } }, { put, select }) {
      const nextQuery = query || (yield select(({ roles }) => roles.query));
      const {
        content,
        totalElements: total,
        size,
        number: pageNum,
      } = yield KERNEL.selectRoleswithPageUsingPOST({
        params,
        body: nextQuery,
      });
      yield put({
        type: 'saveList',
        list: content,
        total,
        size,
        pageNum,
        query: nextQuery,
      });
    },
  },

  reducers: {
    mixPermissions(state, { subSystems }) {
      const {
        viewPermissions,
        treePermissions,
        permissionKeys,
        authEnum
      } = PERMISSION;
      const nextPermissionKeys = [...permissionKeys];
      const nextAuthEnum = { ...authEnum };
      PERMISSION.treePermissions = _.map(treePermissions, (item) => {
        const { children = [], ...others } = item;
        const nextChildren = [...children];
        _.forEach(subSystems, ({ position, name, menuId, childMenus = [] }) => {
          const insertIndex = _.findIndex(children, { key: position });
          if (insertIndex >= 0) {
            nextPermissionKeys.push(menuId);
            nextAuthEnum[menuId] = menuId;
            const parentNode = viewPermissions[item.key];
            viewPermissions[menuId] = {
              key: menuId,
              parent: parentNode.key,
              paths: [...parentNode.paths, menuId],
              name,
              feature: false,
              allName: `${parentNode.allName}/${name}`,
              hasLeaf: false,
              status: "VALID"
            };
            nextChildren.splice(insertIndex + 1, 0, {
              children: _.map(childMenus, ({ name: name2, menuId: menuId2, }) => {
                const pKey = menuId2;
                nextPermissionKeys.push(pKey);
                nextAuthEnum[pKey] = pKey;
                viewPermissions[menuId2] = {
                  key: menuId2,
                  parent: menuId,
                  paths: [...parentNode.paths, menuId, menuId2],
                  name: name2,
                  feature: false,
                  allName: `${parentNode.allName}/${name}/${name2}`,
                  hasLeaf: true,
                  status: "VALID"
                };
                return {
                  desc: `${name2}查看`,
                  hasLeaf: false,
                  key: pKey,
                  name: name2,
                  status: "VALID",
                };
              }),
              desc: `${name}查看`,
              hasLeaf: false,
              key: menuId,
              name,
              status: "VALID",
            });
          }
        });
        return {
          ...others,
          children: nextChildren,
        };
      });
      PERMISSION.permissionKeys = nextPermissionKeys;
      PERMISSION.authEnum = nextAuthEnum;
      return {
        ...state,
      };
    },

    selectedItem(state, { item }) {
      return { ...state, focusItem: item };
    },

    unSelected(state) {
      return { ...state, focusItem: null };
    },

    saveList(state, { list, total, size, pageNum, query }) {
      return { ...state, list, total, size, pageNum, query, focusItem: null };
    },
  },
};
export default Model;
