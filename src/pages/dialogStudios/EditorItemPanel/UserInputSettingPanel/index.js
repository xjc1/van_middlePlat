import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Form, Row, Input, Divider, Table, Space, Button, Col, Typography } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { TItem, EmptyFn } from '@/components/tis_ui';
import { connect } from 'dva';
import UserAsk from './userAsk';
import Styles from '../settingPanel.less';

const { Paragraph } = Typography;

function Index({
                 dispatch,
                 model,
                 onChange = EmptyFn,
                 allIntents,
                 allRules,
                 onTriggerMode = EmptyFn,
                 onEditIntent = EmptyFn,
                 onEditRule = EmptyFn,
               }) {
  const [intentObjs, setIntentObjs] = useState([]);
  const [ruleObjs, setRuleObjs] = useState([]);

  const [formRef] = Form.useForm();
  const { setting: formData } = model;

  const { intentIds, ruleIds } = formData;

  useEffect(() => {
    if (intentIds) {
      setIntentObjs(_.map(intentIds, id => {
        return _.find(allIntents, { id }) || { id };
      }));
    }
  }, [allIntents, intentIds]);

  useEffect(() => {
    if (ruleIds) {
      setRuleObjs(_.map(ruleIds, id => {
        return _.find(allRules, { id }) || { id, deleted: true, };
      }));
    }
  }, [allRules, ruleIds]);

  return (
    <div className={Styles.settingPanel}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <EditOutlined className={Styles.settingPanelIcon} />
          输入节点
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
          <Row>
            <TItem name="name" label="节点名称">
              <Input />
            </TItem>
            <TItem name="similarList" colon={false} wrapperCol={{ span: 24 }}>
              <UserAsk />
            </TItem>
          </Row>
          <Divider orientation="left">高级设置</Divider>
          <Row>
            <TItem label="触发方式" colon={false}>
              <Button icon={<PlusOutlined />}
                      type="link"
                      onClick={onTriggerMode}>选择</Button>
            </TItem>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                dataSource={intentObjs}
                locale={{
                  emptyText: (
                    <Paragraph className={Styles.settingPanelDescription}>
                      打开触发方式管理,从左侧意图列表中,点击选择, 将意图和本节点进行关联
                    </Paragraph>
                  ),
                }}
                bordered
                size="small"
                rowKey="id"
                columns={[
                  {
                    title: '意图名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '操作',
                    width: 120,
                    render(text, record) {
                      return (
                        <Space>
                          <Button
                            type="link"
                            onClick={() => {
                              onEditIntent(record);
                            }}
                          >
                            编辑
                          </Button>
                          <Button
                            type="link"
                            danger
                            onClick={() => {
                              dispatch({
                                type: 'dialogStudios/updateNodeIntent',
                                intent: _.filter(intentIds, (id) => {
                                  return id !== record.id;
                                }).map(({ id }) => id),
                              });
                            }}
                          >
                            删除
                          </Button>
                        </Space>
                      );
                    },
                  },
                ]}
              />
            </Col>

            <Col span={24}>
              <Table
                dataSource={ruleObjs}
                locale={{
                  emptyText: (
                    <Paragraph className={Styles.settingPanelDescription}>
                      打开触发方式管理,从左侧规则列表中,点击选择, 将规则和本节点进行关联
                    </Paragraph>
                  ),
                }}
                bordered
                size="small"
                rowKey="id"
                columns={[
                  {
                    title: '规则名称',
                    dataIndex: 'name',
                  },
                  {
                    title: '操作',
                    width: 120,
                    render(text, record) {
                      return (
                        <Space>
                          <Button
                            type="link"
                            onClick={() => {
                              onEditRule(record);
                            }}
                          >
                            编辑
                          </Button>
                          <Button
                            type="link"
                            danger
                            onClick={() => {
                              dispatch({
                                type: 'dialogStudios/updateNodeRule',
                                rules: _.filter(ruleIds, (id) => {
                                  return id !== record.id;
                                }).map(({ id }) => id),
                              });
                            }}
                          >
                            删除
                          </Button>
                        </Space>
                      );
                    },
                  },
                ]}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default connect(({ dialogStudios }) => {
  const { intents = [], rules = [] } = dialogStudios;
  return {
    allIntents: intents,
    allRules: rules,
  };
})(Index);
