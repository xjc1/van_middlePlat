import { ElementType } from '@/pages/designStudios/FormDesigner/FormCanvas/types';
import _ from 'lodash';
import { FORMS } from '@/services/api';
import { flattenSchema } from '@/utils/tools';
import { message } from 'antd';
import { json as jsonSchema } from 'generate-schema';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import ScriptTmp from '@/pages/designStudios/FormDesigner/tmp/scriptTmp';
import { fieldFullName } from '@/pages/designStudios/FormDesigner/widgets/tools';
import { treeMethods } from '@tong/datastructure';

const { mapTree: $mapTree } = treeMethods;

function copy2clipboard() {
  // const clipboardObj = navigator.clipboard;
  // clipboardObj.writeText(str);
}

function treeFr(treeData, fn) {
  const { content } = treeData;
  // eslint-disable-next-line consistent-return
  _.forEach(content, (item, index) => {
    if (fn(item, treeData, index)) {
      return false;
    }
    treeFr(item, fn);
  });
}

function mapTree({ content, ...others }, fn) {
  return {
    ...others,
    content: $mapTree(content, fn, 'content'),
  };
}

function filterTree(treeData, fn) {
  const { content = [], ...others } = treeData;
  const nextContent = _.filter(content, fn);
  return {
    ...others,
    content: _.map(nextContent, item => {
      return filterTree(item, fn);
    }),
  };
}

function digTreeFr(formData, nextId) {
  let $dropItem = null;
  let $dropParentItem = null;
  treeFr(formData, (item, parentItem) => {
    const { id } = item;
    if (id === nextId) {
      $dropItem = item;
      $dropParentItem = parentItem;
      return true;
    }
    return false;
  });
  return { $dropItem, $dropParentItem };
}

function orderSet(formData, isSet) {
  let i = 1;
  const nextTreeData = mapTree(formData, item => {
    if (item.type === ElementType.WIDGET) {
      return {
        ...item,
        // eslint-disable-next-line no-plusplus
        orderIndex: isSet ? i++ : undefined,
      };
    }
    return item;
  });
  return nextTreeData;
}

function createCtxSchema(context) {
  if (context) {
    try {
      const schemaObj = jsonSchema(JSON.parse(context));
      const ctxSchema = flattenSchema(schemaObj);
      return _.filter(ctxSchema, ({ key }) => key);
    } catch (e) {
      message.error('不可识别的上下文配置,请检查表单配置');
      return [];
    }
  }
  return [];
}

function isChildren(currentWrapper, { id: checkId }) {
  let isChildrenItem = false;
  treeFr(currentWrapper, item => {
    const { id } = item;
    if (id === checkId) {
      isChildrenItem = true;
      return true;
    }
    return false;
  });
  return isChildrenItem;
}

function dragOperate({
  type,
  nextId,
  position,
  formData,
  $dropItem,
  $dropParentItem,
  currentItem,
}) {
  switch (type) {
    case ElementType.WRAPPER: {
      $dropItem.content.push(currentItem);
      break;
    }
    case ElementType.UNIT:
    case ElementType.WIDGET: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let $parentItem = null;
      let $index = 0;
      // eslint-disable-next-line consistent-return
      treeFr(formData, (item, parentItem, index) => {
        const { id } = item;
        if (id === nextId) {
          $parentItem = parentItem;
          $index = index;
          return true;
        }
      });
      switch (position) {
        case 'left':
          $dropParentItem.content.splice($index, 0, currentItem);
          break;
        case 'right':
          $dropParentItem.content.splice($index + 1, 0, currentItem);
          break;
        default:
          throw new Error('不识别的组件插入方向');
      }
      break;
    }
    case ElementType.PAGE: {
      formData.content.push(currentItem);
      break;
    }
    default:
      throw new Error('不识别的组件类型');
  }
}

const version = '1.0.0';

