import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar, DateTools } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { FileSearchOutlined, EditOutlined } from '@ant-design/icons';
import { pageStatus as pageEnum } from '@/utils/constantEnum';
import router from '@/utils/tRouter';

@connect(({ portraitLegal, loading }) => ({
  ...portraitLegal,
  loading: loading.effects['portraitLegal/fetchList'],
}))
class PortraitLegalList extends PureComponent {
  columns = [
    {
      title: '统一社会信用代码',
      dataIndex: 'uniqueCode',
    },
    {
      title: '法人名称',
      dataIndex: 'corpName',
    },
    {
      title: '法人类别',
      dataIndex: 'corpType',
    },
    {
      title: '成立日期',
      dataIndex: 'establishDate',
      render: text => DateTools.transformDefaultFormat(text),
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
      router.push({ name: 'portraitLegal_view', params: { id } });
    }
    if (status === pageEnum.edit) {
      router.push({ name: 'portraitLegal_edit', params: { id } });
    }
  };

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      query,
      className,
      loading,
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

export default PortraitLegalList;
