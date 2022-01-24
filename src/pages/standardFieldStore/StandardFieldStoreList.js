import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { EditOutlined, FileSearchOutlined, RollbackOutlined } from '@ant-design/icons';
import { standardFieldDataType } from '@/utils/constantEnum';
import authEnum, { hasAuth } from '@/utils/auth';

@connect(({ standardFieldStore }) => standardFieldStore)
class StandardFieldStoreList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      className,
      onPageSizeChange = EmptyFn,
      onEdit = EmptyFn,
      onCheck = EmptyFn,
      onDelete = EmptyFn,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={[
            {
              title: '字段名称',
              dataIndex: 'name',
            },
            {
              title: '字段编码',
              dataIndex: 'code',
            },
            {
              title: '字段分类',
              dataIndex: 'classification',
            },
            {
              title: '数据类型',
              dataIndex: 'dataType',
              render(text) {
                return standardFieldDataType.$v_names[text] || text;
              },
            },
            {
              title: '操作',
              width: 200,
              align: 'center',
              render: (text, record) => (
                <OperateBar
                  more={
                    <>
                      <OperateBar.Button
                        icon={<EditOutlined />}
                        disabled={!hasAuth(authEnum.standardFieldStore_edit_alias)}
                        onClick={() => onEdit(record)}
                      >
                        编辑
                      </OperateBar.Button>
                      <OperateBar.Divider />
                      <OperateBar.Button
                        danger
                        disabled={!hasAuth(authEnum.standardFieldStore_delete)}
                        icon={<RollbackOutlined />}
                        confirmText="警告"
                        confirmContent="删除条件将无法再恢复,确定删除吗?"
                        onClick={() => {
                          onDelete(record);
                        }}
                      >
                        删除
                      </OperateBar.Button>
                    </>
                  }
                >
                  <OperateBar.Button icon={<FileSearchOutlined />} onClick={() => onCheck(record)}>
                    查看
                  </OperateBar.Button>
                </OperateBar>
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

export default StandardFieldStoreList;
