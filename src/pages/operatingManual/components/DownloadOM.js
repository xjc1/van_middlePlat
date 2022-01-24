import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Modal, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { TTable, OperateBar, TButton } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { KERNEL } from '@/services/api';

function DownloadOM(props) {
  const { finish = EmptyFn } = props;
  const [state, setState] = useState({
    list: [],
    total: 0,
    pageSize: 10,
    pageNum: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList({});
  }, []);

  async function fetchList({ page = 0, size = 10 }) {
    setLoading(true);
    const {
      content: list,
      totalElements: total,
      size: pageSize,
      number: pageNum,
    } = await KERNEL.listHandbookUsingPOST({
      params: { page, size },
    });
    setState({ list, total, pageSize, pageNum });
    setLoading(false);
  }

  return (
    <Modal
      title="下载手册"
      visible
      footer={[<TButton.Button onClick={finish}>关闭</TButton.Button>]}
      onCancel={finish}
      width="65%"
    >
      <TTable
        bordered
        size="small"
        loading={loading}
        columns={[
          {
            title: '操作手册名称',
            dataIndex: 'name',
            render: name => (
              <Typography
                ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}
              >
                {name}
              </Typography>
            ),
          },
          {
            title: '操作',
            width: 150,
            align: 'center',
            render: (text, record) => (
              <OperateBar>
                <OperateBar.Button icon={<DownloadOutlined />}>
                  <a href={record.fileAddr} download={record.name}>
                    下载
                  </a>
                </OperateBar.Button>
              </OperateBar>
            ),
          },
        ]}
        pagination={{
          total: state.total,
          pageSize: state.pageSize,
          current: state.pageNum,
          onChange: page => {
            fetchList({ page, size: state.pageSize });
          },
        }}
        rowKey="id"
        dataSource={state.list}
      />
    </Modal>
  );
}

export default connect(({ operatingManual }) => operatingManual)(DownloadOM);
