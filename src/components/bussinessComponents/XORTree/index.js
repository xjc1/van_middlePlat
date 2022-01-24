/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import _ from 'lodash';
import { message, Tree } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { utils } from '@/components/tis_ui';
import RelationConfigNode from './RelationConfigNode';
import styles from './index.less';

const { IDGenerator, EmptyFn } = utils;

const colorList = {
  and: 'success',
  or: 'error',
};

const treeKeyGenerator = new IDGenerator('c_tree');

function Index({
  value = [],
  disabled,
  onChange,
  extraFormItems,
  isRequire,
  operates,
  onRelationDelete,
  extraOperate,
  extraOperatesClick,
  renderNode = EmptyFn,
}) {
  const focusExpandedKeys = new Set();

  function mapToTreeNode(originTree, parentKey, pNode, operate, relationType, onCreateForm) {
    const { addExpandedKeys = EmptyFn } = operate;
    addExpandedKeys(parentKey);
    return _.map(originTree, node => {
      const { functionItem, key, children = [], operator } = node;
      return {
        key,
        parentKey,
        current: node,
        pNode,
        functionItem,
        children: mapToTreeNode(children, key, node, operate, operator),
        title: operator ? (
          <RelationConfigNode
            clear={clear}
            refresh={refresh}
            onDelete={onRelationDelete}
            node={node}
            keyGenerator={treeKeyGenerator}
            disabled={disabled}
            onCreateForm={onCreateForm}
            pNode={pNode}
            relationType={relationType}
            colorList={colorList}
            extraFormItems={extraFormItems}
            isRequire={isRequire}
            operates={operates}
            extraOperate={extraOperate}
            extraOperatesClick={extraOperatesClick}
          />
        ) : (
          renderNode({ refresh, pNode, onCreateForm, node, relationType })
        ),
      };
    });
  }

  function onDrop({ node, dragNode }) {
    const { dragOverGapTop, dragOver, pNode } = node;
    const { pNode: dragPNode, current } = dragNode;
    // 限制
    if (!node.current.operator && node.dragOver) {
      message.info('只能拖动到条件节点下');
      return;
    }
    if (node.current.isRoot && (node.dragOverGapBottom || node.dragOverGapTop)) {
      message.info('不可拖动到与根节点同级');
      return;
    }

    // 删除原来的
    const dragPNodeChildren = _.isFunction(dragPNode.children)
      ? dragPNode.children()
      : dragPNode.children;

    const deletIndex = _.findIndex(dragPNodeChildren, current);

    dragPNodeChildren.splice(deletIndex, 1);

    // 添加新的
    const parentChildren = _.isFunction(pNode.children) ? pNode.children() : pNode.children;
    const nextChildren = _.reduce(
      parentChildren,
      (result, item) => {
        if (node.key === `${item.key}` && !dragOver && dragOverGapTop) {
          result.push(current);
        }

        result.push(item);

        if (node.key === `${item.key}` && !dragOver && !dragOverGapTop) {
          result.push(current);
        }

        if (node.key === `${item.key}` && dragOver) {
          // eslint-disable-next-line no-param-reassign
          item.children = [current, ...item.children];
        }

        return result;
      },
      [],
    );
    if (_.isFunction(pNode.children)) {
      refresh(nextChildren);
    } else {
      pNode.children = nextChildren;
      refresh();
    }
  }

  function refresh(nextChildren) {
    onChange([...(nextChildren || value)]);
  }

  const treeNode = mapToTreeNode(
    value,
    0,
    { children: () => value },
    {
      addExpandedKeys: parentKey => {
        focusExpandedKeys.add(`${parentKey}`);
      },
    },
  );

  function clear() {
    onChange([]);
  }

  return (
    <Tree
      disabled={disabled}
      draggable
      className={styles.xorTree}
      switcherIcon={<LogoutOutlined />}
      treeData={treeNode}
      onDrop={onDrop}
      showLine={{ showLeafIcon: false }}
      expandedKeys={focusExpandedKeys}
      autoExpandParent
    />
  );
}

Index.operate = {
  addChildAndOr: 'addChildAndOr',
  addChildItem: 'addChildItem',
  remove: 'remove',
};

Index.defaultProps = {
  disabled: false,
  onChange: EmptyFn,
  onRelationDelete: EmptyFn,
  extraFormItems: null,
  isRequire: true,
  onCreateForm: EmptyFn,
  relationType: 'and',
  parentKey: 0,
  operates: [Index.operate.addChildAndOr, Index.operate.addChildItem, Index.operate.remove],
};

export default Index;
