/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, DateTools, OperateBar } from '@/components/tis_ui';
import {
  EditOutlined,
  FileSearchOutlined,
  CopyOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import {
  contentType,
  receivingRange,
  policyUpDownStatus,
  publishStatus,
  appUserType,
} from '@/utils/constantEnum';
import globalStyles from '@/global.less';
import router from "@/utils/tRouter";
import authEnum, { authCheck } from '@/utils/auth';
import _ from 'lodash';

@connect(({ message, createMessageForm, loading }) => ({
  ...message, ...createMessageForm,
  loading: loading.effects["message/fetchList"],
  statusLoading: loading.effects["message/publish"]
}))
class MessageList extends PureComponent {

  handleDelete = record => {
    const { dispatch } = this.props;
    dispatch({
      type: `message/delete`,
      payload: record.id,
    }).then(() => {
      this.getMessageList();
    });
  };

  changeStatus = record => {
    const { dispatch } = this.props;
    if (record.status === '1') {
      dispatch({
        type: `message/down`,
        payload: record.id,
      }).then(() => {
        this.getMessageList();
      });
    } else {
      dispatch({
        type: `message/publish`,
        payload: record.id,
      }).then(() => {
        this.getMessageList();
      });
    }
  };

  componentDidMount = () => {
    this.getMessageList();
  };

  getMessageList = () => {
    const { page, size, params } = this.props;
    const { dispatch } = this.props;
    dispatch({
      type: 'message/fetchList',
      payload: { page, size },
      data: params,
    });
  };

  fetchMessage({ page = 0, size = 10 }) {
    const { dispatch, params } = this.props;
    dispatch({
      type: 'message/fetchList',
      payload: { page, size },
      data: params,
    });
    dispatch({ type: 'message/savePage', payload: { page, size } });
  }

  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        className: globalStyles.primaryColmn,
      },
      {
        title: '消息类型',
        dataIndex: 'messageType',
        width: '8%',
        render: text => {
          const { dictNames } = this.props;
          const [val] = _.at(dictNames, `XXLX1000.${text}`);
          return val;
        },
      },
      {
        title: '用户类型',
        dataIndex: 'userType',
        width: '8%',
        render: text => appUserType.$v_names[text]
      },
      {
        title: '接收范围',
        dataIndex: 'receivingRange',
        width: '8%',
        render: text => {
          return receivingRange.$v_names[text];
        },
      },
      {
        title: '内容类型',
        dataIndex: 'contentType',
        width: '8%',
        render: text => {
          return contentType.$v_names[text];
        },
      },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        width: '8%',
        render: text => {
          return publishStatus.$v_names[text];
        },
      },
      {
        title: '最后操作时间',
        dataIndex: 'updateTime',
        width: '10%',
        render: timeStr => DateTools.transformDefaultFormat(timeStr),
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        width: '10%',
        render: text => {
          return policyUpDownStatus.$v_names[text];
        },
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        align: 'center',
        render: (text, record) => (
          <OperateBar
            more={
              record.status === '0' && record.publishStatus === 0 ? (
                <>
                  {authCheck(authEnum.message_edit_alias,
                    <OperateBar.Button
                      icon={<EditOutlined />}
                      onClick={() => router.push({
                        name: `message_edit`,
                        query: { id: record.id }
                      })}
                    >
                      编辑
                    </OperateBar.Button>)}

                  {authCheck(authEnum.message_publish,
                    <OperateBar.Button
                      icon={<VerticalAlignMiddleOutlined />}
                      confirmText="警告"
                      onClick={() => this.changeStatus(record)}
                      confirmContent="确定需要上架吗?"
                    >
                      上架
                    </OperateBar.Button>)}

                  {authCheck(authEnum.message_delete,
                    <OperateBar.Button
                      danger
                      icon={<RollbackOutlined />}
                      confirmText="警告"
                      confirmContent="删除消息将不可能再恢复,确定删除吗?"
                      onClick={() => this.handleDelete(record)}
                    >
                      删除
                    </OperateBar.Button>)}
                </>
              ) : record.status !== '0' ? (
                <>
                  {authCheck(authEnum.message_publish,
                    <OperateBar.Button
                      icon={<VerticalAlignMiddleOutlined />}
                      confirmText="警告"
                      onClick={() => this.changeStatus(record)}
                      confirmContent="确定需要下架吗?"
                    >
                      下架
                    </OperateBar.Button>)}
                </>
              ) : (
                <>
                  {authCheck(authEnum.message_edit_alias,
                    <OperateBar.Button
                      icon={<CopyOutlined />}
                      onClick={() => router.push({
                        name: `message_copy`,
                        query: { id: record.id }
                      })}
                    >
                      复制
                    </OperateBar.Button>)}
                </>
              )
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => router.push({
                name: `message_view`,
                query: { id: record.id }
              })}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    const { list, total, page, size, statusLoading, loading, ...others } = this.props;
    return (
      <div>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading || statusLoading}
          pagination={{
            total,
            pageSize: size,
            current: page,
            onChange: nextPage => {
              this.fetchMessage({ page: nextPage, size });
            },
          }}
          rowKey="id"
          {...others}
        />
      </div>
    );
  }
}

export default MessageList;
