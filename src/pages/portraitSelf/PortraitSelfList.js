import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { FileSearchOutlined, EditOutlined } from '@ant-design/icons';
import { pageStatus as pageEnum, sexType } from '@/utils/constantEnum';
import router from '@/utils/tRouter';

@connect(({ portraitSelf, loading }) => ({
  ...portraitSelf,
  loading: loading.effects['portraitSelf/fetchList'],
}))
class PortraitSelfList extends PureComponent {
  columns = [
    {
      title: '证件号码',
      dataIndex: 'uniqueCode',
      ellipsis: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: '10%',
      render: text => sexType.$v_names[text],
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '10%',
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: (text, record) => {
        // 根据状态展示不同的操作按钮
        return (
          <OperateBar>
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => this.onEdit(record.code, pageEnum.view)}
            >
              查看
            </OperateBar.Button>
            <OperateBar.Button
              icon={<EditOutlined />}
              onClick={() => this.onEdit(record.code, pageEnum.edit)}
            >
              编辑
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  onEdit = (id, status) => {
    if (status === pageEnum.view) {
      router.push({ name: 'portraitSelf_view', params: { id } });
    }
    if (status === pageEnum.edit) {
      router.push({ name: 'portraitSelf_edit', params: { id } });
    }
  };

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      query,
      loading,
      onPageSizeChange = EmptyFn,
      className,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              onPageSizeChange({ page, size: pageSize, query });
            },
          }}
          rowKey="tagId"
        />
      </div>
    );
  }
}

export default PortraitSelfList;
