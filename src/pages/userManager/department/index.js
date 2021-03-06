/* eslint-disable @typescript-eslint/camelcase */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Descriptions, Row, TreeSelect } from 'antd';
import { FormRules as Rules, ModalForm, TItem } from '@/components/tis_ui';
import layoutSytles from '@/layouts/PageLayout/layout.less';
import DepartmentTree from '@/pages/userManager/department/DepartmentTree';
import _ from 'lodash';
import img from './Department.svg';

@connect(({ department, user }) => ({
  ...department,
  currentUser: user.currentUser,
}))
class Index extends PureComponent {
  queryForm = null;

  departmentForm = null;

  state = {
    newDepartment: null,
    focusDepartment: null,
  };

  componentDidMount() {
    this.fetchAllDepartment({});
  }

  fetchAllDepartment() {
    const { dispatch } = this.props;
    dispatch({
      type: 'department/fetchList',
    });
  }

  createDepartment = (parentDepartmentId, parentDepartmentName) => {
    this.setState({
      newDepartment: {
        parentDepartmentId,
        parentDepartmentName,
      },
    });
  };

  listToTreeData = (roots, group) => {
    return _.map(roots, department => ({
      key: department.id,
      value: department.id,
      title: department.departmentName,
      children: this.listToTreeData(group[department.id], group),
    }));
  };

  render() {
    const { newDepartment, focusDepartment } = this.state;
    console.log('newDepartment => ', newDepartment);
    const { list, currentUser } = this.props;
    const group = _.groupBy(list, 'parentDepartmentId');
    const treeData = this.listToTreeData(
      group[currentUser.userType === 0 ? 0 : currentUser.dept.parentDepartmentId],
      group,
    );
    return (
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.treeLeftGrid}>
          {!_.isEmpty(list) ? (
            <DepartmentTree
              editAble
              onAddDepartment={this.createDepartment}
              onEditDepartment={data => this.setState({ newDepartment: data })}
              onEditRole={this.onEditRole}
              onSelected={selectedId => {
                const department = _.find(list, ({ id }) => id === selectedId);
                this.setState({
                  focusDepartment: department,
                });
              }}
            />
          ) : (
            <Button
              icon={<PlusOutlined />}
              style={{ top: '40%' }}
              shape="round"
              block
              size="large"
              onClick={() => this.createDepartment()}
            >
              ????????????
            </Button>
          )}
        </div>
        <div className={layoutSytles.rightGrid}>
          <div
            style={{
              height: '100%',
              padding: 10,
              background: 'white',
              border: '1px solid #e8e8e8',
            }}
          >
            {focusDepartment ? (
              <Descriptions title={focusDepartment.departmentName} bordered>
                <Descriptions.Item label="??????ID" span={2}>
                  {focusDepartment.id}
                </Descriptions.Item>
                <Descriptions.Item label="????????????" span={2}>
                  {focusDepartment.departNum}
                </Descriptions.Item>
                <Descriptions.Item label="????????????" span={4}>
                  {focusDepartment.description}
                </Descriptions.Item>
                <Descriptions.Item label="????????????" span={4}>
                  {focusDepartment.verticalMngDepartment}
                </Descriptions.Item>
                <Descriptions.Item label="????????????">
                  {focusDepartment.parentDepartmentName}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                }}
              >
                <img
                  style={{
                    display: 'block',
                    margin: 'auto',
                  }}
                  src={img}
                  alt="department"
                />
              </div>
            )}
          </div>
          {newDepartment && (
            <ModalForm
              onForm={form => {
                this.departmentForm = form;
              }}
              visible
              title={newDepartment.id ? '????????????' : '????????????'}
              destroyOnClose
              maskClosable={false}
              width={600}
              bodyStyle={{
                padding: '10px',
              }}
              onCancel={() => {
                this.setState({ newDepartment: null });
              }}
              initialValues={{
                ...newDepartment,
                parentDepartmentId:
                  newDepartment.parentDepartmentId &&
                  parseInt(newDepartment.parentDepartmentId, 10),
              }}
              onOk={() => {
                this.departmentForm.current.validateFields().then(vals => {
                  const { dispatch } = this.props;
                  dispatch({
                    type: newDepartment.id
                      ? 'department/editDepartment'
                      : 'department/addDepartment',
                    payload: {
                      ...newDepartment,
                      ...vals,
                    },
                  });
                  this.setState({ newDepartment: null });
                });
              }}
            >
              <Row>
                <TItem
                  name="departmentName"
                  label="????????????"
                  rules={[Rules.required('??????????????????')]}
                >
                  <Input />
                </TItem>
                <TItem
                  name="departNum"
                  label="????????????"
                  rules={[Rules.required('????????????????????????')]}
                >
                  <Input disabled={newDepartment.id} />
                </TItem>
                <TItem name="description" label="????????????">
                  <Input disabled={newDepartment.id} />
                </TItem>
                <TItem name="verticalMngDepartment" label="????????????">
                  <Input disabled={newDepartment.id} />
                </TItem>
                <TItem label="????????????" name="parentDepartmentId">
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="?????????????????????"
                    allowClear
                    treeNodeFilterProp="title"
                    treeDefaultExpandAll
                    treeData={treeData}
                    disabled={newDepartment.id}
                  />
                </TItem>
              </Row>
            </ModalForm>
          )}
        </div>
      </div>
    );
  }
}

export default Index;
