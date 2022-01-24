import React, { Component } from 'react';
import { ModalForm, TButton, TItem } from '@/components/tis_ui';
import { Button, Row, Input, message } from 'antd';
import { KERNEL } from '@/services/api';
import { pageStatus } from '@/utils/constantEnum';
import TreeTable from './tableTree';

class CreateRole extends Component {
  createForm = null;

  handelSubmit = async values => {
    const { handleCancel, initData, reload = () => {} } = this.props;
    const { id } = initData || {};
    const { viewPermissions } = values;
    // 如果有ID则走更新流程
    if (id) {
      const updateData = { ...values, viewPermissions: viewPermissions.join(','), id };
      await KERNEL.updateRoleUsingPOST({ body: updateData });
    } else {
      const postData = { ...values, viewPermissions: viewPermissions.join(',') };
      await KERNEL.addRoleUsingPOST({ body: postData });
    }
    message.success('提交成功');
    handleCancel();
    reload();
  };

  render() {
    const { handleCancel, initData, editVisible, pageStatus: status } = this.props;
    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible
        title={`角色${pageStatus.$v_names[status]}`}
        maskClosable={false}
        handleCancel={handleCancel}
        initialValues={initData}
        footer={
          <>
            <Button onClick={handleCancel}>取消</Button>
            {editVisible && (
              <TButton.Button
                type="primary"
                ghost={false}
                onClick={() => {
                  this.createForm.current.validateFields().then(vals => {
                    this.handelSubmit(vals);
                  });
                }}
              >
                提交
              </TButton.Button>
            )}
          </>
        }
      >
        <Row style={{ flex: 'auto', minWidth: 0 }}>
          <TItem
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: '角色名称不能为空!' }]}
          >
            <Input placeholder="请输入角色名称" />
          </TItem>

          <TItem
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="viewPermissions"
            label="权限配置"
            rules={[{ required: true, message: '权限不能为空!' }]}
          >
            <TreeTable />
          </TItem>
        </Row>
      </ModalForm>
    );
  }
}

export default CreateRole;
