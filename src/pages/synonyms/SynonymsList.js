import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar, DateTools } from '@/components/tis_ui';
import {
  VerticalAlignMiddleOutlined,
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import {
  policyUpDownStatus,
  dimensionMarkType,
  similarQuestionSimilarType,
} from '@/utils/constantEnum';
import globalStyles from '@/global.less';
import DimensionSignModal from '@/components/DimensionSign/dimensionSignModal';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import router from '@/utils/tRouter';
import authEnum, { authCheck } from '@/utils/auth';
import _ from 'lodash';

@connect(({ synonyms, createQuestionForm, loading }) => ({
  ...synonyms,
  ...createQuestionForm,
  loading: loading.effects['synonyms/fetch'],
}))
class SynonymsList extends PureComponent {
  state = {
    markId: null,
    modelVisible: false,
    markStaus: false,
    similarVisible: false,
  };

  changeStatus = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'synonyms/changeLoading', payload: true });
    let status = 1;
    if (record.status === 1) {
      status = 0;
    }
    dispatch({ type: 'synonyms/status', payload: { status, id: record.id } }).then(() => {
      this.getSynonym();
      dispatch({ type: 'synonyms/changeLoading', payload: false });
    });
  };

  deleteSynonym = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'synonyms/changeLoading', payload: true });
    dispatch({
      type: 'synonyms/delete',
      payload: { id: record.id },
    }).then(() => {
      this.getSynonym();
      dispatch({ type: 'synonyms/changeLoading', payload: false });
    });
  };

  // 获取问答列表
  getSynonym = () => {
    const { dispatch, params, page, size } = this.props;
    dispatch({
      type: 'synonyms/fetch',
      payload: { page, size },
      data: params,
    });
  };

  fetchSynonyms({ page = 0, pageSize = 10 }) {
    const { dispatch, params } = this.props;
    dispatch({
      type: 'synonyms/fetch',
      payload: { page, size: pageSize },
      data: params,
    });
  }

  // base64解码
  static decodeBase64(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  onCancel = () => {
    this.setState({ modelVisible: false, markId: null, similarVisible: false });
  };

  reload = () => {
    const { pageNum, size } = this.props;
    this.fetchSynonyms({ page: pageNum, size });
  };

  render() {
    const columns = [
      {
        title: '问题名称',
        dataIndex: 'question',
        className: globalStyles.primaryColmn,
      },
      {
        title: '更新日期',
        dataIndex: 'updateTime',
        width: '10%',
        render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        width: '10%',
        render: text => policyUpDownStatus.$v_names[text],
      },
      {
        title: '来源渠道',
        dataIndex: 'sourceType',
        width: '10%',
      },
      {
        title: '来源方式',
        dataIndex: 'source',
        width: '10%',
      },
      {
        title: '归属部门',
        width: '10%',
        dataIndex: 'attributionDepartment',
        render: text => {
          const { dictNames } = this.props;
          return _.map(text, code => {
            const [val] = _.at(dictNames, `SHGSBMSH.${code}`);
            // 不正确的也显示
            return val || code;
          }).join(' | ');
        },
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 180,
        render: (text, record) => (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.synonyms_edit_alias,
                  <OperateBar.Button
                    disabled={!record.editable}
                    icon={<EditOutlined />}
                    onClick={() => {
                      router.push({
                        name: 'synonyms_edit',
                        query: { id: record.id },
                      });
                    }}
                  >
                    编辑
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.synonyms_publish,
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
                  authEnum.synonyms_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() =>
                      this.setState({
                        markId: record.id,
                        modelVisible: true,
                        markStaus: record.mark,
                      })
                    }
                  >
                    {record.mark ? '修改标注' : '标注'}
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.synonyms_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                  >
                    相似问
                  </OperateBar.Button>,
                )}
                <OperateBar.Divider />

                {authCheck(
                  authEnum.synonyms_delete,
                  <OperateBar.Button
                    danger
                    disabled={!record.editable}
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除问题将不可能再恢复,确定删除吗?"
                    onClick={() => this.deleteSynonym(record)}
                  >
                    删除
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => {
                router.push({
                  name: 'synonyms_view',
                  query: { id: record.id },
                });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    const { list, total, size, pageNum, loading, className } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize: size,
            current: pageNum,
            onChange: page => {
              this.fetchSynonyms({ page, size });
            },
          }}
          rowKey="id"
        />
        {this.state.modelVisible && (
          <DimensionSignModal
            mark={this.state.markStaus}
            cid={this.state.markId}
            handleCancel={this.onCancel}
            reload={this.reload}
            type={dimensionMarkType.synonyms}
          />
        )}
        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            reload={this.reload}
            type={similarQuestionSimilarType.question}
          />
        )}
      </div>
    );
  }
}

export default SynonymsList;
