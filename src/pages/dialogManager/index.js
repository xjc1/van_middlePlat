import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TButton } from '@/components/tis_ui';
import { message } from 'antd';
import DialogManagerQueryBar from './DialogManagerQueryBar';
import DialogManagerList from './DialogManagerList';
import DialogForm from './DialogForm';
import styles from './index.less';
import { MULTIROUNDSESSIONS } from '@/services/api';

@connect(({ dialogManager }) => dialogManager)
class Index extends PureComponent {
  queryForm = null;

  state = {
    query: {},
    focusItem: null,
    formDisabled: false,
  };

  constructor() {
    super();
    this.fetchDialogManager = this.fetchDialogManager.bind(this);
    this.fetchDialogManagerWithQuery = this.fetchDialogManagerWithQuery.bind(this);
    this.commitDialog = this.commitDialog.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.deleteDialog = this.deleteDialog.bind(this);
  }

  componentDidMount() {
    this.fetchDialogManager({});
  }

  fetchDialogManagerWithQuery({ page = 0, size = 10, query = {} }) {
    const { dispatch } = this.props;
    dispatch({
      type: 'dialogManager/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
    this.setState({ query });
  }

  fetchDialogManager({ page = 0, size = 10 }) {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'dialogManager/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  }

  async commitDialog(item) {
    const { focusItem } = this.state;
    if (focusItem.id) {
      await MULTIROUNDSESSIONS.updateMultiRoundSessionUsingPOST({
        body: {
          id: focusItem.id,
          ...item,
        },
      });
      message.success('新增成功');
    } else {
      await MULTIROUNDSESSIONS.createMultiRoundSessionUsingPOST({ body: item });
      message.success('更新成功');
    }
    this.fetchDialogManagerWithQuery({ query: this.state.query });
    this.setState({ focusItem: null });
  }

  changeStatus(record) {
    const { dispatch } = this.props;
    dispatch({
      type: 'dialogManager/changeStatus',
      payload: record,
    });
  }

  async deleteDialog(id) {
    await MULTIROUNDSESSIONS.deleteMultiRoundSessionUsingPOST(id);
    message.success('删除成功');
    this.fetchDialogManagerWithQuery({ query: this.state.query });
  }

  render() {
    const { focusItem, formDisabled } = this.state;
    return (
      <div>
        <DialogManagerQueryBar
          onForm={form => {
            this.queryForm = form;
          }}
          actions={
            <>
              <TButton.Create
                onClick={() => {
                  this.setState({
                    focusItem: {},
                    formDisabled: false,
                  });
                }}
              >
                新增对话
              </TButton.Create>
            </>
          }
          footer={
            <>
              <TButton.Search
                onClick={() => {
                  this.queryForm.validateFields().then(query => {
                    console.info(query);
                    this.fetchDialogManagerWithQuery({ query });
                  });
                }}
              >
                查询
              </TButton.Search>
              <TButton.Reset
                onClick={() => {
                  // 重置数据
                  this.queryForm.resetFields();
                  this.fetchDialogManagerWithQuery({ query: {} });
                }}
              >
                重置
              </TButton.Reset>
            </>
          }
        />

        <DialogManagerList
          className={styles.dialogManagerList}
          onPageSizeChange={this.fetchDialogManager}
          changeStatus={this.changeStatus}
          onView={item => {
            this.setState({
              focusItem: item,
              formDisabled: true,
            });
          }}
          handleDelete={this.deleteDialog}
          onEdit={item => {
            this.setState({
              focusItem: item,
              formDisabled: false,
            });
          }}
        />
        {focusItem && (
          <DialogForm
            title="会话"
            isCreate={!!focusItem.id}
            disabled={formDisabled}
            onClose={() => {
              this.setState({
                focusItem: null,
                formDisabled: false,
              });
            }}
            onSubmit={this.commitDialog}
            item={focusItem}
          />
        )}
      </div>
    );
  }
}

export default Index;
