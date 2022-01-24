import React, { useState, useEffect } from 'react';
import { TTable, DateTools } from '@/components/tis_ui';
import { scenesAuditState } from '@/utils/constantEnum';
import { SCENE } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

function AuditRecord(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const { sceneInfo } = props;
    if (sceneInfo) {
      getLogs().then(res => setList(res));
    }
    async function getLogs() {
      const res = await SCENE.getSceneReviewDetailUsingGET(sceneInfo.id);
      const { dictNames } = await Code2Name(Promise.resolve({ content: res }), [
        'SHSSBMSH',
        'dept',
      ]);
      return res.map((item, index) => ({ ...item, department: dictNames.SHSSBMSH[item.dept], key: index }));
    }
  }, []);

  return (
    <TTable
      bordered
      columns={[
        {
          title: '阶段',
          dataIndex: 'stage',
        },
        {
          title: '部门',
          dataIndex: 'department',
        },
        {
          title: '操作人',
          dataIndex: 'operator',
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: status => status !== -1 && scenesAuditState.$v_names[status],
        },
        {
          title: '意见',
          dataIndex: 'comments',
        },
        {
          title: '时间',
          dataIndex: 'time',
          render: timeStr => DateTools.transformDefaultFormat(timeStr),
        },
      ]}
      dataSource={list}
      rowKey="key"
    />
  );
}

export default AuditRecord;
