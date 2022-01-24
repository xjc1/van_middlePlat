import React, {useEffect, useState} from 'react';
// import { TabForm } from '@/components/tis_ui';
import { Card, Button, Tabs } from 'antd';
import router from '@/utils/tRouter';
import BasicInfo from './compontents/basicInfo';
import MatterInfo from './compontents/matterInfo'
import MaterialInfo from './compontents/materialInfo'
import AskInfo from './compontents/askInfo'
import PolicyWordInfo from './compontents/policyWordInfo'
import FormInfo from './compontents/formInfo'
import { BASEINFO } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

const { TabPane } = Tabs;

function ViewInfo(props) {
  const [tab, setTab] = useState('basicInfo');
  const [record, setRecord] = useState({});
  const [dictNames, setDictNames] = useState({});
  const { query = {} } = props.location;
  const { id } = query;
  useEffect(() => {
    BASEINFO.getOneSceneBaseInfoUsingGET(id).then(async items => {
      const { regions, lifecycle ={}, headDept, netHandleExtent, executiveSubject, matterBaseInfos = []} = items;
      const { key: lifecycleKey, value: lifecycleVal } = lifecycle;

      const { dictNames: dictObj = {} } = await Code2Name(
        Promise.resolve({ content: [{ regions, lifecycle: lifecycleVal, headDept, netHandleExtent, executiveSubject,matterBaseInfos }] }),
        ['SH00XZQH', 'regions'],
        ['SHSSBMSH', 'headDept'],
        ['SHSSBMSH', 'executiveSubject'],
        ['WBCD', 'netHandleExtent'],
        [lifecycleKey || '1000', 'lifecycle'],
        ['SHSSBMSH', 'matterBaseInfos.department'],
        ['SH00XZQH', 'matterBaseInfos.regions'],
      );
      setDictNames(dictObj);
      setRecord(items);
    });
  }, []);
  const tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'matterInfo',
      tab: '事项信息',
    },
    {
      key: 'formInfo',
      tab: '表单信息',
    },
    {
      key: 'materialInfo',
      tab: '材料信息',
    },
    {
      key: 'askInfo',
      tab: '问卷信息',
    },
    {
      key: 'policyInfo',
      tab: '百科词条信息',
    },
  ];
  return (
    <Card
      title="查看基本信息"
      extra={<Button type="link" onClick={() => router.replace('infoLibrary')}>返回基本信息库</Button>}
      tabList={tabList}
      onTabChange={key => {
        setTab(key);
      }}
      activeTabKey={tab}
    >
      <Tabs activeKey={tab} renderTabBar={() => <div />}>
        <TabPane key="basicInfo">
          <BasicInfo record={record} dictNames={dictNames} />
        </TabPane>
        <TabPane key="matterInfo">
          <MatterInfo record={record} dictNames={dictNames} />
        </TabPane>
        <TabPane key="formInfo">
          <FormInfo record={record} dictNames={dictNames} />
        </TabPane>
        <TabPane key="materialInfo">
          <MaterialInfo record={record} dictNames={dictNames} />
        </TabPane>
        <TabPane key="askInfo">
          <AskInfo record={record} dictNames={dictNames} />
        </TabPane>
        <TabPane key="policyInfo">
          <PolicyWordInfo record={record} dictNames={dictNames} />
        </TabPane>
      </Tabs>
    </Card>
  );
}

export default ViewInfo;
