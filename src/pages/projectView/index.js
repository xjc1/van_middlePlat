import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from "umi/router";
import ProjectViewQueryBar from "./ProjectViewQueryBar";
import { TButton } from "@/components/tis_ui";
import ProjectViewList from "./ProjectViewList";
import styles from './projectView.less';
import layoutSytles from '@/layouts/PageLayout/layout.less';

@connect(({ projectView,global: { rootDict } }) => ({...projectView, rootDict}))
class Index extends PureComponent {
  queryForm = null;

  state={
    query:{}
  };

  componentDidMount(){
    this.fetchList({})
  }

  fetchList=({ page=0, size=10 })=>{
    const {dispatch, rootDict} = this.props;
    const {query} = this.state;
    dispatch({
      type:"projectView/fetchList",
      payload: { page, size, query, rootId: rootDict.XMYLNEW},
    })
  };

  query = () => {
    const query = this.queryForm.getFieldsValue();
    query.classification = query.classification &&
      _.flatten(query.classification.map(({codes})=>codes))
    this.setState({ query }, () => this.fetchList({}));
  };

  resetForm = () => {
    this.queryForm.resetFields();
    this.setState({ query: {} }, () => this.fetchList({}));
  };

  render() {
    return (
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.rightGrid}>
        <ProjectViewQueryBar
          onForm={(form) => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() => {
                  router.push('projectView_create');
                }}
              >
                新增项目一览
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.query();
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset onClick={this.resetForm}>重置</TButton.Reset>
            </>
          }
        />
        <ProjectViewList className={styles.projectViewList} onPageSizeChange={this.fetchList} />
        </div>
      </div>
    );
  }
}

export default Index;

