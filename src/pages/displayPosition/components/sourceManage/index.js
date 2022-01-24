import React, { useEffect, useState } from 'react';
import { Row, Col, Button, message } from 'antd';
import PageTabLayout from '../PageTabLayout';
import { TButton, TTable } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import EditSource from './EditSource';

const defaultPageSize = 10;

function Index() {
  const [loadingList, setLoadingList] = useState(false);
  const [sourceListInfo, setSourceListInfo] = useState({
    list: [],
    total: 0,
    pageNum: 0,
  });

  useEffect(() => {
    fetchList({});
  }, []);

  function fetchList({ page = 0, size = defaultPageSize }) {
    setLoadingList(true);
    KERNEL.findAllSourcesByPageUsingGET({ params: { page, size } })
      .then(res => {
        const { content = [], totalElements: total, number: pageNum } = res;
        setSourceListInfo({
          list: content,
          total,
          pageNum,
        });
      })
      .finally(() => setLoadingList(false));
  }

  function handleCreateSource(newValue) {
    KERNEL.addNewPortraitTagSourceUsingPOST({ body: newValue })
      .then(() => {
        message.success('添加成功');
        fetchList({ page: sourceListInfo.pageNum });
      })
      .catch(() => {
        message.error('添加失败');
      });
  }

  function handleUpdateSource(nextValue) {
    KERNEL.updatePortraitTagSourceUsingPOST({ body: nextValue })
      .then(() => {
        message.success('更新成功');
        fetchList({ page: sourceListInfo.pageNum });
      })
      .catch(() => {
        message.error('更新失败');
      });
  }

  function handleDeleteSource(code) {
    KERNEL.removePortraitTagSourceUsingPOST(code)
      .then(() => {
        message.success('删除成功');
        fetchList({ page: sourceListInfo.pageNum });
      })
      .catch(() => {
        message.error('删除失败');
      });
  }

  return (
    <PageTabLayout curPath="displayPosition_sourceManage">
      <Row style={{ background: '#fff', marginTop: 10, padding: 20 }}>
        <Col span={4} style={{ textAlign: 'right' }}>
          来源：
        </Col>
        <Col span={16}>
          <EditSource onFinish={handleCreateSource}>
            <Button type="primary">添加</Button>
          </EditSource>
          <TTable
            bordered
            loading={loadingList}
            columns={[
              {
                title: '来源类型',
                dataIndex: 'name',
              },
              {
                title: '来源编码',
                dataIndex: 'code',
              },
              {
                title: '操作',
                align: 'center',
                width: 200,
                render: (text, record) => (
                  <>
                    <EditSource
                      record={record}
                      onFinish={nextValue => handleUpdateSource(nextValue)}
                    >
                      <TButton.Button icon={null} type="link">
                        编辑
                      </TButton.Button>
                    </EditSource>
                    <TButton.Delete
                      style={{ color: '#ff7875' }}
                      icon={null}
                      type="link"
                      ghost={false}
                      confirmText="警告"
                      confirmContent={`确认要删除【${record.name}】吗?`}
                      onClick={() => handleDeleteSource(record.code)}
                    >
                      删除
                    </TButton.Delete>
                  </>
                ),
              },
            ]}
            pagination={{
              pageSize: defaultPageSize,
              current: sourceListInfo.pageNum,
              total: sourceListInfo.total,
              onChange: page => fetchList({ page }),
            }}
            rowKey="id"
            dataSource={sourceListInfo.list}
            size="small"
            style={{ marginTop: '10px' }}
          />
        </Col>
      </Row>
    </PageTabLayout>
  );
}

export default Index;
