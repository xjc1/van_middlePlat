import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { FormCard, TItem, BulkEdit, BulkItem } from '@/components/tis_ui';
import { Input, Select, Switch, Skeleton, notification } from 'antd';
import { policyUpDownStatus } from '@/utils/constantEnum';
import AddThreeType from '@/pages/scenes/editScenes/components/basicinfo/AddThreeType';
import { SCENE } from '@/services/api';
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
  const { list, total, pageSize, pageNum, loading, location = {} } = props;
  const { query: queryCondition = {} } = location;
  const [editTuningWord, setEditTuningWord] = useState(false);
  const [query, setQuery] = useState({});

  let createForm = null;

  const tableOptions = {
    list,
    loading,
    pagination: {
      total,
      pageSize,
      current: pageNum,
      onChange: page => fetchList({ page, size: pageSize, query }),
    },
    columns: [
      {
        title: '主题名称',
        width: 150,
        dataIndex: 'name',
      },
      {
        title: '对象类型',
        dataIndex: 'object',
      },
      {
        title: '行政区划',
        dataIndex: 'region',
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
      type: 'scenes/fetchList',
      params: { page, size },
      body: {
        editable: 1,
        ...queryCondition,
        ...query,
      },
    });
  }

  function handleSearch(value) {
    setQuery({ name: value });
  }

  async function handleSubmit(ids, handleClose, handleClear) {
    const vals = await createForm.current.validateFields();
    const keys = Object.keys(vals);
    const handledVals = _.cloneDeep(vals);
    handledVals.ids = ids;
    if (keys.includes('type')) {
      const { type = [] } = vals;
      handledVals.type = type.map(({ code }) => ({ code }));
    }
    await SCENE.batchEditUsingPOST({ body: handledVals });
    notification.success({
      message: '成功修改',
    });
    handleClose();
    handleClear();
    fetchList({ page: pageNum });
  }

  async function handleDelete(ids, handleClear) {
    await SCENE.batchRemoveUsingPOST({ body: { ids } });
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
  return (
    <BulkEdit
      title="主题数据"
      onForm={form => {
        createForm = form;
      }}
      tableOptions={tableOptions}
      initialValues={initialValues}
      onSearch={handleSearch}
      searchPlaceholder="根据主题名称搜索"
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    >
      <FormCard title="主题信息">
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

        <BulkItem label="三级分类">
          <TItem name="type" {...defaultRightLayout}>
            <AddThreeType />
          </TItem>
        </BulkItem>
      </FormCard>
    </BulkEdit>
  );
}

export default connect(({ scenes, loading }) => ({
  ...scenes,
  loading: loading.effects['scenes/fetchList'],
}))(Index);
