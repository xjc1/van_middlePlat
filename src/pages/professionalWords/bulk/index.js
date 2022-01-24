/* eslint-disable no-fallthrough */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TItem, BulkEdit, ArrayFormatTextArea } from '@/components/tis_ui';
import { Skeleton, message, Popover } from 'antd';
import { professionalSourceType, commonYesNo } from '@/utils/constantEnum';
import { PROFESSIONALWORD } from '@/services/api';

// const deaultLeftLayout = {
//   col: 8,
//   wrapperCol: { span: 8 },
//   labelCol: { span: 16 },
// };

const deaultRightLayout = {
  col: 16,
  wrapperCol: { span: 22 },
  labelCol: { span: 0 },
};

@connect(({ professionalWords, loading }) => ({
  ...professionalWords,
  loading: loading.effects['professionalWords/fetchList'],
}))
class Index extends PureComponent {
  state = {
    query: {},
    initialValues: {
      status: 1,
      frequency: 0,
      tuningWordOperationType: 1,
      isUpdateDisassemblyToComplete: 0,
    },
    searchPopoverVisible: false,
    bulkMatterCodes: [],
  };

  createForm = React.createRef();

  bulkMethod = null;

  columns = [
    {
      title: '专业词名称',
      // width: 150,
      dataIndex: 'name',
    },
    {
      title: '来源',
      dataIndex: 'sourceType',
      render: (sourceTypes = []) =>
        sourceTypes.map(text => professionalSourceType.$v_names[text] || text).join(','),
    },
    {
      title: '是否参与纠错',
      width: 100,
      dataIndex: 'isAmend',
      render: text => commonYesNo.$v_names[text],
    },
  ];

  componentDidMount() {
    this.fetchProfessionalWords({});
  }

  fetchProfessionalWords = ({ page = 0, size = 10 }) => {
    const { query } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'professionalWords/fetchList',
      payload: {
        page,
        size,
        query,
      },
    });
  };

  onSearch = val => {
    const { query } = this.state;
    this.setState({ query: { ...query, name: val } });
    const { dispatch } = this.props;
    dispatch({
      type: 'professionalWords/fetchList',
      payload: {
        page: 0,
        size: 10,
        query: {
          ...query,
          name: val,
        },
      },
    });
  };

  renderItemByStatus = (edit, child) => {
    if (!edit) {
      return (
        <TItem {...deaultRightLayout}>
          <Skeleton.Input />
        </TItem>
      );
    }
    return child;
  };

  handleDelete = async (ids, handleClear) => {
    await PROFESSIONALWORD.batchRemoveUsingPOST({ body: ids });
    message.success('删除成功');
    handleClear();
    this.fetchProfessionalWords({});
  };

  bulkQueryList = codesArray => {
    // 转string类型
    const matterCodes = codesArray.join(',');
    this.setState({ query: { matterCodes }, searchPopoverVisible: false });
    const { dispatch } = this.props;
    dispatch({
      type: 'professionalWords/fetchList',
      params: { page: 0, size: 10 },
      body: { matterCodes },
    });
  };

  render() {
    const { list, total, pageSize, pageNum, loading, noPagination } = this.props;
    const { bulkMatterCodes } = this.state;
    const tableOptions = {
      list,
      pagination_right: {
        showSizeChanger: true,
        pageSizeOptions: [10, 100, 200],
      },
      pagination: noPagination
        ? null
        : {
            total,
            pageSize,
            current: pageNum,
            onChange: (page, nextSize) => this.fetchProfessionalWords({ page, size: nextSize }),
            showSizeChanger: true,
            pageSizeOptions: [10, 100, 200],
          },
      loading,
      columns: this.columns,
    };
    return (
      <BulkEdit
        title="专业词名称"
        onForm={form => {
          this.createForm = form;
        }}
        onBulk={methods => {
          this.bulkMethod = methods;
        }}
        tableOptions={tableOptions}
        initialValues={this.state.initialValues}
        onSearch={this.onSearch}
        searchPlaceholder="请输入专业词名称并搜索"
        handleDelete={this.handleDelete}
        leftExtra={
          <>
            <Popover
              visible={this.state.searchPopoverVisible}
              content={
                <ArrayFormatTextArea
                  filter={[',', '，', '\\n', '\\s']}
                  style={{ width: 500 }}
                  value={bulkMatterCodes}
                  onChange={val => {
                    this.setState({ bulkMatterCodes: val });
                  }}
                  onSubmit={this.bulkQueryList}
                  placeholder="请输入专业词编码,以换行或英文逗号分隔,并点击格式化按钮,例如:
                  5f8e4ddc2e0e4357fb2e4b1b
                  5f8e4ddc2e0e4357fb2e4b1c"
                />
              }
              trigger="click"
              onVisibleChange={visible => this.setState({ searchPopoverVisible: visible })}
            >
              {/* <TButton.Button>编码批量查询</TButton.Button> */}
            </Popover>
          </>
        }
      >
        {/* <FormCard title="专业词信息"></FormCard> */}
      </BulkEdit>
    );
  }
}

export default Index;
