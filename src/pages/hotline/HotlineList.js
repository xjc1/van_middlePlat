import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DateTools, OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import router from '@/utils/tRouter';
import _ from 'lodash';
import { HOTLINES } from '@/services/api';
import { message } from 'antd';
import { policyUpDownStatus, similarQuestionSimilarType, terminalType } from '@/utils/constantEnum';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import authEnum, { authCheck } from '@/utils/auth';

@connect(({ hotline, department, loading }) => ({
  ...hotline,
  flatDeparts: department.flatDeparts,
  loading: loading.effects['hotline/fetch'],
}))
class HotlineList extends PureComponent {
  state = {
    relatedId: '',
    similarVisible: false,
  };

  onEdit = record => {
    router.push({ name: 'hotline_edit', params: { hotlineId: record.id } });
  };

  handleDelete = id => {
    HOTLINES.deleteHotlineUsingPOST(id).then(() => {
      message.success('操作成功');
      this.reload();
    });
  };

  changeStatus = async ({ id, status }) => {
    await HOTLINES.updateHotlineStatusUsingPOST(
      id,
      status === policyUpDownStatus.down ? policyUpDownStatus.up : policyUpDownStatus.down,
    );
    this.reload();
  };

  onCancel = () => {
    this.setState({ similarVisible: false });
  };

  reload = () => {
    const { pageSize, pageNum, params, onPageSizeChange = EmptyFn } = this.props;
    onPageSizeChange({
      page: pageNum,
      size: pageSize,
      query: params,
    });
  };

  columns = [
    {
      title: '热线电话',
      dataIndex: 'number',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
    },
    {
      title: '创建部门',
      dataIndex: 'collectDepartment',
      render: text => {
        const { flatDeparts } = this.props;
        return flatDeparts[text] || text;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
    },
    {
      title: '更新部门',
      dataIndex: 'updateDept',
      render: text => {
        const { flatDeparts } = this.props;
        return flatDeparts[text] || text;
      },
    },
    {
      title: '单位名称',
      dataIndex: 'departmentName',
      render: text => {
        const { dictNames } = this.props;
        return _.get(dictNames, `DWBM.${text}`, text);
      },
    },
    {
      title: '终端类型',
      dataIndex: 'clientType',
      render: (types = []) => types.map(item => terminalType.$v_names[item]).join(' | '),
    },
    {
      title: '行政区划',
      dataIndex: 'regions',
      render: text => {
        const { dictNames } = this.props;
        return _.get(dictNames, `SH00XZQH.${text}`, text);
      },
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      render: status => {
        return status === 1 ? '上架' : '下架';
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      show: true,
      width: 200,
      fixed: 'right',
      align: 'center',
      render: (text, record) => {
        return (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.hotline_edit_alias,
                  <OperateBar.Button icon={<EditOutlined />} onClick={() => this.onEdit(record)}>
                    编辑
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.hotline_publish,
                  <OperateBar.Button
                    icon={<VerticalAlignMiddleOutlined />}
                    confirmText="警告"
                    onClick={() => {
                      this.changeStatus(record);
                    }}
                    confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                  >
                    {record.status === 1 ? '下架' : '上架'}
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.hotline_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                  >
                    相似问
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.hotline_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除将不可能再恢复,确定删除吗?"
                    onClick={() => this.handleDelete(record.id)}
                  >
                    删除
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => router.push({ name: 'hotline_view', params: { hotlineId: record.id } })}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      className,
      loading,
    } = this.props;
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
              onPageSizeChange({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            reload={this.reload}
            type={similarQuestionSimilarType.hotline}
          />
        )}
      </div>
    );
  }
}

export default HotlineList;
