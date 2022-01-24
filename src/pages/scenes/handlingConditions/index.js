import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Typography } from 'antd';
import layoutStyles from '@/layouts/PageLayout/layout.less';
import styles from '@/pages/scenesQA/scenesQA.less';
import HCEditPage from './HCEditPage';
import HCTree from './HCTree';
import settingImg from './undraw_personal_settings_kihd.svg';

@connect(({ handlingConditions, loading }) => ({
  ...handlingConditions,
  loading: loading.effects['handlingConditions/fetchTreeData'],
  saveLoading: loading.effects['handlingConditions/updateTreeData'],
}))
class Index extends Component {
  componentDidMount() {
    const {
      match: {
        params: { sceneId, nodeId },
      },
      dispatch,
    } = this.props;
    dispatch({
      type: 'handlingConditions/fetchTreeData',
      payload: {
        sceneId,
        nodeId,
      },
    });
    dispatch({
      type: 'handlingConditions/fetchSceneDetail',
      sceneId,
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'handlingConditions/clean',
    });
  }

  render() {
    const {
      match: {
        params: { sceneId, nodeId },
      },
      selectedNode,
      loading,
      saveLoading,
    } = this.props;

    return (
      <div className={layoutStyles.twoGridPage}>
        <div className={layoutStyles.leftGrid} style={{ width: '40%' }}>
          <HCTree sceneId={sceneId} nodeId={nodeId} />
          {(loading || saveLoading) && <Spin className={styles.spinCenter} />}
        </div>
        <div className={layoutStyles.rightGrid} style={{ position: 'relative' }}>
          {selectedNode ? (
            <HCEditPage key={selectedNode} />
          ) : (
            <div className={styles.flexCenter}>
              <div className={styles.centered}>
                <Typography>
                  <Typography.Title level={3} style={{ color: '#3498db', textAlign: 'center' }}>
                    双击左侧节点编辑条件
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
