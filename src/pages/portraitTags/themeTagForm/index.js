/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'dva';
import { ModalForm, TItem } from '@/components/tis_ui';
import { Input } from 'antd';
import _ from 'lodash';
import { DictSelect } from '@/components/bussinessComponents';

function Index({ title = '添加主题标签', initialValues, disabled, close, dispatch }) {
  let themeForm = null;

  function handleSubmit() {
    const formValue = themeForm.current.getFieldsValue();
    dispatch({
      type: initialValues.id ? 'tagTheme/editTagTheme' : 'tagTheme/addTagTheme',
      payload: { ...formValue, id: initialValues.id },
    });
    close();
  }

  return (
    <ModalForm
      title={title}
      onForm={form => {
        themeForm = form;
      }}
      visible
      maskClosable={false}
      onOk={handleSubmit}
      onCancel={close}
      initialValues={{ ...initialValues }}
      width="50%"
    >
      <TItem name="name" label="主题名称">
        <Input placeholder="请输入" disabled={disabled} />
      </TItem>
      <TItem name="description" label="主题说明">
        <Input.TextArea rows={5} placeholder="请输入" disabled={disabled} />
      </TItem>
      <TItem name="collectionDepartment" label="采录部门">
        <DictSelect disabled dict="SHSSBMSH" />
      </TItem>
      <TItem name="createTime" label="创建时间">
        <Input disabled />
      </TItem>
    </ModalForm>
  );
}

export default connect(({ tagTheme }) => tagTheme)(Index);
