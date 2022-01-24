import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Switch, Input, notification } from 'antd';
import { TItem, InputMultiTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { qaSettingName } from '@/utils/constantEnum';
import { SYNONYMCONFIG } from '@/services/api';
import { DictSelect, EmoticonSelector } from '@/components/bussinessComponents';
import BtnGroup from '../components/BtnGroup';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export function InputSwitch({ value = false, onChange = EmptyFn, disabled = false }) {
  return (
    <Row>
      <Col span={20}>
        <Input disabled value="人工客服能力" />
      </Col>
      <Col span={4} style={{ textAlign: 'right' }}>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={value}
          disabled={disabled}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
}

function NoAnswer(props) {
  const { finish = EmptyFn, editAble, deleteAble, attributionDepartment } = props;
  const [loading, setLoading] = useState(false);
  // editAble,deleteAble为权限树控制的编辑权限， recordEditAble为后端返回的数据权限
  const [recordEditAble, setRecordEditAble] = useState(false);
  const [deptCode, setDeptCode] = useState(attributionDepartment);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    SYNONYMCONFIG.findOneSynonymConfigUsingGET(qaSettingName.NOANSWER, {
      params: {
        attributionDepartment: deptCode,
      },
    }).then(res => {
      const { content = {}, editable } = res;
      const { content: value = [], enable, expression } = content;
      form.setFieldsValue({
        content: value.map((item, index) => ({ key: index, value: item.name })),
        enable: enable === 1,
        attributionDepartment: deptCode,
        expression,
      });
      setLoading(false);
      setRecordEditAble(editable);
    });
  }, [deptCode]);

  function handleSubmit() {
    form.validateFields().then(vals => {
      const { content = [], expression, enable } = vals;
      SYNONYMCONFIG.updateSynonymConfigNoAnswerUsingPOST({
        body: {
          content: content.map(item => ({ name: item.value })),
          enable: enable ? 1 : 0,
          attributionDepartment: deptCode,
          expression,
        },
      }).then(() => {
        finish();
        notification.success({
          message: '保存成功',
        });
      });
    });
  }

  return (
    <>
      <Form form={form} style={{ width: '100%' }}>
        <TItem
          name="attributionDepartment"
          tip="选择归属部门可查看编辑对应部门的数据"
          label="归属部门"
          {...layout}
        >
          <DictSelect
            onChange={val => {
              setDeptCode(val);
            }}
            dict="SHGSBMSH"
            dictType="tree"
            treeNodeFilterProp="title"
          />
        </TItem>
        <TItem name="content" label="回复内容" {...layout}>
          <InputMultiTable
            editAble={editAble && recordEditAble}
            deleteAble={deleteAble && recordEditAble}
            title="内容"
            loading={loading}
          />
        </TItem>
        <TItem name="expression" label="回复表情" {...layout}>
          <EmoticonSelector multiple={false} />
        </TItem>
        <TItem name="enable" label="人工客服" {...layout}>
          <InputSwitch disabled={!editAble} />
        </TItem>
      </Form>
      <BtnGroup onCancel={finish} onOk={handleSubmit} editAble={editAble && recordEditAble} />
    </>
  );
}

export default NoAnswer;
