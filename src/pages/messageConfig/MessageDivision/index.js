import React, { useEffect, useState } from 'react';
import { Row, Col, Button, message } from 'antd';
import _ from 'lodash';
import PageTabLayout from '../MessageTabs';
import { TButton, TTable } from '@/components/tis_ui';
import { MESSAGECONFIGS } from '@/services/api';
import EditDivision from './EditDivision';
import {
  messageConfigType,
  messageUseScence,
  terminalType,
  appUserType,
} from '@/utils/constantEnum';

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
      body: { type: messageConfigType.classify },
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
      body: { type: messageConfigType.classify, ...newValue },
    }).then(() => {
      message.success('添加成功');
      fetchList({ page: authListInfo.pageNum });
    });
  }

  function handleUpdateSource(nextValue) {
    MESSAGECONFIGS.updateMessageConfigUsingPOST({
      body: { type: messageConfigType.classify, ...nextValue },
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
    <PageTabLayout curPath="messageConfig">
      <Row style={{ background: '#fff', marginTop: 10, padding: 20 }}>
        <Col span={4} style={{ textAlign: 'right' }}>
          消息类型：
        </Col>
        <Col span={16}>
          <EditDivision onFinish={handleCreateSource}>
            <Button type="primary">添加</Button>
          </EditDivision>
          <TTable
            bordered
            loading={loadingList}
            columns={[
              {
                title: '消息类型名称',
                dataIndex: 'name',
              },
              {
                title: '消息类型编码',
                dataIndex: 'code',
              },
              {
                title: '应用场景',
                dataIndex: 'applicationScenario',
                render: text => {
                  return _.map(text, item => messageUseScence.$v_names[item]).join('、');
                },
              },
              {
                title: '终端类型',
                dataIndex: 'clientType',
                render: text => {
                  return _.map(text, item => terminalType.$v_names[item]).join('、');
                },
              },
              {
                title: '对象类型',
                dataIndex: 'objectType',
                render: text => {
                  return appUserType.$v_names[text];
                },
              },
              {
                title: '操作',
                align: 'center',
                width: 200,
                render: (text, record) => (
                  <>
                    <EditDivision
                      record={record}
                      onFinish={nextValue => handleUpdateSource(nextValue)}
                    >
                      <TButton.Button icon={null} type="link">
                        编辑
                      </TButton.Button>
                    </EditDivision>
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
