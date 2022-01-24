import React from 'react';
import _ from 'lodash';
import { Modal, Form, Row, Input, Alert, Select } from 'antd';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import { connect } from "dva";
import { subsystemsType } from "@/utils/constantEnum";

function SubPageEdit({ visible, systems = [], system = {}, page = {}, dispatch, onCancel = EmptyFn, ...others }) {
  const [formRef] = Form.useForm();

  return (
    <Modal title={`${page.id ? '编辑' : '创建'}子菜单`}
           visible
           width="40%"
           onCancel={onCancel}
           onOk={() => {
             formRef.validateFields().then((values) => {
               if (page.id) {
                 dispatch({
                   type: 'subsystem/updateMenu',
                   menu: {
                     id: page.id,
                     parentId: system.id,
                     status: system.status,
                     ...values,
                   },
                 }).then(onCancel);
               } else {
                 dispatch({
                   type: 'subsystem/createMenu',
                   menu: {
                     parentId: system.id,
                     ...values,
                   },
                 }).then(onCancel);
               }
             });
           }}
           {...others}>

      <Form form={formRef} initialValues={{
        type: subsystemsType.PAGE,
        ...page,
      }}>
        <Row>
          <TItem wrapperCol={12}>
            <Alert type="warning" message="一旦配置了子系统下的菜单, 子系统的路径将无效." />
          </TItem>
          <TItem name="menuId" label="子菜单标识"
                 rules={[FormRules.required('必选'),
                   FormRules.isExist(_.map(systems, ({ menuId }) => menuId).filter((menuId) => menuId !== system.menuId)), '系统ID不可重复'
                 ]}>
            <Input />
          </TItem>
          <TItem name="name" label="子菜单名称" rules={[FormRules.required('必选')]}>
            <Input />
          </TItem>
          <TItem name="type" label="子菜单类型" rules={[FormRules.required('必选')]}>
            <Select>
              {_.map(subsystemsType, (v, k) => (
                <Select.Option key={k} value={v}>
                  {subsystemsType.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
          <TItem name="url" label="子菜单URL" rules={[FormRules.required('必选')]}>
            <Input placeholder="请输入子菜单url" />
          </TItem>
        </Row>
      </Form>
    </Modal>
  );
}

export default connect(({ subsystem }) => subsystem)(SubPageEdit);
