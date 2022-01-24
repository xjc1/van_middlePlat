import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, DateTools, OperateBar } from '@/components/tis_ui';
import { policyUpDownStatus, commonYesNo, similarQuestionSimilarType } from '@/utils/constantEnum';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import globalStyles from '@/global.less';
import {
  VerticalAlignMiddleOutlined,
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import authEnum, { authCheck } from '@/utils/auth';

@connect(({ policyWords, department, loading }) => ({
  ...policyWords,
  flatDeparts: department.flatDeparts,
  loading: loading.effects['policyWords/fetchList'],
}))
class PolicyWordsList extends PureComponent {
  state = {
    similarVisible: false,
  };

  componentDidMount() {
    this.fetchPolicyWords();
  }

  fetchPolicyWords() {
    const { dispatch, page, size } = this.props;
    dispatch({
      type: 'policyWords/fetchList',
      payload: {
        page,
        size,
      },
    });
  }

  changePage = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyWords/fetchList',
      payload: params,
    });
  };

  editPolicyWords = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'policyWords/detail', payload: record.id });
  };

  changeStatus = record => {
    const { dispatch } = this.props;
    const body = { id: record.id };
    if (record.status === 1) {
      body.status = 0;
    } else {
      body.status = 1;
    }
    dispatch({ type: 'policyWords/status', payload: body });
  };

  deletePolicyWords = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'policyWords/delete', payload: record.id });
  };

  checkPolicyWord = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'policyWords/detail', payload: record.id, check: true });
  };

  onCancel = () => {
    this.setState({ similarVisible: false });
  };

  render() {
    const { flatDeparts = {} } = this.props;
    const columns = [
      {
        title: '词条名称',
        dataIndex: 'name',
        className: globalStyles.primaryColmn,
      },
      {
        title: '更新日期',
        dataIndex: 'updateTime',
        render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
      },
      {
        title: '是否共享',
        dataIndex: 'isShare',
        render: text => commonYesNo.$v_names[text],
      },
      {
        title: '采录部门',
        dataIndex: 'collectDepartment',
        render: text => {
          return flatDeparts[text] || text;
        },
      },
      {
        title: '发布部门',
        dataIndex: 'publishDepartment',
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        render: text => policyUpDownStatus.$v_names[text],
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.policyWord_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.editPolicyWords(record)}
                  >
                    编辑
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.policyWord_publish,
                  <OperateBar.Button
                    icon={<VerticalAlignMiddleOutlined />}
                    confirmText="警告"
                    onClick={() => this.changeStatus(record)}
                    confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                  >
                    {record.status === 1 ? '下架' : '上架'}
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.policyWord_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                  >
                    相似问
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.policyWord_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除百科词条将不可能再恢复,确定删除吗?"
                    onClick={() => this.deletePolicyWords(record)}
                  >
                    删除
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => this.checkPolicyWord(record)}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];

    const { list, total, page, size, className, loading } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          pagination={{
            total,
            pageSize: size,
            current: page,
            onChange: nextPage => {
              this.changePage({ page: nextPage, size });
            },
          }}
          loading={loading}
          rowKey={item => item.id}
        />

        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            type={similarQuestionSimilarType.policyWords}
          />
        )}
      </div>
    );
  }
}

export default PolicyWordsList;
