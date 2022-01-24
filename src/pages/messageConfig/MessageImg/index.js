import React, { useEffect, useState } from 'react';
import { Row, Col, Button, message } from 'antd';
import PageTabLayout from '../MessageTabs';
import { TButton, TTable } from '@/components/tis_ui';
import { MESSAGEPICTURES } from '@/services/api';
import EditMessageImg from './EditMessageImg';

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
    MESSAGEPICTURES.getMessagePictureUsingGET({
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
    const { picture = [], ...others } = newValue;
    const [pictureUrl, pictureName] = picture;
    MESSAGEPICTURES.createMessagePictureUsingPOST({
      body: { ...others, picture: { name: pictureName, url: pictureUrl } },
    }).then(() => {
      message.success('添加成功');
      fetchList({ page: authListInfo.pageNum });
    });
  }

  function handleUpdateSource(nextValue) {
    const { picture = [], ...others } = nextValue;
    const [pictureUrl, pictureName] = picture;
    MESSAGEPICTURES.updateMessagePictureUsingPOST({
      body: { ...others, picture: { name: pictureName, url: pictureUrl } },
    }).then(() => {
      message.success('更新成功');
      fetchList({ page: authListInfo.pageNum });
    });
  }

  function handleDeleteSource(id) {
    MESSAGEPICTURES.deleteMessagePictureUsingPOST(id).then(() => {
      message.success('删除成功');
      fetchList({ page: 0 });
    });
  }

  return (
    <PageTabLayout curPath="messageConfig_messageImg">
      <Row style={{ background: '#fff', marginTop: 10, padding: 20 }}>
        <Col span={4} style={{ textAlign: 'right' }}>
          消息配图：
        </Col>
        <Col span={16}>
          <EditMessageImg onFinish={handleCreateSource}>
            <Button type="primary">添加</Button>
          </EditMessageImg>
          <TTable
            bordered
            loading={loadingList}
            columns={[
              {
                title: '图片名称',
                dataIndex: 'name',
              },

              {
                title: '缩略图',
                width: 64,
                dataIndex: 'picture',
                render: (picture = {}) => {
                  const { url } = picture;
                  return url && <img src={url} alt="" style={{ height: '46px' }} />;
                },
              },
              {
                title: '操作',
                align: 'center',
                width: 200,
                render: (text, record) => (
                  <>
                    <EditMessageImg
                      record={{ ...record, picture: [record.picture.url, record.picture.name] }}
                      onFinish={nextValue => handleUpdateSource(nextValue)}
                    >
                      <TButton.Button icon={null} type="link">
                        编辑
                      </TButton.Button>
                    </EditMessageImg>
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
