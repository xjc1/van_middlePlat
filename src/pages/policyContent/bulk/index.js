import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import {
  FormCard,
  TItem,
  TSelect,
  BulkEdit,
  BulkItem,
  ArrayFormatTextArea,
  TButton, OperateBar,
} from '@/components/tis_ui';
import { DictSelect, PortraitTagDrawerSelect, PolicyGraphPreviewTable } from '@/components/bussinessComponents';
import { Input, Select, Switch, Skeleton, notification, Popover } from 'antd';
import { appUserType, policyGraphLinkType, policyUpDownStatus } from '@/utils/constantEnum';
import { POLICY } from '@/services/api';
import { FileSearchOutlined } from "@ant-design/icons";

const defaultLeftLayout = {
  col: 8,
  wrapperCol: { span: 8 },
  labelCol: { span: 16 },
};

const defaultRightLayout = {
  col: 16,
  wrapperCol: { span: 22 },
  labelCol: { span: 0 },
};

function Index(props) {
  const {
    list,
    total,
    pageSize,
    pageNum,
    loading,
    dispatch,
    match: {
      params: { id },
    },
    duplicatePolicies = [],
    location: { query: urlQuery = {} },
    showPagination,
  } = props;
  const [editTuningWord, setEditTuningWord] = useState(false);
  const [query, setQuery] = useState({});
  const [searchPopoverVisible, setSearchPopoverVisible] = useState(false);
  const [bulkMatterCodes, setBulkMatterCodes] = useState([]);
  let createForm = null;
  let options = {};
  if (id) {
    options = { list: duplicatePolicies };
  } else {
    options = {
      list,
      pagination: {
        total,
        pageSize,
        current: pageNum,
        showSizeChanger: true,
        pageSizeOptions: [10, 100, 200],
        onChange: (page, nextSize) => showPagination && fetchList({ page, size: nextSize }),
      },
    };
  }

  const tableOptions = {
    pagination_right: {
      showSizeChanger: true,
      pageSizeOptions: [10, 100, 200],
    },
    ...options,
    loading,
    columns: [
      {
        title: '政策名称',
        dataIndex: 'name',
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'status',
        render: status => policyUpDownStatus.$v_names[status],
      },
      {
        title: '面向对象',
        width: 100,
        dataIndex: 'objectType',
        render: text => {
          const { dictNames } = props;
          const [val] = _.at(dictNames, `DXLX0001.${text}`);
          return val;
        },
      },
      {
        title: '抽检',
        width: 150,
        align: 'center',
        render: (record) => (
          <OperateBar>
            <PolicyGraphPreviewTable policy={record}>
              <OperateBar.Button
                icon={<FileSearchOutlined />}>
                图谱政策
              </OperateBar.Button>
            </PolicyGraphPreviewTable>
          </OperateBar>
        ),
      },
    ],
  };

  const initialValues = {
    status: 1,
    tuningWordOptType: 1,
  };

  useEffect(() => {
    fetchList({});
  }, [query]);

  function fetchList({ page = 0, size = 10 }) {
    const { policyAtlas, ...others } = urlQuery;
    // 如果有id则走重复政策的
    if (id) {
      dispatch({
        type: 'policyContent/fetchDuplicatePolicies',
        id,
      });
    } else {
      dispatch({
        type: 'policyContent/fetchList',
        payload: { page, size },
        condition: {
          editable: 1,
          policyAtlas: policyAtlas && +policyAtlas,
          ...others,
          ...query,
        },
      });
    }
  }

  function handleSearch(value) {
    setQuery({ name: value });
  }

  async function handleSubmit(ids, handleClose, handleClear) {
    const vals = await createForm.current.validateFields();
    const {
      personalPortraitTag = [],
      legalPersonPortraitTag = [],
      singleSelect = [],
      legalPersonUnnecessaryPortraitTag = [],
      personalUnnecessaryPortraitTag = [],
    } = vals;
    const handledVals = {
      ...vals,
      personalPortraitTag: personalPortraitTag.map(({ key }) => ({ tagId: key })),
      legalPersonPortraitTag: legalPersonPortraitTag.map(({ key }) => ({ tagId: key })),
      legalPersonUnnecessaryPortraitTag: legalPersonUnnecessaryPortraitTag.map(({ key }) => ({
        tagId: key,
      })),
      personalUnnecessaryPortraitTag: personalUnnecessaryPortraitTag.map(({ key }) => ({
        tagId: key,
      })),
      singleSelect: singleSelect.length > 0 && singleSelect.join(','),
    };
    handledVals.ids = ids;
    await POLICY.policyBatchEditUsingPOST({ body: handledVals });
    notification.success({
      message: '成功修改',
    });
    handleClose();
    handleClear();
    fetchList({ page: pageNum });
  }

  async function handleDelete(ids, handleClear) {
    await POLICY.batchRemoveUsingPOST({ body: ids });
    notification.success({
      message: '成功删除',
    });
    handleClear();
    fetchList({ page: pageNum });
  }

  function renderItemByStatus(edit, child) {
    if (!edit) {
      return (
        <TItem {...defaultRightLayout}>
          <Skeleton.Input />
        </TItem>
      );
    }
    return child;
  }

  function bulkQueryList(codesArray) {
    // 转string类型
    const ids = codesArray.join(',');
    setSearchPopoverVisible(false);
    dispatch({
      type: 'policyContent/fetchList',
      params: { page: 0, size: 10 },
      condition: { ids },
    });
  }

  return (
    <BulkEdit
      title="政策数据"
      onForm={form => {
        createForm = form;
      }}
      showSearch={!id}
      tableOptions={tableOptions}
      initialValues={initialValues}
      onSearch={handleSearch}
      searchPlaceholder="根据政策名称搜索"
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      leftExtra={
        <>
          <Popover
            visible={searchPopoverVisible}
            content={
              <ArrayFormatTextArea
                filter={[',', '，', '\\n', '\\s']}
                style={{ width: 500 }}
                value={bulkMatterCodes}
                onChange={val => setBulkMatterCodes(val)}
                onSubmit={bulkQueryList}
                placeholder="请输入编码,以换行或英文逗号分隔,并点击格式化按钮,例如:
                5f97c1ef67a79e221dc21219,5f8e4ddc2e0e4357fb2e4b1b"
              />
            }
            trigger="click"
            onVisibleChange={visible => setSearchPopoverVisible(visible)}
          >
            <TButton.Button>编码批量查询</TButton.Button>
          </Popover>
        </>
      }
    >
      <FormCard title="政策数据">
        <BulkItem label="上下架操作">
          <TItem name="status" {...defaultRightLayout}>
            <Select>
              {_.map(policyUpDownStatus, (v, k) => (
                <Select.Option key={k} value={v} label={policyUpDownStatus.$names[k]}>
                  {policyUpDownStatus.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        </BulkItem>

        <TItem label="调节词类型" {...defaultLeftLayout}>
          <Switch
            checked={editTuningWord}
            onChange={checked => {
              setEditTuningWord(checked);
            }}
          />
        </TItem>
        {renderItemByStatus(
          editTuningWord,
          <TItem name="tuningWordOptType" {...defaultRightLayout}>
            <Select>
              <Select.Option value={0}>追加</Select.Option>
              <Select.Option value={1}>修改</Select.Option>
            </Select>
          </TItem>,
        )}

        <TItem label="调节词" {...defaultLeftLayout}>
          <Switch
            checked={editTuningWord}
            onChange={checked => {
              setEditTuningWord(checked);
            }}
          />
        </TItem>

        {renderItemByStatus(
          editTuningWord,
          <TItem name="tuningWord" {...defaultRightLayout}>
            <Input.TextArea placeholder="输入空值则为清空" />
          </TItem>,
        )}
        {/* TODO 联调 */}
        <BulkItem label="个人画像标签(必要)">
          <TItem name="personalPortraitTag" {...defaultRightLayout}>
            <PortraitTagDrawerSelect type={appUserType.self} />
          </TItem>
        </BulkItem>
        <BulkItem label="个人画像标签(非必要)">
          <TItem name="personalUnnecessaryPortraitTag" {...defaultRightLayout}>
            <PortraitTagDrawerSelect type={appUserType.self} />
          </TItem>
        </BulkItem>
        <BulkItem label="法人画像标签(必要)">
          <TItem name="legalPersonPortraitTag" {...defaultRightLayout}>
            <PortraitTagDrawerSelect type={appUserType.legalPerson} />
          </TItem>
        </BulkItem>
        <BulkItem label="法人画像标签(非必要)">
          <TItem name="legalPersonUnnecessaryPortraitTag" {...defaultRightLayout}>
            <PortraitTagDrawerSelect type={appUserType.legalPerson} />
          </TItem>
        </BulkItem>
        <BulkItem label="面向对象">
          <TItem name="objectType" {...defaultRightLayout}>
            <DictSelect
              placeholder="请选择对象类型"
              treeNodeFilterProp="title"
              treeDefaultExpandAll
              treeNodeLabelProp="title"
              dict="DXLX0001"
            />
          </TItem>
        </BulkItem>
        <BulkItem label="政策等级">
          <TItem name="level" {...defaultRightLayout}>
            <DictSelect dict="ZCJB0001" placeholder="请选择政策等级" />
          </TItem>
        </BulkItem>

        <BulkItem label="政策分类">
          <TItem name="category" {...defaultRightLayout}>
            <DictSelect
              rootDict="ZCFL"
              dict="ZCFL"
              dictType="tree"
              showSearch
              multiple
              treeNodeFilterProp="title"
            />
          </TItem>
        </BulkItem>
        <BulkItem label="行政区划">
          <TItem name="regions" {...defaultRightLayout}>
            <DictSelect
              showSearch
              treeNodeFilterProp="title"
              dictType="tree"
              treeDefaultExpandAll
              treeNodeLabelProp="title"
              dict="SH00XZQH"
            />
          </TItem>
        </BulkItem>
        <BulkItem label="政策图谱关联政策">
          <TItem name="associatePolicyType" {...defaultRightLayout}>
            <TSelect>
              {_.map(policyGraphLinkType, (key, value) => (
                <Select.Option key={key} value={key}>
                  {policyGraphLinkType.$names[value]}
                </Select.Option>
              ))}
            </TSelect>
          </TItem>
        </BulkItem>
      </FormCard>
    </BulkEdit>
  );
}

export default connect(({ policyContent, loading }) => ({
  ...policyContent,
  loading:
    loading.effects['policyContent/fetchList'] ||
    loading.effects['policyContent/fetchDuplicatePolicies'],
}))(Index);
