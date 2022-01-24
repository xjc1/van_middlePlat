import React, { PureComponent } from 'react';
import { Typography, notification } from 'antd';
import { DownloadOutlined, RollbackOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { TTable, OperateBar, DateTools } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { KERNEL } from '@/services/api';

@connect(({ operatingManual, loading }) => ({
  ...operatingManual,
  loading: loading.effects['operatingManual/fetchList'],
}))
class OperatingManualList extends PureComponent {
  columns = [
    {
      title: '产品手册名称',
      dataIndex: 'name',
      width: '40%',
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
      title: '上传时间',
      dataIndex: 'createTime',
      render: time => DateTools.transformDefaultFormat(time),
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: (text, record) => {
        return (
          <OperateBar>
            <OperateBar.Button icon={<DownloadOutlined />}>
              <a href={record.fileAddr} download={record.name}>
                下载
              </a>
            </OperateBar.Button>
            <OperateBar.Button
              danger
              icon={<RollbackOutlined />}
              confirmText="警告"
              confirmContent="删除问题将不可能再恢复,确定删除吗?"
              onClick={() => this.handleDelete(record.id)}
            >
              删除
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  handleDelete = async id => {
    const { pageNum } = this.props;
    await KERNEL.removeHandbookUsingPOST(id);
    this.props.fetchList({ page: pageNum });
    notification.success({
      message: '成功删除',
    });
  };

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;

    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default OperatingManualList;
