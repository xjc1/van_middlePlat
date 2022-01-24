import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton, OperateBar } from '@/components/tis_ui';
import { materialAuditStatus, asyncExportArguments } from '@/utils/constantEnum';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  FormOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import { RESOLVEMATERIAL } from '@/services/api';
import { AsyncExportFile } from '@/components/bussinessComponents';
import authEnum, { Auth, authCheck } from '@/utils/auth';
import MaterialModal from './components/formModal';
import AuditModal from './components/auditModal';
import MaterialSplitQueryBar from './MaterialSplitQueryBar';
import MaterialSplitList from './MaterialSplitList';
import styles from './materialSplit.less';
import EllipsisToolTip from '@/pages/projectView/EllipsisToolTip';

@connect(({ materialSplit }) => materialSplit)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    auditInfo: null,
    auditModalType: 'normal',
  };

  columns = [
    {
      title: '一级事项名称',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: '二级级事项名称',
      dataIndex: 'matterName',
      width: 200,
    },
    {
      title: '三级事项名称',
      dataIndex: 'subItemName',
      width: 200,
    },
    {
      title: '拆解材料名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '材料条件',
      dataIndex: 'action',
      width: 200,
    },
    {
      title: '结果',
      dataIndex: 'result',
      width: 200,
      render: text => {
        return <EllipsisToolTip title={text}>{text}</EllipsisToolTip>;
      },
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 200,
      render: text => {
        const { dictNames } = this.props;
        const [val] = _.at(dictNames, `SHSSBMSH.${text}`);
        return val || text;
      },
    },
    {
      title: '行政区划',
      dataIndex: 'regions',
      width: 200,
      render: text => {
        const { dictNames } = this.props;
        const [val] = _.at(dictNames, `SH00XZQH.${text}`);
        return val || text;
      },
    },
    {
      title: '对应原始材料',
      dataIndex: 'originalMaterialName',
      width: 200,
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      fixed: 'right',
      width: 100,
      render: text => materialAuditStatus.$v_names[text] || text,
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: 180,
      render: (text, record) => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                disabled={authCheck(authEnum.materialSplit_edit_alias)}
                icon={<EditOutlined />}
                onClick={() => {
                  const { dispatch } = this.props;
                  dispatch({
                    type: 'materialSplit/getMaterialDetail',
                    payload: {
                      id: record.id,
                      editAble: true,
                      modalTitle: '编辑材料',
                    },
                  });
                }}
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                disabled={authCheck(authEnum.materialSplit_edit_alias)}
                icon={<FormOutlined />}
                onClick={() => {
                  const { auditTime, auditState, advise } = record;
                  this.setState({
                    auditInfo: { id: record.id, auditTime, auditState, advise },
                    auditModalType: 'normal',
                  });
                }}
              >
                编辑审核状态
              </OperateBar.Button>
              <OperateBar.Button
                icon={<SolutionOutlined />}
                onClick={() => {
                  const { auditTime, auditState, advise } = record;
                  this.setState({
                    auditInfo: { id: record.id, auditTime, auditState, advise },
                    auditModalType: 'viewAdvise',
                  });
                }}
              >
                查看审核意见
              </OperateBar.Button>
              <OperateBar.Divider />
              <OperateBar.Button
                danger
                icon={<RollbackOutlined />}
                disabled={authCheck(authEnum.materialSplit_delete)}
                confirmText="警告"
                confirmContent="删除将不可能再恢复,确定删除吗?"
                onClick={() => {
                  RESOLVEMATERIAL.deleteResolveMaterialUsingPOST({ body: [record.id] }).then(() => {
                    this.fetchMaterialSplit({});
                  });
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
              const { dispatch } = this.props;
              dispatch({
                type: 'materialSplit/getMaterialDetail',
                payload: {
                  id: record.id,
                  editAble: false,
                  modalTitle: '查看材料',
                },
              });
            }}
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  componentDidMount() {
    this.fetchMaterialSplit({});
  }

  fetchMaterialSplitWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'materialSplit/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchMaterialSplit = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'materialSplit/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  // 异步提交导出请求
  exportMaterialWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      RESOLVEMATERIAL.asyncExportResolveMaterialUsingPOST({
        body: query,
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  render() {
    const { currentRecord, editAble, modalTitle } = this.props;
    const { auditInfo, auditModalType } = this.state;
    return (
      <div>
        <MaterialSplitQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.materialSplit_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    const { dispatch } = this.props;
                    dispatch({
                      type: 'materialSplit/onCreate',

                      modalTitle: '新增材料',
                    });
                  }}
                >
                  新增
                </TButton.Create>
              </Auth>
              <AsyncExportFile
                applyDerive={this.exportMaterialWithQuery}
                type={asyncExportArguments.splitMaterial}
                btnText="材料导出"
              />
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.fetchMaterialSplitWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchMaterialSplitWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <MaterialSplitList
          columns={this.columns}
          className={styles.materialSplitList}
          onPageSizeChange={this.fetchMaterialSplit}
        />
        {currentRecord && (
          <MaterialModal
            initialValues={currentRecord}
            disabled={!editAble}
            title={modalTitle}
            onCancel={() => {
              const { dispatch } = this.props;
              dispatch({
                type: 'materialSplit/onClear',
                payload: {},
              });
            }}
            reload={this.fetchMaterialSplit}
          />
        )}

        {auditInfo && (
          <AuditModal
            title={auditModalType === 'normal' ? '编辑审核状态' : '查看审核意见'}
            initialValues={auditInfo}
            auditModalType={auditModalType}
            onCancel={() => {
              this.setState({ auditInfo: null });
            }}
            reload={this.fetchMaterialSplit}
          />
        )}
      </div>
    );
  }
}

export default Index;
