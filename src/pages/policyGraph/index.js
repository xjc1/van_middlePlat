import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { message, Modal, Table, Space } from 'antd';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import { GraphinCanvas } from '@/components/bussinessComponents';
import router from '@/utils/tRouter';
import PolicyGraphQueryBar from './PolicyGraphQueryBar';
import PolicyGraphList from './PolicyGraphList';
import GraphPanel from './graphPanel';
import CreatePolicyNode from './createPolicyNode';
import { CATEGORIES } from './consts';
import styles from './index.less';
import { POLICYATLAS } from '@/services/api';
import commonDownload from "@/services/commonDownload";
import _ from "lodash";
import { commonHave, commonStatus } from "@/utils/constantEnum";

const SortDirections = {
  ascend: 0,
  descend: 1,
};

async function listExport() {
  const onClose = message.loading('导出中');
  await commonDownload({
    method: 'POST',
    url: '/policyAtlas/exportNotInStorage',
    name: '未入库政策列表.xlsx',
  });
  onClose();
};

@connect(({ policyGraph, loading }) => {
  return {
    ...policyGraph,
    loading: loading.effects['policyGraph/fetchList'],
  };
})
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: { isEffective: commonStatus.VALID, haveRelation: commonHave.yes },
    unCollectedNodes: null,
    addNodeModalVisible: false,
    selectedEdge: null,
  };

  constructor() {
    super();
    this.doAnalysis = this.doAnalysis.bind(this);
    this.onNodeSelected = this.onNodeSelected.bind(this);
    this.onEdgeSelected = this.onEdgeSelected.bind(this);
    this.onSearchNotCollecteNodes = this.onSearchNotCollecteNodes.bind(this);
    this.onCreatePolicyNode = this.onCreatePolicyNode.bind(this);
  }

  componentDidMount() {
    this.fetchPolicyGraphWithQuery({ query: this.state.query });
  }

  fetchPolicyGraphWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyGraph/fetchList',
      payload: {
        page,
        size,
      },
      condition: query,
    });
    // eslint-disable-next-line react/no-unused-state
    this.setState({ query });
  };

  fetchPolicyGraph = ({ page = 0, size = 10, sortConditions = {} }) => {
    const { dispatch, condition, query } = this.props;
    const { sortName, sortRegulation } = this.state;
    const newCondition = {
      ...query,
      ...condition,
      sortName,
      sortRegulation: SortDirections[sortRegulation],
      ...sortConditions,
    };
    dispatch({
      type: 'policyGraph/fetchList',
      payload: {
        page,
        size,
      },
      condition: newCondition,
    });
  };

  doAnalysis(item) {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyGraph/selectedItem',
      item,
    });
  }

  onNodeSelected(node) {
    const { dispatch, policyDetail } = this.props;
    if (policyDetail && policyDetail.name === node.name) {
      dispatch({
        type: 'policyGraph/cleanDetail',
      });
    } else {
      dispatch({
        type: 'policyGraph/selectedNode',
        id: Number(node.id),
      });
    }
    this.setState({
      selectedEdge: null,
    });
  }

  onEdgeSelected(edge) {
    const { dispatch } = this.props;
    dispatch({
      type: 'policyGraph/cleanDetail',
    });
    const { selectedEdge } = this.state;
    const compare = selectedEdge?.source === edge.source && selectedEdge?.target === edge.target;
    this.setState({
      selectedEdge: compare ? null : edge,
    });
  }

  onSearchNotCollecteNodes() {
    POLICYATLAS.queryNotInStoragePolicyUsingGET().then(data => {
      this.setState({ unCollectedNodes: data });
    });
  }

  onCreatePolicyNode() {
    this.setState({ addNodeModalVisible: true, selectedEdge: false });
  }

  render() {
    const { focusItem, policyDetail, dispatch, loading } = this.props;
    const { unCollectedNodes, addNodeModalVisible, query } = this.state;

    return (
      <div className={styles.policyGraphPage}>
        <PolicyGraphQueryBar
          initialValues={query}
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Button type="primary" onClick={this.onSearchNotCollecteNodes}>
                查询未入库政策
              </TButton.Button>
              <TButton.Edit
                onClick={() => {
                  router.push({
                    name: 'policyGraph_bulk',
                    query: _.reduce(query, (result, v, k) => {
                      if (!_.isUndefined(v)) {
                        // eslint-disable-next-line no-param-reassign
                        result[k] = v;
                      }
                      return result;
                    }, {}),
                  });
                }}
              >
                批量操作
              </TButton.Edit>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(nextQuery => {
                    this.fetchPolicyGraphWithQuery({ query: nextQuery });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchPolicyGraphWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />
        <PolicyGraphList
          loading={loading}
          className={classNames(styles.policyGraphList, focusItem && styles.policyGraphListHidden)}
          onPageSizeChange={pages => {
            this.fetchPolicyGraphWithQuery({ ...pages, query: this.state.query });
          }}
          onAnalysis={this.doAnalysis}
        />
        {focusItem && (
          <GraphPanel
            title={focusItem.name}
            className={styles.policyGraphCanvas}
            policyDetail={policyDetail}
            selectedEdge={this.state.selectedEdge}
            onFlush={() => {
              dispatch({
                type: 'policyGraph/reflushItem',
              });
              this.setState({
                selectedEdge: null,
              });
            }}
            onDrill={() => {
              dispatch({
                type: 'policyGraph/selectedItem',
                item: policyDetail,
              });
              this.setState({
                selectedEdge: null,
              });
            }}
            onAddNode={this.onCreatePolicyNode}
            onClose={() => {
              dispatch({
                type: 'policyGraph/cleanFocusItem',
              });
              this.setState({
                selectedEdge: null,
              });
            }}
            onPanelclose={() => {
              dispatch({
                type: 'policyGraph/cleanDetail',
              });
              this.setState({
                selectedEdge: null,
              });
            }}
          >
            <GraphinCanvas
              key={focusItem.cid}
              categories={CATEGORIES}
              nodes={focusItem.nodes}
              edges={focusItem.edges}
              onNodeSelected={this.onNodeSelected}
              onEdgeSelected={this.onEdgeSelected}
            />
          </GraphPanel>
        )}
        {
          <Modal
            title={<Space><span>未入库政策列表</span><TButton.Output size="small"
                                                              onClick={listExport}>导出</TButton.Output></Space>}
            visible={unCollectedNodes}
            destroyOnClose
            width="50%"
            footer={null}
            onCancel={() => {
              this.setState({ unCollectedNodes: null });
            }}
          >
            <Table
              size="small"
              dataSource={unCollectedNodes}
              rowKey="id"
              bordered
              columns={[
                {
                  title: '政策名称',
                  dataIndex: 'name',
                },
              ]}
            />
          </Modal>
        }
        {addNodeModalVisible && (
          <CreatePolicyNode
            onSubmit={values => {
              dispatch({
                type: 'policyGraph/createPolicyNode',
                values,
              }).then(() => {
                this.setState({ addNodeModalVisible: false });
              });
            }}
            focusItem={focusItem}
            onCancel={() => {
              this.setState({ addNodeModalVisible: false });
            }}
          />
        )}
      </div>
    );
  }
}

export default Index;
