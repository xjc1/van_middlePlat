import { CORE } from '@/services/api';
import _ from 'lodash';
import { message } from 'antd';
import { ElementType } from '@/pages/designStudios/FormDesigner/FormCanvas/types';
import { defaultSpan, names } from '@/pages/designStudios/FormDesigner/widgets';
import { oneFormWidgetStatus } from '@/utils/constantEnum';

const defaultJSON = '{}';

function transform2widget(items = []) {
  return _.map(
    items,
    ({
      labelId,
      labelEnName,
      matterMetaId,
      sceneId: sid,
      labelName,
      sceneName,
      type: originalType,
      uiConfig = defaultJSON,
      dataSource = defaultJSON,
      initialValue = defaultJSON,
      validator = defaultJSON,
      id,
      ...others
    }) => {
      const uiConfigObj = JSON.parse(uiConfig);
      const dataSourceObj = JSON.parse(dataSource);
      const initialValueObj = JSON.parse(initialValue);
      const validatorObj = JSON.parse(validator);
      const {
        col = 12,
        innerSpan = defaultSpan,
        initState = oneFormWidgetStatus.visible,
        currentState = oneFormWidgetStatus.visible,
        field,
        type: elementType = ElementType.WIDGET,
        widgetConfig = {},
      } = uiConfigObj;
      return {
        id: labelId,
        fieldId: id,
        name: labelEnName,
        nameSpace: matterMetaId,
        sceneId: sid,
        sceneName,
        field: field || names[originalType] || names.input,
        displayName: labelName,
        col,
        innerSpan,
        initState,
        currentState,
        originalType,
        type: elementType,
        dataSource: dataSourceObj,
        initialValue: initialValueObj,
        validator: validatorObj,
        widgetConfig,
        ...others,
      };
    },
  );
}

const Model = {
  namespace: 'fieldStore',
  state: {
    sceneId: null,
    list: [],
    selectedItem: null,
  },
  effects: {
    *fetchList({ sceneId }, { put }) {
      const items = yield CORE.getFieldsUsingGET({ params: { sceneId } });
      yield put({
        type: 'saveList',
        payload: {
          sceneId,
          list: transform2widget(items),
        },
      });
    },

    *saveItem(obj, { select }) {
      const field = yield select(({ fieldStore }) => fieldStore.selectedItem);
      if (field) {
        const {
          nameSpace,
          matterName,
          sceneId,
          fieldId,
          id,
          enName,
          name,
          originalType,
          sceneName,
          displayName,
          col,
          innerSpan,
          initState,
          currentState,
          field: fieldType,
          type,
          dataSource = {},
          initialValue = {},
          validator = {},
          widgetConfig = {},
        } = field;
        yield CORE.saveFieldUsingPOST({
          body: {
            id: fieldId,
            matterMetaId: nameSpace,
            matterName,
            labelId: id,
            labelEnName: name,
            type: originalType,
            sceneId,
            sceneName,
            labelName: displayName,
            enName,
            uiConfig: JSON.stringify({
              name,
              col,
              innerSpan,
              initState,
              currentState,
              field: fieldType,
              type,
              widgetConfig,
            }),
            dataSource: JSON.stringify(dataSource),
            initialValue: JSON.stringify(initialValue),
            validator: JSON.stringify(validator),
          },
        });

        message.success('保存成功!');
      }
    },
  },
  reducers: {
    saveList(state, { payload }) {
      const { list, sceneId } = payload;
      return { ...state, list, sceneId };
    },

    editItem(state, { id }) {
      const { list = [] } = state;
      return { ...state, selectedItem: _.find(list, { id }) };
    },

    updateSelectedItem(state, { payload }) {
      const { list } = state;
      const { id, ...others } = payload;
      const originItem = _.find(list, { id });
      return {
        ...state,
        selectedItem: {
          ...originItem,
          ...others,
        },
      };
    },
  },
};
export default Model;
