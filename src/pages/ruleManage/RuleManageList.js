import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { appUserType, policyUpDownStatus } from '@/utils/constantEnum';
import { EditOutlined, FileSearchOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import authEnum, { hasAuth } from '@/utils/auth';
import router from '@/utils/tRouter';

@connect(({ ruleManage, loading }) => ({
  ...ruleManage,
  loading: loading.effects['ruleManage/fetchList'],
}))
class RuleManageList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      loading,
      fetchRuleList = EmptyFn,
      className,
      dispatch,
    } = this.props;
    const columns = [
      {
        title: '规则名称',
        dataIndex: 'cname',
      },
      {
        title: '规则对象',
        dataIndex: 'type',
        render: text => appUserType.$v_names[text],
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        render: text => policyUpDownStatus.$v_names[text],
      },
      {
        title: '应用标签数',
        dataIndex: 'tagSize',
      },
      {
        title: '操作',
        dataIndex: 'id',
        width: 200,
        render: (id, record) => (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  disabled={!hasAuth(authEnum.ruleManage_funEdit_alias)}
                  icon={<EditOutlined />}
                  onClick={() => {
                    router.push({
                      name: 'ruleManage_edit',
                      query: { id },
                    });
                  }}
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Button
                  disabled={!hasAuth(authEnum.ruleManage_funPublish)}
                  icon={<VerticalAlignMiddleOutlined />}
                  confirmText="警告"
                  onClick={() => {
                    // eslint-disable-next-line no-shadow
                    const { status, id } = record;
                    dispatch({
                      type: status && status === 1 ? 'ruleManage/down' : 'ruleManage/publish',
                      id,
                    });
                  }}
                  confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                >
                  {record.status === 1 ? '下架' : '上架'}
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              disabled={!hasAuth(authEnum.ruleManage_funView_alias)}
              icon={<FileSearchOutlined />}
              onClick={() => {
                router.push({
                  name: 'ruleManage_view',
                  query: { id },
                });
              }}
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
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              fetchRuleList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default RuleManageList;
