import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TItem } from '@/components/tis_ui';
import Matters from './Matters';
import Scenes from './Scenes';
import RegionSelectTable from './RegionSelectTable';

const { TabPane } = Tabs;

function RegionsCopy({ info }) {
  const [regions, setRegions] = useState([]);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="选择行政区划" key="1">
        <TItem name="regions" wrapperCol={24}>
          <RegionSelectTable
            onChange={regionsArray => {
              setRegions(regionsArray);
            }}
          />
        </TItem>
      </TabPane>
      <TabPane tab="查看事项信息" key="2" disabled={!regions.length}>
        <Matters regions={regions} info={info} />
      </TabPane>
      <TabPane tab="查看主题信息" key="3" disabled={!regions.length}>
        <Scenes regions={regions} info={info} />
      </TabPane>
    </Tabs>
  );
}

export default RegionsCopy;
