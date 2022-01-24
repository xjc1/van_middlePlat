/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { Badge, Dropdown, Input, Menu, Popconfirm, Tooltip, Divider, Modal } from 'antd';
import {
  CheckSquareOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './index.less';
import createNode, { setMaxI, generateId } from './createNode';

function ScenesNode({
  node,
  canAddNode,
  pNode,
  title,
  onDelete,
  onCopy,
  active,
  onFolding,
  onDoubleSelect,
  flush,
  readonly,
}) {
  let nextName = node.name;
  const { cid, name, materialAbsence = false, newNode = false } = node;

  useEffect(() => {
    setMaxI(cid);
  }, []);

  return (
    <div
      key={`${cid}`}
      className={classNames(styles.line, active && styles.active)}
      onDoubleClick={() => {
        onDoubleSelect(node);
      }}
    >
      <div className={styles.title}>
        <Popconfirm
          title={
            <Input
              onChange={({ target: { value } }) => {
                nextName = value;
              }}
              defaultValue={name}
              style={{ width: 400, marginRight: 10 }}
            />
          }
          icon={<EditOutlined />}
          onCancel={() => {
            nextName = name;
          }}
          onConfirm={() => {
            // eslint-disable-next-line no-param-reassign
            node.name = nextName;
            flush();
          }}
          okText="更名"
          cancelText="取消"
        >
          <Tooltip placement="bottom">
            <span>{title}</span>
          </Tooltip>
        </Popconfirm>
      </div>
      {!readonly && (
        <div
          style={{
            position: 'absolute',
            paddingRight: 3,
            right: 0,
            marginRight: 5,
            background: 'white',
          }}
        >
          {canAddNode(node) && (
            <Tooltip title="创建一个子节点">
              <PlusOutlined
                className={styles.treeMoreIcon}
                onClick={() => {
                  createNode(vals => {
                    const { children = [] } = node;
                    // eslint-disable-next-line no-param-reassign
                    node.children = [
                      ...children,
                      {
                        cid: generateId(),
                        newNode: true,
                        children: [],
                        ...vals,
                      },
                    ];
                    flush();
                  });
                }}
              />
            </Tooltip>
          )}
          <Dropdown
            overlay={
              <Menu
                onClick={({ key }) => {
                  switch (key) {
                    case 'folding':
                      onFolding([`${node.cid}`]);
                      break;
                    case 'deleteNode':
                      Modal.confirm({
                        icon: <MinusCircleOutlined style={{ color: '#ff4d4f' }} />,
                        content: <p>{`确定你要删除此节点[${name}]以及子节点吗?`}</p>,
                        okText: '确定',
                        cancelText: '取消',
                        onOk: onDelete,
                      });
                      break;
                    case 'copyNode':
                      onCopy();
                      break;
                    case 'createLvlNode':
                      createNode(vals => {
                        const parentChildren = _.isFunction(pNode.children)
                          ? pNode.children()
                          : pNode.children;
                        parentChildren.push({
                          cid: generateId(),
                          newNode: true,
                          children: [],
                          ...vals,
                        });
                        flush();
                      });
                      break;
                    default:
                      break;
                  }
                }}
              >
                <Menu.Item key="createLvlNode">
                  <PlusOutlined />
                  创建同级节点
                </Menu.Item>
                <Menu.Item key="copyNode">
                  <CheckSquareOutlined />
                  复制节点
                </Menu.Item>
                <Menu.Item key="deleteNode" style={{ color: 'red' }}>
                  <MinusOutlined />
                  删除此节点以及以下节点
                </Menu.Item>
              </Menu>
            }
            trigger={['click', 'contextMenu']}
          >
            <Tooltip title="更多操作">
              <SettingOutlined className={classNames(styles.treeMoreIcon, styles.primary)} />
            </Tooltip>
          </Dropdown>
          <Divider type="vertical" />
          <span className={styles.warringTip}>
            {materialAbsence ? (
              <Tooltip placement="right" title="主题材料缺失">
                <Badge status="processing" color="red" />
              </Tooltip>
            ) : (
              newNode && (
                <Tooltip placement="right" title="新建未提交节点">
                  <Badge status="processing" color="#87d068" />
                </Tooltip>
              )
            )}
          </span>
        </div>
      )}
    </div>
  );
}

export default ScenesNode;
