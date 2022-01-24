import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import authEnum, { Auth } from '@/utils/auth';
import _ from 'lodash';
import ConditionQueryBar from './ConditionQueryBar';
import ConditionList from './ConditionList';
import EditCondition from './editCondition';
import styles from './condition.less';
import ChangeTab from '../ruleManage/exchangeTab';

@connect(({ condition }) => condition)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    create: false,
  };

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query } = this.state;
    dispatch({
      type: 'condition/fetchList',
      params: {
        page,
        size,
      },
      body: query,
    });
  };

  render() {
    const { create } = this.state;
    const { route } = this.props;
    return (
      <div>
        <ChangeTab path={route.rName} />
        <ConditionQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <Auth auth={authEnum.ruleManage_conditionEdit_alias}>
                <TButton.Create onClick={() => this.setState({ create: true })}>
                  新增条件
                </TButton.Create>
              </Auth>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    this.setState({ query }, () => this.fetchList({}));
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.setState({ query: {} }, () => this.fetchList({}));
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <ConditionList className={styles.conditionList} fetchList={this.fetchList} />

        {create && (
          <EditCondition
            fetchList={this.fetchList}
            complete={() => {
              this.setState({ create: false });
            }}
          />
        )}
      </div>
    );
  }
}

export default Index;
