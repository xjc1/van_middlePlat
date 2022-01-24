/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import styles from './index.less';
import ExpandAllAction from './actions/ExpandAllAction';
import CollapseAllAction from './actions/CollapseAllAction';
import CollapseOthersAction from './actions/CollapseOthersAction';
import MoveUpAction from './actions/MoveUpAction';
import MoveDownAction from './actions/MoveDownAction';
import LocationNodeAction from './actions/LocationNodeAction';
import LocationReSetAction from './actions/LocationReSetAction';
import Toolbar from './Toolbar';
import classNames from 'classnames';
import { Tree } from 'antd';
import _ from 'lodash';
import ScenesNode from './ScenesNode';
import cloneNode from './cloneNode';
import ArrayTools from '../utils/ArrayTools';
import EmptyFn from '../utils/EmptyFn';
import PropTypes from 'prop-types';

class Index extends Component {
  treeRef = React.createRef();

  containerRef = React.createRef();

  state = {
    selectedKeys: [],
    selectedNode: null,
    parentNode: null,
    searchValue: null,
    locationNode: null,
    expandHelper: {
      expandRule: 'all',
      autoExpandParent: true,
      resetExpandedKeys: true,
    },
  };

  static ACTIONS = {
    EXPAND_ALL: true,
    COLLAPSE_ALL: true,
    COLLAPSE_OTHERS: true,
    MOVE_UP: true,
    MOVE_DOWN: true,
    RE_LOCATION: true,
  };

