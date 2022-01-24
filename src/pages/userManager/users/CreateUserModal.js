import React, { Component } from 'react';
import AlreadyPermissionCard from '@/pages/userManager/permissions/AlreadyPermissionCard';
import { FormRules as Rules, TItem, TSelect, ModalForm } from '@/components/tis_ui';
import { Input, Row, TreeSelect, Message, notification, Button } from 'antd';
import _ from 'lodash';
import { KERNEL } from '@/services/api';
import { configUsed } from '@/utils/constantEnum';
import { connect } from 'dva';

const { Option } = TSelect;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@connect(({ department, user, systemParamsConfig }) => ({
  departments: department.list,
  currentUser: user.currentUser,
  loginValidation: _.get(systemParamsConfig, 'systemConfig.loginValidation', configUsed.no),
}))
class CreateUserModal extends Component {
  createForm = React.createRef();

  state = {
    roles: [],
    roleViewPermission: [],
  };

  componentDidMount() {
    const { initialValues, dispatch } = this.props;
    const { roleIds } = initialValues || {};
    KERNEL.selectRolesUsingGET().then(res => {
      const roles = _.map(res, ({ id, roleName }) => ({ id, roleName }));
      this.setState({ roles });
    });
    dispatch({
      type: 'systemParamsConfig/fetchConfig',
      code: 'loginValidation',
    });
    if (roleIds) {
      this.onSelected(roleIds);
    }
  }

  list2treeNode(roots, group) {
    return _.map(roots, department => ({
      key: department.id,
      value: department.id,
      title: department.departmentName,
      data: department.roleId,
      children: this.list2treeNode(group[department.id], group),
    }));
  }

  createUser = () => {
    const { validateFields, setFieldsValue } = this.createForm.current;
    validateFields().then(({ confirmPassword, ...user }) => {
      if (user.password !== confirmPassword) {
        Message.error('两次密码输入不一致, 请重新输入!');
        setFieldsValue({ confirmPassword: '' });
        return;
      }
      console.log('user', user);
      KERNEL.addUserUsingPOST({ body: user }).then(() => {
        const { onSuccess } = this.props;
        this.cleanLast();
        onSuccess();
        notification.success({
          message: '成功创建',
        });
      });
    });
  };

  updateUser = id => {
    const { validateFields } = this.createForm.current;
    const { onSuccess } = this.props;
    validateFields().then(item => {
      KERNEL.updateUserUsingPOST({ body: { ...item, id } }).then(() => {
        this.cleanLast();
        onSuccess();
        notification.success({
          message: '操作成功',
        });
      });
    });
  };

  onSubmit = () => {
    const { initialValues } = this.props;
    const { id } = initialValues || {};
    // 有用户id则执行更新操作
    if (id) {
      this.updateUser(id);
    } else {
      this.createUser();
    }
  };

  cleanLast = () => {
    this.setState({
      alreadyViewPermission: [],
    });
  };

  onSelected = async ids => {
    if (ids.length < 1) {
      this.setState({ roleViewPermission: [] });
      return;
    }
    const res = await KERNEL.selectRolesDetailUsingGET({ params: { ids } });
    if (_.isArray(res)) {
      const viewPermissions = _.chain(res)
        .map(({ viewPermission }) => _.split(viewPermission, ','))
        .flatten()
        .uniq()
        .value();
      this.setState({ roleViewPermission: viewPermissions });
    }
  };

  render() {
    const { roleViewPermission, roles } = this.state;
    const {
      visible,
      doClose,
      departments,
      currentUser,
      initialValues,
      title,
      loginValidation,
    } = this.props;
    const { id } = initialValues || {};
    const group = _.groupBy(departments, 'parentDepartmentId');
    const treeNode = this.list2treeNode(
      group[currentUser.userType === 0 ? 0 : currentUser.parentDept],
      group,
    );
    return (
      <ModalForm
        title={title}
        initialValues={initialValues}
        visible={visible}
        onForm={form => {
          this.createForm = form;
        }}
        destroyOnClose
        width={950}
        // onOk={this.createUser}
        onCancel={() => {
          this.cleanLast();
          doClose();
        }}
        footer={
          <div>
            <Button
              onClick={() => {
                this.cleanLast();
                doClose();
              }}
            >
              取消
            </Button>
            <Button type="primary" onClick={this.onSubmit}>
              提交
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex' }}>
          <div style={{ position: 'relative', flex: 'auto' }}>
            <AlreadyPermissionCard
              preStyle={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                overflowY: 'scroll',
              }}
              viewPermissions={roleViewPermission}
              dataNodes={[]}
            />
          </div>
          <div style={{ width: '50%' }}>
            <Row>
              <TItem
                name="userName"
                label="用户登录名"
                rules={[Rules.required('用户名称必填')]}
                {...layout}
              >
                <Input disabled={!!id} />
              </TItem>
              <TItem
                name="name"
                label="用户姓名"
                rules={[Rules.required('用户名称必填')]}
                {...layout}
              >
                <Input />
              </TItem>
              <TItem
                label="所属部门"
                name="departmentId"
                rules={[Rules.required('用户必须属于一个部门')]}
                {...layout}
              >
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择您的部门"
                  allowClear
                  treeNodeFilterProp="title"
                  treeDefaultExpandAll
                  treeData={treeNode}
                  // onChange={this.onTreeNodeSelected}
                />
              </TItem>
              <TItem
                name="roleIds"
                label="用户角色"
                rules={[Rules.required('用户必须有对应角色')]}
                {...layout}
              >
                <TSelect mode="multiple" onChange={this.onSelected}>
                  {_.map(roles, ({ id: val, roleName }) => (
                    <Option key={val} value={val}>
                      {roleName}
                    </Option>
                  ))}
                </TSelect>
              </TItem>
              <TItem name="userId" label="身份证" {...layout}>
                <Input />
              </TItem>
              <TItem name="email" label="邮箱" rules={[Rules.email()]} {...layout}>
                <Input />
              </TItem>
              <TItem name="phone" label="移动电话" rules={[Rules.phone()]} {...layout}>
                <Input />
              </TItem>
              {!id && (
                <>
                  <TItem
                    name="password"
                    label="密码"
                    rules={[
                      Rules.required('密码必填'),
                      // eslint-disable-next-line eqeqeq
                      loginValidation == configUsed.yes && Rules.pwd(),
                    ]}
                    {...layout}
                  >
                    <Input type="password" />
                  </TItem>
                  <TItem
                    name="confirmPassword"
                    label="确认密码"
                    {...layout}
                    rules={[Rules.required('密码必填')]}
                  >
                    <Input type="password" />
                  </TItem>
                </>
              )}
            </Row>
          </div>
        </div>
      </ModalForm>
    );
  }
}

export default CreateUserModal;
