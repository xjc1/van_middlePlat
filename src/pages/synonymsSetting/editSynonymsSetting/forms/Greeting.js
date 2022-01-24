import React, { useState, useEffect } from 'react';
import { Typography, Tooltip, TimePicker, Input, Form, notification } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { TItem, FormRules, FormItemWithTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { qaSettingName, terminalType } from '@/utils/constantEnum';
import { SYNONYMCONFIG } from '@/services/api';
import { DictSelect, UploadImageUseFs } from '@/components/bussinessComponents';
import BtnGroup from '../components/BtnGroup';

const timeFormat = 'HH:mm:ss';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function TimeRangePicker({ value = [], onChange = EmptyFn, format, editAble, ...others }) {
  return (
    <TimePicker.RangePicker
      value={value.length > 0 && value.map(item => moment(item, format))}
      format={format}
      onChange={timeArr => {
        const times = timeArr || [];
        onChange(times.map(item => item.format(timeFormat)));
      }}
      renderExtraFooter={() => <p>时间格式为：时:分:秒</p>}
      {...others}
    />
  );
}

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
      title: '时间',
      dataIndex: 'time',
      width: '20%',
      render: time => {
        return time.join(' -- ');
      },
    },
    {
      title: '主欢迎语',
      dataIndex: 'mainContent',
      render: mainStr => (
        <Typography
          ellipsis={{
            rows: 2,
            ellipsis: true,
          }}
        >
          <Tooltip title={mainStr}>{mainStr}</Tooltip>
        </Typography>
      ),
    },
    {
      title: '副欢迎语',
      dataIndex: 'secondaryContent',
      render: subStr => (
        <Typography
          ellipsis={{
            rows: 2,
            ellipsis: true,
          }}
        >
          <Tooltip title={subStr}>{subStr}</Tooltip>
        </Typography>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    SYNONYMCONFIG.findOneSynonymConfigUsingGET(qaSettingName.GREETING, {
      params: {
        attributionDepartment: deptCode,
      },
    }).then(res => {
      const { content = [], editable = false } = res;
      const initVals = content.map((item, index) => {
        const { image, imageName, startTime, endTime } = item;
        return {
          ...item,
          image: [image, imageName],
          time: [startTime, endTime],
          key: index,
        };
      });
      form.setFieldsValue({ greeting: initVals, attributionDepartment: deptCode });
      setLoading(false);
      setRecordEditAble(editable);
    });
  }, [deptCode]);

  async function handleSubmit() {
    const vals = await form.validateFields();
    const { greeting = [] } = vals;
    const handledVals = greeting.map(item => {
      const { time = [], image = [] } = item;
      return {
        ...item,
        image: image[0],
        imageName: image[1],
        startTime: time[0],
        endTime: time[1],
      };
    });
    await SYNONYMCONFIG.updateSynonymConfigWelcomeUsingPOST({
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
            allowClear={false}
          />
        </TItem>
        <TItem name="greeting" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} label="欢迎语">
          <FormItemWithTable
            formInitialValue={initialValue}
            editAble={editAble && recordEditAble}
            deleteAble={deleteAble && recordEditAble}
            columns={columns}
            width="40%"
            title="添加欢迎语"
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
            <TItem name="time" label="时间" rules={[FormRules.required('必填')]} {...layout}>
              <TimeRangePicker format={timeFormat} />
            </TItem>
            <TItem
              name="mainContent"
              label="主欢迎语"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <Input />
            </TItem>
            <TItem name="secondaryContent" label="副欢迎语" {...layout}>
              <Input />
            </TItem>
            <TItem name="image" label="添加图片" {...layout}>
              <UploadImageUseFs />
            </TItem>
          </FormItemWithTable>
        </TItem>
      </Form>
      <BtnGroup editAble={editAble && recordEditAble} onCancel={finish} onOk={handleSubmit} />
    </>
  );
}

export default Greeting;
