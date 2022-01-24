import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Typography, Spin, message } from 'antd';
import router from '@/utils/tRouter';
import { ApiOutlined } from '@ant-design/icons';
import styles from './scenesQA.less';
import layoutSytles from '@/layouts/PageLayout/layout.less';
import ScenesEditPage from './editPages/ScenesEditPage';
import settingImg from './undraw_personal_settings_kihd.svg';
import { TurboTree } from '@/components/tis_ui';
import authEnum, { hasAuth } from '@/utils/auth';
import createNode, { generateId } from './createNode';
import { scenesType } from '@/utils/constantEnum';
import newEntrie from './undraw_new_entries_nh3h.png';

@connect(({ scenesQA, global, loading }) => ({
  ...scenesQA,
  global,
  loading: loading.effects['scenesQA/fetchScenes'],
  saveLoading: loading.effects['scenesQA/saveScenes'],
}))
class Index extends PureComponent {
  queryForm = null;

  componentDidMount() {
    const { match, dispatch } = this.props;
    const { nodeId, scenesId } = match.params;
    dispatch({
      type: 'scenesQA/fetchScenes',
      payload: {
        nodeId,
        scenesId,
      },
    });
    dispatch({ type: 'scenesQA/fetchSceneDetail', scenesId });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'scenesQA/clean',
    });
  }

  render() {
    const { match, focusNode, loading, tree, saveLoading, scenesId, dispatch } = this.props;
    const { nodeId } = match.params;
    return (
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.leftGrid} style={{ width: '40%' }}>
          <TurboTree
            nodeId={nodeId}
            draggable
            tree={tree}
            newEntrieImg={newEntrie}
            readonly={!hasAuth(authEnum.scenes_edit_alias)}
            actions={{ ...TurboTree.ACTIONS }}
            switcherIcon={node =>
              node.type === scenesType.CONNECT_SCENES && (
                <ApiOutlined
                  style={{
                    color: '#40a9ff',
                  }}
                />
              )
            }
            canDropIn={node => {
              if (node.current.type === scenesType.CONNECT_SCENES) {
                message.warning('子主题不能拥有下级节点, 该操作无法完成!');
                return false;
              }
              return true;
            }}
            canAddNode={node => {
              const { type = scenesType.NORMAL_SCENES } = node;
              return type === scenesType.NORMAL_SCENES;
            }}
            onCreateTree={() => {
              createNode(vals => {
                tree.push({
                  cid: generateId(),
                  newNode: true,
                  children: [],
                  ...vals,
                });
                dispatch({
                  type: 'scenesQA/touch',
                  payload: [...tree],
                });
              });
            }}
            onSave={() => {
              dispatch({
                type: 'scenesQA/saveScenes',
              });
            }}
            onDoubleSelect={node => {
              const { cid } = node;
              router.replace({ name: 'scenesQA_node', params: { scenesId, nodeId: cid } });
              dispatch({
                type: 'scenesQA/focusNode',
                payload: node,
              });
            }}
            onUpdate={next => {
              dispatch({
                type: 'scenesQA/touch',
                payload: next,
              });
            }}
          />
          {(loading || saveLoading) && <Spin className={styles.spinCenter} />}
        </div>
        <div className={layoutSytles.rightGrid} style={{ position: 'relative' }}>
          {focusNode ? (
            <ScenesEditPage key={focusNode.cid} node={focusNode} />
          ) : (
            <div className={styles.flexCenter}>
              <div className={styles.centered}>
                <Typography>
                  <Typography.Title level={3} style={{ color: '#3498db', textAlign: 'center' }}>
                    双击左侧节点编辑主题
                  </Typography.Title>
                </Typography>
                <img alt="setting" src={settingImg} width={400} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Index;
