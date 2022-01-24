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
import { Select, message, Popover, Radio } from 'antd';
import _ from 'lodash';
import { commonYesNo, appUserType, tagsSourceType } from '@/utils/constantEnum';
import { KERNEL } from '@/services/api';
import AddThreeType from '@/pages/scenes/editScenes/components/basicinfo/AddThreeType';
import DisplayPosition from '../EditPortraitTag/compontents/displayPositionSelector';
import ThemeTag from '@/pages/portraitTags/EditPortraitTag/compontents/themeTag';

const defaultRightLayout = {
  col: 16,
  wrapperCol: { span: 22 },
  labelCol: { span: 0 },
};

@connect(({ portraitTagBulk, loading }) => ({
  ...portraitTagBulk,
  loading: loading.effects['portraitTagBulk/fetchList'],
}))
class Index extends PureComponent {
  state = {
    query: {},
    initialValues: {
      isDisplay: commonYesNo.yes,
    },
    searchPopoverVisible: false,
    bulkMatterCodes: [],
  };

  createForm = React.createRef();

  bulkMethod = null;

  columns = [
    {
      title: '标签名称',
      // width: 150,
      dataIndex: 'name',
    },
    {
      title: '标签分类',
      width: '40%',
      dataIndex: 'category',
    },
    {
      title: '对象类型',
      dataIndex: 'object',
      width: 100,
      render: object => appUserType.$v_names[object],
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
      type: 'portraitTagBulk/fetchList',
      params: { page, size },
      // 添加
      body: { editable: 1, ...urlQuery, ...query },
    });
  };

  // 格式化提交的信息
  formatSubmitData = vals => {
    const data = { ...vals };
    const keys = Object.keys(vals);
    const { threeLevels = [] } = data;
    keys.forEach(key => {
      switch (key) {
        case 'threeLevels':
          data.threeLevels = threeLevels.map(it => ({ code: it.code }));
          break;
        default:
          break;
      }
    });
    return data;
  };

  handleSubmit = (keys, handleCancel, clear) => {
    this.createForm.current.validateFields().then(vals => {
      const newValue = this.formatSubmitData(vals);
      const { tagThemes = [], operateType = 0 } = newValue;
      KERNEL.updateBatchPortraitTagUsingPOST({
        body: {
          ids: keys,
          ...newValue,
          tagThemes: tagThemes.map(tagId => ({ tagId })),
          operateType,
        },
      }).then(() => {
        handleCancel();
        clear();
        this.fetchList({});
        message.success('操作成功,请到标签审核进行审核操作');
      });
    });
  };

  onSearch = value => {
    this.setState({ query: { name: value } });
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitTagBulk/fetchList',
      params: { page: 0, size: 10 },
      body: { name: value },
    });
  };

  handleDelete = (ids, handleClear) => {
    KERNEL.batchRemovePortraitTagUsingPOST({ body: { ids } }).then(() => {
      message.success('删除成功');
      handleClear();
      this.fetchList({});
    });
  };

  bulkQueryList = codesArray => {
    this.setState({ query: { ids: codesArray }, searchPopoverVisible: false });
    const { dispatch } = this.props;
    dispatch({
      type: 'portraitTagBulk/fetchList',
      params: { page: 0, size: 10 },
      body: { ids: codesArray },
    });
  };

  render() {
    const { list, total, pageSize, pageNum, loading, noPagination } = this.props;
    const { searchPopoverVisible, initialValues, bulkMatterCodes } = this.state;
    const tableOptions = {
      list,
      pagination: noPagination
        ? null
        : {
            total,
            pageSize,
            current: pageNum,
            onChange: page => this.fetchList({ page, size: pageSize }),
          },
      loading,
      columns: this.columns,
    };
    return (
      <BulkEdit
        title="标签数据"
        onForm={form => {
          this.createForm = form;
        }}
        onBulk={methods => {
          this.bulkMethod = methods;
        }}
        tableOptions={tableOptions}
        initialValues={initialValues}
        onSearch={this.onSearch}
        searchPlaceholder="请输入标签名称并搜索"
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        leftExtra={
          <>
            <Popover
              visible={searchPopoverVisible}
              content={
                <ArrayFormatTextArea
                  filter={[',', '，', '\\n', '\\s']}
                  style={{ width: 500 }}
                  value={bulkMatterCodes}
                  onChange={val => {
                    this.setState({ bulkMatterCodes: val });
                  }}
                  onSubmit={this.bulkQueryList}
                  placeholder="请输入标签编码,以换行或英文逗号分隔,并点击格式化按钮,例如:
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
        <FormCard title="标签信息">
          <TItem label="批量操作类型" name="operateType">
            <Radio.Group defaultValue={0}>
              <Radio value={0}>追加</Radio>
              <Radio value={1}>修改</Radio>
              <Radio value={2}>删除</Radio>
            </Radio.Group>
          </TItem>
          <BulkItem label="展示位">
            <TItem name="displayPosition" {...defaultRightLayout}>
              <DisplayPosition />
            </TItem>
          </BulkItem>
          <BulkItem label="所属分类">
            <TItem name="threeLevels" {...defaultRightLayout}>
              <AddThreeType />
            </TItem>
          </BulkItem>
          <BulkItem label="来源类型">
            <TItem name="sourceType" {...defaultRightLayout}>
              <Select mode="multiple" placeholder="请选择标签来源类型" allowClear>
                {_.map(tagsSourceType, (v, k) => (
                  <Select.Option key={k} value={v} label={tagsSourceType.$names[k]}>
                    {tagsSourceType.$names[k]}
                  </Select.Option>
                ))}
              </Select>
            </TItem>
          </BulkItem>
          <BulkItem label="标签主题">
            <TItem name="tagThemes" {...defaultRightLayout}>
              <ThemeTag />
            </TItem>
          </BulkItem>
        </FormCard>
      </BulkEdit>
    );
  }
}

export default Index;
