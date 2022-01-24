import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons';
import {
  appUserType,
  conditionReviewType,
  commonAuditState,
  portraitAuditState,
} from '@/utils/constantEnum';
import { ReviewModalForm } from '@/components/bussinessComponents';
import router from '@/utils/tRouter';
import { Badge } from 'antd';

const badgeStatus = {
  [portraitAuditState.WAITING]: 'processing',
  [portraitAuditState.PASSED]: 'success',
  [portraitAuditState.REFUSE]: 'error',
  [portraitAuditState.INTERRUPT]: 'warning',
};

const extraColumns = {
  [conditionReviewType.NEED_REVIEW]: {
    title: '提交部门',
    dataIndex: 'applyDept',
  },
  [conditionReviewType.CURRENT_DEPT]: {
    title: '审核部门',
    dataIndex: 'applyDept',
  },
};

@connect(({ portraitTagsAudit, loading }) => ({
  ...portraitTagsAudit,
  loadingList: loading.effects['portraitTagsAudit/fetchList'],
}))
class PortraitTagsAuditList extends PureComponent {
  state = {
    auditRecord: null,
  };

  getColumns = () => [
    {
      title: '标签名称',
      dataIndex: 'name',
    },
    {
      title: '标签分类',
      dataIndex: 'category',
    },
    {
      title: '标签对象',
      dataIndex: 'object',
      render: object => appUserType.$v_names[object],
    },
    extraColumns[this.props.curReviewType],
    {
      title: '采录部门',
      dataIndex: 'collectDept',
    },
    {
      title: '阶段',
      dataIndex: 'title',
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      render: status => (
        <Badge
          status={badgeStatus[status]}
          text={commonAuditState.$v_names[status] || portraitAuditState.$v_names[status]}
        />
      ),
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: record => (
        <OperateBar>
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() => this.handleViewTagDetail(record)}
          >
            查看
          </OperateBar.Button>
          {this.props.curReviewType === conditionReviewType.NEED_REVIEW ? (
            <OperateBar.Button
              icon={<EditOutlined />}
              disabled={record.reviewStatus === String(commonAuditState.audited)}
              onClick={() => this.setState({ auditRecord: record })}
            >
              审核
            </OperateBar.Button>
          ) : (
            <OperateBar.Button
              icon={<EditOutlined />}
              disabled={!record.editable}
              onClick={() => router.push({ name: 'tagsAudit_edit', params: { tagId: record.id } })}
            >
              编辑
            </OperateBar.Button>
          )}
        </OperateBar>
      ),
    },
  ];

  handleViewTagDetail = (record = {}) => {
    const { curReviewType } = this.props;
    if (curReviewType === conditionReviewType.NEED_REVIEW) {
      router.push({ name: 'tagsAudit_review', params: { tagId: record.id } });
      return;
    }
    router.push({ name: 'tagsAudit_view', params: { tagId: record.id } });
  };

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      fetchList = EmptyFn,
      className,
      loadingList,
    } = this.props;

    const { auditRecord } = this.state;
    const columns = this.getColumns();

    return (
      <div className={className}>
        <TTable
          loading={loadingList}
          columns={columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => fetchList({ page, size: pageSize }),
          }}
          rowKey="id"
        />
        {auditRecord && (
          <ReviewModalForm
            elementId={auditRecord.id}
            onClose={() => this.setState({ auditRecord: null })}
            onOk={() => {
              this.setState({ auditRecord: null });
              fetchList({});
            }}
            initialValues={{
              stage: auditRecord.title,
              ...auditRecord,
            }}
          />
        )}
      </div>
    );
  }
}

export default PortraitTagsAuditList;
