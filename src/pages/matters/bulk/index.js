/* eslint-disable no-fallthrough */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  FormCard,
  TItem,
  BulkEdit,
  BulkItem,
  TButton,
  ArrayFormatTextArea,
} from '@/components/tis_ui';
import { ConditionSelector, PortraitTagDrawerSelect } from '@/components/bussinessComponents';
import {
  Input,
  Row,
  Select,
  Switch,
  Skeleton,
  message,
  InputNumber,
  Popover,
  notification,
} from 'antd';
import _ from 'lodash';
import {
  policyUpDownStatus,
  conditionType,
  commonObjectType,
  appUserType,
} from '@/utils/constantEnum';
import AddThreeType from '@/pages/scenes/editScenes/components/basicinfo/AddThreeType';
import { MATTER } from '@/services/api';

const deaultLeftLayout = {
  col: 8,
  wrapperCol: { span: 8 },
  labelCol: { span: 16 },
};

const deaultRightLayout = {
  col: 16,
  wrapperCol: { span: 22 },
  labelCol: { span: 0 },
};

@connect(({ mattersBulk, loading }) => ({
  ...mattersBulk,
  loading: loading.effects['mattersBulk/fetchList'],
}))
class Index extends PureComponent {
  state = {
    query: {},
    editTuningWord: false,
    initialValues: {
      status: 1,
      frequency: 0,
      tuningWordOperationType: 1,
      isUpdateDisassemblyToComplete: 0,
    },
    searchPopoverVisible: false,
    // 报错ids
    errorIdsArray: [],
    bulkMatterCodes: [],
  };

  createForm = React.createRef();

  bulkMethod = null;

  columns = [
    {
      title: '二级名称',
      // width: 150,
      dataIndex: 'name',
      render: (text, record) => {
        // 对于不能删除的数据标红
        const { errorIdsArray = [] } = this.state;
        return (
          <span style={{ color: errorIdsArray.indexOf(record.id) > -1 ? 'red' : undefined }}>
            {text}
          </span>
        );
      },
    },
    {
      title: '对象类型',
      dataIndex: 'object',
      width: 120,
      render: object => commonObjectType.$v_names[object],
    },
  ];

  componentDidMount() {
    this.fetchList({});
  }

  fetchList = ({ page = 0, size = 10 }) => {
    const {
      dispatch,
      location: { query: urlQuery = {} },
    } = this.props;
    const { query } = this.state;

    dispatch({
      type: 'mattersBulk/fetchList',
      params: { page, size },
      // 添加
      body: { editable: 1, ...urlQuery, ...query },
    });
  };

  // 格式化提交的信息
  formatSubmitData = vals => {
    const data = { ...vals };
    const keys = Object.keys(vals);
    const {
      frequency,
      isUpdateDisassemblyToComplete,
      rankingCondition = [],
      status,
      tuningWord = '',
      tuningWordOperationType,
      type = [],
      personalTag = [],
      legalTag = [],
      personalPortraitTag = [],
      legalPersonPortraitTag = [],
    } = vals || {};
    keys.forEach(key => {
      switch (key) {
        case 'frequency':
          data.frequency = frequency;
          break;
        case 'isUpdateDisassemblyToComplete':
          data.isUpdateDisassemblyToComplete = isUpdateDisassemblyToComplete;
          break;
        case 'rankingCondition':
          data.rankingCondition = rankingCondition.map(it => ({ id: it }));
          break;
        case 'status':
          data.status = status;
          break;
        case 'tuningWord':
          data.tuningWord = tuningWord;
          break;
        case 'tuningWordOperationType':
          data.tuningWordOperationType = tuningWordOperationType;
          break;
        case 'type':
          data.type = type.map(it => ({ code: it.code }));
          break;
        case 'personalTag':
          data.personalTag = personalTag.map(({ value }) => value);
        case 'legalTag':
          data.legalTag = legalTag.map(({ value }) => value);
        case 'personalPortraitTag':
          data.personalPortraitTag = personalPortraitTag.map(({ value }) => ({ tagId: value }));
        case 'legalPersonPortraitTag':
          data.legalPersonPortraitTag = legalPersonPortraitTag.map(({ value }) => ({
            tagId: value,
          }));
        default:
          break;
      }
    });
    return data;
  };

  handleSubmit = (keys, handleCancel, clear) => {
    this.createForm.current.validateFields().then(async vals => {
      const newValue = this.formatSubmitData(vals);
      await MATTER.updateBatchMatterUsingPOST({ body: { ids: keys, ...newValue } });
      handleCancel();
      clear();
      message.success('操作成功');
    });
  };

