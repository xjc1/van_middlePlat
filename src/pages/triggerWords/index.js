
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import TriggerWordsQueryBar from "./TriggerWordsQueryBar";
import { TButton } from "@/components/tis_ui";
import authEnum, { Auth } from '@/utils/auth';
import TriggerWordsList from "./TriggerWordsList";
import styles from './triggerWords.less';
import layoutSytles from '@/layouts/PageLayout/layout.less';
import TriggerWordForm from './triggerWordForm'


@connect(({ triggerWords }) => triggerWords)
class Index extends PureComponent {
  queryForm = null;
  state={
    query:{}
  };

  query = () => {
    const query = this.queryForm.getFieldsValue();
    this.setState({ query }, () => this.fetchList({}));
  };

  resetForm = () => {
    this.queryForm.resetFields();
    this.setState({ query: {} }, () => this.fetchList({}));
  };

  onCancel = () =>{
    const {dispatch} = this.props;
    dispatch({type:"triggerWords/closeModal"});
  };

  componentDidMount(){
    this.fetchList({})
  }

  componentWillUnmount(){
    const {dispatch} = this.props;
    dispatch({type:"triggerWords/reset"});
  };

  fetchList=({page=0, size=10})=>{
    const {dispatch} = this.props;
    const {query} = this.state;
    dispatch({
      type:"triggerWords/fetchList",
      payload: {
        page,
        size,
        query,
      },
    })
  };


  render() {
    const {dispatch, formData} = this.props;
    return (
      <div className={layoutSytles.twoGridPage}>
        <div className={layoutSytles.rightGrid}>
        <TriggerWordsQueryBar
          onForm={(form) => {
            this.queryForm = form;
          }}
          actions={
            <>
            <Auth auth={authEnum.triggerWords_edit_alias}>
              <TButton.Create
                onClick={()=>{dispatch({type:"triggerWords/openModal",payload: {}})}}
              >
                新增触发词
              </TButton.Create>
            </Auth>
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
        <TriggerWordsList className={styles.triggerWordsList} onChanePage={this.fetchList} />
        {formData && <TriggerWordForm onCancel={this.onCancel}/>}
        </div>
      </div>
    );
  }
}

export default Index;

