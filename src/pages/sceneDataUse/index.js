import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import router from '@/utils/tRouter';
import SceneDataUseQueryBar from './SceneDataUseQueryBar';
import SceneDataUseList from './SceneDataUseList';
import styles from './sceneDataUse.less';

@connect(({ sceneDataUse }) => sceneDataUse)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
  };

  componentDidMount() {
    this.fetchSceneDataUse({});
  }

  fetchSceneDataUseWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'sceneDataUse/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchSceneDataUse = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'sceneDataUse/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  render() {
    return (
      <div>
        <SceneDataUseQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() => {
                  router.push('sceneDataReuseManage_create');
                }}
              >
                新增场景
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    console.info(query);
                    this.fetchSceneDataUseWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchSceneDataUseWithQuery({});
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <SceneDataUseList
          className={styles.sceneDataUseList}
          onPageSizeChange={this.fetchSceneDataUse}
        />
      </div>
    );
  }
}

export default Index;
