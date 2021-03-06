import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DataImport, OperateBar, TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import {
  asyncExportArguments,
  policyUpDownStatus,
  similarQuestionSimilarType,
  terminalType,
} from '@/utils/constantEnum';
import { MATTERHANDLEGUIDES } from '@/services/api';
import TrackTool from '@/utils/TrackTool';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import MatterHandleGuideQueryBar from './MatterHandleGuideQueryBar';
import MatterHandleGuideList from './MatterHandleGuideList';
import styles from './matterHandleGuide.less';
import { AsyncExportFile } from '@/components/bussinessComponents';
import { message } from 'antd';
import commonDownload from '@/services/commonDownload';
import authEnum, { authCheck, Auth } from '@/utils/auth';

@connect(({ matterHandleGuide, department }) => {
  return {
    ...matterHandleGuide,
    flatDeparts: department.flatDeparts,
  };
})
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
    relatedId: '',
    similarVisible: false,
  };

  componentDidMount() {
    this.fetchMatterHandleGuide({});
  }

  fetchMatterHandleGuideWithQuery = ({ page = 0, size = 10, query }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'matterHandleGuide/fetchList',
      payload: {
        page,
        size,
        query: { ...query },
      },
    });
    this.setState({ query });
  };

  fetchMatterHandleGuide = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'matterHandleGuide/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  changeStatus = async ({ id, status }) => {
    await MATTERHANDLEGUIDES.updateMatterHandleGuideStatusUsingPOST(
      id,
      status === policyUpDownStatus.down ? policyUpDownStatus.up : policyUpDownStatus.down,
    );
    const { pageSize, pageNum } = this.props;
    this.fetchMatterHandleGuideWithQuery({
      page: pageNum,
      size: pageSize,
      query: this.state.query,
    });
  };

  deleteMatterHandleGuide = async id => {
    await MATTERHANDLEGUIDES.deleteMatterHandleGuideUsingPOST(id);
    const { pageSize, pageNum } = this.props;
    this.fetchMatterHandleGuideWithQuery({
      page: pageNum,
      size: pageSize,
      query: this.state.query,
    });
  };

  onCancel = () => {
    this.setState({ similarVisible: false });
  };

  reload = () => {
    const { pageSize, pageNum } = this.props;
    this.fetchMatterHandleGuideWithQuery({
      page: pageNum,
      size: pageSize,
      query: this.state.query,
    });
  };

  // ????????????
  downloadEmpty = async () => {
    const onClose = message.loading('?????????');
    await commonDownload({
      url: '/matterHandleGuides/importTemplate',
      name: '??????????????????????????????.xlsx',
    });
    onClose();
  };

  // ????????????????????????
  exportMatterWithQuery = () => {
    const { query } = this.state;
    return new Promise((resolve, reject) => {
      MATTERHANDLEGUIDES.exportMatterHandleGuideAsyncUsingGET({
        params: query,
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  columns = [
    {
      title: '????????????',
      width: 300,
      dataIndex: 'guideTopic',
    },
    {
      title: '????????????',
      width: 150,
      dataIndex: 'createTime',
    },
    {
      title: '????????????',
      width: 150,
      dataIndex: 'collectDepartment',
      render: text => {
        const { flatDeparts } = this.props;
        return flatDeparts[text] || text;
      },
    },
    {
      title: '????????????',
      width: 150,
      dataIndex: 'updateTime',
    },
    {
      title: '????????????',
      width: 150,
      dataIndex: 'updateDept',
      render: text => {
        const { flatDeparts } = this.props;
        return flatDeparts[text] || text;
      },
    },
    {
      title: '????????????',
      width: 150,
      dataIndex: 'clientType',
      ellipsis: true,
      render: (types = []) => types.map(item => terminalType.$v_names[item]).join(' | '),
    },
    {
      title: '????????????',
      width: 150,
      dataIndex: 'regions',
      render: code => {
        const { dictNames } = this.props;
        return dictNames.SH00XZQH[code] ? dictNames.SH00XZQH[code] : code;
      },
    },
    {
      title: '???????????????',
      width: 150,
      dataIndex: 'status',
      render: text => policyUpDownStatus.$v_names[text],
    },
    {
      title: '??????',
      fixed: 'right',
      align: 'center',
      width: 180,
      render: (text, record) => (
        <OperateBar
          more={
            <>
              {authCheck(
                authEnum.matterHandleGuide_edit_alias,
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() =>
                    router.push({ name: 'matterHandleGuide_edit', params: { id: record.id } })
                  }
                >
                  ??????
                </OperateBar.Button>,
              )}
              {authCheck(
                authEnum.matterHandleGuide_publish,
                <OperateBar.Button
                  icon={<VerticalAlignMiddleOutlined />}
                  confirmText="??????"
                  onClick={() => {
                    this.changeStatus(record);
                  }}
                  confirmContent={record.status === 1 ? '??????????????????????' : '??????????????????????'}
                >
                  {record.status === 1 ? '??????' : '??????'}
                </OperateBar.Button>,
              )}

              {authCheck(
                authEnum.matterHandleGuide_operate,
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                >
                  ?????????
                </OperateBar.Button>,
              )}

              {authCheck(
                authEnum.matterHandleGuide_delete,
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="??????"
                  confirmContent="???????????????????????????,????????????????"
                  onClick={() => {
                    this.deleteMatterHandleGuide(record.id);
                  }}
                >
                  ??????
                </OperateBar.Button>,
              )}
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() =>
              router.push({ name: 'matterHandleGuide_view', params: { id: record.id } })
            }
          >
            ??????
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  render() {
    const { list, total, pageSize, pageNum } = this.props;
    const { query } = this.state;
    return (
      <div>
        <MatterHandleGuideQueryBar
          initialValues={TrackTool.getQueryParamsCache()}
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.matterHandleGuide_edit_alias}>
                <TButton.Create
                  onClick={() => {
                    router.push('matterHandleGuide_create');
                  }}
                >
                  ????????????
                </TButton.Create>
              </Auth>

              <TButton.Download onClick={this.downloadEmpty}>????????????</TButton.Download>

              <DataImport
                action="/matterHandleGuides/import"
                refresh={this.fetchMatterHandleGuide}
              />

              <AsyncExportFile
                applyDerive={this.exportMatterWithQuery}
                type={asyncExportArguments.matterHandleGuide}
                placement="bottom"
              />
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(nextQuery => {
                    this.fetchMatterHandleGuideWithQuery({ page: 0, size: 10, query: nextQuery });
                  });
                }}
              >
                ??????
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  console.log('-> ', this.queryForm);
                  this.queryForm.resetFields();
                  // ????????????
                  this.setState({ query }, () => {
                    this.fetchMatterHandleGuideWithQuery({ page: 0, size: 10, query: {} });
                  });
                }}
              >
                ??????
              </TButton.Reset>
            </>
          }
        />
        <MatterHandleGuideList
          columns={this.columns}
          dataSource={list}
          className={styles.matterHandleGuideList}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              this.fetchMatterHandleGuideWithQuery({ page, size: pageSize, query });
            },
          }}
        />
        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            reload={this.reload}
            type={similarQuestionSimilarType.matterHandleGuide}
          />
        )}
      </div>
    );
  }
}

export default Index;
