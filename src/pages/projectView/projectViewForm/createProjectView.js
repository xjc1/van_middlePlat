import { Card, Form, Input, AutoComplete, Tooltip, Select } from 'antd';
import React, { useState } from 'react';
import router from '@/utils/tRouter';
import { confirmAble, TItem, RichText, TButton } from '@/components/tis_ui';
import AcceptDepartment from './acceptDepartment';
import { MutiDictIdCascaderTable, PortraitTagDrawerSelect } from '@/components/bussinessComponents';
import style from './index.less';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import ProjectCode from './projectCode';
import _ from 'lodash';
import { PROJECTOVERVIEWS } from '@/services/api';
import AddRelations from '../../scenes/editScenes/components/relations/AddRelations';
import { connect } from 'dva';
import { appUserType } from '@/utils/constantEnum';

const { Option } = AutoComplete;

const back2list = confirmAble({
  confirmText: '警告',
  confirmContent: '现在放弃会丢弃已经填写的内容, 确定需要放弃并返回到项目一览列表吗?',
  onClick: () => {
    router.replace('/content/policyKnowledgeLib/projectView');
  },
});

function back() {
  router.replace('/content/policyKnowledgeLib/projectView/');
}

function createProjectView({ isCheck, formData, title, dispatch }) {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [objectType, setObjectType] = useState(formData.objectType);

  function onValidateForm() {
    form.validateFields().then(resp => {
      resp.relatedPolicies =
        resp.relatedPolicies && resp.relatedPolicies.map(({ key }) => ({ id: key }));
      resp.personalPortraitTag =
        resp.personalPortraitTag && resp.personalPortraitTag.map(({ key }) => ({ tagId: key }));
      resp.legalPersonPortraitTag =
        resp.legalPersonPortraitTag &&
        resp.legalPersonPortraitTag.map(({ key }) => ({ tagId: key }));
      resp.id = formData.id;
      resp.classification =
        resp.classification && resp.classification.map(({ key }) => ({ id: key }));
      dispatch({
        type: formData.id ? 'projectView/editProjectView' : 'projectView/addProjectView',
        payload: resp,
      });
      router.replace('/content/policyKnowledgeLib/projectView');
    });
  }

  function onSelect(value) {
    const data = _.find(options, { code: value });
    if (data) {
      const { name, code } = data;
      form.setFieldsValue({
        name,
        code,
        mainCode: code && code.substring(0, 4),
        sonCode: code && code.substring(4, 7),
        grandsonCode: code && code.substring(7, 10),
        regionCode: code && 'QH' + code.substring(10, 16),
        otherCode: code && code.substring(16, 25),
      });
    }
  }

  function onSearch(value) {
    PROJECTOVERVIEWS.searchProjectOverviewUsingGET({ params: { name: value } }).then(
      (resp = []) => {
        setOptions(resp);
      },
    );
  }

  return (
    <div>
      <Card
        bordered
        title={
          <span>
            <span> {title} </span>
            <a style={{ float: 'right' }} onClick={isCheck ? back : back2list}>
              返回列表
            </a>
          </span>
        }
      >
        <Form
          form={form}
          initialValues={{
            ...formData,
            mainCode: formData.code && formData.code.substring(0, 4),
            sonCode: formData.code && formData.code.substring(4, 7),
            grandsonCode: formData.code && formData.code.substring(7, 10),
            regionCode: formData.code && `QH${formData.code.substring(10, 16)}`,
            otherCode: formData.code && formData.code.substring(16, 25),
            relatedPolicies: formData.policyDetail,
            personalPortraitTag:
              formData.personalPortraitTag &&
              formData.personalPortraitTag.map(({ tagId }) => tagId),
            legalPersonPortraitTag:
              formData.legalPersonPortraitTag &&
              formData.legalPersonPortraitTag.map(({ tagId }) => tagId),
          }}
        >
          <ProjectCode form={form} disabled={isCheck} />
          <TItem
            name="name"
            label="项目一览名称"
            rules={[{ required: true, message: '名称不能为空!' }]}
          >
            <AutoComplete onSelect={onSelect} onSearch={onSearch} disabled={isCheck}>
              {options.map(({ name, code }) => (
                <Option key={code} value={code}>
                  {name}_{code}
                </Option>
              ))}
            </AutoComplete>
          </TItem>
          <TItem name="support" label="支持方式">
            <RichText base64 readOnly={isCheck} />
          </TItem>
          <TItem name="condition" label="适用条件">
            <RichText base64 readOnly={isCheck} />
          </TItem>
          <TItem name="process" label="办理流程">
            <RichText base64 readOnly={isCheck} />
          </TItem>
          <TItem name="guide" label="申报指南">
            <Input disabled={isCheck} />
          </TItem>
          <TItem name="acceptDate" label="受理日期">
            <Input disabled={isCheck} />
          </TItem>
          <TItem name="objectType" label="对象类型">
            <Select
              disabled={isCheck}
              allowClear
              onChange={objectType => {
                if (objectType === appUserType.self) {
                  form.setFieldsValue({ legalPersonPortraitTag: undefined });
                } else if (objectType === appUserType.legalPerson) {
                  form.setFieldsValue({ personalPortraitTag: undefined });
                }
                setObjectType(objectType);
              }}
            >
              {_.map(appUserType, (key, value) => (
                <Select.Option key={key} value={key}>
                  {appUserType.$names[value]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
          <TItem name="personalPortraitTag" label="个人画像标签">
            <PortraitTagDrawerSelect
              type={appUserType.self}
              disabled={objectType === appUserType.legalPerson || isCheck}
            />
          </TItem>
          <TItem name="legalPersonPortraitTag" label="法人画像标签">
            <PortraitTagDrawerSelect
              type={appUserType.legalPerson}
              disabled={objectType === appUserType.self || isCheck}
            />
          </TItem>
          <TItem name="departments" label="受理部门">
            <AcceptDepartment form={form} disabled={isCheck} />
          </TItem>
          <TItem name="material" label="所需材料">
            <Input disabled={isCheck} />
          </TItem>
          <TItem name="servicesUrl" label="申报系统网址">
            <Input disabled={isCheck} />
          </TItem>
          <TItem name="relatedPolicies" label="政策依据">
            <AddRelations type="policyLibrary" tableTitle="政策名" disabled={isCheck} />
          </TItem>
          <TItem name="classification" labelCol={{ span: 24 }} wrapperCol={{ span: 0 }}>
            <MutiDictIdCascaderTable
              label="项目一览分类"
              name="classification"
              dict="XMYLNEW"
              disabled={isCheck}
            />
          </TItem>
          <div className={style.formBtnGroup}>
            <Tooltip placement="left" title="保存">
              <TButton.Button
                className={style.formBtnItem}
                type="primary"
                ghost={false}
                shape="circle"
                onClick={onValidateForm}
                style={{
                  marginRight: 0,
                  display: isCheck ? 'none' : 'block',
                }}
              >
                <CheckOutlined />
              </TButton.Button>
            </Tooltip>
            <Tooltip placement="left" title="返回">
              <TButton.Button
                className={style.formBtnItem}
                type="default"
                ghost={false}
                shape="circle"
                onClick={isCheck ? back : back2list}
                style={{ marginRight: 0 }}
              >
                <RollbackOutlined />
              </TButton.Button>
            </Tooltip>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default connect(({ projectView }) => projectView)(createProjectView);
