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
        title: '????????????',
        dataIndex: 'name',
        className: globalStyles.primaryColmn,
      },
      {
        title: '????????????',
        dataIndex: 'updateTime',
        render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
      },
      {
        title: '????????????',
        dataIndex: 'isShare',
        render: text => commonYesNo.$v_names[text],
      },
      {
        title: '????????????',
        dataIndex: 'collectDepartment',
        render: text => {
          return flatDeparts[text] || text;
        },
      },
      {
        title: '????????????',
        dataIndex: 'publishDepartment',
      },
      {
        title: '???????????????',
        dataIndex: 'status',
        render: text => policyUpDownStatus.$v_names[text],
      },
      {
        title: '??????',
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
                    ??????
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.policyWord_publish,
                  <OperateBar.Button
                    icon={<VerticalAlignMiddleOutlined />}
                    confirmText="??????"
                    onClick={() => this.changeStatus(record)}
                    confirmContent={record.status === 1 ? '??????????????????????' : '??????????????????????'}
                  >
                    {record.status === 1 ? '??????' : '??????'}
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.policyWord_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                  >
                    ?????????
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.policyWord_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="??????"
                    confirmContent="???????????????????????????????????????,????????????????"
                    onClick={() => this.deletePolicyWords(record)}
                  >
                    ??????
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => this.checkPolicyWord(record)}
            >
              ??????
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
