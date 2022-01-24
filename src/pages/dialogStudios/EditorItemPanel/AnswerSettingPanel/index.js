import React from 'react';
import { BulbOutlined } from '@ant-design/icons';
import { EmptyFn, RichText, TItem, TLink } from '@/components/tis_ui';
import { Form, Select, Divider, Input } from 'antd';
import _ from 'lodash';
import ReferenceKnowledge from './ReferenceKnowledge';
import Styles from '../settingPanel.less';
import { qaAnswerSource, qaAnswerSourceContent } from '@/utils/constantEnum';
import { DictSelect } from "@/components/bussinessComponents";

const { Option } = Select;

function Index({ model, onChange = EmptyFn }) {
  const [formRef] = Form.useForm();
  const { setting: formData } = model;

  return (
    <div className={Styles.settingPanel}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <BulbOutlined className={Styles.settingPanelIcon} />
          答案节点
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <Form
          form={formRef}
          initialValues={formData}
          onValuesChange={(vals, allVals) => {
            onChange(allVals);
          }}
        >
          <TItem name="name" label="节点名称">
            <Input />
          </TItem>
          <TItem name="type" label="答案来源">
            <Select>
              {_.map(qaAnswerSource, (v, k) => (
                <Option key={k} value={v}>
                  {qaAnswerSource.$names[k]}
                </Option>
              ))}
            </Select>
          </TItem>
          <Form.Item dependencies={['type']} noStyle>
            {({ getFieldValue }) => {
              const type = getFieldValue('type');
              if (type === qaAnswerSource.Knowledge) {
                return (
                  <>
                    <Divider orientation="left">知识引用配置</Divider>
                    <TItem name="knowledge" wrapperCol={{ span: 24 }}>
                      <ReferenceKnowledge />
                    </TItem>
                  </>
                );
              }
              if (type === qaAnswerSource.RichText) {
                return (
                  <>
                    <Divider orientation="left">自定义回复配置</Divider>
                    <div style={{ padding: 10 }}>
                      <TItem
                        name="rickText"
                        label="回复内容"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                      >
                        <RichText base64 contentStyle={{ height: 500 }} />
                      </TItem>
                    </div>
                  </>
                );
              }
              if (type === qaAnswerSource.Service) {
                return (
                  <>
                    <Divider orientation="left">服务调用配置</Divider>
                    <div style={{ padding: 10 }}>
                      <TItem
                        name="source"
                        label="来源"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                      >
                        <Select>
                          <Select.Option value={ qaAnswerSourceContent.server }>服务</Select.Option>
                          <Select.Option value={ qaAnswerSourceContent.url }>链接</Select.Option>
                        </Select>
                      </TItem>
                      <TLink dependencies={['source']}>
                        {
                          ({ source }) => {
                            if(source === qaAnswerSourceContent.server) {
                              return <TItem
                                name="code"
                                label="服务名称"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                              >
                                <DictSelect dict="DLFWDY" />
                              </TItem>
                            }
                            if(source === qaAnswerSourceContent.url){
                              return <TItem
                                name="url"
                                label="URL"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                              >
                                <Input placeholder="请输入URL" />
                              </TItem>
                            }
                            return null;
                          }
                        }
                      </TLink>
                    </div>
                  </>
                );
              }
              return null;
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Index;
