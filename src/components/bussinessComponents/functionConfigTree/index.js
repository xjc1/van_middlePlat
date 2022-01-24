/* eslint-disable no-param-reassign */
import React from 'react';
import { Tree, Button, message, Alert } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import _ from 'lodash';
import styles from './index.less';
import { EmptyFn } from '@/components/tis_ui';
import RelationConfigNode from './RelationConfigNode';
import FuncConfigNode from './FuncConfigNode';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { CORE } from '@/services/api';
import useFuncConfigTreeData from './hooks/useFuncConfigTreeData';

const colorList = {
  and: 'success',
  or: 'error',
};

const treeKeyGenerator = new IDGenerator('fun_tree');

async function getMethodList(type, tableType) {
  const allMethod = await CORE.findAllMethodSchemaUsingGET({ params: { type, tableType } });
  const formatMethod = _.map(allMethod, ({ id, cname, description, ...others }) => ({
    ...others,
    label: cname,
    value: id,
    key: id,
    description,
    id,
  }));
  return formatMethod;
}

function FunctionConfigTree({
  value = [],
  onChange,
  userType,
  disabled,
  bindMethod = EmptyFn,
  getMethods = getMethodList,
  extraFormItems = null,
  isRequire = true,
  tableType,
}) {
  const { methodList } = useFuncConfigTreeData(userType, getMethods, tableType);

  bindMethod({
    clear,
  });
  const focusExpandedKeys = new Set();
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

  function refresh(nextChildren) {
    onChange([...(nextChildren || value)]);
  }

  function clear() {
    onChange([]);
  }

  function onDrop({ node, dragNode }) {
    const { dragOverGapTop, dragOver, pNode } = node;
    const { pNode: dragPNode, current } = dragNode;
    // 限制
    if (!node.current.operator && node.dragOver) {
      message.info('不可拖动到函数节点下');
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

  function mapToTreeNode(originTree, parentKey = 0, pNode, operate, relationType = 'and') {
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
            node={node}
            keyGenerator={treeKeyGenerator}
            disabled={disabled}
            methodList={methodList}
            pNode={pNode}
            relationType={relationType}
            colorList={colorList}
            extraFormItems={extraFormItems}
            isRequire={isRequire}
          />
        ) : (
          <>
            <Alert
              type={colorList[relationType]}
              message={
                <>
                  <FuncConfigNode
                    disabled={disabled}
                    funKey={key}
                    node={node}
                    refresh={refresh}
                    methodList={methodList}
                    keyGenerator={treeKeyGenerator}
                    pNode={pNode}
                    extraFormItems={extraFormItems}
                    isRequire={isRequire}
                  />
                </>
              }
            />
          </>
        ),
      };
    });
  }
  return !value.length ? (
    <Button
      disabled={disabled}
      type="primary"
      onClick={() => {
        onChange([
          {
            key: treeKeyGenerator.next(),
            isRoot: true,
            operator: 'and',
            children: [],
          },
        ]);
      }}
    >
      添加函数配置
    </Button>
  ) : (
    <Tree
      disabled={disabled}
      draggable
      className={styles.customTree}
      switcherIcon={<LogoutOutlined />}
      treeData={treeNode}
      onDrop={onDrop}
      showLine={{ showLeafIcon: false }}
      expandedKeys={focusExpandedKeys}
      autoExpandParent
    />
  );
}

export default FunctionConfigTree;
