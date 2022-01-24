import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import _ from 'lodash';
import RuleManageQueryBar from './RuleManageQueryBar';
import RuleManageList from './RuleManageList';
import styles from './ruleManage.less';
import RuleForm from './ruleForm';
import ChangeTab from './exchangeTab';
import router from '@/utils/tRouter';
import TrackTool from '@/utils/TrackTool';

@connect(({ ruleManage }) => ruleManage)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    this.fetchRuleManage({});
  }

  fetchRuleManage = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'ruleManage/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  createRule = () => {
    router.push('ruleManage_create');
  };

  render() {
    const { info = {}, route, dispatch } = this.props;
    return (
      <div>
        <ChangeTab path={route.rName} />
        <RuleManageQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          actions={
            <>
              <TButton.Create onClick={this.createRule}>创建函数</TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.setState({ query }, () => this.fetchRuleManage({}));
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.setState({ query: {} }, () => this.fetchRuleManage({}));
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <RuleManageList className={styles.ruleManageList} fetchRuleList={this.fetchRuleManage} />
        {info.id && <RuleForm onClose={() => dispatch({ type: 'ruleManage/clearForm' })} />}
      </div>
    );
  }
}

export default Index;
