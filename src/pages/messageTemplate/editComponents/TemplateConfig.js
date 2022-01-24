import React from 'react';
import _ from 'lodash';
import { Checkbox, Input, List, Typography, Row } from 'antd';
import AddObjectType from './AddObjectType';
import { FormRules, TabForm, TItem, TLink, TSelect } from '@/components/tis_ui';
import Styles from './index.less';
import { MessgeTypeConfig } from '@/components/bussinessComponents';
import { messageConfigType, messageContentType, messageSendType } from '@/utils/constantEnum';
import MessageConfigSelect from '@/pages/messageConfig/MessageConfigSelect';

const { Paragraph } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function objectTypeCheck() {
  const message = '全部转发仅能保留个人或法人一种对象类型';
  return {
    validator(__, value = []) {
      const sendAllItem = _.find(value, { sendAll: true });
      if (sendAllItem && value.length !== 1) {
        return Promise.reject(new Error(message));
      }
      return Promise.resolve();
    },
  };
}

const SEND_TYPE = _.chain(messageSendType)
  .omit('pullAndPush')
  .map((v, k) => {
    return {
      label: messageSendType.$names[k],
      value: v,
    };
  })
  .value();

function TemplateConfig(props) {
  const { disabled, fieldsList = [], formRef } = props;

  return (
    <TabForm.Tab {...props}>
      <div className={Styles.templateConfig}>
        <div className={Styles.templateConfigLeftPanel}>
          <div className={Styles.templateConfigPathPanel}>
            <h4 className={Styles.templateConfigTitle}>字段列表</h4>
            <List
              itemLayout="horizontal"
              dataSource={fieldsList}
              rowKey="path"
              renderItem={item => (
                <List.Item>
                  <Paragraph copyable>{item.path}</Paragraph>
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className={Styles.templateConfigRightPanel}>
          <Row>
            <TItem
              name="sendType"
              label="转发类型"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <Checkbox.Group options={SEND_TYPE} disabled={disabled} />
            </TItem>
            <TItem name="title" label="消息标题" rules={[FormRules.required('必填')]} {...layout}>
              <Input disabled={disabled} />
            </TItem>
            <TLink dependencies={['sendType']}>
              {({sendType=[]})=>{
                return (
                  <TItem name="msgType" label="消息分类" rules={[FormRules.required('必填')]} {...layout}>
                    <MessageConfigSelect key={_.join(sendType, '_')}
                     applicationScenario={sendType}
                     type={messageConfigType.classify} disabled={disabled} />
                  </TItem>
                )
              }

              }
              
            </TLink>
            <TItem
              name="objectType"
              label="对象类型"
              className="templateConfig-objectError"
              rules={[FormRules.required('必填'), objectTypeCheck()]}
              {...layout}
            >
              <AddObjectType disabled={disabled} fieldsList={fieldsList} />
            </TItem>
            <TItem
              name="uniqueCode"
              label="用户唯一标识"
              rules={[FormRules.required('必填')]}
              {...layout}
            >
              <TSelect disabled={disabled}>
                {_.map(fieldsList, ({ path }) => (
                  <TSelect.Option key={path} value={path}>
                    {path}
                  </TSelect.Option>
                ))}
              </TSelect>
            </TItem>
            <TItem name="contents" wrapperCol={{ span: 24 }}>
              <MessgeTypeConfig
                name="contents"
                label="终端类型"
                layout={layout}
                disabled={disabled}
                filterType={[messageContentType.message]}
                formRef={formRef}
              />
            </TItem>
          </Row>
        </div>
      </div>
    </TabForm.Tab>
  );
}

export default TemplateConfig;
