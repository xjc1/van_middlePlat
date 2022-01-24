import React from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { RollbackOutlined, FileSearchOutlined, EditOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { TButton, OperateBar } from '@/components/tis_ui';
import { WORKORDER } from '@/services/api';
import KnowledgeLibWorkOrder from '../KnowledgeLibWorkOrder';

function Index(props) {
  async function handleDelete(id) {
    const { dispatch } = props;
    await WORKORDER.deleteWorkOrderUsingPOST(id);
    dispatch({
      type: 'knowledgeLibWorkOrder/fetchList',
      payload: {},
    });
    notification.success({
      message: '成功删除',
    });
  }

  return (
    <KnowledgeLibWorkOrder
      actions={
        <>
          <TButton.Create
            onClick={() => router.push('commit_create')}
          >
            上报工单
          </TButton.Create>
        </>
      }
      operate={{
        title: '操作',
        width: 200,
        align: 'center',
        render: (text, record) => (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() =>
                    router.push({ name: 'commit_edit', params: { workOrderId: record.id } })
                  }
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Divider />
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  onClick={() => handleDelete(record.id)}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => router.push({ name: 'commit_view', params: { workOrderId: record.id } })}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      }}
    />
  );
}

export default connect(({ knowledgeLibWorkOrder }) => knowledgeLibWorkOrder)(Index);
