import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import Styles from './index.less';
import { EmptyFn, EventCenter, OperateBar, TTable } from '@/components/tis_ui';

function Index({
  list = [],
  selected,
  onSelected = EmptyFn,
  onDelete = EmptyFn,
  onAddForm = EmptyFn,
  onFetchList = EmptyFn,
  pageSize,
  total,
  pageNum,
}) {
  return (
    <div className={Styles.formList}>
      <div className={Styles.formListToolbar}>
        <Button type="primary" className={Styles.categoryListAddBtn} onClick={onAddForm}>
          添加表单
        </Button>
        <Button
          type="link"
          onClick={() => {
            EventCenter.emit('goBack');
          }}
        >
          返回事项列表
        </Button>
      </div>
      <div className={Styles.formListContent}>
        <TTable
          columns={[
            {
              title: '表单名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              align: 'right',
              render: record => {
                return (
                  <OperateBar>
                    <OperateBar.Button
                      icon={<EditOutlined />}
                      onClick={() => {
                        onSelected(record);
                      }}
                    >
                      编辑
                    </OperateBar.Button>
                    <OperateBar.Button
                      danger
                      icon={<MinusOutlined />}
                      confirmText="警告"
                      confirmContent={`确认要删除 [${record.name}] 表单吗?`}
                      onClick={() => onDelete(record.id)}
                    >
                      删除
                    </OperateBar.Button>
                  </OperateBar>
                );
              },
            },
          ]}
          size="small"
          dataSource={list}
          rowClassName={record => {
            return selected && record.id === selected.id && Styles.formListSelectedRow;
          }}
          pagination={{
            defaultPageSize: 10,
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              onFetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    </div>
  );
}

export default connect(({ matterForm }) => {
  return {
    list: matterForm.list,
    pageSize: matterForm.pageSize,
    currentPage: matterForm.currentPage,
  };
})(Index);
