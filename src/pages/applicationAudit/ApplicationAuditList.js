/* eslint-disable */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Badge, notification, message } from 'antd';
import { TTable, DateTools, OperateBar } from '@/components/tis_ui';
import { FileSearchOutlined, EditOutlined, MinusOutlined } from '@ant-design/icons';
import { commonReview } from '@/utils/constantEnum';
import ReviewApplication from './reviewApplication';
import { KERNEL } from '@/services/api';
import globalStyle from '@/global.less';

const statusColor = {
  0: 'blue',
  1: 'green',
  2: 'red',
};

@connect(({ applicationAudit, department, loading }) => ({
  ...applicationAudit,
  flatDeparts: department.flatDeparts,
  loading: loading.effects['applicationAudit/fetchList'],
}))
class ApplicationAuditList extends PureComponent {
  state = {
    info: null,
    readOnly: false,
  };

  /**
   * 查看应用信息
   * @param {Object} record 应用信息
   * @return
   */
  handleRead = record => {
    this.setState({ info: record, readOnly: true });
  };

  /**
   * 审核应用
   * @param {Object} record 应用信息
   * @return
   */
  handleExamine = record => {
    this.setState({ info: record });
  };

  /**
   * 撤销应用的审核状态
   * @param {Object} record 应用信息
   * @return
   */
  handleRevoke = async record => {
    const { id } = record;
    try {
      await KERNEL.updateApplicationReviewUsingPOST({ body: { id, review: 0 } });
      this.props.fetchList({});
      notification.success({
        message: '成功撤销应用的审核状态',
      });
    } catch (error) {
      message.error('好像出错了哦……');
      console.log('error', error);
    }
  };

  renderOptions = record => {
    const { review } = record;
    switch (review) {
      case commonReview.pending:
        return (
          <OperateBar.Button
            icon={<EditOutlined />}
            onClick={this.handleExamine.bind(this, record)}
          >
            审核
          </OperateBar.Button>
        );
      case commonReview.resolve:
        return (
          <OperateBar.Button
            icon={<MinusOutlined />}
            onClick={this.handleRevoke.bind(this, record)}
            style={{ color: 'red' }}
          >
            撤销
          </OperateBar.Button>
        );
      case commonReview.reject:
      default:
        return null;
    }
  };

  render() {
    const {
      list,
      totalPages,
      totalElements,
      pageSize,
      pageNumber,
      flatDeparts,
      loading,
      fetchList,
      ...others
    } = this.props;

    const { info, readOnly } = this.state;

    const columns = [
      {
        title: '应用名',
        dataIndex: 'name',
        className: globalStyle.primaryColmn,
      },
      {
        title: '发布部门',
        dataIndex: 'publishDepartment',
        render: department => {
          return flatDeparts[department];
        },
      },
      {
        title: '状态',
        dataIndex: 'review',
        render: review => {
          return <Badge color={statusColor[review]} text={commonReview.$v_names[review]} />;
        },
      },
      {
        title: '申请日期',
        dataIndex: 'createtime',
        render: timeStr => DateTools.transformDefaultFormat(timeStr),
      },
      {
        title: '操作',
        width: 200,
        render: (text, record) => (
          <OperateBar>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              style={{ paddingLeft: 0 }}
              onClick={this.handleRead.bind(this, record)}
            >
              查看
            </OperateBar.Button>
            {this.renderOptions(record)}
          </OperateBar>
        ),
      },
    ];

    return (
      <div>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total: totalPages,
            pageSize,
            current: pageNumber,
            onChange: current => {
              fetchList({ page: current, size: pageSize });
            },
          }}
          rowKey={item => item.id}
          {...others}
        />

        {info && (
          <ReviewApplication
            info={info}
            readOnly={readOnly}
            fetchList={fetchList}
            complete={() => {
              this.setState({ info: null, readOnly: false });
            }}
          />
        )}
      </div>
    );
  }
}

export default ApplicationAuditList;
