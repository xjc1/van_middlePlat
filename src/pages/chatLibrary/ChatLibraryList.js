import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar, DateTools } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import router from '@/utils/tRouter';
import { policyUpDownStatus } from '@/utils/constantEnum';
import authEnum, { authCheck } from '@/utils/auth';
import _ from 'lodash';

@connect(({ chatLibrary, loading }) => ({
  chatLibrary,
  loading: loading.effects['chatLibrary/fetchList'],
}))
class ChatLibraryList extends PureComponent {
  changeStatus = record => {
    const { dispatch } = this.props;
    if (record.status === 0) {
      dispatch({ type: 'chatLibrary/publishChat', payload: record.id });
    } else {
      dispatch({ type: 'chatLibrary/withdrawChat', payload: record.id });
    }
  };

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 180,
      },
      {
        title: '问题名称',
        dataIndex: 'question',
        render: data => data.join(' | '),
      },
      {
        title: '分类',
        dataIndex: 'category',
        width: 200,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: '12%',
        render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
      },
      {
        title: '更新时间',
        dataIndex: 'operationTime',
        width: '13%',
        render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
      },
      {
        title: '归属部门',
        dataIndex: 'attributionDepartment',
        width: '12%',
        render: text => {
          const {
            chatLibrary: { dictNames },
          } = this.props;
          return _.map(text, code => {
            const [val] = _.at(dictNames, `SHGSBMSH.${code}`);
            // 不正确的也显示
            return val || code;
          }).join(' | ');
        },
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        width: '10%',
        render: text => policyUpDownStatus.$v_names[text],
      },
      {
        title: '操作',
        dataIndex: 'operator',
        align: 'center',
        width: 180,
        render: (text, record) => (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  disabled={
                    !authCheck(authEnum.chatLibrary_edit_alias, true, false) || !record.editable
                  }
                  icon={<EditOutlined />}
                  onClick={() => {
                    router.push({
                      name: `chatLibrary_edit`,
                      query: { id: record.id },
                    });
                  }}
                >
                  编辑
                </OperateBar.Button>

                <OperateBar.Divider />
                <OperateBar.Button
                  disabled={!authCheck(authEnum.chatLibrary_publish, true, false)}
                  icon={<VerticalAlignMiddleOutlined />}
                  confirmText="警告"
                  onClick={() => this.changeStatus(record)}
                  confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                >
                  {record.status === 1 ? '下架' : '上架'}
                </OperateBar.Button>

                <OperateBar.Divider />
                <OperateBar.Button
                  disabled={
                    !authCheck(authEnum.chatLibrary_delete, true, false) || !record.editable
                  }
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="删除将不可能再恢复,确定删除吗?"
                  onClick={() => {
                    const { dispatch } = this.props;
                    dispatch({ type: 'chatLibrary/deleteChat', payload: record.id });
                  }}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => {
                router.push({
                  name: `chatLibrary_view`,
                  query: { id: record.id },
                });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    const { chatLibrary, loading, className, onPageSizeChange = EmptyFn } = this.props;
    const { list, total, size, page, ...others } = chatLibrary;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize: size,
            current: page,
            onChange: currentPage => {
              onPageSizeChange({ page: currentPage, size });
            },
          }}
          rowKey="id"
          {...others}
        />
      </div>
    );
  }
}

export default ChatLibraryList;
