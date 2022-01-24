import React, { PureComponent } from 'react';
import router from '@/utils/tRouter';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import { policyUpDownStatus, commonYesNo,commonUpdateStatus } from '@/utils/constantEnum';
import globalStyles from '@/global.less';
import authEnum, { authCheck } from '@/utils/auth';

@connect(({ article, loading }) => ({ ...article, loading: loading.effects['article/fetchList'] }))
class ArticleList extends PureComponent {
  componentDidMount() {
    this.fetchList();
  }

  fetchList = () => {
    const { dispatch, query, pageSize, pageNum } = this.props;
    dispatch({
      type: 'article/fetchList',
      payload: { size: pageSize, page: pageNum, query },
    });
  };

  changePage = (page, pageSize) => {
    const { dispatch, query } = this.props;
    dispatch({
      type: 'article/fetchList',
      payload: { size: pageSize, page, query },
    });
  };

  changeStatus = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'article/changeStatus', payload: record });
  };

  deleteArticle = record => {
    const { dispatch } = this.props;
    dispatch({ type: 'article/deleteArticle', id: record.id });
  };

  render() {
    const columns = [
      {
        title: '文章名称',
        dataIndex: 'name',
        className: globalStyles.primaryColmn,
      },
      {
        title: '文章级别',
        dataIndex: 'level',
        width: '8%',
        render: text => {
          const { dictNames } = this.props;
          return _.get(dictNames, `ZCJB0001.${text}`, text);
        },
      },
      {
        title:"更新状态",
        dataIndex:"updateStatus",
        render:text=>(commonUpdateStatus.$v_names[text])
      },
      {
        title: '行政区划',
        dataIndex: 'regions',
        width: '8%',
        render: text => {
          const { dictNames } = this.props;
          return _.get(dictNames, `SH00XZQH.${text}`, text);
        },
      },
      {
        title: '终端类型',
        dataIndex: 'clientType',
        width: '15%',
        render: (types = []) => {
          const { dictNames } = this.props;
          return types.map(type => _.get(dictNames, `ZDLX.${type}`, type)).join();
        },
      },
      {
        title: '对象类型',
        dataIndex: 'objectType',
        width: '8%',
        render: text => {
          const { dictNames } = this.props;
          return _.get(dictNames, `DXLX0001.${text}`, text);
        },
      },
      {
        title: '归属部门',
        width: '10%',
        dataIndex: 'attributionDepartment',
        render: text => {
          const { dictNames } = this.props;
          return _.map(text, code => {
            return _.get(dictNames, `SHGSBMSH.${code}`, code);
          }).join(' | ');
        },
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        width: '10%',
        render: text => policyUpDownStatus.$v_names[text],
      },
      {
        title: '是否置顶',
        dataIndex: 'top',
        width: '8%',
        render: text => commonYesNo.$v_names[text],
      },
      {
        title: '操作',
        dataIndex: 'top',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.article_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    disabled={!record.editable}
                    onClick={() =>
                      router.push({ name: 'article_edit', params: { articleId: record.id } })
                    }
                  >
                    编辑
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.article_publish,
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
                  authEnum.article_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    disabled={!record.editable}
                    confirmContent="删除文章将不可能再恢复,确定删除吗?"
                    onClick={() => this.deleteArticle(record)}
                  >
                    删除
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => router.push({name: 'article_view', params:{articleId: record.id}})}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    const { list, total, pageSize, pageNum, className, loading } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              this.changePage(page, pageSize);
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default ArticleList;
