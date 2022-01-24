import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { modulesContentType, appUserType, commonStrategyType } from '@/utils/constantEnum';
import { FileSearchOutlined } from '@ant-design/icons';
import router from '@/utils/tRouter';

@connect(({ strategyManage }) => strategyManage)
class StrategyManageList extends PureComponent {
  columns = [
    {
      title: '策略名称',
      dataIndex: 'name',
    },
    {
      title: '策略类型',
      dataIndex: 'type',
      render: type => {
        return commonStrategyType.$v_names[type] || type;
      },
    },
    {
      title: '对象类型',
      dataIndex: 'objectType',
      render: objectType => {
        return appUserType.$v_names[objectType] || objectType;
      },
    },
    {
      title: '适用内容类型',
      dataIndex: 'contentType',
      render: (types = []) => {
        return types.map(type => modulesContentType.$v_names[type]).join();
      },
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: record => {
        return (
          <OperateBar>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => {
                router.push({ name: 'strategy_view', params: { id: record.code } });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  render() {
    const { list, total, pageSize, pageNum, onPageSizeChange = EmptyFn, className } = this.props;
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
              onPageSizeChange({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default StrategyManageList;
