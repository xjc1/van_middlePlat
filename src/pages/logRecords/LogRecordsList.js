import React, { PureComponent } from 'react';
import { connect } from "dva";
import { Modal } from 'antd';
import { FileSearchOutlined } from "@ant-design/icons";
import LogDetail from './LogDetail';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';

@connect(({ logRecords }) => logRecords)
class LogRecordsList extends PureComponent {

  render() {
    const {
      list, total, pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      className,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={[
            {
              title: '日志ID',
              dataIndex: 'id',
              width: 200,
            },
            {
              title: '账号',
              dataIndex: 'userName',
              width: 200,
            },
            {
              title: '操作',
              dataIndex: 'opName',
            },
            {
              title: '时间',
              dataIndex: 'operationTime',
              width: 200,
            },
            {
              title: '',
              dataIndex: 'operation',
              show: true,
              width: 200,
              fixed: 'right',
              align: 'center',
              render: (text, record) => {
                return (
                  <OperateBar>
                    <OperateBar.Button
                      icon={<FileSearchOutlined />}
                      onClick={() => {
                        Modal.info({
                          width: 1000,
                          content: (
                            <LogDetail detail={record} />
                          )
                        });
                      }}
                    >
                      查看详情
                    </OperateBar.Button>
                  </OperateBar>
                );
              },
            },
          ]}
          dataSource={list}
          size="small"
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: (page) => {
              onPageSizeChange({ page, size: pageSize });
            }
          }}
          rowKey="id" />
      </div>
    );
  }

}

export default LogRecordsList;

