import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { functionType, pageStatus } from '@/utils/constantEnum';
import { EditOutlined, FileSearchOutlined, RollbackOutlined } from '@ant-design/icons';
import authEnum, { hasAuth } from '@/utils/auth';

@connect(({ functionWord }) => functionWord)
class FunctionWordList extends PureComponent {
  editFunctionWord = data => {
    const { changeData } = this.props;
    changeData(data);
  };

  deleteFunctionWords = (data = {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'functionWord/deleteFunction',
      id: data.id,
    });
  };

  check = data => {
    const { changeData } = this.props;
    changeData(data, pageStatus.view);
  };

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: '15%',
      },
      {
        title: '功能词描述',
        dataIndex: 'word',
        render: text => text.join('；'),
      },
      {
        title: '功能词类型',
        dataIndex: 'type',
        render: text => {
          return functionType.$v_names[text];
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        show: true,
        width: '20%',
        align: 'center',
        render: (text, record) => (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  icon={<EditOutlined />}
                  disabled={!hasAuth(authEnum.functionWords_edit_alias)}
                  onClick={() => this.editFunctionWord(record)}
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  disabled={!hasAuth(authEnum.functionWords_delete)}
                  confirmContent="删除功能词将不可能再恢复,确定删除吗?"
                  onClick={() => this.deleteFunctionWords(record)}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button icon={<FileSearchOutlined />} onClick={() => this.check(record)}>
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    const { list, total, pageSize, pageNum, onPageSizeChange = EmptyFn, className } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={columns}
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

export default FunctionWordList;
