import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import { notification } from 'antd';
import { KERNEL } from '@/services/api';
import PortraitStatistics from '../portrait/PortraitStatistics';
import PortraitSelfQueryBar from './PortraitSelfQueryBar';
import PortraitSelfList from './PortraitSelfList';
import styles from './portraitSelf.less';
import router from '@/utils/tRouter';

@connect(({ portraitSelf }) => portraitSelf)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    tagNum: 0,
  };

  componentDidMount() {
    // 输入查询条件才有列表数据
    // this.fetchPortraitSelf({});
    this.fetchTagTotal();
  }

  fetchPortraitSelfWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitSelf/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchPortraitSelf = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitSelf/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  fetchTagTotal = () => {
    const {
      query: { name = '' },
    } = this.state;

    KERNEL.queryTotalUserTagUsingGET().then(res => {
      const { total = 0 } = res;
      this.setState({ tagNum: total });
    });
  };

  render() {
    const { total: matchedNumber } = this.props;
    const { tagNum, query } = this.state;
    return (
      <div>
        <PortraitSelfQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Edit onClick={() => {
                router.push({
                  name: 'portraitSelf_bulk',
                  query,
                });
              }}>批量操作</TButton.Edit>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    const { tagIds = [], uniqueCode } = query;
                    // 至少输入一个查询条件
                    if(!tagIds.length && !uniqueCode) {
                      notification.warning({message:'至少输入一个查询条件'})
                      return;
                    }
                    const ids = tagIds.map(it => it.value);
                    this.fetchPortraitSelfWithQuery({ query: { uniqueCode, tagIds: ids } });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  // this.fetchPortraitSelfWithQuery({});
                  const { dispatch } = this.props;
                  dispatch({
                    type: 'portraitSelf/clearList',
                  });
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <PortraitStatistics total={tagNum} matchedNumber={matchedNumber} />

        <PortraitSelfList
          className={styles.portraitSelfList}
          onPageSizeChange={this.fetchPortraitSelf}
        />
      </div>
    );
  }
}

export default Index;
