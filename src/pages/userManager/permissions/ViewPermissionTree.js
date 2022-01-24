/* eslint-disable @typescript-eslint/camelcase */

import React, { PureComponent } from 'react';
import { CheckSquareOutlined, CloseSquareOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Tree } from 'antd';
import _ from 'lodash';
import PermissionTag from './PermissionTag';
import PERMISSION from '@/utils/permissionEnum';
import styles from '../department/department.less';

class ViewPermissionTree extends PureComponent {
  static defaultProps = {
    editAble: false,
    selectedList: [],
    defaultExpandAll: true,
    defaultExpandParent: true,
  };

  // 全选操作获取下级所有合法权限
  getChildrenKeys = (groupArray, permissionKey) => {
    const keysArray = [];
    const { vaildPermissions } = this.props;
    const getChild = (group, key) => {
      if(group[key]){
        const keys = group[key].map(item => item.key);
        keysArray.push(...keys);
        keys.forEach(el => {
          if(group[el]){
            getChild(group,el);
          }
        });
      }
    }
    getChild(groupArray, permissionKey);
    // 过滤掉父级没有的权限
    const resultArray = keysArray.filter(it => vaildPermissions.indexOf(it) > -1);
    return resultArray;
  }

  item2treeNode(roots, group, editAble) {
    const { vaildPermissions } = this.props;
    return _.map(roots, permission => ({
      key: permission.key,
      name: permission.name,
      disabled: vaildPermissions ? _.indexOf(vaildPermissions, permission.key) === -1 : false,
      title: (
        <span className={styles.tree_item}>
          <PermissionTag type="view" valid={permission.status === 'VALID'}>
            {permission.name}
          </PermissionTag>
          {editAble && group[permission.key] && group[permission.key].length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }) => {
                    const { selectedList, onCheck } = this.props;
                    const childrenKeys = this.getChildrenKeys(group, permission.key);
                    switch (key) {
                      case 'checkall':
                        onCheck({
                          checked: _.concat(
                            selectedList,
                            permission.key,
                            childrenKeys,
                          ),
                        });
                        break;
                      case 'cleanall':
                        onCheck({
                          checked: _.difference(
                            selectedList,
                            [permission.key],
                            childrenKeys,
                          ),
                        });
                        break;
                      default:
                    }
                  }}
                >
                  <Menu.Item key="checkall">
                    <CheckSquareOutlined />
                    全选权限
                  </Menu.Item>
                  <Menu.Item key="cleanall">
                    <CloseSquareOutlined />
                    清空权限
                  </Menu.Item>
                </Menu>
              }
              trigger={['click', 'contextMenu']}
            >
              <EditOutlined className={styles.tree_edit_icon} />
            </Dropdown>
          )}
             {permission.desc && <span style={{fontSize: '12px'}}>({permission.desc})</span>}
        </span>
      ),
      children: this.item2treeNode(group[permission.key], group, editAble),
    }));
  }

  render() {
    const {
      editAble,
      onAddDepartment,
      defaultExpandAll,
      defaultExpandParent,
      selectedList,
      ...others
    } = this.props;
    const group = _.groupBy(PERMISSION.viewPermissions, 'parent');
    const mapList = this.item2treeNode(group.root, group, editAble);
    return (
      <Tree
        showLine
        showIcon
        defaultExpandAll={defaultExpandAll}
        defaultExpandParent={defaultExpandParent}
        pagination={{ defaultPageSize: 7 }}
        treeData={mapList}
        {...others}
      />
    );
  }
}

export default ViewPermissionTree;