  onSearch = value => {
    const { query } = this.state;
    this.setState({ query: { ...query, name: value } });
    const { dispatch } = this.props;
    dispatch({
      type: 'mattersBulk/fetchList',
      params: { page: 0, size: 10 },
      body: { ...query, name: value },
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
    const { data = [], msg, code } = await MATTER.batchRemoveMatterUsingPOST({ body: { ids } });
    // 处理事项不能删除的情况
    if (code !== '10000') {
      this.setState({ errorIdsArray: data });
      notification.error({ message: msg });
    } else {
      message.success('删除成功');
      handleClear();
      this.fetchList({});
    }
  };

  bulkQueryList = codesArray => {
    // 转string类型
    const matterCodes = codesArray.join(',');
    this.setState({ query: { matterCodes }, searchPopoverVisible: false });
    const { dispatch } = this.props;
    dispatch({
      type: 'mattersBulk/fetchList',
      params: { page: 0, size: 10 },
      body: { matterCodes },
    });
  };

  render() {
    const { list, total, pageSize, pageNum, loading, noPagination } = this.props;
    const { editTuningWord, bulkMatterCodes } = this.state;
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
            onChange: (page, nextSize) => this.fetchList({ page, size: nextSize }),
            showSizeChanger: true,
            pageSizeOptions: [10, 100, 200],
          },
      loading,
      columns: this.columns,
    };
    return (
      <BulkEdit
        title="事项数据"
        onForm={form => {
          this.createForm = form;
        }}
        onBulk={methods => {
          this.bulkMethod = methods;
        }}
        tableOptions={tableOptions}
        initialValues={this.state.initialValues}
        onSearch={this.onSearch}
        searchPlaceholder="请输入二级名称并搜索"
        handleSubmit={this.handleSubmit}
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
                  placeholder="请输入事项编码,以换行或英文逗号分隔,并点击格式化按钮,例如:
                  5f8e4ddc2e0e4357fb2e4b1b
                  5f8e4ddc2e0e4357fb2e4b1c"
                />
              }
              trigger="click"
              onVisibleChange={visible => this.setState({ searchPopoverVisible: visible })}
            >
              <TButton.Button>编码批量查询</TButton.Button>
            </Popover>
          </>
        }
      >
        <FormCard title="事项信息">
          <Row style={{ minWidth: 0 }}>
            <BulkItem label="上下架操作">
              <TItem {...deaultRightLayout} name="status">
                <Select>
                  {_.map(policyUpDownStatus, (v, k) => (
                    <Select.Option key={k} value={v} label={policyUpDownStatus.$names[k]}>
                      {policyUpDownStatus.$names[k]}
                    </Select.Option>
                  ))}
                </Select>
              </TItem>
            </BulkItem>

            <BulkItem label="办件频度">
              <TItem
                {...deaultRightLayout}
                name="frequency"
                rules={[{ required: true, message: '办件频度不能为空!' }]}
              >
                <InputNumber style={{ width: '100%' }} min={0} />
              </TItem>
            </BulkItem>

            <BulkItem label="排序条件">
              <TItem {...deaultRightLayout} name="rankingCondition">
                <ConditionSelector
                  mode="multiple"
                  optionFilterProp="label"
                  type={conditionType.order}
                  placeholder="输入空值则为清空"
                />
              </TItem>
            </BulkItem>

            <BulkItem label="将事项状态改为正常">
              <TItem {...deaultRightLayout} name="isUpdateDisassemblyToComplete">
                <Select>
                  <Select.Option value={0}>否</Select.Option>
                  <Select.Option value={1}>是</Select.Option>
                </Select>
              </TItem>
            </BulkItem>

            <TItem {...deaultLeftLayout} label="调节词类型">
              <Switch
                checked={editTuningWord}
                onChange={checked => {
                  this.setState({ editTuningWord: checked });
                }}
              />
            </TItem>
            {this.renderItemByStatus(
              editTuningWord,
              <TItem {...deaultRightLayout} name="tuningWordOperationType">
                <Select>
                  <Select.Option value={0}>追加</Select.Option>
                  <Select.Option value={1}>修改</Select.Option>
                </Select>
              </TItem>,
            )}

            <TItem label="调节词" {...deaultLeftLayout}>
              <Switch
                checked={editTuningWord}
                onChange={checked => {
                  this.setState({ editTuningWord: checked });
                }}
              />
            </TItem>

            {this.renderItemByStatus(
              editTuningWord,
              <TItem name="tuningWord" {...deaultRightLayout}>
                <Input.TextArea placeholder="输入空值则为清空" />
              </TItem>,
            )}

            <BulkItem label="事项所属分类">
              <TItem {...deaultRightLayout} name="type">
                <AddThreeType />
              </TItem>
            </BulkItem>
            <BulkItem label="个人画像标签">
              <TItem name="personalPortraitTag" {...deaultRightLayout}>
                <PortraitTagDrawerSelect type={appUserType.self} />
              </TItem>
            </BulkItem>
            <BulkItem label="法人画像标签">
              <TItem name="legalPersonPortraitTag" {...deaultRightLayout}>
                <PortraitTagDrawerSelect type={appUserType.legalPerson} />
              </TItem>
            </BulkItem>
          </Row>
        </FormCard>
      </BulkEdit>
    );
  }
}

export default Index;
