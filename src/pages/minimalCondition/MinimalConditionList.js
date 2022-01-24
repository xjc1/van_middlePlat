import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { EditOutlined, FileSearchOutlined, RollbackOutlined } from '@ant-design/icons';
import { modulesContentType } from '@/utils/constantEnum';
import { MINIMALCONDITION } from '@/services/api';
import { message } from 'antd';
import router from '@/utils/tRouter';

@connect(({ minimalCondition, loading }) => ({
  ...minimalCondition,
  loading: loading.effects['minimalCondition/fetchList'],
}))
class MinimalConditionList extends PureComponent {
  columns = [
    {
      title: '条件名称',
      dataIndex: 'name',
    },
    {
      title: '对象类型',
      dataIndex: 'objectType',
      render: code => {
        const { dictNames } = this.props;
        return dictNames.DXLX0001[code] || code;
      },
    },
    {
      title: '来源内容类型',
      dataIndex: 'sourceType',
      render: type => modulesContentType.$v_names[type] || type,
    },
    {
      title: '对应内容数',
      dataIndex: 'sourceCount',
    },
    {
      title: '关联标签',
      dataIndex: 'tagId',
      render: id => {
        const { tagNames = {} } = this.props;
        if (!id) return '无';
        return tagNames[id];
      },
    },
    {
      title: '操作',
      dataIndex: 'operator',
      align: 'center',
      width: 200,
      render: (text, record) => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                icon={<EditOutlined />}
                onClick={() =>
                  router.push({ name: 'minimalCondition_edit', params: { id: record.id } })
                }
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                danger
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent="删除将不可能再恢复,确定删除吗?"
                onClick={() => this.handleDeleteMinimalCondition(record.id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() => router.push({ name: 'minimalCondition_view', params: { id: record.id } })}
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  handleDeleteMinimalCondition = id => {
    const { fetchList } = this.props;
    MINIMALCONDITION.removeMinimalConditionUsingPOST(id)
      .then(() => {
        message.success('删除成功');
        fetchList({});
      })
      .catch(e => message.error(e.msg));
  };

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          loading={loading}
          dataSource={list}
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

export default MinimalConditionList;
