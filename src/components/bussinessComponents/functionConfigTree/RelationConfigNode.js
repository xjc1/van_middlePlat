/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Tooltip, Alert, Button, Dropdown, Menu, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import FunFormModal from './FuncFormModal';
import styles from './index.less';

function RelationConfigNode({
  node,
  refresh,
  clear,
  disabled,
  methodList = [],
  keyGenerator,
  colorList = {},
  relationType,
  pNode,
  extraFormItems = null,
  isRequire,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { operator, isRoot } = node;
  return (
    <>
      <Alert
        type={isRoot ? 'info' : colorList[relationType]}
        message={
          <>
            <Button
              size="small"
              className={styles.relativeBtn}
              style={{
                borderRadius: 0,
              }}
              onClick={() => {
                node.operator = 'and';
                refresh();
              }}
              disabled={disabled && node.operator !== 'and'}
              type={operator === 'and' ? 'primary' : 'default'}
            >
              且
            </Button>
            <Button
              size="small"
              className={styles.relativeBtn}
              style={{
                borderRadius: 0,
              }}
              type={operator === 'or' ? 'primary' : 'default'}
              disabled={disabled && node.operator !== 'or'}
              onClick={() => {
                node.operator = 'or';
                refresh();
              }}
            >
              或
            </Button>
            {!disabled && (
              <div className={styles.settingContainer}>
                <Dropdown
                  overlay={
                    <Menu
                      onClick={({ key: typeKey }) => {
                        switch (typeKey) {
                          case 'addChildAndOr':
                            node.children.push({
                              operator: 'and',
                              key: keyGenerator.next(),
                              children: [],
                            });
                            refresh();
                            break;
                          case 'addChildFun':
                            setModalVisible(true);
                            break;
                          case 'remove':
                            Modal.confirm({
                              icon: <MinusCircleOutlined style={{ color: '#ff4d4f' }} />,
                              content: <p>确定你要删除此节点以及子节点吗?</p>,
                              okText: '确定',
                              cancelText: '取消',
                              onOk: () => {
                                if (node.isRoot) {
                                  clear();
                                  return;
                                }
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
                      <Menu.Item key="addChildAndOr">
                        <PlusOutlined />
                        添加子级且或关系
                      </Menu.Item>
                      <Menu.Item key="addChildFun">
                        <PlusOutlined />
                        添加子级函数
                      </Menu.Item>
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
          </>
        }
      />

      {modalVisible && (
        <FunFormModal
          isRequire={isRequire}
          methodList={methodList}
          handleCancel={() => {
            setModalVisible(false);
          }}
          onFinish={vals => {
            const { functionId, values } = vals;
            node.children.push({
              key: keyGenerator.next(),
              functionItem: {
                ...vals,
                functionId,
                values,
              },
            });
            setModalVisible(false);
            refresh();
          }}
        >
          {extraFormItems}
        </FunFormModal>
      )}
    </>
  );
}

export default RelationConfigNode;
