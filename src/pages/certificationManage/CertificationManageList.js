import React, { PureComponent } from 'react';
import { connect } from "dva";
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { policyUpDownStatus } from "@/utils/constantEnum";
import { EditOutlined, FileSearchOutlined, RollbackOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import router from "@/utils/tRouter";

@connect(({ certificationManage }) => certificationManage)
class CertificationManageList extends PureComponent {

  render() {
    const {
      list, total, pageSize,
      pageNum, dispatch, focusItem,
      onPageSizeChange = EmptyFn,
      handleDelete = EmptyFn,
      onEdit = EmptyFn,
      changeStatus = EmptyFn,
      className,
      ...others
    } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={[
            {
              title: '证照名称',
              dataIndex: 'name',
            },
            {
              title: '证照编码',
              dataIndex: 'code',
            },
            {
              title: '对象类型',
              dataIndex: 'objectType',
              render: code => {
                const { dictNames } = this.props;
                return dictNames.DXLX0001[code];
              },
            },
            {
              title: '上下架状态',
              dataIndex: 'status',
              render: text => policyUpDownStatus.$v_names[text],
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
                        <OperateBar.Button
                          icon={<EditOutlined />}
                          onClick={() => {
                            onEdit(record);
                          }
                          }>
                          编辑
                        </OperateBar.Button>
                        <OperateBar.Button
                          icon={<VerticalAlignMiddleOutlined />}
                          confirmText="警告"
                          onClick={() => {
                            changeStatus(record);
                          }}
                          confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                        >
                          {record.status === 1 ? '下架' : '上架'}
                        </OperateBar.Button>
                        <OperateBar.Button
                          danger
                          icon={<RollbackOutlined />}
                          confirmText="警告"
                          confirmContent="删除将不可能再恢复,确定删除吗?"
                          onClick={() => {
                            handleDelete(record.id);
                          }}
                        >
                          删除
                        </OperateBar.Button>
                      </>
                    }
                  >
                    <OperateBar.Button
                      icon={<FileSearchOutlined />}
                      onClick={() => {
                        router.push({ name: 'certificationManage_view', params: { id: record.id } });
                      }}
                    >
                      查看
                    </OperateBar.Button>
                  </OperateBar>
                );
              },
            },
          ]}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: (page) => {
              onPageSizeChange({ page, size: pageSize });
            }
          }}
          rowKey="id" />
      </div>
    );
  }

}

export default CertificationManageList;

