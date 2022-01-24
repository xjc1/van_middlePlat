import React, { useState, useEffect } from 'react';
import { Table, List } from 'antd';
import _ from 'lodash';
import { SCENE } from '@/services/api';

const formatMatters = (value = [], region) =>
  value.map(({ title, name, subItemName }) => {
    let str = [title, name, subItemName].filter(item => item).join('_');
    if (str) {
      str += `_${region}\n`;
    }
    return str;
  });

function Matters({ info, regions }) {
  const { id, name } = info;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    setLoading(true);
    SCENE.confirmMattersUsingPOST({
      body: { id, name, regions: [...regions.map(({ code }) => code), info.regions] },
    }).then(res => {
      const current = _.pick(res, info.regions);
      setCurrent(formatMatters(current[info.regions], info.region));
      if (!regions.find(({ code }) => code === info.regions)) {
        res = _.omit(res, info.regions);
      }
      const handledRes = _.map(res, (value, key) => {
        const region = regions.find(({ code }) => code === key).name;
        return {
          region,
          matters: formatMatters(value, region),
        };
      });
      setList(handledRes.filter(item => item));
      setLoading(false);
    });
  }, [regions]);

  return (
    <>
      <List
        header={<h2>当前主题的对应事项</h2>}
        bordered
        size="small"
        pagination={{
          defaultPageSize: 5,
          size: 'small',
        }}
        dataSource={current}
        renderItem={item => <List.Item>{item}</List.Item>}
        style={{ marginBottom: '20px' }}
      />
      <Table
        size="small"
        dataSource={list}
        loading={loading}
        columns={[
          {
            title: '区划名称',
            dataIndex: 'region',
            width: '10%',
          },
          {
            title: '事项信息',
            dataIndex: 'matters',
            render: matters => <span style={{ whiteSpace: 'pre' }}>{matters}</span>,
          },
        ]}
        rowKey="region"
      />
    </>
  );
}

export default Matters;
