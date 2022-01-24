import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Form, InputNumber, message } from 'antd';
import { TItem, FormRules, TButton, FormCard } from '@/components/tis_ui';
import PageTabLayout from '@/pages/messageConfig/MessageTabs';
import { BulbOutlined } from '@ant-design/icons';
import Styles from './index.less';
import { MESSAGECONFIGS, MESSAGES } from '@/services/api';
import { messageConfigType } from '@/utils/constantEnum';

function OtherConfig() {
  const [content, setContent] = useState();
  const [formRef] = Form.useForm();

  const fetchOptions = () => {
    MESSAGECONFIGS.getAllMessageConfigUsingPOST({
      body: { type: messageConfigType.historyConfig },
    }).then((nextContent = []) => {
      setContent(nextContent);
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const saveConfig = () => {
    formRef.validateFields().then(async fields => {
      await MESSAGECONFIGS.updateMessageConfigsUsingPOST({
        body: _.map(content, ({ code, ...ohters }) => {
          return {
            ...ohters,
            code,
            value: String(fields[code]),
          };
        }),
      });
      message.success('保存成功');
    });
  };

  return (
    <PageTabLayout curPath="messageConfig_otherConfig">
      <div className={Styles.otherConfig}>
        {content && (
          <Form
            initialValues={_.reduce(
              content,
              (result, { code, value }) => {
                // eslint-disable-next-line no-param-reassign
                result[code] = value;
                return result;
              },
              {},
            )}
            form={formRef}
          >
            <FormCard title="历史数据">
              <TItem
                name="MSG_EXPIRE_TIME"
                label="消息列表最多保留 (天)"
                rules={[FormRules.required('必填')]}
              >
                <InputNumber />
              </TItem>
              <TItem
                name="NOTE_EXPIRE_TIME"
                label="提醒列表最多保留 (天)"
                rules={[FormRules.required('必填')]}
              >
                <InputNumber />
              </TItem>
            </FormCard>
          </Form>
        )}
        <div className={Styles.otherConfigBtnBar}>
          <TButton.Save onClick={saveConfig}>保存</TButton.Save>
        </div>
      </div>
      <div className={Styles.otherConfig}>
        <FormCard title="消息&提醒">
          <TButton.Button
            icon={<BulbOutlined />}
            style={{ margin: '0 auto' }}
            type="primary"
            confirmText="警告"
            confirmContent="该操作需运行一段时间，请稍等"
            onClick={() => {
              MESSAGES.generateMessageUsingPOST().then(() => {
                message.success('消息立即生效执行中');
              });
            }}
          >
            立即生效
          </TButton.Button>
        </FormCard>
      </div>
    </PageTabLayout>
  );
}

export default OtherConfig;