  static defaultProps = {
    onSelected: EmptyFn,
    onUnSelected: EmptyFn,
    actions: Index.ACTIONS,
    draggable: false,
    readonly: false,
    newEntrieImg: false,
    switcherIcon: EmptyFn,
    canAddNode() {
      return true;
    },
    canDropIn() {
      return true;
    },
  };

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    onCreateTree: PropTypes.func.isRequired,
    onUnSelected: PropTypes.func,
    onSelected: PropTypes.func,
    canDropIn: PropTypes.func,
    canAddNode: PropTypes.func,
    newEntrieImg: PropTypes.string,
    actions: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    draggable: PropTypes.bool,
    readonly: PropTypes.bool,
    switcherIcon: PropTypes.func,
  };

  onSearch = value => {
    const searchValue = _.trim(value);
    this.setState({
      searchValue,
      expandHelper: {
        expandRule: 'none',
        autoExpandParent: true,
        resetExpandedKeys: true,
      },
    });
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      expandHelper: {
        expandRule: 'none',
        autoExpandParent: false,
        resetExpandedKeys: false,
      },
    });
  };

  onFolding = expandedKeys => {
    this.setState({
      expandedKeys,
      expandHelper: {
        expandRule: 'none',
        autoExpandParent: true,
        resetExpandedKeys: false,
      },
    });
  };

  digNodeKeys = (node, ctx = []) => {
    const { children } = node;
    if (children.length > 0) {
      ctx.push(node.key);
      _.forEach(children, child => this.digNodeKeys(child, ctx));
    }
    return ctx;
  };

  flush = nextTree => {
    const { tree, onUpdate } = this.props;
    onUpdate([...(nextTree || tree)]);
  };

  map2TreeData(originTree, parentKey = 0, pNode, operate) {
    const { touch, rename } = operate;
    const { nodeId, onDoubleSelect, switcherIcon, readonly, canAddNode } = this.props;
    return _.map(originTree, node => {
      const { cid, name, children = [] } = node;
      touch(node, parentKey);
      const title = rename({ cid, name, parentKey });
      return {
        key: `${cid}`,
        parentKey,
        current: node,
        pNode,
        switcherIcon: switcherIcon(node),
        children: this.map2TreeData(children, cid, node, operate),
        title: (
          <ScenesNode
            readonly={readonly}
            canAddNode={canAddNode}
            active={`${cid}` === nodeId}
            onFolding={this.onFolding}
            node={node}
            pNode={pNode}
            flush={() => {
              this.flush();
            }}
            onDoubleSelect={onDoubleSelect}
            title={title}
            onDelete={() => {
              const parentChildren = _.isFunction(pNode.children)
                ? pNode.children()
                : pNode.children;
              const deletIndex = _.findIndex(parentChildren, node);
              parentChildren.splice(deletIndex, 1);
              this.flush();
            }}
            onCopy={() => {
              const parentChildren = _.isFunction(pNode.children)
                ? pNode.children()
                : pNode.children;
              const index = _.findIndex(parentChildren, node);
              parentChildren.splice(index + 1, 0, cloneNode(node));
              this.flush();
            }}
          />
        ),
      };
    });
  }

  findNode(nextTree, locationId, getRoot) {
    if (_.isArray(nextTree)) {
      _.forEach(nextTree, n => {
        this.findNode(n, locationId, getRoot);
      });
    }
    if (nextTree.key === locationId) {
      getRoot(nextTree);
    }
    const { children } = nextTree;
    if (children && children.length > 0) {
      this.findNode(children, locationId, getRoot);
    }
  }

  render() {
    const {
      selectedKeys,
      selectedNode,
      parentNode,
      searchValue,
      expandHelper,
      expandedKeys,
      locationNode,
    } = this.state;
    const {
      tree,
      newEntrieImg,
      draggable,
      actions,
      onSave,
      onSelected,
      onUnSelected,
      onCreateTree,
      canDropIn,
    } = this.props;
    const { expandRule, resetExpandedKeys, autoExpandParent } = expandHelper;
    const focusExpandedKeys = new Set();
    const nextTree = this.map2TreeData(
      tree,
      0,
      {
        children: () => this.props.tree,
      },
      {
        touch: (node, parentKey) => {
          switch (expandRule) {
            case 'all':
              focusExpandedKeys.add(`${parentKey}`);
              break;
            case 'none':
            default:
              break;
          }
        },
        rename: ({ parentKey, name }) => {
          if (searchValue && searchValue !== '') {
            const splitedName = _.split(name, searchValue);
            return (
              <span>
                {_.map(splitedName, (piece, index) => {
                  if (index === 0) {
                    return piece;
                  }
                  focusExpandedKeys.add(`${parentKey}`);
                  return (
                    <span key={index}>
                      <span style={{ color: 'red' }}>{searchValue}</span>
                      {piece}
                    </span>
                  );
                })}
              </span>
            );
          }
          return name;
        },
      },
    );

    let rootNode = nextTree;
    if (locationNode) {
      this.findNode(nextTree, String(locationNode.cid), root => {
        rootNode = [root];
      });
    }
    return (
      <div ref={this.treeRef} style={{ paddingRight: 5 }}>
        <div className={styles.verticalToolbar}>
          {actions.EXPAND_ALL && (
            <ExpandAllAction
              onClick={() => {
                this.setState({
                  expandHelper: {
                    expandRule: 'all',
                    resetExpandedKeys: true,
                    autoExpandParent: true,
                  },
                });
              }}
            />
          )}

          {actions.COLLAPSE_ALL && (
            <CollapseAllAction
              onClick={() => {
                this.setState({
                  expandHelper: {
                    expandRule: 'none',
                    resetExpandedKeys: true,
                    autoExpandParent: true,
                  },
                });
              }}
            />
          )}

          {actions.COLLAPSE_OTHERS && (
            <CollapseOthersAction
              onClick={() => {
                this.onFolding(selectedKeys);
              }}
              disabled={selectedKeys.length === 0}
            />
          )}

          {actions.MOVE_UP && (
            <MoveUpAction
              onClick={() => {
                const parentChildren = _.isFunction(parentNode.children)
                  ? parentNode.children()
                  : parentNode.children;
                const index = _.findIndex(parentChildren, selectedNode);
                ArrayTools.upGo(parentChildren, index);
                this.flush();
              }}
              disabled={!(selectedNode && parentNode)}
            />
          )}

          {actions.MOVE_DOWN && (
            <MoveDownAction
              onClick={() => {
                const parentChildren = _.isFunction(parentNode.children)
                  ? parentNode.children()
                  : parentNode.children;
                const index = _.findIndex(parentChildren, selectedNode);
                ArrayTools.downGo(parentChildren, index);
                this.flush();
              }}
              disabled={!(selectedNode && parentNode)}
            />
          )}

          {actions.RE_LOCATION && (
            <>
              <LocationNodeAction
                onCancel={() => {
                  this.setState({
                    locationNode: null,
                  });
                }}
                onLocation={() => {
                  this.setState({
                    locationNode: selectedNode,
                  });
                }}
                disabled={!(selectedNode && parentNode)}
                isSetting={locationNode}
              />
              <LocationReSetAction
                onCancel={() => {
                  this.setState({
                    locationNode: null,
                  });
                }}
                isSetting={locationNode}
              />
            </>
          )}
        </div>
        <Toolbar
          onSave={onSave}
          canSave={tree && tree.length > 0}
          onCreateTree={onCreateTree}
          onSearch={this.onSearch}
        />
        <div
          ref={this.containerRef}
          style={{
            left: 10,
            right: 5,
            top: 60,
            bottom: 10,
          }}
          className={classNames(styles.innerbox, styles.innerboxScroll)}
        >
          {tree && tree.length > 0 ? (
            <Tree
              height={this.containerRef ? this.containerRef.current.clientHeight : 400}
              className={styles.scenesTree}
              treeData={rootNode}
              draggable={draggable}
              onDragStart={({ node }) => {
                const {
                  resetExpandedKeys: nextResetExpandedKeys,
                  expandedKeys: nextExpandedKeys,
                } = this.state;
                const keys = this.digNodeKeys(node);
                if (nextResetExpandedKeys) {
                  const mapKeys = Array.from(focusExpandedKeys);
                  this.onFolding(_.filter(mapKeys, id => !_.includes(keys, id)));
                } else {
                  const filteredKeys = _.filter(nextExpandedKeys, id => !_.includes(keys, id));
                  filteredKeys.push(`${node.pNode.cid}`);
                  this.onFolding(filteredKeys);
                }
              }}
              onDrop={({ node, dragNode }) => {
                const { dragOverGapTop, dragOver, pNode } = node;
                const { pNode: dragPNode, current } = dragNode;
                current.newNode = true;
                if (dragOver && !canDropIn(node)) {
                  return;
                }

                // 删除原来的
                const dragPNodeChildren = _.isFunction(dragPNode.children)
                  ? dragPNode.children()
                  : dragPNode.children;

                const deletIndex = _.findIndex(dragPNodeChildren, current);
                dragPNodeChildren.splice(deletIndex, 1);

                // 添加新的
                const parentChildren = _.isFunction(pNode.children)
                  ? pNode.children()
                  : pNode.children;

                const nextChildren = _.reduce(
                  parentChildren,
                  (result, item) => {
                    if (node.key === `${item.cid}` && !dragOver && dragOverGapTop) {
                      result.push(current);
                    }

                    result.push(item);

                    if (node.key === `${item.cid}` && !dragOver && !dragOverGapTop) {
                      result.push(current);
                    }

                    if (node.key === `${item.cid}` && dragOver) {
                      item.children = [current, ...item.children];
                    }

                    return result;
                  },
                  [],
                );
                if (_.isFunction(pNode.children)) {
                  this.flush(nextChildren);
                } else {
                  pNode.children = nextChildren;
                  this.flush();
                }
              }}
              onExpand={nextExpandedKeys => {
                this.onExpand(nextExpandedKeys);
              }}
              onSelect={(nextSelectedKeys, { selectedNodes }) => {
                if (selectedNodes.length > 0) {
                  const [firstPiece] = selectedNodes;
                  const { current, pNode } = firstPiece;
                  this.setState({
                    selectedKeys: nextSelectedKeys,
                    selectedNode: current,
                    parentNode: pNode,
                  });
                  onSelected(current, pNode);
                } else {
                  this.setState({
                    selectedKeys: nextSelectedKeys,
                    selectedNode: null,
                    parentNode: null,
                  });
                  onUnSelected();
                }
              }}
              blockNode
              showLine
              expandedKeys={resetExpandedKeys ? Array.from(focusExpandedKeys) : expandedKeys}
              autoExpandParent={autoExpandParent}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
              }}
            >
              {newEntrieImg && (
                <img
                  src={newEntrieImg}
                  alt="newEntrie"
                  style={{ display: 'block', margin: 'auto' }}
                  width={400}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Index;
