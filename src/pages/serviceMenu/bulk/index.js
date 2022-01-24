import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { FormCard, TItem, BulkEdit, BulkItem } from '@/components/tis_ui';
import { Input, Select, Switch, Skeleton, notification } from 'antd';
import { policyUpDownStatus } from '@/utils/constantEnum';
import { CONVENIENCE } from '@/services/api';
import _ from 'lodash';

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
    location: { query: urlQuery = {} },
  } = props;
  const [editTuningWord, setEditTuningWord] = useState(false);
  const [query, setQuery] = useState({});

  let createForm = null;

  const tableOptions = {
    list,
    pagination: {
      total,
      pageSize,
      current: pageNum,
      onChange: page => fetchList({ page, size: pageSize }),
    },
    loading,
    columns: [
      {
        title: '服务名称',
        width: 150,
        dataIndex: 'name',
      },
      {
        title: '对象类型',
        dataIndex: 'objectType',
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        render: status => policyUpDownStatus.$v_names[status],
      },
    ],
  };

  const initialValues = {
    status: 1,
    frequency: 0,
    tuningWordOperationType: 1,
    isUpdateDisassemblyToComplete: 0,
  };

  useEffect(() => {
    fetchList({});
  }, [query]);

  function fetchList({ page = 0, size = 10 }) {
    const { dispatch } = props;
    dispatch({
      type: 'service/fetchList',
      params: { page, size },
      body: {
        editable: 1,
        ...urlQuery,
        ...query,
      },
    });
  }

  function handleSearch(value) {
    setQuery({ name: value });
  }

  async function handleSubmit(ids, handleClose, handleClear) {
    const vals = await createForm.current.validateFields();
    const handledVals = _.cloneDeep(vals);
    handledVals.ids = ids;
    await CONVENIENCE.convenienceBatchOperateUsingPOST({ body: handledVals });
    notification.success({
      message: '成功修改',
    });
    handleClose();
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
  return (
    <BulkEdit
      title="服务数据"
      onForm={form => {
        createForm = form;
      }}
      tableOptions={tableOptions}
      initialValues={initialValues}
      onSearch={handleSearch}
      searchPlaceholder="根据服务名称搜索"
      handleSubmit={handleSubmit}
    >
      <FormCard title="便民服务">
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
      </FormCard>
    </BulkEdit>
  );
}

export default connect(({ service, loading }) => ({
  ...service,
  loading: loading.effects['service/fetchList'],
}))(Index);
