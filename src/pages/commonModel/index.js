import React, { PureComponent } from 'react';
import { connect } from 'dva';
import CommonModelQueryBar from '@/pages/commonModel/CommonModelQueryBar';
import { TButton } from '@/components/tis_ui';
import CommonModelList from '@/pages/commonModel/CommonModelList';
import styles from './commonModel.less';
import EditModel from './editModel';
import SubscribeModel from './subscribeModel';
import { Button } from 'antd';

@connect(({ commonModel }) => commonModel)
class Index extends PureComponent {
  queryForm = null;

  query = ({ page = 0, size = 10 }) => {
    const params = this.queryForm.getFieldsValue();
    const { dispatch } = this.props;
    dispatch({
      type: 'commonModel/fetchList',
      payload: {
        page,
        size,
        ...params,
      },
    });
  };

  createModel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonModel/resetVisible',
      payload: { view: false, addOrEdit: true, info: {}, modelId: null },
    });
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonModel/resetInitial',
    });
  }

  resetData = () => {
    this.queryForm.resetFields();
  };

  render() {
    const { view, addOrEdit, subscribeView } = this.props;

    return (
      <div>
        <CommonModelQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create onClick={this.createModel}>新增模型</TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search onClick={this.query}>查询</TButton.Search>

              <TButton.Reset onClick={this.resetData}>重置</TButton.Reset>
            </>
          }
        />

        <CommonModelList className={styles.commonModelList} />
        {addOrEdit && <EditModel />}
        {subscribeView && <SubscribeModel />}
      </div>
    );
  }
}

export default Index;
