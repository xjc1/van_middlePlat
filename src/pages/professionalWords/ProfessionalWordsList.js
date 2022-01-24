import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { PROFESSIONALWORD } from '@/services/api';
import { message } from 'antd';
import { FileSearchOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { commonYesNo, professionalSourceType, sourceType } from '@/utils/constantEnum';
import router from '@/utils/tRouter';
import WordsDetailPopover from './WordsDetailPopover';

@connect(({ professionalWords, loading }) => ({
  ...professionalWords,
  loading: loading.effects['professionalWords/fetchList'],
}))
class ProfessionalWordsList extends PureComponent {
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '专业词名称',
      dataIndex: 'name',
    },
    {
      title: '同义/近义/同音词',
      render: record => <WordsDetailPopover value={record} />,
    },
    {
      title: '词性',
      dataIndex: 'wordFeature',
    },

    {
      title: '来源',
      dataIndex: 'sourceType',
      render: (sourceTypes = []) =>
        sourceTypes.map(text => professionalSourceType.$v_names[text] || text).join(','),
    },
    {
      title: '来源方式',
      dataIndex: 'source',
      render: source => sourceType.$v_names[source] || source,
    },
    {
      title: '是否参与纠错',
      dataIndex: 'isAmend',
      render: text => commonYesNo.$v_names[text],
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      render: record => {
        return (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => router.push({ name: 'professionalWords_edit', params: { id: record.id } })}
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  onClick={() => {
                    this.handleDelete(record.id);
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
                router.push({ name: 'professionalWords_view', params: { id: record.id } });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  handleDelete = id => {
    const { onPageSizeChange } = this.props;
    PROFESSIONALWORD.deleteProfessionalWordUsingPOST(id).then(() => {
      message.success('删除成功');
      onPageSizeChange({ page: 0 });
    });
  };

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      loading,
      onPageSizeChange = EmptyFn,
      className,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          loading={loading}
          columns={this.columns}
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

export default ProfessionalWordsList;
