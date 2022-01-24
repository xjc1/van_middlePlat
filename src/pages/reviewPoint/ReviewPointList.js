import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import {
  AppstoreAddOutlined,
  AlignLeftOutlined,
  ContactsOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import router from '@/utils/tRouter';
import { commonAuditState, commonYesNo } from '@/utils/constantEnum';
import authEnum, { hasAuth } from '@/utils/auth';

@connect(({ reviewPoint }) => reviewPoint)
class ReviewPointList extends PureComponent {
  render() {
    const { list, total, pageSize, pageNum, onPageSizeChange = EmptyFn, className } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={[
            {
              title: '事项名称',
              dataIndex: 'title',
              ellipsis: true,
              width: '15%',
            },
            {
              title: '分项名称',
              dataIndex: 'name',
              ellipsis: true,
            },
            {
              title: '办理项名称',
              dataIndex: 'subItemName',
              ellipsis: true,
            },
            {
              title: '办理项编码',
              dataIndex: 'matterCode',
              ellipsis: true,
            },
            {
              title: '对象类型',
              dataIndex: 'object',
            },
            {
              title: '是否已处理',
              dataIndex: 'dealStatus',
              render(dealStatus) {
                return commonYesNo.$v_names[dealStatus];
              },
            },
            {
              title: '审核状态',
              dataIndex: 'approvalStatus',
              render(approvalStatus) {
                return commonAuditState.$v_names[approvalStatus];
              },
            },
            {
              title: '操作',
              dataIndex: 'top',
              width: '80',
              align: 'center',
              render: (text, record) => (
                <OperateBar
                  more={
                    <>
                      <OperateBar.Button
                        disabled={!hasAuth(authEnum.reviewPoint_edit)}
                        icon={<AppstoreAddOutlined />}
                        onClick={() => {
                          router.push({ name: 'reviewPoint_specialStep', params: { matterId: record.id } });
                        }}
                      >
                        特别程序
                      </OperateBar.Button>
                      <OperateBar.Button
                        disabled={!hasAuth(authEnum.reviewPoint_edit)}
                        icon={<CarryOutOutlined />}
                        onClick={() => {
                          router.push({ name: 'reviewPoint_applyConditionList', params: { matterId: record.id } });
                        }}
                      >
                        申请条件
                      </OperateBar.Button>
                      <OperateBar.Button
                        disabled={!hasAuth(authEnum.reviewPoint_edit)}
                        icon={<ContactsOutlined />}
                        onClick={() => {
                          router.push({ name: 'reviewPoint_applyMaterialList', params: { matterId: record.id } });
                        }}
                      >
                        申请材料
                      </OperateBar.Button>
                      <OperateBar.Button
                        disabled={!hasAuth(authEnum.reviewPoint_edit)}
                        icon={<AlignLeftOutlined />}
                        onClick={() => {
                          router.push({ name: 'reviewPoint_formCheckPoint', params: { matterId: record.id } });
                        }}
                      >
                        填报表单列表
                      </OperateBar.Button>
                    </>
                  }
                />
              ),
            },
          ]}
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

export default ReviewPointList;
