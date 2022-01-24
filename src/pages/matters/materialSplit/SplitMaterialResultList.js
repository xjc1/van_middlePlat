import React from 'react';
import { EmptyFn, OperateBar, TTable } from '@/components/tis_ui';
import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import Styles from './index.less';

function SplitMaterialList({ approvalResults, onEdit = EmptyFn, onDelete = EmptyFn }) {
  return (
    <div className={Styles.splitMaterialList}>
      <TTable
        bordered
        size="small"
        columns={[
          {
            title: '拆解审批材料名称',
            dataIndex: 'name',
            horizontal: true,
          },
          {
            title: '送达方式',
            dataIndex: 'sdfs',
          },
          {
            title: '送达期限',
            ellipsis: true,
            dataIndex: 'sdqx',
          },
          {
            title: '审批结果类型',
            ellipsis: true,
            dataIndex: 'resultType',
          },
          {
            title: '审批结果样本名称',
            ellipsis: true,
            dataIndex: 'clienName',
          },
          {
            title: '操作',
            align: 'center',
            horizontal: true,
            width: 200,
            render(record) {
              return (
                <OperateBar>
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      onEdit(record);
                    }}
                  >
                    编辑
                  </OperateBar.Button>
                  <OperateBar.Button
                    icon={<MinusOutlined />}
                    danger
                    confirmText="警告"
                    confirmContent="确定要删除此拆解审批材料吗?"
                    onClick={() => {
                      onDelete(record);
                    }}
                  >
                    删除
                  </OperateBar.Button>
                </OperateBar>
              );
            },
          },
        ]}
        rowKey="id"
        dataSource={approvalResults}
      />
    </div>
  );
}

export default SplitMaterialList;
