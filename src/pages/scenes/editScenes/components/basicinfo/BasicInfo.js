import React, { useState } from 'react';
import _ from 'lodash';
import { Input, Select, Radio, Tooltip, Typography, InputNumber } from 'antd';
import {
  TItem,
  RichText,
  FormRules,
  UploadImage,
  FormItemWithTable,
  utils, TSelect,
} from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { commonObjectType, scenesCreationType } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import AddMatters from './AddMatters';
import AddSceneTag from './AddSceneTag';
import AddNextMatters from './AddNextMatters';
import AddThreeType from './AddThreeType';
import { adaptText } from "@/utils/AdaptiveHelper";

const { Base64 } = utils;
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BasicInfo(props) {
  const { sceneForm, disabled, sceneInfo = {} } = props;
  const { object } = sceneInfo;
  const [matters, setMatters] = useState(sceneForm.getFieldValue('matters') || []);
  const [objectType, setObjectType] = useState(object);

  function handleAddMatterWithDeparts(list) {
    const departs = sceneForm.getFieldValue('department') || [];
    const newMatters = _.differenceBy(list, matters, 'key');
    const getDeparts = newMatters.map(({ matterDepartment, matterDepartmentLabel }) => ({
      name: matterDepartment,
      label: matterDepartmentLabel,
      key: matterDepartment,
    }));
    const department = [...departs, ...getDeparts.filter(({ name }) => name)];
    setMatters(list);
    sceneForm.setFieldsValue({
      department,
    });
  }

  return (
    <>
      <TItem name="name" label={adaptText('主题名称')} rules={[FormRules.required('必填')]} {...layout}>
        <Input placeholder={`请输入主题${adaptText('主题名称')}`} disabled={disabled} />
      </TItem>
      <TItem name="sceneCode" label="主题编码" {...layout}>
        <Input placeholder="请输入主题编码" disabled={disabled} />
      </TItem>
      <TItem name="regions" label="行政区划" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          dict="SH00XZQH"
          dictType="tree"
          disabled={disabled}
          placeholder="请选择行政区划"
        />
      </TItem>
      <TItem name="clientType" label="终端类型" rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect
          dict="ZDLX"
          dictType="tree"
          multiple
          disabled={disabled}
          placeholder="请选择终端类型"
        />
      </TItem>
      <TItem name="sceneType" label={adaptText('主题类型')} rules={[FormRules.required('必填')]} {...layout}>
        <DictSelect dict="ZTLX" dictType="tree" disabled={disabled} placeholder={`请选择${adaptText('主题类型')}`} />
      </TItem>
      <TItem name="creationType" label="创建类型" {...layout}>
        <TSelect
          disabled={disabled}
          placeholder="请选择创建类型"
        >
          {_.map(scenesCreationType, (v, k) => (
            <Select.Option key={k} value={v} label={scenesCreationType.$names[k]}>
              {scenesCreationType.$names[k]}
            </Select.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="originalLinkNum" label="原环节数/个" {...layout}>
        <InputNumber style={{ width: '100%' }} disabled={disabled} min={0} />
      </TItem>
      <TItem name="currentLinkNum" label="现环节数/个" {...layout}>
        <InputNumber style={{ width: '100%' }} disabled={disabled} min={0} />
      </TItem>
      <TItem name="linkReduceRatio" label="环节减比" {...layout}>
        <Input disabled />
      </TItem>

      <TItem name="originalMaterialNum" label="原材料数/份" {...layout}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </TItem>

      <TItem name="currentMaterialNum" label="现材料数/份" {...layout}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </TItem>

      <TItem name="materialReduceRatio" label="材料减比" {...layout}>
        <Input disabled />
      </TItem>


      <TItem name="originalRunNum" label="原跑动数/次" {...layout}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </TItem>

      <TItem name="currentRunNum" label="现跑动数/次" {...layout}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </TItem>

      <TItem name="runReduceRatio" label="跑动减比" {...layout}>
        <Input disabled />
      </TItem>

      <TItem name="legalTimeLimit" label="法定时限/天" {...layout}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </TItem>
      <TItem name="currentTimeLimit" label="现时限/天" {...layout}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </TItem>

      <TItem name="timeReduceRatio" label="时限减比" {...layout}>
        <Input disabled />
      </TItem>

      <TItem name="category" label={adaptText('主题分类')} {...layout}>
        <Input disabled={disabled} placeholder={`请输入${adaptText('主题分类')}`} />
      </TItem>
      <TItem name="hidden" label="是否显示" {...layout}>
        <Radio.Group disabled={disabled}>
          <Radio value={0}>显示</Radio>
          <Radio value={1}>不显示</Radio>
        </Radio.Group>
      </TItem>
      <TItem name="tuningWord" label="调节词" {...layout}>
        <Input disabled={disabled} placeholder="请输入调节词" />
      </TItem>
      <TItem name="object" label="申报对象" rules={[FormRules.required('必填')]} {...layout}>
        <Select
          allowClear
          onChange={val => {
            setObjectType(val);
            sceneForm.setFieldsValue({ type: undefined });
          }}
          disabled={disabled}
          placeholder="请选择对象类型"
        >
          {_.map(commonObjectType, (value, key) => (
            <Option value={value} key={key}>
              {commonObjectType.$names[key]}
            </Option>
          ))}
        </Select>
      </TItem>

      <TItem name="matters" label="对应事项" rules={[FormRules.required('必填')]} {...layout}>
        <AddMatters disabled={disabled} onChange={list => handleAddMatterWithDeparts(list)} />
      </TItem>
      <TItem
        label="发布部门"
        name="publishDepartment"
        rules={[FormRules.required('必填')]}
        {...layout}
      >
        <DepartmentTreeSelect disabled={disabled} />
      </TItem>
      <TItem
        name="attributionDepartment"
        label="归属部门"
        tip="字典: SHGSBMSH"
        rules={[{ required: true, message: '归属部门必填' }]}
        {...layout}
      >
        <DictSelect
          disabled={disabled}
          dict="SHGSBMSH"
          dictType="tree"
          showSearch
          multiple
          treeNodeFilterProp="title"
        />
      </TItem>
      <TItem name="recommendTag" hidden label="推荐标签" {...layout}>
        <DictSelect dict="FWTJ001" mode="multiple" disabled />
      </TItem>
      <TItem name="sceneTag" label={adaptText('主题标签')} {...layout}>
        <AddSceneTag disabled={disabled} />
      </TItem>
      <TItem name="type" label="三级分类" {...layout}>
        <AddThreeType disabled={disabled} key={objectType} object={objectType} />
      </TItem>
      <TItem name="image" label="背景图片" {...layout}>
        <UploadImage disabled={disabled} allowClear />
      </TItem>
      <TItem name="memo" label="备注" {...layout}>
        <Input disabled={disabled} placeholder="请输入备注" />
      </TItem>
      <TItem name="dourl" label="办理系统地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入办理系统地址" />
      </TItem>
      <TItem name="joint" label="联合办事指南" {...layout}>
        <Input disabled={disabled} placeholder="请输入联合办事指南" />
      </TItem>
      <TItem name="fileimg" label="流程图地址" {...layout}>
        <Input disabled={disabled} placeholder="请输入流程图地址" />
      </TItem>
      <TItem name="institutionCategory" label="机构分类" {...layout}>
        <DictSelect dict="JGFL" />
      </TItem>
      <TItem name="windows" label="窗口地址" {...layout}>
        <FormItemWithTable
          disabled={disabled}
          title="新增窗口信息"
          columns={[
            {
              title: '窗口地址',
              dataIndex: 'address',
              width: '20%',
              render: address => {
                const addr = Base64.decodeBase64(address);
                return (
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 2,
                      ellipsis: true,
                    }}
                  >
                    <Tooltip title={addr} overlayStyle={{ maxWidth: 600 }}>
                      {addr}
                    </Tooltip>
                  </Typography.Paragraph>
                );
              },
            },
            {
              title: '地图',
              dataIndex: 'map',
              width: '20%',
              ellipsis: true,
              render: map => (
                <Tooltip title={map} placement="topLeft">
                  {map}
                </Tooltip>
              ),
            },
            {
              title: '经度',
              dataIndex: 'longitude',
              ellipsis: true,
              render: longitude => (
                <Tooltip title={longitude} placement="topLeft">
                  {longitude}
                </Tooltip>
              ),
            },
            {
              title: '纬度',
              dataIndex: 'latitude',
              ellipsis: true,
              render: latitude => (
                <Tooltip title={latitude} placement="topLeft">
                  {latitude}
                </Tooltip>
              ),
            },
            {
              title: '办理地址',
              dataIndex: 'applyLocation',
              render: applyLocation => {
                return (
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 2,
                      ellipsis: true,
                    }}
                  >
                    <Tooltip title={applyLocation} overlayStyle={{ maxWidth: 600 }}>
                      {applyLocation}
                    </Tooltip>
                  </Typography.Paragraph>
                );
              },
            },
            {
              title: '行政区划',
              dataIndex: 'regions',
              render: region => region && region.label,
            },
            {
              title: '电话号码',
              dataIndex: 'phone',
            },
          ]}
        >
          <TItem name="address" label="地址" rules={[FormRules.required()]}>
            <RichText
              base64
              placeholder={`
办理地点：XX市XX路XX号，乘坐X路公交车在行政服务中心站下车，步行XX米即到
办理窗口：XX市XX路XX号政务服务中心一楼1号综合窗口
办理时间：周一至周五 上午8:30--12:00，下午14:30--17:30（夏季下午15:30-18:00）（法定节假日除外）
咨询电话：XXX-XXXXXXXX
            `}
            />
          </TItem>
          <TItem name="map" label="地图">
            <Input />
          </TItem>
          <TItem name="longitude" label="经度">
            <Input />
          </TItem>
          <TItem name="latitude" label="纬度">
            <Input />
          </TItem>
          <TItem name="applyLocation" label="办理地址">
            <Input />
          </TItem>
          <TItem name="regions" label="行政区划">
            <DictSelect dict="SH00XZQH" labelInValue dictType="tree" />
          </TItem>
          <TItem name="phone" label="联系电话">
            <Input />
          </TItem>
        </FormItemWithTable>
      </TItem>
      <TItem name="phone" label="咨询电话" {...layout}>
        <FormItemWithTable
          disabled={disabled}
          title="新增咨询电话"
          columns={[
            {
              title: '咨询电话',
              dataIndex: 'phone',
            },
          ]}
        >
          <TItem name="phone" label="咨询电话" rules={[FormRules.required('必填')]}>
            <Input />
          </TItem>
        </FormItemWithTable>
      </TItem>
      <TItem name="preSceneWord" label="主题前一句话" {...layout}>
        <RichText base64 readOnly={disabled} />
      </TItem>
      <TItem name="finishHint" label="申报完成提示" {...layout}>
        <RichText base64 readOnly={disabled} />
      </TItem>
      <TItem name="nextMatter" label="后续事项" {...layout}>
        <AddNextMatters disabled={disabled} />
      </TItem>
    </>
  );
}

export default BasicInfo;
