import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import _ from 'lodash';
import {
  policyUpDownStatus,
  terminalType,
  appUserType,
  messageSendType,
} from '@/utils/constantEnum';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import router from '@/utils/tRouter';

@connect(({ messageTemplate }) => messageTemplate)
class MessageTemplateList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      handleDelete = EmptyFn,
      changeStatus = EmptyFn,
      className,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={[
            {
              title: '模版标题',
              dataIndex: 'moduleTitle',
            },
            {
              title: '模版编码',
              dataIndex: 'moduleId',
            },
            {
              title: '转发类型',
              dataIndex: 'sendType',
              render: sendType => {
                return messageSendType.$v_names[sendType] || sendType;
              },
            },
            {
              title: '对象类型',
              dataIndex: 'objectType',
              render: codes => {
                return _.map(codes, code => appUserType.$v_names[code] || code).join('；');
              },
            },
            {
              title: '终端类型',
              dataIndex: 'clientTypes',
              width: '20%',
              render: text => {
                return _.map(text, item => terminalType.$v_names[item]).join('；');
              },
            },
            {
              title: '上下架状态',
              width: '20%',
              dataIndex: 'status',
              render: text => policyUpDownStatus.$v_names[text],
            },
            {
              title: '操作',
              dataIndex: 'operation',
              show: true,
              width: 200,
              fixed: 'right',
              align: 'center',
              render: (text, record) => {
                return (
                  <OperateBar
                    more={
                      <>
                        <OperateBar.Button
                          icon={<EditOutlined />}
                          onClick={() => {
                            router.push({ name: 'messageTemplate_edit', params: { id: record.id } });
                          }}
                        >
                          编辑
                        </OperateBar.Button>
                        <OperateBar.Button
                          icon={<VerticalAlignMiddleOutlined />}
                          confirmText="警告"
                          onClick={() => {
                            changeStatus(record);
                          }}
                          confirmContent={
                            record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'
                          }
                        >
                          {record.status === 1 ? '下架' : '上架'}
                        </OperateBar.Button>
                        <OperateBar.Button
                          danger
                          icon={<RollbackOutlined />}
                          confirmText="警告"
                          confirmContent="删除将不可能再恢复,确定删除吗?"
                          onClick={() => {
                            handleDelete(record.id);
                          }}
                        >
                          删除
                        </OperateBar.Button>
                      </>
                    }
                  >
                    <OperateBar.Button
                      icon={<FileSearchOutlined />}
                      onClick={() =>
                        router.push({ name: 'messageTemplate_view', params: { id: record.id } })
                      }
                    >
                      查看
                    </OperateBar.Button>
                  </OperateBar>
                );
              },
            },
          ]}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              onPageSizeChange({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default MessageTemplateList;
