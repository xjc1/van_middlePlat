import React, { PureComponent } from 'react';
import { Tooltip, notification, Modal, Table, Badge } from 'antd';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import globalStyle from '@/global.less';
import { adaptText } from '@/utils/AdaptiveHelper';
import {
  matterIsResolvedMaterials,
  matterSource,
  matterStatus,
  commonShelf,
  policyUpDownStatus,
  dimensionMarkType,
  similarQuestionSimilarType,
  commonObjectType,
  commonUpdateStatus
  
} from '@/utils/constantEnum';
import {
  EditOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
  ScissorOutlined,
  FormOutlined,
  CopyOutlined,
  CheckOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import Link from 'umi/link';
import { MATTER } from '@/services/api';
import DimensionSignModal from '@/components/DimensionSign/dimensionSignModal';
import SimilarQuestion from '@/components/SimilarQuestion/SimilarQuestion';
import authEnum, { authCheck } from '@/utils/auth';

const statusColor = {
  0: 'blue',
  1: 'green',
  2: 'yellow',
  3: 'red',
  4: 'grey',
};

@connect(({ matters }) => matters)
class MattersList extends PureComponent {
  state = {
    linkedScenes: [],
    viewLinkedScenes: false,
    markId: null,
    modelVisible: false,
    markStaus: false,
    similarVisible: false,
  };

  columns = [
    {
      title: '事项名称',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: '分项名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title:"更新状态",
      width:100,
      dataIndex:'updateStatus',
      show:true,
      render:text=>(commonUpdateStatus.$v_names[text])
    },
    {
      title: '办理项名称',
      dataIndex: 'subItemName',
      width: 200,
    },
    {
      title: '事项分类',
      dataIndex: 'matterType',
      width: 100,
    },
    {
      title: '事项编码',
      dataIndex: 'matterCode',
      width: 100,
      render: text => (
        <Tooltip overlayStyle={{ minWidth: 300 }} title={text}>
          <div className={globalStyle.textOverviewEllipsis}>{text}</div>
        </Tooltip>
      ),
    },
    {
      title: '行政区划',
      dataIndex: 'regions',
      width: 100,
      render: code => {
        const { dictNames } = this.props;
        return dictNames.SH00XZQH[code];
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      width: 100,
      render: text => matterSource.$v_names[text],
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      width: 120,
      render: status => policyUpDownStatus.$v_names[status],
    },
    {
      title: '状态',
      dataIndex: 'disassembly',
      width: 100,
      render: text => <Badge color={statusColor[text]} text={matterStatus.$v_names[text]} />,
    },
    {
      title: '对象类型',
      dataIndex: 'object',
      width: 120,
      render: object => commonObjectType.$v_names[object],
    },
    {
      title: adaptText('拆解'),
      dataIndex: 'haveResolveMaterial',
      width: 100,
      render: text => adaptText(matterIsResolvedMaterials.$v_names[text]),
    },
    {
      title: '操作',
      dataIndex: 'object',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (text, record) => {
        const { editable = false } = record;
        return (
          <OperateBar
            more={
              <>
                {authCheck(
                  authEnum.matters_edit_alias,
                  <OperateBar.Button
                    disabled={!editable}
                    icon={<EditOutlined />}
                    onClick={() => {
                      router.push({ name: 'matters_edit', params: { matterid: record.id } });
                    }}
                  >
                    编辑
                  </OperateBar.Button>,
                )}
                {authCheck(
                  authEnum.matters_operate,
                  <OperateBar.Button
                    icon={<CheckOutlined />}
                    confirmText="警告"
                    confirmContent="确定需要完成该事项吗？"
                    onClick={() => this.handleCompleteMatter(record.id)}
                  >
                    完成
                  </OperateBar.Button>,
                )}

                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => this.handleLinkedScenes(record.id)}
                >
                  关联主题
                </OperateBar.Button>

                {authCheck(
                  authEnum.matters_split,
                  <OperateBar.Button icon={<ScissorOutlined />}>
                    <Link
                      to={router.path({ name: 'matters_materialSplit', params: { type: 'effective', id: record.id } })}>
                      {adaptText('材料拆解')}
                    </Link>
                  </OperateBar.Button>,
                )}

                <OperateBar.Button icon={<FormOutlined />}>
                  <Link to={router.path({
                    name: 'formSplit',
                    params: { id: record.id }
                  })}>表单拆解</Link>
                </OperateBar.Button>

                <OperateBar.Button
                  disabled={record.haveResolveMaterial !== matterIsResolvedMaterials.yes}
                  icon={<CopyOutlined />}
                >
                  <Link to={router.path({ name: 'formCopy', params: { id: record.id } })}>材料复制</Link>
                </OperateBar.Button>

                {authCheck(
                  authEnum.matters_publish,
                  <OperateBar.Button
                    icon={<VerticalAlignMiddleOutlined />}
                    confirmText="警告"
                    confirmContent={`确定需要${commonShelf.$v_names[record.status]}吗？`}
                    onClick={() =>
                      this.handleChangeStatus({ id: record.id, status: record.status })
                    }
                  >
                    {commonShelf.$v_names[record.status]}
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.matters_operate,
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
                  authEnum.matters_operate,
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => this.setState({ relatedId: record.id, similarVisible: true })}
                  >
                    相似问
                  </OperateBar.Button>,
                )}

                {authCheck(
                  authEnum.matters_delete,
                  <OperateBar.Button
                    danger
                    icon={<RollbackOutlined />}
                    confirmText="警告"
                    confirmContent="删除问题将不可能再恢复,确定删除吗?"
                    onClick={() => this.handleDeleteMatter(record.id)}
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
                router.push({ name: 'matters_view', params: { matterid: record.id } });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  handleDeleteMatter = async id => {
    const { fetchList } = this.props;
    await MATTER.deleteMatterUsingPOST(id);
    notification.success({
      message: '成功删除事项',
    });
    fetchList({});
  };

  handleCompleteMatter = async id => {
    const { fetchList } = this.props;
    await MATTER.completeMatterUsingPOST({ body: { id } });
    notification.success({
      message: '成功完成事项',
    });
    fetchList({});
  };

  handleLinkedScenes = async id => {
    const linkedScenes = await MATTER.findLinkedSceneUsingGET(id);
    this.setState({ linkedScenes, viewLinkedScenes: true });
  };

  handleChangeStatus = async ({ id, status }) => {
    const { fetchList } = this.props;
    await MATTER.editMatterPublishStatusUsingPOST({ body: { id, status: status ? 0 : 1 } });
    notification.success({
      message: `成功${commonShelf.$v_names[status]}事项`,
    });
    fetchList({});
  };

  onCancel = () => {
    this.setState({ modelVisible: false, markId: null, similarVisible: false });
  };

  reload = () => {
    const { pageNum, pageSize, fetchList } = this.props;
    fetchList({ page: pageNum, size: pageSize });
  };

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;
    const { linkedScenes, viewLinkedScenes } = this.state;

    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          dataSource={list}
          loading={loading}
          scroll={{ x: '100%' }}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
        <Modal
          title="关联主题信息"
          maskClosable={false}
          visible={viewLinkedScenes}
          onOk={() => this.setState({ viewLinkedScenes: false })}
          onCancel={() => this.setState({ viewLinkedScenes: false })}
          width="65%"
        >
          <Table
            size="small"
            columns={[
              {
                title: '主题名称',
                dataIndex: 'name',
              },
            ]}
            dataSource={linkedScenes}
            rowKey="id"
          />
        </Modal>
        {this.state.modelVisible && (
          <DimensionSignModal
            mark={this.state.markStaus}
            cid={this.state.markId}
            handleCancel={this.onCancel}
            reload={this.reload}
            type={dimensionMarkType.matter}
          />
        )}
        {this.state.similarVisible && (
          <SimilarQuestion
            relatedId={this.state.relatedId}
            handleCancel={this.onCancel}
            type={similarQuestionSimilarType.matter}
          />
        )}
      </div>
    );
  }
}

export default MattersList;
