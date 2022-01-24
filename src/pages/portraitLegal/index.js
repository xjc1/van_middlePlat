import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import { userTagExcelUrl } from '@/constants';
import commonDownload from '@/services/commonDownload';
import { message, notification } from 'antd';
import { KERNEL } from '@/services/api';
import PortraitStatistics from '../portrait/PortraitStatistics';
import PortraitLegalQueryBar from './PortraitLegalQueryBar';
import PortraitLegalList from './PortraitLegalList';
import styles from './portraitLegal.less';
import router from '@/utils/tRouter';
import { appUserType } from "@/utils/constantEnum";

@connect(({ portraitLegal }) => portraitLegal)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    tagNum: 0,
  };

  componentDidMount() {
    // this.fetchPortraitLegal({});
    this.fetchTagTotal();
  }

  fetchPortraitLegalWithQuery = ({ page = 0, size = 10, query = {} }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitLegal/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  };

  fetchPortraitLegal = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitLegal/fetchList',
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

    KERNEL.queryLegalTotalUserTagUsingGET().then(res => {
      const { total = 0 } = res;
      this.setState({ tagNum: total });
    });
  };

  // 下载模板
  downloadTemplate = async () => {
    const onClose = message.loading('下载中');
    await commonDownload({ url: userTagExcelUrl, name: '法人用户标签导入模板.xlsx' });
    onClose();
  };

  render() {
    const { total: matchedNumber } = this.props;
    const { tagNum } = this.state;
    return (
      <div>
        <PortraitLegalQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Edit onClick={() => {
                router.push({
                  name: 'portraitLegal_bulk',
                  query: { object: appUserType.legalPerson },
                });
              }}>批量操作</TButton.Edit>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    const { tagIds = [], corpName, uniqueCode } = query;
                    // 至少输入一个查询条件
                    if (!tagIds.length && !uniqueCode && !corpName) {
                      notification.warning({ message: '至少输入一个查询条件' });
                      return;
                    }
                    const ids = tagIds.map(it => it.value);
                    this.fetchPortraitLegalWithQuery({ query: { ...query, tagIds: ids } });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  // this.fetchPortraitLegalWithQuery({});
                  const { dispatch } = this.props;
                  dispatch({
                    type: 'portraitLegal/clearList',
                  });
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />
        <PortraitStatistics total={tagNum} matchedNumber={matchedNumber} />
        <PortraitLegalList
          className={styles.portraitLegalList}
          onPageSizeChange={this.fetchPortraitLegal}
        />
      </div>
    );
  }
}

export default Index;
