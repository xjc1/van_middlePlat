import React from 'react';
import { ModalForm, TButton, TItem } from '@/components/tis_ui';
import { Button, Row, Select, Input, Form } from 'antd';
import TagTable from './tagTable';
import { connect } from 'dva';
import _ from 'lodash';
import { appUserType } from '@/utils/constantEnum';

function ruleForm(props) {
  let [createForm] = Form.useForm();
  const { info = {}, dispatch, onClose, isCheck } = props;
  function saveData() {
    createForm.current.validateFields().then(vals => {
      dispatch({ type: 'ruleManage/editRule', payload: { ...vals, functionId: info.id } });
      onClose();
    });
  }

  return (
    <ModalForm
      onForm={form => {
        createForm = form;
      }}
      visible
      title={isCheck ? '查看规则' : '编辑规则'}
      okText="提交"
      cancelText="取消"
      maskClosable={false}
      handleCancel={onClose}
      initialValues={info}
      width="50%"
      footer={
        <>
          <Button onClick={onClose}>取消</Button>
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
          name="cname"
          label="规则名称"
          rules={[{ required: true, message: '规则名称不能为空!' }]}
        >
          <Input disabled={isCheck} />
        </TItem>
        <TItem name="type" label="规则对象">
          <Select allowClear disabled={isCheck || info.id}>
            {_.map(appUserType, (key, value) => (
              <Select.Option key={key} value={key}>
                {appUserType.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="description" label="判断逻辑描述">
          <Input.TextArea autoSize disabled={isCheck} />
        </TItem>

        <TItem name="portraitTags" label="关联标签">
          <TagTable />
        </TItem>
      </Row>
    </ModalForm>
  );
}
export default connect(({ ruleManage }) => ruleManage)(ruleForm);
