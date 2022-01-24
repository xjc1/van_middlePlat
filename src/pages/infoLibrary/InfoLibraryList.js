import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { TTable, OperateBar } from '@/components/tis_ui';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import EmptyFn from '@/utils/EmptyFn';
import { policyUpDownStatus, implementationLevel } from '@/utils/constantEnum';
import globalStyles from '@/global.less';

@connect(({ infoLibrary, department }) => ({ ...infoLibrary, flatDeparts: department.flatDeparts }))
class InfoLibraryList extends PureComponent {
  columns = [
    {
      title: '主题编码',
      dataIndex: 'code',
      className: globalStyles.primaryColmn,
    },
    {
      title: '主题名称',
      dataIndex: 'name',
      className: globalStyles.primaryColmn,
    },
    {
      title: '实施层级',
      dataIndex: 'executiveLevel',
      render: level => implementationLevel.$v_names[level],
    },
    {
      title: '行政区划',
      dataIndex: 'regions',
      render: code => {
        const { dictNames } = this.props;
        return dictNames.SH00XZQH[code];
      },
    },
    {
      title: '牵头部门',
      dataIndex: 'headDept',
      render: text => {
        const { dictNames } = this.props;
        return dictNames.SHSSBMSH[text] || text;
      },
    },
    {
      title: '实施主体',
      dataIndex: 'executiveSubject',
      render: text => {
        const { dictNames } = this.props;
        return dictNames.SHSSBMSH[text] || text;
      },
    },
    {
      title: (
        <>
          承诺办理时限
          <br />
          (工作日)
        </>
      ),
      dataIndex: 'promiseDays',
      render: text => (
        <span>
          {text}
          {text && '天'}
        </span>
      ),
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      render: status => policyUpDownStatus.$v_names[status],
    },
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (text, record) => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                icon={<EditOutlined />}
                onClick={() =>
                  router.push({
                    name: `infoLibrary_editInfo`,
                    query: { type: 'edit', id: record.id },
                  })
                }
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                icon={<VerticalAlignMiddleOutlined />}
                onClick={() => this.changeStatus(record)}
              >
                {record.status === 1 ? '下架' : '上架'}
              </OperateBar.Button>
              <OperateBar.Divider />
              <OperateBar.Button
                danger
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent="删除将不可能再恢复,确定删除吗?"
                onClick={() => {
                  const { dispatch, page, pageSize, condition, onPageSizeChange } = this.props;
                  dispatch({
                    type: `infoLibrary/deleteInfo`,
                    payload: record.id,
                  }).then(() => {
                    onPageSizeChange({ page, size: pageSize, condition });
                  });
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
              router.push({
                name: `infoLibrary_viewInfo`,
                query: { type: 'view', id: record.id },
              })
            }
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  changeStatus = record => {
    const { dispatch, page, pageSize, condition, onPageSizeChange } = this.props;
    if (record.status === 1) {
      dispatch({
        type: `infoLibrary/down`,
        payload: record.id,
      }).then(() => {
        onPageSizeChange({ page, size: pageSize, condition });
      });
    } else {
      dispatch({
        type: `infoLibrary/publish`,
        payload: record.id,
      }).then(() => {
        onPageSizeChange({ page, size: pageSize, condition });
      });
    }
  };

  render() {
    const {
      list,
      total,
      pageSize,
      page,
      condition,
      onPageSizeChange = EmptyFn,
      className,
      loading,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          loading={loading}
          columns={this.columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: page,
            onChange: current => {
              onPageSizeChange({ page: current, size: pageSize, condition });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default InfoLibraryList;
