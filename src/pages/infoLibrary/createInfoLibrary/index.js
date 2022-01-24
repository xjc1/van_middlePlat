import React, { useState } from 'react';
import { Tabs, Card, Form, message } from 'antd';
import BaseInfo from './basicInfo';
import MatterInfo from './matterInfo';
import MaterialInfo from './materialInfo';
import FormItem from './formItem';
import Synoyms from './synonyms';
import PolicyWord from './policyWord';
import { FormBtnGp } from '@/components/tis_ui';
import { BASEINFO } from '@/services/api';
import router from '@/utils/tRouter';

const { TabPane } = Tabs;

function CreateInfoLibrary(props) {
  const { initialValues = {}, dictNames = {} } = props;
  const [tab, setTab] = useState('matter');
  const [createForm] = Form.useForm();

  const tabList = [
    {
      key: 'matter',
      tab: '事项信息',
    },
    {
      key: 'formItem',
      tab: '表单信息',
    },
    {
      key: 'material',
      tab: '材料信息',
    },
    {
      key: 'synonyms',
      tab: '问卷信息',
    },
    {
      key: 'policyWord',
      tab: '百科词条信息',
    },
  ];

  const handleSubmit = () => {
    const { id } = initialValues;
    createForm.validateFields().then(async vals => {
      const { matterBaseInfo = [] } = vals;
      const postData = {
        ...vals,
        matterBaseInfo: matterBaseInfo.map(({ matterCode }) => ({ matterCode })),
      };

      // 如果有id走更新流程
      if (id) {
        await BASEINFO.updateSceneBaseInfoDetailUsingPOST({
          body: { ...postData, id },
        });
        message.success('操作成功！');
      } else {
        await BASEINFO.addSceneBaseInfoDetailUsingPOST({ body: postData });
        router.push('infoLibrary');
      }
    });
  };

  return (
    <Form style={{ position: 'relative' }} form={createForm} initialValues={initialValues}>
      {/* <Anchor style={{ position: 'absolute', top: 100, right: 20, zIndex: 9 }}>
        <a href="#otherDiv">跳转</a>
        <Link href="#other" title="Static demo" />
        <Link href="#API" title="API">
          <Link href="#Anchor-Props" title="Anchor Props" />
          <Link href="#Link-Props" title="Link Props" />
        </Link>
      </Anchor> */}
      <BaseInfo />
      <Card
        id="other"
        title=""
        style={{ marginTop: 10 }}
        tabList={tabList}
        onTabChange={key => {
          setTab(key);
        }}
        activeTabKey={tab}
      >
        <Tabs activeKey={tab} renderTabBar={() => <div />}>
          <TabPane forceRender key="matter">
            <MatterInfo dictNames={dictNames} />
          </TabPane>
          <TabPane forceRender key="formItem">
            <FormItem parentKey="formBaseInfo" />
          </TabPane>
          <TabPane forceRender key="material">
            <MaterialInfo parentKey="materialBaseInfo" />
          </TabPane>
          <TabPane forceRender key="synonyms">
            <Synoyms />
          </TabPane>
          <TabPane forceRender key="policyWord">
            <PolicyWord />
          </TabPane>
        </Tabs>
      </Card>
      <FormBtnGp onOk={handleSubmit} />
    </Form>
  );
}

export default CreateInfoLibrary;
