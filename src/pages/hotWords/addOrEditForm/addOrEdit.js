import React, { Component } from 'react';
import { ModalForm, TButton, TItem } from '@/components/tis_ui';
import { Button, Row, Select } from 'antd';
import { connect } from 'dva';
import { userType } from '@/utils/constantEnum';
import _ from 'lodash';
import AddHotWords from './AddHotWords';
import { DictSelect } from '@/components/bussinessComponents';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

@connect(({ hotWords, user }) => ({
  ...hotWords,
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class addOrEditHotWords extends Component {
  createForm = null;

  saveData = () => {
    const { hotWords, info } = this.props;
    this.createForm.current.validateFields().then(vals => {
      const nextValue = {
        ...vals,
        objectType: String(vals.objectType),
        words: _.map(hotWords, item => item.name),
      };
      const { dispatch } = this.props;
      if (info.id) {
        dispatch({ type: 'hotWords/editHotWords', payload: { ...nextValue, id: info.id } });
      } else {
        dispatch({ type: 'hotWords/add', payload: vals });
      }
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotWords/cancel',
      payload: false,
    });
  };

  render() {
    const { openModal, check, info, deptCode } = this.props;
    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible={openModal}
        title="热词维护"
        okText="确认"
        cancelText="取消"
        maskClosable={false}
        handleCancel={this.handleCancel}
        initialValues={{
          attributionDepartment: info.id ? info.attributionDepartment : [deptCode],
          ...info,
          objectType: info.objectType && Number(info.objectType),
        }}
        footer={
          <>
            <Button onClick={this.handleCancel}>取消</Button>
            {!check && (
              <TButton.Button type="primary" ghost={false} onClick={this.saveData}>
                提交
              </TButton.Button>
            )}
          </>
        }
      >
        <Row style={{ flex: 'auto', minWidth: 0 }}>
          <TItem
            name="objectType"
            label="对象类型"
            {...layout}
            rules={[{ required: true, message: '对象类型不能为空!' }]}
          >
            <Select allowClear disabled={check} onChange={this.changeUserType}>
              {_.map(userType, (value, key) => (
                <Select.Option key={key} value={value}>
                  {userType.$names[key]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
          <TItem
            name="attributionDepartment"
            label="归属部门"
            rules={[{ required: true, message: '归属部门必填' }]}
          >
            <DictSelect
              dict="SHGSBMSH"
              disabled={check}
              dictType="tree"
              showSearch
              multiple
              treeNodeFilterProp="title"
            />
          </TItem>
          <TItem name="clientType" label="终端类型" {...layout}>
            <DictSelect dict="ZDLX" dictType="tree" multiple disabled={check} />
          </TItem>
        </Row>

        <AddHotWords />
      </ModalForm>
    );
  }
}

export default addOrEditHotWords;
