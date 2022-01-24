/* eslint-disable @typescript-eslint/camelcase */

import React, { PureComponent } from 'react';

import {
  EditOutlined,
  PlusOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  RollbackOutlined,
} from '@ant-design/icons';

import { Tree, Dropdown, Menu, Modal, Form, Input } from 'antd';
import { FormRules, TItem, confirmAble } from '@/components/tis_ui';
import { connect } from 'dva';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './department.less';

@connect(({ department, user }) => ({ ...department, currentUser: user.currentUser }))
class DepartmentTree extends PureComponent {
  static defaultProps = {
    editAble: false,
    roleEditVisible: false,
  };

  state = {
    selectedKeys: [],
  };

  containerRef = React.createRef();

  handleMenuClick = (key, department) => {
    const { id, departmentName } = department;
    const { onAddDepartment, onEditDepartment } = this.props;
    switch (key) {
      case 'newDepartment':
        onAddDepartment(id, departmentName);
        break;
      case 'delDepartment':
        this.onDelDepartment(id, departmentName);
        break;
      case 'editDepartment': {
        const { list } = this.props;
        const data = _.find(list, { id }) || { id };
        onEditDepartment(data);
        break;
      }
      default:
        break;
    }
  };

  onDelDepartment = (id, departmentName) => {
    const warning = confirmAble({
      confirmText: '警告',
      confirmContent: `您确定要删除${departmentName}吗?,此行为不可逆，请慎重!!!`,
      onClick: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'department/deleteDepartment',
          payload: id,
        });
      },
    });
    warning();
  };

  item2treeNode(roots, group, editAble, parentRoleId) {
    return _.map(roots, department => ({
      key: department.id,
      name: department.departmentName,
      parentRoleId,
      title: (
        <span className={styles.tree_item}>
          <span>{department.departmentName}</span>
          {editAble && (
            <div
              style={{
                float: 'right',
                lineHeight: '24px',
              }}
            >
              <Dropdown
                overlay={
                  <Menu
                    onClick={({ key }) => {
                      this.handleMenuClick(key, department, parentRoleId);
                    }}
                  >
                    <Menu.Item key="editDepartment">
                      <UserOutlined />
                      修改部门信息
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="newDepartment">
                      <PlusOutlined />
                      新建下一级部门
                    </Menu.Item>
                    <Menu.Item key="delDepartment" style={{ color: 'red' }}>
                      <RollbackOutlined />
                      删除部门
                    </Menu.Item>
                  </Menu>
                }
                trigger={['click', 'contextMenu']}
              >
                <EditOutlined className={styles.tree_edit_icon} />
              </Dropdown>
            </div>
          )}
        </span>
      ),
      children: this.item2treeNode(group[department.id], group, editAble, department.roleId),
    }));
  }

  render() {
    const {
      list,
      editAble,
      onAddDepartment,
      onEditDepartment,
      onSelected,
      currentUser,
      ...others
    } = this.props;
    const { selectedKeys } = this.state;
    const group = _.groupBy(list, 'parentDepartmentId');
    const mapList = this.item2treeNode(
      group[currentUser.userType === 0 ? 0 : currentUser.dept.parentDepartmentId],
      group,
      editAble,
    );
    const [first] = mapList;
    return (
      <div
        ref={ref => {
          this.containerRef = ref;
        }}
        className={classNames(styles.innerbox, styles.innerboxScroll)}
      >
        {mapList && (
          <Tree
            height={this.containerRef.clientHeight || 500}
            blockNode
            showLine
            showIcon
            // defaultExpandAll
            defaultExpandedKeys={[first?.key]}
            defaultExpandParent
            treeData={mapList}
            selectedKeys={selectedKeys}
            onSelect={vals => {
              if (vals.length > 0) {
                this.setState({
                  selectedKeys: [vals[0]],
                });
                onSelected(vals[0]);
              }
            }}
            {...others}
          />
        )}
      </div>
    );
  }
}

export default DepartmentTree;
