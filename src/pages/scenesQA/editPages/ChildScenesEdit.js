import React from 'react';
import styles from './ChildScenesEdit.less';
import { connect } from 'dva';
import { SCENE } from '@/services/api';
import { Button, Result } from 'antd';
import ConfigChildScenes from '@/pages/scenesQA/editPages/ConfigChildScenes';
import { ApiOutlined } from '@ant-design/icons';
import _ from 'lodash';
import DescriptionPanel from '@/pages/scenesQA/editPages/DescriptionPanel';
import { Code2Name } from '@/utils/DictTools';

@connect()
class ChildScenesEdit extends React.PureComponent {
  state = {
    configScenes: false,
    selectedNode: null,
    failed404: false,
  };

  getSceneInfo = async sid => {
    if (!_.isUndefined(sid)) {
      try {
        const selectedNode = await SCENE.getSceneDetailByScenesIdUsingGET(sid);
        // 翻译行政区划
        const {
          dictNames: { SH00XZQH },
        } = await Code2Name(
          Promise.resolve({
            content: [selectedNode],
          }),
          ['SH00XZQH', 'regions'],
        );
        selectedNode.regionsText = SH00XZQH[selectedNode.regions];
        this.setState({ selectedNode });
      } catch (err) {
        const { status } = err;
        if (status === 404) {
          this.setState({
            failed404: true,
          });
        }
      }
    }
  };

  componentDidMount() {
    const { node } = this.props;
    this.getSceneInfo(node.scenesId);
  }

  render() {
    const { dispatch } = this.props;
    const { configScenes, selectedNode, failed404 } = this.state;

    return (
      <div className={styles.main}>
        <div className={styles.viewPanel}>
          {failed404 && <Result status="warning" title="未找到关联的子场景." />}
          {selectedNode && <DescriptionPanel node={selectedNode} />}
          <Button
            icon={<ApiOutlined />}
            className={styles.createBtn}
            onClick={() => this.setState({ configScenes: true })}
            type="primary"
            block
          >
            配置关联场景
          </Button>
        </div>
        {configScenes && (
          <ConfigChildScenes
            onCancel={() =>
              this.setState({
                configScenes: false,
              })
            }
            onSelect={sid => {
              const { node } = this.props;
              node.scenesId = sid;
              this.getSceneInfo(sid);
              this.setState({ configScenes: false });
              dispatch({
                type: 'scenesQA/touch',
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default ChildScenesEdit;
