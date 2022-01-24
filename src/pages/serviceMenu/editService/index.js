import React, { useState } from 'react';
import { Card, Form, Input, Select, notification } from 'antd';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import router from '@/utils/tRouter';
import _ from 'lodash';
import { TItem, TButton, UploadImage, FormRules, RichText, TSelect } from '@/components/tis_ui';
import {
  DictSelect,
  TSearchSelector,
  PortraitTagDrawerSelect,
  MutiDictIdCascaderTable,
} from '@/components/bussinessComponents';
import { terminalType, sourceType, appUserType, commonApplicationType } from '@/utils/constantEnum';
import { CONVENIENCE } from '@/services/api';
import { objectDict } from '@/constants';
import getDictType from '@/utils/threeTypeByObject';
import FormBtnGp from '../components/FormBtnGp';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const format = (data = [], key, itemKey) =>
  data.map(item => {
    if (itemKey) {
      return { [key]: item[itemKey] };
    }
    return { [key]: item };
  });

const formatByKey = (data = []) => data.map(({ key }) => ({ id: key }));

function Index(props) {
  const { serviceInfo, disabled } = props;
  const { objectType = objectDict.person } = serviceInfo || {};
  const [object, setObject] = useState(objectType);
  const [form] = Form.useForm();

  const initialValues = serviceInfo || {
    clientType: [terminalType.pc],
    objectType: objectDict.person,
  };

  function handleSubmit() {
    form
      .validateFields()
      .then(vals => {
        const {
          relationMatchMatters = [],
          relationMatchScene = [],
          relationMatchPolicy = [],
          relationMatchProject = [],
          threeType = [],
          occupationTag = [],
          currencyTag = [],
          myServices = [],
          recommendTag = [],
          personalPortraitTag = [],
          legalPersonPortraitTag = [],
        } = vals;

        const serviceData = {
          ...vals,
          relationMatchMatters: format(relationMatchMatters, 'aid', 'key'),
          relationMatchScene: format(relationMatchScene, 'aid', 'key'),
          relationMatchPolicy: format(relationMatchPolicy, 'aid', 'key'),
          relationMatchProject: format(relationMatchProject, 'aid', 'key'),
          threeType: formatByKey(threeType),
          occupationTag: formatByKey(occupationTag),
          currencyTag: formatByKey(currencyTag),
          myServices: formatByKey(myServices),
          recommendTag: format(recommendTag, 'code'),
          personalPortraitTag: format(personalPortraitTag, 'tagId', 'key'),
          legalPersonPortraitTag: format(legalPersonPortraitTag, 'tagId', 'key'),
          deleteflag: 0,
        };

        let data;
        if (serviceInfo) {
          data = { ...serviceInfo, ...serviceData };
          updateConvenience(data);
        } else {
          data = serviceData;
          createConvenience(data);
        }
      })
      .catch(err => {
        if (err.errorFields && err.errorFields.length) {
          const firstErrField = err.errorFields[0].name[0];
          form.scrollToField(firstErrField);
          notification.error({
            message: '请检查所有必填项是否填完',
          });
        }
      });
  }

  async function createConvenience(body = {}) {
    await CONVENIENCE.addConvenienceUsingPOST({ body });
    notification.success({
      message: '成功新增服务',
    });
    form.resetFields();
    router.replace({ name: 'service' });
  }

  async function updateConvenience(body = {}) {
    await CONVENIENCE.updateConvenienceUsingPOST({ body });
    notification.success({
      message: '成功更新服务',
    });
  }
  const onChangeObject = objType => {
    setObject(objType);
    form.setFieldsValue({ threeType: undefined });
    if (objType === objectDict.person) {
      form.setFieldsValue({
        legalPersonPortraitTag: undefined,
      });
    }
    if (objType === objectDict.legalPerson) {
      form.setFieldsValue({
        personalPortraitTag: undefined,
      });
    }
  };

  return (
    <Card
      title={serviceInfo ? '编辑便民服务信息' : '新增便民服务'}
      extra={
        <TButton.Button
          type="link"
          ghost={false}
          onClick={() => router.replace({ name: 'service' })}
        >
          返回便民服务列表
        </TButton.Button>
      }
    >
      <Form
        form={form}
        scrollToFirstError
        initialValues={initialValues}
        hideRequiredMark={disabled}
      >
        <TItem name="name" label="服务名称" rules={[FormRules.required('必填')]} {...layout}>
          <Input placeholder="请输入服务名称" disabled={disabled} />
        </TItem>
        <TItem name="code" label="服务编号" {...layout}>
          <Input placeholder="请输入服务编号" disabled={disabled} />
        </TItem>
        <TItem name="objectType" label="对象类型" rules={[FormRules.required('必填')]} {...layout}>
          <DictSelect
            onChange={val => {
              onChangeObject(val);
            }}
            dict="DXLX0001"
            placeholder="请选择对象类型"
            dictType="tree"
            disabled={disabled}
          />
        </TItem>
        <TItem name="phone" label="咨询电话" {...layout}>
          <Input placeholder="请输入咨询电话" disabled={disabled} />
        </TItem>
        <TItem label="服务内容" name="content" {...layout}>
          <RichText base64 readOnly={disabled} />
        </TItem>
        <TItem name="servicesUrl" label="服务网址" rules={[FormRules.required('必填')]} {...layout}>
          <Input placeholder="请输入服务网址" disabled={disabled} />
        </TItem>
        <TItem name="browseNumber" label="浏览数" {...layout}>
          <Input disabled />
        </TItem>
        <TItem name="tuningWord" label="调节词" {...layout}>
          <Input placeholder="请输入调节词" disabled={disabled} />
        </TItem>
        <TItem name="no" label="排序编号" {...layout}>
          <Input type="number" min={1} placeholder="请输入排序编号" disabled={disabled} />
        </TItem>
        <TItem name="relationMatchMatters" label="关联事项" {...layout}>
          <TSearchSelector type="matter" disabled={disabled} />
        </TItem>
        <TItem name="relationMatchScene" label="关联主题" {...layout}>
          <TSearchSelector type="scene" disabled={disabled} />
        </TItem>
        <TItem name="relationMatchPolicy" label="关联政策" {...layout}>
          <TSearchSelector type="policyLibrary" disabled={disabled} />
        </TItem>
        <TItem name="relationMatchProject" label="关联项目" {...layout}>
          <TSearchSelector type="project" disabled={disabled} />
        </TItem>
        <TItem name="recommendTag" label="推荐标签" hidden {...layout}>
          <DictSelect dict="FWTJ001" mode="multiple" placeholder="请选择推荐标签" disabled />
        </TItem>
        <TItem name="personalPortraitTag" label="个人画像标签" {...layout}>
          <PortraitTagDrawerSelect
            type={appUserType.self}
            disabled={object === objectDict.legalPerson || disabled}
          />
        </TItem>
        <TItem name="legalPersonPortraitTag" label="法人画像标签" {...layout}>
          <PortraitTagDrawerSelect
            type={appUserType.legalPerson}
            disabled={object === objectDict.person || disabled}
          />
        </TItem>
        <TItem name="clientType" label="终端类型" {...layout}>
          <DictSelect
            dict="ZDLX"
            dictType="tree"
            multiple
            placeholder="请选择终端类型"
            disabled={disabled}
          />
        </TItem>
        <TItem name="appType" label="应用类型" {...layout}>
          <TSelect disabled={disabled} mode="multiple" allowClear>
            {_.map(commonApplicationType, (v, k) => (
              <TSelect.Option key={k} value={v}>
                {commonApplicationType.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="threeType" {...layout}>
          <MutiDictIdCascaderTable
            name="threeType"
            label="三级分类"
            dict={getDictType(object)}
            showSearch
            disabled={disabled}
            key={object}
          />
        </TItem>
        <TItem name="currencyTag" {...layout}>
          <MutiDictIdCascaderTable
            label="通用行业标签"
            name="currencyTag"
            dict="TYHY1000"
            showSearch
            disabled={disabled}
          />
        </TItem>
        <TItem name="occupationTag" {...layout}>
          <MutiDictIdCascaderTable
            label="职业人群标签"
            name="occupationTag"
            dict="ZYRQ0001"
            showSearch
            disabled={disabled}
          />
        </TItem>
        <TItem name="regions" label="行政区划" {...layout}>
          <DictSelect
            dict="SH00XZQH"
            dictType="tree"
            placeholder="请选择行政区划"
            disabled={disabled}
          />
        </TItem>
        <TItem name="executor" label="实施部门" {...layout}>
          <DictSelect dict="SHSSBMSH" placeholder="请选择实施部门" disabled={disabled} />
        </TItem>

        <TItem name="source" label="来源渠道" {...layout}>
          <DictSelect dict="LYQD0001" placeholder="请选择来源渠道" disabled={disabled} />
        </TItem>
        <TItem name="myServices" {...layout}>
          <MutiDictIdCascaderTable
            label="服务类型"
            name="myServices"
            dict={['BMFW1000', 'FRFWLX1000']}
            showSearch
            disabled={disabled}
          />
        </TItem>
        <TItem name="sourceType" label="来源方式" {...layout}>
          <Select disabled={disabled} allowClear>
            {_.map(sourceType.$v_names, (value, key) => (
              <Option value={key} key={key}>
                {value}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem name="pictture" label="上传图标" {...layout}>
          <UploadImage allowClear imgStyle={{ background: '#ccc' }} disabled={disabled} />
        </TItem>
        <TItem name="pictureUrl" label="图标地址" {...layout}>
          <Input allowClear disabled={disabled} />
        </TItem>
        <TItem name="attributionDepartment" label="归属部门" tip="字典: SHGSBMSH" {...layout}>
          <DictSelect
            disabled={disabled}
            dict="SHGSBMSH"
            dictType="tree"
            showSearch
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>
      </Form>
      <FormBtnGp
        disabled={disabled}
        onOk={handleSubmit}
        okIcon={serviceInfo ? <SaveOutlined /> : <CheckOutlined />}
        okText={serviceInfo ? '保存服务信息' : '提交服务信息'}
        cancelText="返回上一页"
      />
    </Card>
  );
}

export default Index;
