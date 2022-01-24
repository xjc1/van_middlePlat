import React, { useState } from 'react';
import { List, Button, Tabs, Card } from 'antd';
import { TItem, RichText } from '@/components/tis_ui';
import { connect } from 'dva';
import { EmoticonSelector } from '@/components/bussinessComponents';

const { TabPane } = Tabs;

const bodyStyle = {
  position: 'absolute',
  top: '105px',
  bottom: '0px',
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
};

function AnswerBlock({ formData = {}, check = false, dispatch }) {
  const { answer = [], richAnswer = [] } = formData;
  const [tab, setTab] = useState('richText');

  function addRichAnswer() {
    dispatch({
      type: 'chatLibrary/addRichText',
    });
  }

  function deleteText(key) {
    dispatch({
      type: 'chatLibrary/deleteText',
      deleteKey: key,
    });
  }

  function deleteRichText(key) {
    dispatch({
      type: 'chatLibrary/deleteRichText',
      deleteKey: key,
    });
  }

  const tabList = [
    {
      key: 'richText',
      tab: '富文本',
    },
    {
      key: 'text',
      tab: '纯文本',
    },
    {
      key: 'emoticon',
      tab: '表情',
    },
  ];

  return (
    <>
      <Card
        title="答案配置"
        tabList={tabList}
        bodyStyle={bodyStyle}
        extra={
          tab === 'richText' && (
            <Button disabled={check} onClick={addRichAnswer} type="primary">
              添加答案
            </Button>
          )
        }
        onTabChange={key => {
          setTab(key);
        }}
        activeTabKey={tab}
      >
        <Tabs activeKey={tab} renderTabBar={() => <div />}>
          <TabPane key="richText">
            {richAnswer.map(({ key }) => (
              <div key={key}>
                <TItem
                  key={key}
                  name={['richAnswer', key]}
                  labelCol={{ span: 0 }}
                  wrapperCol={{ span: 24 }}
                >
                  <RichText readOnly={check} />
                </TItem>
                <TItem>
                  {richAnswer.length > 1 && (
                    <Button
                      onClick={() => deleteRichText(key)}
                      style={{ left: '65%', color: 'red' }}
                      disabled={check}
                    >
                      删除答案
                    </Button>
                  )}
                </TItem>
              </div>
            ))}
          </TabPane>
          <TabPane key="text">
            <TItem labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
              <List
                dataSource={answer}
                style={{
                  width: '100%',
                }}
                bordered
                disabled={check}
                pagination={{ pageSize: 5 }}
                itemLayout="vertical"
                renderItem={({ key, content }) => (
                  <List.Item
                    id="content"
                    key={key}
                    extra={
                      <a disabled={check} onClick={() => deleteText(key)}>
                        删除
                      </a>
                    }
                  >
                    {content}
                  </List.Item>
                )}
              />
            </TItem>
          </TabPane>
          <TabPane key="emoticon">
            <TItem
              name="expression"
              label="选择表情"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
            >
              <EmoticonSelector disabled={check} />
            </TItem>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
}

export default connect(({ chatLibrary }) => chatLibrary)(AnswerBlock);
