import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { appUserType, messageStatus, messageRevokeStatus } from '@/utils/constantEnum';
import _ from 'lodash';
import {
  CopyOutlined,
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
  CloudSyncOutlined,
} from '@ant-design/icons';
import router from '@/utils/tRouter';

@connect(({ warningManage }) => warningManage)
class WarningManageList extends PureComponent {
  operator = record => {
    switch (record.status) {
      case messageStatus.prePush: {
        return (
          <>
            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() =>
                router.push({
                  name: 'warningManage_edit',
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
              confirmContent="删除将不可能再恢复,确定删除吗?"
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                  type: 'warningManage/deleteWarning',
                  id: record.id,
                });
              }}
            >
              删除
            </OperateBar.Button>
            {record.longTermEffective && (
              <OperateBar.Button
                icon={<VerticalAlignMiddleOutlined />}
                confirmText="警告"
                onClick={() => {
                  const { dispatch } = this.props;
                  dispatch({
                    type: 'warningManage/beginWarning',
                    id: record.id,
                  });
                }}
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
            <OperateBar.Button
              icon={<VerticalAlignMiddleOutlined />}
              confirmText="警告"
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                  type: 'warningManage/stopWarning',
                  id: record.id,
                });
              }}
              confirmContent="确定需要停止吗?"
            >
              停止
            </OperateBar.Button>
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
                  name: 'warningManage_copy',
                  query: { id: record.id },
                })
              }
            >
              复制
            </OperateBar.Button>
            <OperateBar.Button
              icon={<CloudSyncOutlined />}
              confirmText="警告"
              confirmContent="确定需要撤回有效提醒吗?"
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                  type: 'warningManage/revokeWarning',
                  id: record.id,
                  status: messageRevokeStatus.effective,
                });
              }}
            >
              撤回有效
            </OperateBar.Button>
            <OperateBar.Button
              icon={<CloudSyncOutlined />}
              confirmText="警告"
              confirmContent="确定需要撤回所有提醒吗?"
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                  type: 'warningManage/revokeWarning',
                  id: record.id,
                  status: messageRevokeStatus.all,
                });
              }}
            >
              撤回所有
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
                  name: 'warningManage_copy',
                  query: { id: record.id },
                })
              }
            >
              复制
            </OperateBar.Button>
            <OperateBar.Button
              icon={<CloudSyncOutlined />}
              confirmText="警告"
              confirmContent="确定需要撤回所有提醒吗?"
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({
                  type: 'warningManage/revokeWarning',
                  id: record.id,
                  status: messageRevokeStatus.all,
                });
              }}
            >
              撤回所有
            </OperateBar.Button>
          </>
        );
      }
      case messageStatus.allRevoked: {
        return (
          <>
            <OperateBar.Button
              icon={<CopyOutlined />}
              onClick={() =>
                router.push({
                  name: 'warningManage_copy',
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
    const columns = [
      {
        title: '提醒标题',
        dataIndex: 'title',
      },
      {
        title: '提醒样式',
        dataIndex: 'styleNames',
        render: (styleNames = []) => {
          return styleNames.join(',');
        },
      },
      {
        title: '消息类型',
        dataIndex: 'msgTypeName',
      },
      {
        title: '推送状态',
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
        render: (types = []) => {
          const { dictNames } = this.props;
          return types.map(type => _.get(dictNames, `ZDLX.${type}`, type)).join();
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
                  name: 'warningManage_view',
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

export default WarningManageList;
