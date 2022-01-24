import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tooltip, notification } from 'antd';
import { RollbackOutlined, EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import { TTable, OperateBar, DateTools } from '@/components/tis_ui';
import EditCondition from './editCondition';
import EmptyFn from '@/utils/EmptyFn';
import { conditionType, conditionObject } from '@/utils/constantEnum';
import { CONDITION } from '@/services/api';
import globalStyle from '@/global.less';
import authEnum, { hasAuth } from '@/utils/auth';

@connect(({ condition, loading }) => ({
  ...condition,
  loading: loading.effects['condition/fetchList'],
}))
class ConditionList extends PureComponent {
  state = {
    info: null,
    readOnly: false,
  };

  columns = [
    {
      title: '条件名称',
      dataIndex: 'name',
      width: '25%',
      className: globalStyle.primaryColmn,
    },
    {
      title: '条件描述',
      dataIndex: 'description',
      width: '15%',
    },
    {
      title: '条件类型',
      dataIndex: 'type',
      render: type => conditionType.$v_names[type],
    },
    {
      title: '对象类型',
      dataIndex: 'object',
      render: object => conditionObject.$v_names[object],
    },
    {
      title: '条件_id',
      dataIndex: 'id',
      width: '10%',
      ellipsis: true,
      render: id => (
        <Tooltip title={id} placement="topLeft">
          {id}
        </Tooltip>
      ),
    },
    {
      title: '录入时间',
      dataIndex: 'createtime',
      render: time => DateTools.transformDefaultFormat(time),
    },
    {
      title: '编辑时间',
      dataIndex: 'updatetime',
      render: time => DateTools.transformDefaultFormat(time),
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: record => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                disabled={!hasAuth(authEnum.ruleManage_conditionEdit_alias)}
                icon={<EditOutlined />}
                onClick={() => this.handleEditCondition(record)}
              >
                编辑
              </OperateBar.Button>

              <OperateBar.Divider />

              <OperateBar.Button
                disabled={!hasAuth(authEnum.ruleManage_conditionDelete)}
                danger
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent="删除条件将无法再恢复,确定删除吗?"
                onClick={() => this.handleDeleteCondition(record)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            disabled={!hasAuth(authEnum.ruleManage_conditionView_alias)}
            icon={<FileSearchOutlined />}
            onClick={() => this.handleEditCondition(record, true)}
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  handleEditCondition = async (record, readOnly = false) => {
    this.setState({ info: record, readOnly });
    this.props.fetchList({});
  };

  handleDeleteCondition = async ({ id }) => {
    await CONDITION.deleteConditionUsingPOST(id);
    notification.success({
      message: '成功删除条件',
    });
    this.props.fetchList({});
  };

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;

    const { info, readOnly } = this.state;

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
            showTotal: totalNum => `总共 ${totalNum} 条数据`,
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
        {info && (
          <EditCondition
            info={info}
            readOnly={readOnly}
            fetchList={fetchList}
            complete={() => {
              this.setState({ info: null });
            }}
          />
        )}
      </div>
    );
  }
}

export default ConditionList;
