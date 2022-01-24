/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Tooltip, Alert, Button, Dropdown, Menu, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import styles from './index.less';
import EmptyFn from '@/components/tis_ui/utils/EmptyFn';
import { commonRelationType } from '@/utils/constantEnum';

function RelationConfigNode({
                              node,
                              refresh,
                              clear,
                              disabled,
                              onCreateForm,
                              keyGenerator,
                              colorList,
                              onDelete,
                              relationType,
                              pNode,
                              isRequire,
                              operates,
                              extraOperatesClick = EmptyFn,
                              extraOperate = <></>
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
                node.operator = commonRelationType.AND;
                refresh();
              }}
              disabled={disabled && node.operator !== commonRelationType.AND}
              type={operator === commonRelationType.AND ? 'primary' : 'default'}
            >
              且
            </Button>
            <Button
              size="small"
              className={styles.relativeBtn}
              style={{
                borderRadius: 0,
              }}
              type={operator === commonRelationType.OR ? 'primary' : 'default'}
              disabled={disabled && node.operator !== commonRelationType.OR}
              onClick={() => {
                node.operator = commonRelationType.OR;
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
                              operator: commonRelationType.AND,
                              key: keyGenerator.next(),
                              children: [],
                            });
                            refresh();
                            break;
                          case 'addChildItem':
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
                                  onDelete(node, pNode);
                                  clear();
                                  return;
                                }
                                onDelete(node, pNode);
                                const index = _.findIndex(pNode.children, node);
                                pNode.children.splice(index, 1);
                                refresh();
                              },
                            });
                            break;
                          default:
                            extraOperatesClick({key:typeKey, node, pNode, refresh})
                            break;
                        }
                      }}
                    >
                      {extraOperate}
                      {_.includes(operates, 'addChildAndOr') && (
                        <Menu.Item key="addChildAndOr">
                          <PlusOutlined />
                          添加子级且或关系
                        </Menu.Item>
                      )}
                      {_.includes(operates, 'addChildItem') && (
                        <Menu.Item key="addChildItem">
                          <PlusOutlined />
                          添加子级函数
                        </Menu.Item>
                      )}
                      {_.includes(operates, 'remove') && (
                        <Menu.Item key="remove">删除当前节点及子节点</Menu.Item>
                      )}
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
      {modalVisible &&
      onCreateForm({
        isRequire,
        node,
        refresh,
        onClose: () => {
          setModalVisible(false);
        },
      })}
    </>
  );
}

RelationConfigNode.defaultProps = {
  onCreateForm: EmptyFn,
  onDelete: EmptyFn,
  colorList: {},
  operates: [],
};

export default RelationConfigNode;
