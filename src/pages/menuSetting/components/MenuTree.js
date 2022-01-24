import React, { PureComponent } from 'react';

import { EditOutlined, PlusOutlined, EditFilled } from '@ant-design/icons';

import { Tree, Dropdown, Menu, Spin, message, Alert } from 'antd';
import { EmptyFn } from '@/components/tis_ui';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './index.less';

class MenuTree extends PureComponent {
  static defaultProps = {
    editAble: false,
    roleEditVisible: false,
  };

  state = {
    selectedKeys: [],
  };

  containerRef = React.createRef();

  handelMenuClick = (key, id) => {
    const { createChildMenu = EmptyFn, editMenu = EmptyFn } = this.props;
    switch (key) {
      case 'new':
        createChildMenu(id);
        break;
      case 'edit':
        editMenu(id);
        break;
      default:
        break;
    }
  };

  onDrop = info => {
    const { sortUpdate = EmptyFn, menuTreeNodeData } = this.props;
    // 不是同级的不能修改(注释这段可操作整条树)
    if (info.node.parentId !== info.dragNode.parentId || !info.dropToGap) {
      message.warning('仅可同级拖动');
      return;
    }
    const data = [...menuTreeNodeData];

    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // eslint-disable-next-line consistent-return
    const loop = (tempData, key, callback) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].key === key) {
          return callback(tempData[i], i, tempData);
        }
        if (tempData[i].children) {
          loop(tempData[i].children, key, callback);
        }
      }
    };

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });

      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
      // 这里的ar是同级的数组 用这里的id去更新
      const idArray = ar.map(({ key }) => key);
      // 更新传参
      const updateCondition = { parentId: info.node.parentId, childIds: idArray };
      // 提交更新操作
      sortUpdate(updateCondition);
    }
  };

  item2treeNode(treeData, parentEditAble) {
    const { onDoubleClick = EmptyFn } = this.props;
    return _.map(treeData, item => ({
      key: item.key,
      name: item.title,
      parentId: item.parentId,
      title: (
        <div onDoubleClick={() => onDoubleClick(item)} className={styles.tree_item}>
          {/* 下架状态标识 */}
          <span style={{ color: !item.status ? '#bfbfbf' : 'initial' }}>{item.title}</span>
          {parentEditAble && (
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
                      this.handelMenuClick(key, item.key);
                    }}
                  >
                    <Menu.Item key="edit">
                      <EditFilled />
                      修改菜单信息
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="new">
                      <PlusOutlined />
                      新建下一菜单
                    </Menu.Item>
                  </Menu>
                }
                trigger={['click', 'contextMenu']}
              >
                <EditOutlined className={styles.tree_edit_icon} />
              </Dropdown>
            </div>
          )}
        </div>
      ),
      children: this.item2treeNode(item.children, parentEditAble),
    }));
  }

  render() {
    const {
      list,
      editAble,
      onAddDepartment,
      onEditDepartment,
      onSelect,
      loading = false,
      currentUser,
      menuTreeNodeData = [],
      onDoubleClick,
      ...others
    } = this.props;
    const { selectedKeys } = this.state;
    const mapList = this.item2treeNode(menuTreeNodeData, true);
    return (
      <div
        ref={ref => {
          this.containerRef = ref;
        }}
        className={classNames(styles.innerbox, styles.innerboxScroll, styles.menuTree)}
      >
        <Spin spinning={loading}>
          <Alert
            className={styles.menuTreeTitle}
            message="同级拖动可调整排序,双击可在右侧列表页查看子菜单"
            type="info"
            showIcon
          />
          {mapList.length !== 0 && (
            <Tree
              {...others}
              height={this.containerRef.clientHeight - 50 || 500}
              blockNode
              showLine
              showIcon
              draggable
              onDrop={this.onDrop}
              treeData={mapList}
              selectedKeys={selectedKeys}
              onSelect={vals => {
                if (vals.length > 0) {
                  this.setState({
                    selectedKeys: [vals[0]],
                  });
                  onSelect(vals[0]);
                }
              }}
            />
          )}
        </Spin>
      </div>
    );
  }
}

export default MenuTree;
