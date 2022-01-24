/* eslint-disable @typescript-eslint/camelcase */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import PermissionsQuerybar from './PermissionsQueryBar';
import { FormRules as Rules, TButton, TForm } from '@/components/tis_ui';
import PermissionsList from './PermissionsList';
import styles from './permissions.less';
import layoutSytles from '@/layouts/PageLayout/layout.less';

@connect(({ permission }) => permission)
class Index extends PureComponent {
  queryForm = null;

  componentDidMount() {
    this.fetchPermissions({});
  }

  fetchPermissions = ({ page = 0, pageSize = 8 }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/fetchPermission',
      payload: {
        page,
        pageSize,
      },
    });
  };

  createPermission = id => {
    let createForm = null;
    Modal.confirm({
      title: '创建新的权限',
      content: (
        <TForm
          onForm={form => {
            createForm = form;
          }}
          render={({ TItem, Slot }) => (
            <>
              <TItem
                field="permissionName"
                label="权限名称"
                rules={[Rules.required('权限名称必填')]}
                col={24}
              >
                <Input />
              </TItem>
              <TItem field="description" label="权限描述" col={24}>
                <Input />
              </TItem>
              <TItem field="rule" label="权限规则" col={24}>
                <Input />
              </TItem>
            </>
          )}
        />
      ),
      okText: '创建',
      icon: <PlusOutlined />,
      cancelText: '取消',
      onOk: onClose => {
        const { dispatch } = this.props;
        const { validateFields } = createForm;
        validateFields((err, { permissionName, description, rule }) => {
          if (!err) {
            dispatch({
              type: 'permission/addPermission',
              payload: {
                permissionName,
                rule,
                description,
              },
            });
            onClose();
          }
        });
      },
    });
  };

  render() {
    return (
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.rightGrid}>
          <PermissionsQuerybar
            noExpanded
            onForm={form => {
              this.queryForm = form;
            }}
            actions={
              <>
                <TButton.Create size="small" onClick={this.createPermission}>
                  创建
                </TButton.Create>
              </>
            }
            footer={
              <>
                <TButton.Search
                  size="small"
                  confirmText="您确认要提交吗?"
                  onClick={() => {
                    console.log(this.queryForm.getFieldsValue());
                  }}
                >
                  查询
                </TButton.Search>
              </>
            }
          />

          <PermissionsList fetchList={this.fetchPermissions} className={styles.permissionsList} />
        </div>
      </div>
    );
  }
}

export default Index;
