/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Tooltip, Dropdown, Menu, Modal } from 'antd';
import _ from 'lodash';
import { EditOutlined, MinusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import FuncDisplayItem from './FuncDisplayItem';
import FuncFormModal from './FuncFormModal';
import styles from './index.less';

function FuncConfigNode({
  node,
  refresh,
  funKey,
  methodList = [],
  disabled,
  keyGenerator,
  pNode,
  extraFormItems,
  isRequire,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <FuncDisplayItem
        disabled
        value={node.functionItem.functionId}
        methodList={methodList}
        onChange={val => {
          node.functionItem.functionId = val;
          node.functionItem.values = [];
          refresh();
        }}
        schemaValues={node.functionItem.values}
        key={`${node.key}_fun_${funKey}`}
      />
      {node.functionItem.functionId && !disabled && (
        <Tooltip title="编辑">
          <EditOutlined onClick={() => setModalVisible(true)} />
        </Tooltip>
      )}
      {!disabled && (
        <div className={styles.settingContainer}>
          <Dropdown
            overlay={
              <Menu
                onClick={({ key: typeKey }) => {
                  switch (typeKey) {
                    case 'addAndOr':
                      pNode.children.push({
                        operator: 'and',
                        key: keyGenerator.next(),
                        children: [],
                      });
                      refresh();
                      break;
                    case 'remove':
                      Modal.confirm({
                        icon: <MinusCircleOutlined style={{ color: '#ff4d4f' }} />,
                        content: <p>确定你要删除此节点以及子节点吗?</p>,
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                          const index = _.findIndex(pNode.children, node);
                          pNode.children.splice(index, 1);
                          refresh();
                        },
                      });
                      break;
                    default:
                      break;
                  }
                }}
              >
                <Menu.Item key="addAndOr">添加同级且或关系</Menu.Item>
                <Menu.Item key="remove">删除当前节点及子节点</Menu.Item>
              </Menu>
            }
            trigger={['click', 'contextMenu']}
          >
            <Tooltip title="更多操作">
              <SettingOutlined />
            </Tooltip>
          </Dropdown>
        </div>
      )}

      {modalVisible && (
        <FuncFormModal
          isRequire={isRequire}
          functionId={node.functionItem.functionId}
          values={node.functionItem.values}
          initValue={node.functionItem}
          methodList={methodList}
          handleCancel={() => {
            setModalVisible(false);
          }}
          onFinish={vals => {
            node.functionItem = vals;
            setModalVisible(false);
            refresh();
          }}
        >
          {extraFormItems}
        </FuncFormModal>
      )}
    </>
  );
}

export default FuncConfigNode;
