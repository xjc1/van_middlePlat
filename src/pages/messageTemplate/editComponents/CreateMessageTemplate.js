import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Button, message, notification } from 'antd';
import router from '@/utils/tRouter';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';
import JsonPath from './JsonPath';
import { TabForm } from '@/components/tis_ui';
import BaseInfo from './BaseInfo';
import TemplateConfig from './TemplateConfig';
import { MESSAGEMODULES } from '@/services/api';
import MessgeTypeConfig from '@/components/bussinessComponents/messgeTypeConfig';
import { policyUpDownStatus } from '@/utils/constantEnum';
import RelativeInfo from './RelativeInfo';

function transportData(vals) {
  const {
    editHistory,
    sendType = [],
    contents = [],
    status = policyUpDownStatus.down,
    ...others
  } = vals;
  const [first = 0, second = 0] = sendType;
  return {
    ...others,
    status,
    sendType: first + second,
    contents: _.chain(contents)
      .filter(Boolean)
      .map(MessgeTypeConfig.transformData)
      .value(),
  };
}

class Index extends PureComponent {
  form = null;

  state = {
    fieldsList: [],
  };

  constructor() {
    super();
    this.onScanJson = this.onScanJson.bind(this);
  }

  componentDidMount() {
    try {
      this.onScanJson();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addMessageTemplate = async body => {
    await MESSAGEMODULES.createMessageModuleUsingPOST({ body });
    notification.success({
      message: '创建成功',
    });
    router.push('messageTemplate');
  };

  updateMessageTemplate = async body => {
    await MESSAGEMODULES.updateMessageModuleUsingPOST({ body });
    notification.success({
      message: '更新成功',
    });
  };

  formValuesChange = val => {
    const {sendType} = val;
    if(!_.isUndefined(sendType)){
      this.form.setFieldsValue({
        msgType: undefined,
      });
    }
  }

  handleSubmit = () => {
    const { initialValues } = this.props;
    const { id } = initialValues || {};
    this.form.validateFields().then(vals => {
      const body = transportData(vals);
      if (id) {
        this.updateMessageTemplate({ ...body, id });
      } else {
        this.addMessageTemplate(body);
      }
    });
  };

  onScanJson(errMsg) {
    const fields = this.form.getFieldValue('source');
    try {
      const fieldObj = JSON.parse(fields);
      const fieldsList = JsonPath(fieldObj);
      this.setState({ fieldsList });
    } catch (e) {
      // eslint-disable-next-line no-unused-expressions
      errMsg && message.error(errMsg);
    }
  }

  render() {
    const { initialValues = {}, disabled = false, title = '新建网上办事指引' } = this.props;
    const { fieldsList = [] } = this.state;
    return (
      <TabForm
        initialValues={initialValues}
        onValuesChange={this.formValuesChange}
        preserve={false}
        defaultTabKey="baseInfo"
        title={title}
        onForm={formRef => {
          this.form = formRef;
        }}
        btnOption={{
          okText: initialValues ? '保存项目信息' : '提交',
          okIcon: initialValues ? <SaveOutlined /> : <CheckOutlined />,
          onOk: this.handleSubmit,
          disabled,
        }}
        extra={
          <>
            <Button type="link" onClick={() => router.goBack()}>
              返回列表
            </Button>
          </>
        }
      >
        <BaseInfo
          tabKey="baseInfo"
          title="基本信息"
          setPortraitType={nextPortraitType => this.setPortraitType(nextPortraitType)}
          disabled={disabled}
          onScanJson={this.onScanJson}
          fieldsList={fieldsList}
        />
        <TemplateConfig
          tabKey="templateConfig"
          title="模版配置"
          setPortraitType={nextPortraitType => this.setPortraitType(nextPortraitType)}
          disabled={disabled}
          fieldsList={fieldsList}
          formRef={this.form}
        />
        <RelativeInfo tabKey="relativeInfo" title="相关信息" />
      </TabForm>
    );
  }
}

export default Index;
