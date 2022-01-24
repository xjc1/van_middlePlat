import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import { SCENE } from '@/services/api';
import { policyUpDownStatus, commonAuditState, commonAbsence } from '@/utils/constantEnum';

function Scenes({ info, regions }) {
  const { id, name, object, status, auditState } = info;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    SCENE.confirmCopyDetailUsingPOST({
      body: { id, name, regions: regions.map(({ code }) => code) },
    }).then(res => {
      setList(
        res.map(({ name, absence }) => ({
          name,
          object,
          regions: name.split('--')[1].split('副本')[0],
          status,
          auditState,
          absence,
        })),
      );
      setLoading(false);
    });
  }, [regions]);

  return (
    <>
      <Table
        bordered
        size="small"
        dataSource={list}
        loading={loading}
        columns={[
          {
            title: '主题名称',
            dataIndex: 'name',
          },
          {
            title: '申报对象',
            dataIndex: 'object',
          },
          {
            title: '行政区划',
            dataIndex: 'regions',
          },
          {
            title: '上下架状态',
            dataIndex: 'status',
            render: status => policyUpDownStatus.$v_names[status],
          },
          {
            title: '总体审核状态',
            dataIndex: 'auditState',
            render: state => commonAuditState.$v_names[state],
          },
          {
            title: '是否缺失材料',
            dataIndex: 'absence',
            render: absence => commonAbsence.$v_names[absence],
          },
        ]}
        rowKey="name"
      />
    </>
  );
}

export default Scenes;
