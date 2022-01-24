import React, { useState, useEffect } from 'react';
import { Select, Form, notification, InputNumber } from 'antd';
import _ from 'lodash';
import { TItem, FormRules, FormItemWithTable } from '@/components/tis_ui';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

import EmptyFn from '@/utils/EmptyFn';
import { qaSettingName, terminalType, commonYesNo } from '@/utils/constantEnum';
import { SYNONYMCONFIG } from '@/services/api';
import { DictSelect } from '@/components/bussinessComponents';
import BtnGroup from '../components/BtnGroup';

const keyGenerator = new IDGenerator('voice_item');

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function Greeting(props) {
  const { finish = EmptyFn, editAble, deleteAble, attributionDepartment } = props;
  const [loading, setLoading] = useState(false);
  // editAble,deleteAble为权限树控制的编辑权限， recordEditAble为后端返回的数据权限
  const [recordEditAble, setRecordEditAble] = useState(false);
  const [deptCode, setDeptCode] = useState(attributionDepartment);
  const [form] = Form.useForm();

  const initialValue = {
    clientType: [terminalType.pc],
  };

  const columns = [
    {
      title: '终端类型',
      dataIndex: 'clientType',
      width: '30%',
      render: (types = []) => _.map(types, type => terminalType.$v_names[type]).join(),
    },
    {
      title: '录音时长(秒)',
      dataIndex: 'limit',
    },
    {
      title: '对话框是否展示文字',
      dataIndex: 'displayText',
      render: displayText => commonYesNo.$v_names[displayText] || displayText,
    },
  ];

  useEffect(() => {
    setLoading(true);
    SYNONYMCONFIG.findOneSynonymConfigUsingGET(qaSettingName.VOICE, {
      params: {
        attributionDepartment: deptCode,
      },
    }).then(res => {
      const { content = [], editable = false } = res;
      form.setFieldsValue({
        voice: content.map(item => ({
          ...item,
          key: keyGenerator.next(),
        })),
        attributionDepartment: deptCode,
      });
      setLoading(false);
      setRecordEditAble(editable);
    });
  }, [deptCode]);

  async function handleSubmit() {
    const { voice } = await form.validateFields();
    await SYNONYMCONFIG.updateSynonymConfigVoiceUsingPOST({
      body: { content: voice, attributionDepartment: deptCode },
    });
    finish();
    notification.success({
      message: '保存成功',
    });
  }

  return (
    <>
      <Form form={form}>
        <TItem
          name="attributionDepartment"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          label="归属部门"
          tip="选择归属部门可查看编辑对应部门的数据"
        >
          <DictSelect
            onChange={val => {
              setDeptCode(val);
            }}
            dict="SHGSBMSH"
            dictType="tree"
            treeNodeFilterProp="title"
            allowClear={false}
          />
        </TItem>
        <TItem name="voice" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} label="欢迎语">
          <FormItemWithTable
            formInitialValue={initialValue}
            editAble={editAble && recordEditAble}
            deleteAble={deleteAble && recordEditAble}
            columns={columns}
            width="40%"
            title="语音设置"
            loading={loading}
          >
            <TItem
              name="clientType"
              label="终端类型"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <DictSelect dict="ZDLX" dictType="tree" multiple />
            </TItem>
            <TItem
              name="limit"
              label="录音限制时长(秒)"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <InputNumber min={1} />
            </TItem>
            <TItem
              name="displayText"
              label="对话框是否展示文字"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <Select showArrow>
                {_.map(commonYesNo, (key, value) => (
                  <Select.Option key={key} value={key}>
                    {commonYesNo.$names[value]}
                  </Select.Option>
                ))}
              </Select>
            </TItem>
          </FormItemWithTable>
        </TItem>
      </Form>
      <BtnGroup editAble={editAble && recordEditAble} onCancel={finish} onOk={handleSubmit} />
    </>
  );
}

export default Greeting;
