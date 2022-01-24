import React, { useState, useEffect } from 'react';
import { Avatar, notification, Form } from 'antd';
import {
  TItem,
  InputMultiTable,
  FormItemWithTable,
  FormRules,
} from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { qaSettingName, terminalType } from '@/utils/constantEnum';
import { SYNONYMCONFIG } from '@/services/api';
import { DictSelect, EmoticonSelector, UploadImageUseFs } from '@/components/bussinessComponents';
import _ from 'lodash';
import { InputSwitch } from './NoAnswer';
import BtnGroup from '../components/BtnGroup';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const renderSentence = (sentences = []) => {
  const [sentence = {}] = sentences;
  return sentence.value;
};

const renderImg = (imgInfo = []) => {
  const [imgSrc] = imgInfo;
  return <Avatar src={imgSrc} shape="square" size="large" />;
};

function Satisfaction(props) {
  const { finish = EmptyFn, editAble, deleteAble, attributionDepartment } = props;
  const [loading, setLoading] = useState(false);
  // editAble,deleteAble为权限树控制的编辑权限， recordEditAble为后端返回的数据权限
  const [recordEditAble, setRecordEditAble] = useState(false);
  const [deptCode, setDeptCode] = useState(attributionDepartment);
  const [form] = Form.useForm();

  const formInitialValue = {
    clientType: [terminalType.pc],
    enable: false,
  };

  const columns = [
    {
      title: '终端类型',
      dataIndex: 'clientType',
      width: '20%',
      render: (types = []) => _.map(types, type => terminalType.$v_names[type]).join(),
    },
    {
      title: '满意内容',
      dataIndex: 'satisfied',
      width: '20%',
      ellipsis: true,
      render: renderSentence,
    },
    {
      title: '满意图片',
      dataIndex: 'satisfiedImg',
      render: renderImg,
    },
    {
      title: '不满意内容',
      dataIndex: 'dissatisfied',
      width: '20%',
      ellipsis: true,
      render: renderSentence,
    },
    {
      title: '不满意图片',
      dataIndex: 'dissatisfiedImg',
      render: renderImg,
    },
  ];

  useEffect(() => {
    setLoading(true);
    SYNONYMCONFIG.findOneSynonymConfigUsingGET(qaSettingName.SATISFACTION, {
      params: {
        attributionDepartment: deptCode,
      },
    }).then(res => {
      const { content = [], editable = false } = res;
      const initFormValue = _.map(content, (setting, key) => {
        const { satisfactionContent = {}, notSatisfactionContent = {}, clientType = [] } = setting;
        const satisfied = satisfactionContent.content || [];
        const dissatisfied = notSatisfactionContent.content || [];
        const enable = notSatisfactionContent.enable || 0;
        return {
          key,
          clientType,
          satisfied: satisfied.map((item, index) => ({ key: index, value: item.name })),
          satisfiedImg: [satisfactionContent.image, satisfactionContent.imageName],
          satisfiedExpression: satisfactionContent.expression,
          dissatisfied: dissatisfied.map((item, index) => ({ key: index, value: item.name })),
          dissatisfiedImg: [notSatisfactionContent.image, notSatisfactionContent.imageName],
          dissatisfiedExpression: notSatisfactionContent.expression,
          enable: enable === 1,
        };
      });
      form.setFieldsValue({ satisfaction: initFormValue, attributionDepartment: deptCode });
      setRecordEditAble(editable);
      setLoading(false);
    });
  }, [deptCode]);

  async function handleSubmit() {
    const vals = await form.validateFields();
    const { satisfaction = [] } = vals;
    const handledVals = _.map(satisfaction, val => {
      const {
        clientType = [],
        satisfied = [],
        satisfiedImg = [],
        satisfiedExpression,
        dissatisfied = [],
        dissatisfiedImg = [],
        dissatisfiedExpression,
        enable,
      } = val;

      return {
        clientType,
        satisfactionContent: {
          content: satisfied.map(({ value }) => ({ name: value })),
          image: satisfiedImg[0],
          imageName: satisfiedImg[1],
          expression: satisfiedExpression,
        },
        notSatisfactionContent: {
          content: dissatisfied.map(({ value }) => ({ name: value })),
          image: dissatisfiedImg[0],
          imageName: dissatisfiedImg[1],
          expression: dissatisfiedExpression,
          enable: enable ? 1 : 0,
        },
      };
    });

    await SYNONYMCONFIG.updateSynonymConfigSimpleUsingPOST({
      body: { content: handledVals, attributionDepartment: deptCode },
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
          />
        </TItem>
        <TItem name="satisfaction" label="满意度" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <FormItemWithTable
            width="50%"
            title="添加满意度"
            formInitialValue={formInitialValue}
            columns={columns}
            loading={loading}
            editAble={editAble && recordEditAble}
            deleteAble={deleteAble && recordEditAble}
          >
            <TItem
              name="satisfied"
              label="满意内容"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <InputMultiTable title="内容" loading={loading} />
            </TItem>
            <TItem name="satisfiedImg" label="满意添加图片" {...layout} style={{ marginBottom: 0 }}>
              <UploadImageUseFs />
            </TItem>
            <TItem name="satisfiedExpression" label="满意添加表情" {...layout}>
              <EmoticonSelector multiple={false} />
            </TItem>
            <TItem
              name="dissatisfied"
              label="不满意内容"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <InputMultiTable title="内容" loading={loading} />
            </TItem>
            <TItem
              name="dissatisfiedImg"
              label="不满意添加图片"
              {...layout}
              style={{ marginBottom: 0 }}
            >
              <UploadImageUseFs />
            </TItem>
            <TItem name="dissatisfiedExpression" label="不满意添加表情" {...layout}>
              <EmoticonSelector multiple={false} />
            </TItem>
            <TItem name="enable" label="人工客服" {...layout}>
              <InputSwitch />
            </TItem>
            <TItem
              name="clientType"
              label="终端类型"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <DictSelect dict="ZDLX" dictType="tree" multiple />
            </TItem>
          </FormItemWithTable>
        </TItem>
      </Form>
      <BtnGroup onCancel={finish} onOk={handleSubmit} editAble={editAble && recordEditAble} />
    </>
  );
}

export default Satisfaction;
