/* eslint-disable no-param-reassign */
import { connect } from 'dva';
import { Button, Input, Row, Select, Form } from 'antd';
import { ModalForm, TButton, TItem } from '@/components/tis_ui';
import _ from 'lodash';
import React from 'react';
import { commonYesNo, appUserType } from '@/utils/constantEnum';
import { DictSelect } from '@/components/bussinessComponents';
import InputWithTable from './inputWithTable';
import Base64 from '@/utils/Base64';

function index({ isCheck = false, onCancel, formData = {}, dispatch, defaultDeptCodes }) {
  let [form] = Form.useForm();

  function saveData() {
    form.current.validateFields().then(vals => {
      vals.keyWord = vals.keyWord.map(({ name }) => name);
      vals.conflictWord = vals.conflictWord.map(({ name }) => name);
      vals.content = vals.content ? Base64.base64(vals.content) : vals.content;
      dispatch({
        type: formData.id ? 'triggerWords/updateTrigger' : 'triggerWords/createTrigger',
        payload: { ...formData, ...vals },
      });
      onCancel();
    });
  }

  return (
    <ModalForm
      onForm={onForm => {
        form = onForm;
      }}
      visible
      title={formData.id ? '编辑触发词' : '新增触发词'}
      okText="提交"
      cancelText="取消"
      maskClosable={false}
      handleCancel={onCancel}
      initialValues={{
        // 新增的时候给默认归属部门
        attributionDepartment: formData.id ? undefined : [defaultDeptCodes],
        ...formData,
        content: formData.content ? Base64.decodeBase64(formData.content) : '',
      }}
      footer={
        <>
          <Button onClick={onCancel}>取消</Button>
          {!isCheck && (
            <TButton.Button type="primary" ghost={false} onClick={saveData}>
              提交
            </TButton.Button>
          )}
        </>
      }
    >
      <Row style={{ flex: 'auto', minWidth: 0 }}>
        <TItem
          name="description"
          label="触发词描述"
          rules={[{ required: true, message: '触发词描述不能为空!' }]}
        >
          <Input disabled={isCheck} />
        </TItem>
        <TItem name="keyWord" label="关键词">
          <InputWithTable isCheck={isCheck} />
        </TItem>
        <TItem name="conflictWord" label="冲突词">
          <InputWithTable isCheck={isCheck} />
        </TItem>
        <TItem name="wordLimit" label="字数扩展限制">
          <Input disabled={isCheck} />
        </TItem>
        <TItem name="content" label="前端展示模板">
          <Input.TextArea rows={5} disabled={isCheck} />
        </TItem>
        <TItem
          name="type"
          label="触发词类型"
          rules={[{ required: true, message: '触发词类型不能为空!' }]}
          tip="字典：CFCLX"
        >
          <DictSelect
            dict="CFCLX"
            leafOnly
            name="objectType"
            dictType="tree"
            disabled={isCheck}
            style={{ width: '100%' }}
          />
        </TItem>
        <TItem
          name="objectType"
          label="对象类型"
          rules={[{ required: true, message: '对象类型不能为空!' }]}
        >
          <Select disabled={isCheck} allowClear>
            {_.map(appUserType, (key, value) => (
              <Select.Option key={key} value={key}>
                {appUserType.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="tourist" label="是否游客">
          <Select disabled={isCheck} allowClear>
            {_.map(commonYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" showArrow disabled={isCheck} multiple />
        </TItem>
        <TItem name="regions" label="行政区划" tip="字典：SH00XZQH">
          <DictSelect
            dict="SH00XZQH"
            name="regions"
            dictType="tree"
            disabled={isCheck}
            style={{ width: '100%' }}
          />
        </TItem>

        <TItem
          name="attributionDepartment"
          label="归属部门"
          tip="字典: SHGSBMSH"
          rules={[{ required: true, message: '归属部门必填' }]}
        >
          <DictSelect
            disabled={isCheck}
            dict="SHGSBMSH"
            dictType="tree"
            showSearch
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>
      </Row>
    </ModalForm>
  );
}

export default connect(({ triggerWords, user }) => ({
  ...triggerWords,
  defaultDeptCodes: _.get(user, 'currentUser.dept.departNum'),
}))(index);
