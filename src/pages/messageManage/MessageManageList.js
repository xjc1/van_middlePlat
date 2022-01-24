import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import _ from 'lodash';
import { messageStatus, messagePushType, appUserType } from '@/utils/constantEnum';

import {
  CopyOutlined,
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
  CloudSyncOutlined,
} from '@ant-design/icons';
import router from '@/utils/tRouter';

@connect(({ messageManage, loading }) => ({
  ...messageManage,
  loading: loading.effects['messageManage/fetchList'],
}))
class MessageManageList extends PureComponent {
  beginMessage = id => {
    const { dispatch } = this.props;
    dispatch({ type: 'messageManage/beginMessage', id });
  };

  stopMessage = id => {
    const { dispatch } = this.props;
    dispatch({ type: 'messageManage/stopMessage', id });
  };

  operator = record => {
    switch (record.status) {
      case messageStatus.prePush: {
        return (
          <>
            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() =>
                router.push({
                  name: `messageManage_edit`,
                  query: { id: record.id },
                })
              }
            >
              编辑
            </OperateBar.Button>
            <OperateBar.Button
              danger
              icon={<RollbackOutlined />}
              confirmText="警告"
              confirmContent="删除消息将不可能再恢复,确定删除吗?"
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({ type: 'messageManage/deleteMessage', id: record.id });
              }}
            >
              删除
            </OperateBar.Button>
            {record.longTermEffective && (
              <OperateBar.Button
                icon={<VerticalAlignMiddleOutlined />}
                confirmText="警告"
                onClick={() => this.beginMessage(record.id)}
                confirmContent="确定需要开始吗?"
              >
                开始
              </OperateBar.Button>
            )}
          </>
        );
      }
      case messageStatus.pushing: {
        return (
          <>
            {record.pushType === messagePushType.longTime && (
              <OperateBar.Button
                icon={<VerticalAlignMiddleOutlined />}
                confirmText="警告"
                onClick={() => this.stopMessage(record.id)}
                confirmContent="确定需要停止吗?"
              >
                停止
              </OperateBar.Button>
            )}
          </>
        );
      }
      case messageStatus.pushed: {
        return (
          <>
            <OperateBar.Button
              icon={<CopyOutlined />}
              onClick={() =>
                router.push({
                  name: `messageManage_copy`,
                  query: { id: record.id },
                })
              }
            >
              复制
            </OperateBar.Button>

            <OperateBar.Button
              icon={<CloudSyncOutlined />}
              confirmText="警告"
              confirmContent="确定需要撤回吗?"
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({ type: 'messageManage/revokeMessage', id: record.id });
              }}
            >
              撤回
            </OperateBar.Button>
          </>
        );
      }
      case messageStatus.revoked: {
        return (
          <>
            <OperateBar.Button
              icon={<CopyOutlined />}
              onClick={() =>
                router.push({
                  name: `messageManage_copy`,
                  query: { id: record.id },
                })
              }
            >
              复制
            </OperateBar.Button>
          </>
        );
      }
      default:
        return <></>;
    }
  };

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      dispatch,
      focusItem,
      onPageSizeChange = EmptyFn,
      className,
      ...others
    } = this.props;
    const columns = [
      {
        title: '消息标题',
        dataIndex: 'title',
      },
      {
        title: '推送方式',
        dataIndex: 'pushType',
        render: text => {
          return messagePushType.$v_names[text];
        },
      },
      {
        title: '消息分类',
        dataIndex: 'msgTypeName',
      },
      {
        title: '消息状态',
        dataIndex: 'status',
        render: text => {
          return messageStatus.$v_names[text];
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
        title: '终端类型',
        dataIndex: 'clientType',
        width: '15%',
        render: types => {
          const { dictNames } = this.props;
          return (types || []).map(type => _.get(dictNames, `ZDLX.${type}`, type)).join();
        },
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        align: 'center',
        render: (text, record) => (
          <OperateBar more={this.operator(record)}>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() =>
                router.push({
                  name: `messageManage_view`,
                  query: { id: record.id },
                })
              }
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    return (
      <div className={className}>
        <TTable
          {...others}
          columns={columns}
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

export default MessageManageList;
