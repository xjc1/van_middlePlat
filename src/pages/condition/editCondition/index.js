import React from 'react';
import { Input, Select, notification } from 'antd';
import _ from 'lodash';
import { ModalForm, TItem, FormRules } from '@/components/tis_ui';
import { conditionType, conditionObject } from '@/utils/constantEnum';
import EmptyFn from '@/utils/EmptyFn';
import { CONDITION } from '@/services/api';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function EditCondition({ info, readOnly = false, fetchList = EmptyFn, complete = EmptyFn }) {
  let editForm = null;

  const initialValues = info || {};

  function handleSubmit() {
    editForm.current.validateFields().then(vals => {
      if (info) {
        updateCondition({ id: info.id, ...vals });
      } else {
        createCondition(vals);
      }
    });
  }

  async function createCondition(body) {
    await CONDITION.createConditionUsingPOST({ body });
    complete();
    fetchList({});
    notification.success({
      message: '成功新增条件',
    });
  }

  async function updateCondition(body) {
    await CONDITION.updateConditionUsingPOST({ body });
    complete();
    fetchList({});
    notification.success({
      message: '成功修改条件',
    });
  }

  return (
    <ModalForm
      title={info ? '编辑条件' : '新增条件'}
      onForm={form => {
        editForm = form;
      }}
      visible
      maskClosable={false}
      onOk={handleSubmit}
      okText={info ? '保存' : '提交'}
      handleCancel={complete}
      initialValues={initialValues}
      hideRequiredMark={readOnly}
    >
      <TItem name="name" label="条件名称" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={readOnly} />
      </TItem>
      <TItem name="description" label="条件描述" {...layout}>
        <Input disabled={readOnly} />
      </TItem>
      <TItem name="type" label="条件类型" {...layout}>
        <Select allowClear disabled={readOnly}>
          {_.map(conditionType, (v, k) => (
            <Option value={v} key={k}>
              {conditionType.$names[k]}
            </Option>
          ))}
        </Select>
      </TItem>
      <TItem name="object" label="对象类型" {...layout}>
        <Select allowClear disabled={readOnly}>
          {_.map(conditionObject, (v, k) => (
            <Option value={v} key={k}>
              {conditionObject.$names[k]}
            </Option>
          ))}
        </Select>
      </TItem>
    </ModalForm>
  );
}

export default EditCondition;
