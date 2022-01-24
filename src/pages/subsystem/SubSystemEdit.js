import React from 'react';
import _ from 'lodash';
import { Modal, Form, Row, Input, TreeSelect, Select } from 'antd';
import { EmptyFn, FormRules, TItem } from '@/components/tis_ui';
import { connect } from "dva";
import { validMenus, rNames } from './utils';
import { subsystemsType } from "@/utils/constantEnum";

function SubSystemEdit({ visible, systems = [], system = {}, dispatch, onCancel = EmptyFn, ...others }) {
  const [formRef] = Form.useForm();

  return (
    <Modal title={`${system.id ? '编辑' : '创建'}新子系统`}
           visible
           width="40%"
           onCancel={onCancel}
           onOk={() => {
             formRef.validateFields().then((values) => {
               if (system.id) {
                 dispatch({
                   type: 'subsystem/updateMenu',
                   menu: {
                     id: system.id,
                     status: system.status,
                     ...values,
                   },
                 }).then(onCancel);
               } else {
                 dispatch({
                   type: 'subsystem/createMenu',
                   menu: values,
                 }).then(onCancel);
               }
             });
           }}
           {...others}>
      <Form form={formRef} initialValues={{
        type: subsystemsType.PAGE,
        ...system,
      }}>
        <Row>
          <TItem name="menuId" label="系统唯一ID"
                 rules={[FormRules.required('必选'),
                   FormRules.isExist([...rNames,
                       ..._.map(systems, ({ menuId }) => menuId).filter((menuId) => menuId !== system.menuId)],
                     '系统ID不可重复')
                 ]}>
            <Input />
          </TItem>
          <TItem name="name" label="系统名称" rules={[FormRules.required('必选')]}>
            <Input placeholder="系统名称也会作为菜单显示" />
          </TItem>
          <TItem name="type" label="子系统类型" rules={[FormRules.required('必选')]}>
            <Select>
              {_.map(subsystemsType, (v, k) => (
                <Select.Option key={k} value={v}>
                  {subsystemsType.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
          <TItem name="url" label="子系统URL" rules={[FormRules.required('必选')]}>
            <Input placeholder="请输入子系统url" />
          </TItem>
          <TItem name="position" label="菜单位置" tip="选择相邻上方菜单" rules={[FormRules.required('必选')]}>
            <TreeSelect type="tree" treeLine treeData={validMenus} style={{ width: '100%' }} />
          </TItem>
        </Row>
      </Form>
    </Modal>
  );
}

export default connect(({ subsystem }) => subsystem)(SubSystemEdit);
