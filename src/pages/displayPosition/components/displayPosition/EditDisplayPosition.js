import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Popover, Form, Input, Divider, message } from 'antd';
import { TItem, FormRules, TButton, TTable } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import SortDisplayPosition from './SortDisplayPosition';

const defaultPageSize = 10;

function DisplayPosition() {
  const [loadingList, setLoadingList] = useState(false);
  const [visible, setVisible] = useState(false);
  const [positionListInfo, setPositionListInfo] = useState({
    list: [],
    total: 0,
    pageNum: 0,
  });
  const [selectedRecord, setSelectedRecord] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    fetchList({});
  }, []);

  function fetchList({ page = 0, size = defaultPageSize }) {
    setLoadingList(true);
    KERNEL.getDisplayPositionUsingGET({ params: { page, size } })
      .then(res => {
        const { content = [], totalElements: total, number: pageNum } = res;
        setPositionListInfo({
          list: content,
          total,
          pageNum,
        });
      })
      .finally(() => setLoadingList(false));
  }

  function createPosition(name) {
    KERNEL.addDisplayPositionUsingPOST({ body: { name } })
      .then(() => {
        message.success('添加成功');
        setVisible(false);
        fetchList({});
      })
      .catch(() => message.error('添加失败'));
  }

  function deletePosition(id) {
    KERNEL.removeDisplayPositionUsingPOST(id)
      .then(() => {
        message.success('删除成功');
        fetchList({ page: positionListInfo.pageNum });
      })
      .catch(e => {
        message.error(`删除失败，${e.msg}`);
      });
  }

  return (
    <Row>
      <Col>
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Popover
            title="添加输出模块"
            visible={visible}
            onVisibleChange={setVisible}
            content={
              <div style={{ width: 600 }}>
                <Form
                  form={form}
                  onFinish={({ name }) => {
                    createPosition(name);
                    form.resetFields();
                  }}
                >
                  <TItem name="name" label="输出名称" rules={[FormRules.required('必填')]}>
                    <Input />
                  </TItem>
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button
                      onClick={() => {
                        setVisible(false);
                      }}
                    >
                      取消
                    </Button>
                    <Divider type="vertical" />
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                  </div>
                </Form>
              </div>
            }
            trigger="click"
          >
            <Button type="primary">添加</Button>
          </Popover>
        </div>
      </Col>
      <Col span={24}>
        <TTable
          bordered
          loading={loadingList}
          columns={[
            {
              title: '输出名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              align: 'center',
              width: 200,
              render: (text, record) => (
                <>
                  <TButton.Button icon={null} type="link" onClick={() => setSelectedRecord(record)}>
                    排序
                  </TButton.Button>
                  <TButton.Delete
                    style={{ color: '#ff7875' }}
                    icon={null}
                    type="link"
                    ghost={false}
                    confirmText="警告"
                    confirmContent={`确认要删除【${record.name}】吗?`}
                    onClick={() => deletePosition(record.id)}
                  >
                    删除
                  </TButton.Delete>
                </>
              ),
            },
          ]}
          pagination={{
            pageSize: defaultPageSize,
            current: positionListInfo.pageNum,
            total: positionListInfo.total,
            onChange: page => fetchList({ page }),
          }}
          rowKey="id"
          dataSource={positionListInfo.list}
          size="small"
        />
        {selectedRecord.id && (
          <SortDisplayPosition recordInfo={selectedRecord} onCancel={() => setSelectedRecord({})} />
        )}
      </Col>
    </Row>
  );
}

export default DisplayPosition;
