import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  FileSearchOutlined,
  EditOutlined,
  RollbackOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
  VerticalAlignMiddleOutlined,
  FundViewOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';
import { TTable, OperateBar } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import {
  commonAuditState,
  commonAbsence,
  policyUpDownStatus,
  dimensionMarkType,
  similarQuestionSimilarType,
  commonShelf,
  commonObjectType,
  configTheme,
  scenesIsSmartType,
} from '@/utils/constantEnum';
import globalStyles from '@/global.less';
import { SCENE } from '@/services/api';
import DimensionSignModal from '@/components/DimensionSign/dimensionSignModal';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import authEnum, { authCheck } from '@/utils/auth';
import CopyScene from './components/copyScene';
import { adaptText } from "@/utils/AdaptiveHelper";

@connect(({ scenes, systemParamsConfig }) => {
  const { configValues = {} } = systemParamsConfig;
  return {
    ...scenes,
    themeConfig: configValues.theme,
  };
})
class ScenesList extends PureComponent {
  state = {
    markId: null,
    modelVisible: false,
    markStatus: false,
    copyScene: null,
    similarVisible: false,
  };

  columns = [
    {
      title: adaptText('主题名称'),
      dataIndex: 'name',
      width: '25%',
      className: globalStyles.primaryColmn,
    },
    {
      title: '三级分类',
      dataIndex: 'threeType',
      width: '10%',
      ellipsis: true,
    },
    {
      title: '申报对象',
      dataIndex: 'object',
      render: object => commonObjectType.$v_names[object],
    },
    {
      title: '行政区划',
      dataIndex: 'region',
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      render: status => policyUpDownStatus.$v_names[status],
    },
    {
      title: '总体审核状态',
      dataIndex: 'auditState',
      render: auditState => commonAuditState.$v_names[auditState],
    },
    {
      title: '是否缺失材料',
      dataIndex: 'materialAbsence',
      render: materialAbsence => commonAbsence.$v_names[materialAbsence],
    },
    {
      title: adaptText('主题类型'),
      dataIndex: 'sceneType',
      render: sceneType => scenesIsSmartType.$v_names[sceneType],
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: record => {
        const { name, sid } = record;
        const { themeConfig } = this.props;
        return (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.scenes_edit_alias,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() =>
                      router.push({ name: 'scenes_edit', params: { sceneId: record.id } })
                    }
                    disabled={!record.editable}
                  >
                    编辑
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.scenes_publish,
                  <OperateBar.Button
                    icon={<VerticalAlignMiddleOutlined />}
                    onClick={() => this.handleSelf(record.id, record.status)}
                    disabled={!record.editable}
                  >
                    {commonShelf.$v_names[record.status]}
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.scenes_edit_alias,
                  <OperateBar.Button
                    icon={<CopyOutlined />}
                    onClick={() => this.setState({ copyScene: record })}
                  >
                    主题复制
                  </OperateBar.Button>,
                )}
                {themeConfig && themeConfig[configTheme.can_preview] === '1' && (
                  <OperateBar.Button
                    disabled={!themeConfig[configTheme.preview_address]}
                    icon={<FundViewOutlined />}
                    onClick={() => {
                      window.open(
                        `${
                          themeConfig[configTheme.preview_address]
                        }?sceneName=${name}&sceneId=${sid}`,
                      );
                    }}
                  >
                    主题预览
                  </OperateBar.Button>
                )}

                <OperateBar.Button
                  icon={<QuestionCircleOutlined />}
                  onClick={() =>
                    router.push({ name: 'scenesQA_none', params: { scenesId: record.id } })
                  }
                  disabled={!record.editable}
                >
                  引导问卷
                </OperateBar.Button>

                <OperateBar.Button
                  icon={<QuestionCircleOutlined />}
                  onClick={() =>
                    router.push({ name: 'conditions', params: { sceneId: record.id } })
                  }
                  disabled={!record.editable}
                >
                  办理条件
                </OperateBar.Button>

                {authCheck(
                  authEnum.scenes_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() =>
                      this.setState({
                        markId: record.id,
                        modelVisible: true,
                        markStatus: record.mark,
                      })
                    }
                    disabled={!record.editable}
                  >
                    {record.mark ? '修改标注' : '标注'}
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.scenes_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                    disabled={!record.editable}
                  >
                    相似问
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.scenes_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除主题将无法再恢复,确定删除吗?"
                    onClick={() => this.handleDeleteScene(record)}
                    disabled={!record.editable}
                  >
                    删除
                  </OperateBar.Button>,
                )}
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => router.push({ name: 'scenes_view', params: { sceneId: record.id } })}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemParamsConfig/fetchThemeConfig',
    });
  }

  handleSelf = async (id, status) => {
    if (status) {
      await SCENE.sceneWithdrawUsingPOST(id);
    } else {
      await SCENE.scenePublishUsingPOST(id);
    }
    this.props.fetchList({});
    notification.success({
      message: `成功${commonShelf.$v_names[status]}`,
    });
  };

  handleDeleteScene = async ({ id }) => {
    const { pageNum, pageSize, fetchList } = this.props;
    await SCENE.removeSceneUsingPOST(id);
    fetchList({ page: pageNum, size: pageSize });
    notification.success({
      message: `成功删除`,
    });
  };

  reload = () => {
    const { pageNum, pageSize, fetchList } = this.props;
    fetchList({ page: pageNum, size: pageSize });
  };

  onCancel = () => {
    this.setState({ modelVisible: false, markId: null, similarVisible: false });
  };

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      dispatch,
      focusItem,
      loading,
      fetchList,
      ...others
    } = this.props;

    const { copyScene } = this.state;

    return (
      <div>
        <TTable
          columns={this.columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            showQuickJumper: true,
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
          {...others}
        />
        {this.state.modelVisible && (
          <DimensionSignModal
            mark={this.state.markStatus}
            cid={this.state.markId}
            handleCancel={this.onCancel}
            reload={this.reload}
            type={dimensionMarkType.scenes}
          />
        )}

        {copyScene && (
          <CopyScene
            close={() => {
              fetchList({});
              this.setState({ copyScene: null });
            }}
            info={copyScene}
          />
        )}

        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            type={similarQuestionSimilarType.scene}
          />
        )}
      </div>
    );
  }
}

export default ScenesList;
