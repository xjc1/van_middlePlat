import React, { useEffect, useState } from 'react';
import { Popover, Table } from 'antd';
import _ from 'lodash';
import Styles from './index.less';
import { POLICYATLAS } from "@/services/api";

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
  }, {
    title: '政策ID',
    dataIndex: 'policyId',
  }, {
    title: '政策名称',
    dataIndex: 'name',
  },
];

const paginationConfig = { hideOnSinglePage: true, defaultPageSize: 5 };

function Index({ children, policy }) {
  const [visible, setVisible] = useState(false);
  const [policyList, setPolicyList] = useState([]);

  useEffect(() => {
    if (visible) {
      POLICYATLAS.queryPolicyAssociatedUsingGET(policy.id).then((list) => {
        setPolicyList(_.map(list, (item, index) => ({ ...item, index: index + 1 })));
      }).catch(console.error);
    }
  }, [visible]);

  return (
    <Popover
      content={<div className={Styles.policyGraphPreviewTable}>
        <Table size="small"
               dataSource={policyList}
               columns={columns}
               rowKey="id"
               pagination={paginationConfig} />
      </div>}
      title={<div style={{ width: 600}}>图谱抽检[{policy.name}]</div>}
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      {children}
    </Popover>
  );
}

export default Index;
