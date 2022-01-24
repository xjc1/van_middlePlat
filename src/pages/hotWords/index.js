import React, { PureComponent } from 'react';
import { connect } from 'dva';
import HotWordsQueryBar from './HotWordsQueryBar';
import { TButton } from '@/components/tis_ui';
import authEnum, { Auth, authCheck } from '@/utils/auth';
import HotWordsList from './HotWordsList';
import styles from './hotWords.less';
import AddOrEdit from './addOrEditForm/addOrEdit';
import HotPages from './HotWordsPages';

@connect(({ hotWords }) => hotWords)
class Index extends PureComponent {
  queryForm = null;

  child = React.createRef();

  fetchHotWords() {
    const { dispatch, page, size } = this.props;
    dispatch({
      type: 'hotWords/fetchList',
      payload: {
        page,
        size,
      },
    });
  }

  fetchList = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotWords/fetchList',
      payload: {
        page: 0,
        size: 10,
        value,
      },
    });
  };

  query = () => {
    const value = this.queryForm.getFieldsValue();
    this.fetchList(value);
  };

  addHotWords = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotWords/addHotWords',
      payload: true,
    });
  };

  resetForm = () => {
    this.queryForm.setFieldsValue({
      clientType: undefined,
      objectType: undefined,
      department: undefined
    });
    this.child.setDisabled();
    this.fetchList({})
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'hotWords/reset' });
  }

  render() {
    const { openModal } = this.props;
    return (
      <HotPages value="hotWords">
        <HotWordsQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          ref={ref => {
            this.child = ref;
          }}
          actions={
            <>
              <Auth auth={authEnum.hotWords_edit_alias}>
                <TButton.Create onClick={this.addHotWords}>新增热词</TButton.Create>
              </Auth>
            </>
          }
          footer={
            <>
              <TButton.Search onClick={this.query}>查询</TButton.Search>

              <TButton.Reset onClick={this.resetForm}>重置</TButton.Reset>
            </>
          }
        />

        <HotWordsList className={styles.hotWordsList} />
        {openModal && <AddOrEdit />}
      </HotPages>
    );
  }
}

export default Index;
