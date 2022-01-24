import React from 'react';
import router from '@/utils/tRouter';
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import { OperateBar } from '@/components/tis_ui';
import KnowledgeLibWorkOrder from '../KnowledgeLibWorkOrder';

function Index(props) {
  return (
    <KnowledgeLibWorkOrder
      operate={{
        title: '操作',
        width: 200,
        align: 'center',
        render: (text, record) => (
          <OperateBar>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => {
                router.push({
                  name: 'confirm_view',
                  params: { workOrderId: record.id },
                });
              }}
            >
              查看
            </OperateBar.Button>
            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() => {
                router.push({
                  name: 'confirm_audit',
                  params: {
                    workOrderId: record.id
                  }
                });
              }}
            >
              审核
            </OperateBar.Button>
            <OperateBar.Divider />
          </OperateBar>
        ),
      }}
    />
  );
}

export default Index;
