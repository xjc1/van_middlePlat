/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { ITEM_ELEMENTS } from "@/pages/dialogStudios/itemConst";
import BaseEntity from './BaseEntity';
import _ from 'lodash';
import { utils } from '@/components/tis_ui';

const { IDGenerator } = utils;

export default class BaseNode extends BaseEntity {

  // 通用数据格式转换
  commonOper({ id, label, nodeType, x, y }) {
    return {
      id,
      name: label,
      type: nodeType,
      point: {
        x,
        y,
      },
    };
  }

  // 提交前转换到服务器最终数据
  formData({ setting, ...others }) {
    return {
      ...this.commonOper(others),
      conf: setting,
    };
  }

  // 初始化节点表单
  initSetting(conf) {
    return conf;
  }

  // 初始化节点数据, 和 formData 互为 逆操作
  initData(node) {
    const {
      type,
      name,
      point: { x, y },
      id,
      conf,
    } = node;
    return {
      ...ITEM_ELEMENTS[type],
      label: name,
      x,
      y,
      id,
      setting: this.initSetting({ name, ...conf }),
    };
  }

  create(nextNode, label) {
    return {
      ...nextNode,
      setting: {
        name: label,
      },
    };
  }

  onEdgeRemove(node) {
    return node;
  }

  onEdgeAdd({ nextEdge, nodes, edges }) {
    return {
      nodes,
      edges: [...edges, nextEdge],
    };
  }

  onUpdateRule(selectedNode, rules, state) {
    return { ...state };
  }

  onUpdateIntent(selectedNode, rules, state) {
    return { ...state };
  }

  copy(state, node, { offsetX = 20, offsetY = 20 }) {
    const id = IDGenerator.next();
    const { parent, x, y, ...others } = _.cloneDeep(node);
    return {
      ...others,
      id,
      x: x + offsetX,
      y: y + offsetY,
    };
  }

  remove() {}

}
