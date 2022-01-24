import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { BulkEdit, BulkItem, FormCard, TItem } from '@/components/tis_ui';
import { message, notification, Select } from 'antd';
import { policyGraphAudit, policyUpDownStatus } from '@/utils/constantEnum';
import { POLICYATLAS } from '@/services/api';

const defaultRightLayout = {
  col: 16,
  wrapperCol: { span: 16 },
  labelCol: { span: 8 },
};

function Index(props) {
  const {
    list,
    total,
    pageSize,
    pageNum,
    loading,
    dispatch,
    location: { query: urlQuery = {} },
  } = props;
  const [query, setQuery] = useState({});
  const options = {
    list,
    pagination: {
      total,
      pageSize,
      current: pageNum,
      showSizeChanger: true,
      pageSizeOptions: [10, 100, 200],
      onChange: (page, nextSize) => fetchList({ page, size: nextSize }),
    },
  };

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
    const { haveRelation, review, ...others } = urlQuery;
    dispatch({
      type: 'policyGraph/fetchList',
      payload: { page, size },
      condition: {
        editable: 1,
        haveRelation: haveRelation && +haveRelation,
        review: review && +haveRelation,
        ...others,
        ...query,
      },
    });
  }

  function handleSearch(value) {
    setQuery({ name: value });
  }

  async function handleDelete(ids, handleClear) {
    await POLICYATLAS.deletePolicyAtlasUsingPOST({ body: ids });
    notification.success({
      message: '成功删除',
    });
    handleClear();
    fetchList({ page: pageNum });
  }

  let createForm = null;

  return (
    <BulkEdit
      title="政策数据"
      onForm={(form) => {
        createForm = form;
      }}
      handleSubmit={async (ids, handleCancel, clear) => {
        const vals = await createForm.current.validateFields();
        await POLICYATLAS.bathEditAtlasUsingPOST({ body: { ...vals, policyIds: ids } });
        handleCancel();
        clear();
        message.success('操作成功');
      }}
      showSearch
      tableOptions={tableOptions}
      initialValues={initialValues}
      onSearch={handleSearch}
      searchPlaceholder="根据政策名称搜索"
      handleDelete={handleDelete}
    >
      <FormCard title="政策数据">
        <BulkItem label="审核状态">
          <TItem {...defaultRightLayout} name="review">
            <Select>
              {_.map(policyGraphAudit, (v, k) => (
                <Select.Option key={k} value={v} label={policyGraphAudit.$names[k]}>
                  {policyGraphAudit.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        </BulkItem>
      </FormCard>
    </BulkEdit>
  );
}

export default connect(({ policyGraph, loading }) => ({
  ...policyGraph,
  loading: loading.effects['policyGraph/fetchList'],
}))(Index);
