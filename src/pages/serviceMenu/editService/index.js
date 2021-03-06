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
            message: '????????????????????????????????????',
          });
        }
      });
  }

  async function createConvenience(body = {}) {
    await CONVENIENCE.addConvenienceUsingPOST({ body });
    notification.success({
      message: '??????????????????',
    });
    form.resetFields();
    router.replace({ name: 'service' });
  }

  async function updateConvenience(body = {}) {
    await CONVENIENCE.updateConvenienceUsingPOST({ body });
    notification.success({
      message: '??????????????????',
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
      title={serviceInfo ? '????????????????????????' : '??????????????????'}
      extra={
        <TButton.Button
          type="link"
          ghost={false}
          onClick={() => router.replace({ name: 'service' })}
        >
          ????????????????????????
        </TButton.Button>
      }
    >
      <Form
        form={form}
        scrollToFirstError
        initialValues={initialValues}
        hideRequiredMark={disabled}
      >
        <TItem name="name" label="????????????" rules={[FormRules.required('??????')]} {...layout}>
          <Input placeholder="?????????????????????" disabled={disabled} />
        </TItem>
        <TItem name="code" label="????????????" {...layout}>
          <Input placeholder="?????????????????????" disabled={disabled} />
        </TItem>
        <TItem name="objectType" label="????????????" rules={[FormRules.required('??????')]} {...layout}>
          <DictSelect
            onChange={val => {
              onChangeObject(val);
            }}
            dict="DXLX0001"
            placeholder="?????????????????????"
            dictType="tree"
            disabled={disabled}
          />
        </TItem>
        <TItem name="phone" label="????????????" {...layout}>
          <Input placeholder="?????????????????????" disabled={disabled} />
        </TItem>
        <TItem label="????????????" name="content" {...layout}>
          <RichText base64 readOnly={disabled} />
        </TItem>
        <TItem name="servicesUrl" label="????????????" rules={[FormRules.required('??????')]} {...layout}>
          <Input placeholder="?????????????????????" disabled={disabled} />
        </TItem>
        <TItem name="browseNumber" label="?????????" {...layout}>
          <Input disabled />
        </TItem>
        <TItem name="tuningWord" label="?????????" {...layout}>
          <Input placeholder="??????????????????" disabled={disabled} />
        </TItem>
        <TItem name="no" label="????????????" {...layout}>
          <Input type="number" min={1} placeholder="?????????????????????" disabled={disabled} />
        </TItem>
        <TItem name="relationMatchMatters" label="????????????" {...layout}>
          <TSearchSelector type="matter" disabled={disabled} />
        </TItem>
        <TItem name="relationMatchScene" label="????????????" {...layout}>
          <TSearchSelector type="scene" disabled={disabled} />
        </TItem>
        <TItem name="relationMatchPolicy" label="????????????" {...layout}>
          <TSearchSelector type="policyLibrary" disabled={disabled} />
        </TItem>
        <TItem name="relationMatchProject" label="????????????" {...layout}>
          <TSearchSelector type="project" disabled={disabled} />
        </TItem>
        <TItem name="recommendTag" label="????????????" hidden {...layout}>
          <DictSelect dict="FWTJ001" mode="multiple" placeholder="?????????????????????" disabled />
        </TItem>
        <TItem name="personalPortraitTag" label="??????????????????" {...layout}>
          <PortraitTagDrawerSelect
            type={appUserType.self}
            disabled={object === objectDict.legalPerson || disabled}
          />
        </TItem>
        <TItem name="legalPersonPortraitTag" label="??????????????????" {...layout}>
          <PortraitTagDrawerSelect
            type={appUserType.legalPerson}
            disabled={object === objectDict.person || disabled}
          />
        </TItem>
        <TItem name="clientType" label="????????????" {...layout}>
          <DictSelect
            dict="ZDLX"
            dictType="tree"
            multiple
            placeholder="?????????????????????"
            disabled={disabled}
          />
        </TItem>
        <TItem name="appType" label="????????????" {...layout}>
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
            label="????????????"
            dict={getDictType(object)}
            showSearch
            disabled={disabled}
            key={object}
          />
        </TItem>
        <TItem name="currencyTag" {...layout}>
          <MutiDictIdCascaderTable
            label="??????????????????"
            name="currencyTag"
            dict="TYHY1000"
            showSearch
            disabled={disabled}
          />
        </TItem>
        <TItem name="occupationTag" {...layout}>
          <MutiDictIdCascaderTable
            label="??????????????????"
            name="occupationTag"
            dict="ZYRQ0001"
            showSearch
            disabled={disabled}
          />
        </TItem>
        <TItem name="regions" label="????????????" {...layout}>
          <DictSelect
            dict="SH00XZQH"
            dictType="tree"
            placeholder="?????????????????????"
            disabled={disabled}
          />
        </TItem>
        <TItem name="executor" label="????????????" {...layout}>
          <DictSelect dict="SHSSBMSH" placeholder="?????????????????????" disabled={disabled} />
        </TItem>

        <TItem name="source" label="????????????" {...layout}>
          <DictSelect dict="LYQD0001" placeholder="?????????????????????" disabled={disabled} />
        </TItem>
        <TItem name="myServices" {...layout}>
          <MutiDictIdCascaderTable
            label="????????????"
            name="myServices"
            dict={['BMFW1000', 'FRFWLX1000']}
            showSearch
            disabled={disabled}
          />
        </TItem>
        <TItem name="sourceType" label="????????????" {...layout}>
          <Select disabled={disabled} allowClear>
            {_.map(sourceType.$v_names, (value, key) => (
              <Option value={key} key={key}>
                {value}
              </Option>
            ))}
          </Select>
        </TItem>
        <TItem name="pictture" label="????????????" {...layout}>
          <UploadImage allowClear imgStyle={{ background: '#ccc' }} disabled={disabled} />
        </TItem>
        <TItem name="pictureUrl" label="????????????" {...layout}>
          <Input allowClear disabled={disabled} />
        </TItem>
        <TItem name="attributionDepartment" label="????????????" tip="??????: SHGSBMSH" {...layout}>
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
        okText={serviceInfo ? '??????????????????' : '??????????????????'}
        cancelText="???????????????"
      />
    </Card>
  );
}

export default Index;