const Model = {
  namespace: 'formDesigner',
  state: {
    formData: null,
    currentItem: null,
    currentParentItem: null,
    selectedItem: null,
    formDetail: null,
    context: null,
    ctxSchema: null,
  },
  effects: {
    *save(skip, { select }) {
      const { formData, formDetail, context } = yield select(({ formDesigner }) => {
        return {
          version,
          formData: formDesigner.formData,
          context: formDesigner.context,
          formDetail: formDesigner.formDetail,
        };
      });

      const { apis } = yield select(({ interfaceManage }) => {
        return { apis: interfaceManage.apis };
      });
      const scriptTmp = new ScriptTmp(apis);
      const nextFormData = mapTree(formData, item => {
        if (item.type === ElementType.WIDGET) {
          const { name, nameSpace, sceneName, ...others } = item;
          return {
            fullName: fieldFullName({ nameSpace, name }),
            name,
            nameSpace,
            ...others,
          };
        }
        return item;
      });

      scriptTmp.scanPreEvents(nextFormData);
      treeFr(nextFormData, item => {
        scriptTmp.scan(item);
      });
      scriptTmp.test();
      const scriptObj = scriptTmp.getTemp();
      const schema = JSON.stringify(nextFormData);
      copy2clipboard(
        JSON.stringify({
          id: 'dddd',
          schema,
          context,
          script: scriptObj,
        }),
      );
      yield FORMS.updateFormDefinitionUsingPOST({
        body: {
          ...formDetail,
          context,
          schema,
          script: scriptTmp.getTemp(),
        },
      });
      message.success('保存成功');
    },
  },
  reducers: {
    /*
     * 拖拽开始操作
     * */
    dragBegin(state, { id: nextId }) {
      let $item = null;
      let $parentItem = null;
      const { formData } = state;
      treeFr(formData, (item, parentItem) => {
        const { id } = item;
        if (id === nextId) {
          $item = item;
          $parentItem = parentItem;
          return true;
        }
        return false;
      });
      return {
        ...state,
        currentItem: $item,
        currentParentItem: $parentItem,
      };
    },

    resetContext(state, context) {
      return {
        ...state,
        context,
        ctxSchema: createCtxSchema(context),
      };
    },

    /*
     * 拖拽结束操作
     * */
    dragEnd(state, { payload: { type, id: nextId, position } }) {
      const { currentItem, currentParentItem, formData } = state;
      // drop元素所属于的容器
      const { $dropItem, $dropParentItem } = digTreeFr(formData, nextId);

      /* 防止拖动到自己的子元素上 */
      if (type !== ElementType.PAGE && isChildren(currentItem, $dropItem)) {
        return {
          ...state,
        };
      }

      /*
       * currentItem  拖拽元素
       * currentParentItem  拖拽元素上级, 一定是个容器
       * formData 所有的数据
       * */
      currentParentItem.content = _.filter(currentParentItem.content, ({ id }) => {
        return id !== currentItem.id;
      });

      dragOperate({
        type,
        nextId,
        position,
        $dropItem,
        $dropParentItem,
        currentItem,
        formData,
      });
      return {
        ...state,
        formData: { ...formData },
        currentItem: null,
        currentParentItem: null,
      };
    },

    addWrapper(state, { payload: { id: nextId, type, position, element } }) {
      const { formData } = state;
      // drop元素所属于的容器
      const { $dropItem, $dropParentItem } = digTreeFr(formData, nextId);
      const newWrapperId = IDGenerator.nextName('c', 10);
      dragOperate({
        type,
        nextId,
        $dropItem,
        $dropParentItem,
        position,
        formData,
        currentItem: {
          id: newWrapperId,
          name: newWrapperId,
          ...element,
          content: [],
        },
      });
      return {
        ...state,
        formData: { ...formData },
      };
    },

    addField(state, { payload: { id: nextId, type, position, element } }) {
      const { formData } = state;
      // drop元素所属于的容器
      const { $dropItem, $dropParentItem } = digTreeFr(formData, nextId);
      const newElementId = IDGenerator.nextName('e', 10);
      dragOperate({
        type,
        nextId,
        $dropItem,
        $dropParentItem,
        position,
        formData,
        currentItem: {
          name: newElementId,
          ...element,
          id: newElementId,
        },
      });
      return {
        ...state,
        formData: { ...formData },
      };
    },

    addUnit(state, { payload: { id: nextId, type, position, element } }) {
      const { formData } = state;
      // drop元素所属于的容器
      const { $dropItem, $dropParentItem } = digTreeFr(formData, nextId);
      const newElementId = IDGenerator.nextName('u', 10);
      dragOperate({
        type,
        nextId,
        $dropItem,
        $dropParentItem,
        position,
        formData,
        currentItem: {
          id: newElementId,
          ...element,
        },
      });
      return {
        ...state,
        formData: { ...formData },
      };
    },

    selectedItem(state, { id: nextId }) {
      const { formData } = state;
      let $selected = null;
      treeFr(formData, item => {
        const { id } = item;
        if (id === nextId) {
          $selected = item;
          return true;
        }
        return false;
      });
      return {
        ...state,
        selectedItem: $selected,
      };
    },

    updateSelectedItem(state, { payload }) {
      const { formData } = state;
      let selectedItem = null;
      const nextTreeData = mapTree(formData, item => {
        if (item.id === payload.id) {
          const $nextSelectedItem = {
            ...item,
            ...payload,
          };
          selectedItem = $nextSelectedItem;
          return $nextSelectedItem;
        }
        return item;
      });
      return {
        ...state,
        formData: nextTreeData,
        selectedItem,
      };
    },

    updateSelectedItemChildren(state, { payload }) {
      const { formData } = state;
      let selectedItem = null;
      const { id, ...others } = payload;
      const nextTreeData = mapTree(formData, item => {
        if (item.id === payload.id) {
          const { content = [] } = item;
          const $nextSelectedItem = {
            ...item,
            content: _.map(content, child => {
              if (child.type === ElementType.WIDGET) {
                return {
                  ...child,
                  ...others,
                };
              }
              return child;
            }),
          };
          selectedItem = $nextSelectedItem;
          return $nextSelectedItem;
        }
        return item;
      });
      return {
        ...state,
        formData: nextTreeData,
        selectedItem,
      };
    },

    resetSelected(state) {
      return {
        ...state,
        currentItem: null,
        currentParentItem: null,
        selectedItem: null,
      };
    },

    deleteElement(state, { id }) {
      const { formData } = state;
      const nextFormData = filterTree(formData, item => {
        return item.id !== id;
      });
      return {
        ...state,
        formData: nextFormData,
        currentItem: null,
        currentParentItem: null,
        selectedItem: null,
      };
    },

    exitEditor() {
      return {
        formData: null,
        currentItem: null,
        currentParentItem: null,
        selectedItem: null,
        formDetail: null,
        ctx: null,
        ctxSchema: null,
      };
    },

    openDesign(state, { detail }) {
      const { eventDef, script, schema, context, ...others } = detail;
      return {
        formData: schema ? JSON.parse(schema) : { content: [] },
        context,
        ctxSchema: createCtxSchema(context),
        currentItem: null,
        currentParentItem: null,
        selectedItem: null,
        formDetail: others,
      };
    },

    setOrder(state) {
      const { formData } = state;
      return {
        ...state,
        formData: orderSet(formData, true),
      };
    },

    unSetOrder(state) {
      const { formData } = state;
      return {
        ...state,
        formData: orderSet(formData, false),
      };
    },

    updateRootItem(state, { payload }) {
      const { formData } = state;
      return {
        ...state,
        formData: {
          ...formData,
          ...payload,
        },
      };
    },

    updateAllItems(state, { payload }) {
      const { formData } = state;
      const { type, data = {}, rootData = {} } = payload;
      const nextTreeData = mapTree(formData, item => {
        if (item.type === type) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      });
      return {
        ...state,
        formData: { ...nextTreeData, ...rootData },
      };
    },
  },
};

export default Model;
