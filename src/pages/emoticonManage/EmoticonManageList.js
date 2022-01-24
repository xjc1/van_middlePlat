import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { commonShelf, commonSortType, policyUpDownStatus } from '@/utils/constantEnum';
import globalStyles from '@/global.less';
import { notification } from 'antd';
import EditEmoticon from './editEmoticon';
import { EXPRESSIONS } from '@/services/api';
import authEnum, { hasAuth } from '@/utils/auth';

@connect(({ emoticonManage, loading }) => ({
  ...emoticonManage,
  loading: loading.effects['emoticonManage/fetchList'],
}))
class EmoticonManageList extends PureComponent {
  state = {
    emoticonDetail: null,
    isEdit: false,
  };

  columns = [
    {
      title: '表情名称',
      dataIndex: 'name',
      className: globalStyles.primaryColmn,
      width: '45%',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      render: (icon = {}) => {
        const { url } = icon;
        return (
          url && (
            <img src={url} alt="" style={{ width: '30px', height: '30px', background: '#ccc' }} />
          )
        );
      },
    },
    {
      title: '排序值',
      dataIndex: 'sort',
      sorter: true,
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      render: status => policyUpDownStatus.$v_names[status],
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: record => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                disabled={!hasAuth(authEnum.emoticon_edit_alias)}
                icon={<EditOutlined />}
                onClick={() => this.handleGetDetail(record.id, true)}
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                disabled={!hasAuth(authEnum.emoticon_publish)}
                icon={<VerticalAlignMiddleOutlined />}
                onClick={() => this.handleChangeStatus(record.id, record.status)}
              >
                {commonShelf.$v_names[record.status]}
              </OperateBar.Button>
              <OperateBar.Button
                danger
                disabled={!hasAuth(authEnum.emoticon_delete)}
                confirmText="警告"
                confirmContent="删除将不可能再恢复,确定删除吗?"
                icon={<RollbackOutlined />}
                onClick={() => this.handleDelete(record.id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() => this.handleGetDetail(record.id, false)}
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  handleGetDetail = (id, isForEdit) => {
    EXPRESSIONS.getExpressionDetailUsingGET(id).then(res => {
      this.setState({
        isEdit: isForEdit,
        emoticonDetail: res,
      });
    });
  };

  handleChangeStatus = async (id, status) => {
    const { fetchList = EmptyFn } = this.props;
    try {
      if (!status) await EXPRESSIONS.publishExpressionUsingPOST(id);
      else await EXPRESSIONS.withdrawExpressionUsingPOST(id);
      fetchList({});
      notification.success({
        message: `成功${commonShelf.$v_names[status]}表情`,
      });
    } catch (e) {
      notification.success({
        message: `${commonShelf.$v_names[status]}表情失败`,
      });
    }
  };

  handleDelete = id => {
    const { fetchList = EmptyFn } = this.props;
    EXPRESSIONS.deleteExpressionUsingPOST(id)
      .then(() => {
        fetchList({});
        notification.success({
          message: '删除成功',
        });
      })
      .catch(() => {
        notification.error({
          message: '删除失败',
        });
      });
  };

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      className,
      loading,
      sort,
      fetchList = EmptyFn,
      changeSort = EmptyFn,
    } = this.props;
    const { emoticonDetail, isEdit } = this.state;
    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          onChange={(pagination, filter, { order }) => {
            const sortType = commonSortType[order];
            if (sort !== sortType) {
              changeSort(sortType);
            }
          }}
          loading={loading}
          rowKey="id"
        />

        {emoticonDetail && (
          <EditEmoticon
            title={isEdit ? '编辑表情' : '查看表情'}
            info={emoticonDetail}
            disabled={!isEdit}
            handleClose={() => {
              this.setState({ emoticonDetail: null });
              if (isEdit) fetchList({});
            }}
          />
        )}
      </div>
    );
  }
}

export default EmoticonManageList;
