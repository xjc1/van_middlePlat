import React, { useEffect, useState } from 'react';
import { Row, Col, Button, message } from 'antd';
import PageTabLayout from '../MessageTabs';
import { TButton, TTable } from '@/components/tis_ui';
import { MESSAGECONFIGS } from '@/services/api';
import EditAuthMethod from './EditAuthMethod';
import { messageConfigType } from '@/utils/constantEnum';

const defaultPageSize = 10;

function Index() {
  const [loadingList, setLoadingList] = useState(false);
  const [authListInfo, setAuthListInfo] = useState({
    list: [],
    total: 0,
    pageNum: 0,
  });

  useEffect(() => {
    fetchList({});
  }, []);

  function fetchList({ page = 0, size = defaultPageSize }) {
    setLoadingList(true);
    MESSAGECONFIGS.getMessageConfigUsingPOST({
      body: { type: messageConfigType.authMethod },
      params: { page, size },
    })
      .then(res => {
        const { content = [], totalElements: total, number: pageNum } = res;
        setAuthListInfo({
          list: content,
          total,
          pageNum,
        });
      })
      .finally(() => setLoadingList(false));
  }

  function handleCreateSource(newValue) {
    MESSAGECONFIGS.createMessageConfigUsingPOST({
      body: { type: messageConfigType.authMethod, ...newValue },
    }).then(() => {
      message.success('添加成功');
      fetchList({ page: authListInfo.pageNum });
    });
  }

  function handleUpdateSource(nextValue) {
    MESSAGECONFIGS.updateMessageConfigUsingPOST({
      body: { type: messageConfigType.authMethod, ...nextValue },
    }).then(() => {
      message.success('更新成功');
      fetchList({ page: authListInfo.pageNum });
    });
  }

  function handleDeleteSource(id) {
    MESSAGECONFIGS.deleteMessageConfigUsingPOST(id).then(() => {
      message.success('删除成功');
      fetchList({ page: 0 });
    });
  }

  return (
    <PageTabLayout curPath="messageConfig_authMethod">
      <Row style={{ background: '#fff', marginTop: 10, padding: 20 }}>
        <Col span={4} style={{ textAlign: 'right' }}>
          来源：
        </Col>
        <Col span={16}>
          <EditAuthMethod onFinish={handleCreateSource}>
            <Button type="primary">添加</Button>
          </EditAuthMethod>
          <TTable
            bordered
            loading={loadingList}
            columns={[
              {
                title: '认证方式',
                dataIndex: 'name',
              },
              {
                title: '认证编码',
                dataIndex: 'code',
              },
              {
                title: '操作',
                align: 'center',
                width: 200,
                render: (text, record) => (
                  <>
                    <EditAuthMethod
                      record={record}
                      onFinish={nextValue => handleUpdateSource(nextValue)}
                    >
                      <TButton.Button icon={null} type="link">
                        编辑
                      </TButton.Button>
                    </EditAuthMethod>
                    <TButton.Delete
                      style={{ color: '#ff7875' }}
                      icon={null}
                      type="link"
                      ghost={false}
                      confirmText="警告"
                      confirmContent={`确认要删除【${record.name}】吗?`}
                      onClick={() => handleDeleteSource(record.id)}
                    >
                      删除
                    </TButton.Delete>
                  </>
                ),
              },
            ]}
            pagination={{
              pageSize: defaultPageSize,
              current: authListInfo.pageNum,
              total: authListInfo.total,
              onChange: page => fetchList({ page }),
            }}
            rowKey="id"
            dataSource={authListInfo.list}
            size="small"
            style={{ marginTop: '10px' }}
          />
        </Col>
      </Row>
    </PageTabLayout>
  );
}

export default Index;
