import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Radio } from 'antd';
import _ from 'lodash';
import { TButton } from '@/components/tis_ui';
import { conditionReviewType } from '@/utils/constantEnum';
import PortraitTagsAuditQueryBar from './PortraitTagsAuditQueryBar';
import PortraitTagsAuditList from './PortraitTagsAuditList';
import styles from './portraitTagsAudit.less';
import TrackTool from '@/utils/TrackTool';

@connect(({ portraitTagsAudit }) => portraitTagsAudit)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: TrackTool.getQueryParamsCache(),
  };

  componentDidMount() {
    const { curReviewType } = this.props;
    if (curReviewType === conditionReviewType.NEED_REVIEW) {
      this.setState({ query: { status: 0 } }, () => this.fetchList({}));
      this.queryForm.setFieldsValue({
        status: 0,
      });
      return;
    }
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const { dispatch } = this.props;
    const { query = {} } = this.state;
    dispatch({
      type: 'portraitTagsAudit/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  handleSearch = () => {
    this.queryForm.validateFields().then(query => {
      this.setState({ query }, () => this.fetchList({}));
    });
  };

  handleConditionChange = e => {
    const newType = e.target.value;
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitTagsAudit/saveCurReviewType',
      curReviewType: newType,
    });
    this.queryForm.resetFields();
    this.queryForm.setFieldsValue({
      status: newType === conditionReviewType.NEED_REVIEW ? 0 : undefined,
    });
    this.handleSearch();
  };

  render() {
    const { curReviewType } = this.props;

    return (
      <>
        <Card style={{ marginBottom: '10px' }}>
          <Radio.Group
            options={_.map(conditionReviewType, (v, k) => ({
              label: conditionReviewType.$names[k],
              value: v,
            }))}
            value={curReviewType}
            onChange={this.handleConditionChange}
            optionType="button"
            buttonStyle="solid"
          />
        </Card>
        <PortraitTagsAuditQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          initialValues={TrackTool.getQueryParamsCache()}
          footer={
            <>
              <TButton.Search onClick={this.handleSearch}>查询</TButton.Search>
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

        <PortraitTagsAuditList
          className={styles.portraitTagsAuditList}
          fetchList={this.fetchList}
        />
      </>
    );
  }
}

export default Index;
