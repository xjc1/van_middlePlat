import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { FormCard, TItem, BulkEdit, BulkItem } from '@/components/tis_ui';
import { PortraitTagDrawerSelect } from '@/components/bussinessComponents';
import { Select, notification } from 'antd';
import { appUserType, modulesContentType, conditionApplyType } from '@/utils/constantEnum';
import { MINIMALCONDITION } from '@/services/api';

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
    dictNames,
    location: { query: urlQuery = {} },
  } = props;
  const [query, setQuery] = useState({});
  let createForm = null;

  const tableOptions = {
    pagination_right: {
      showSizeChanger: true,
      pageSizeOptions: [10, 100, 200],
    },
    list,
    pagination: {
      total,
      pageSize,
      current: pageNum,
      showSizeChanger: true,
      pageSizeOptions: [10, 100, 200],
      onChange: (page, nextSize) => fetchList({ page, size: nextSize }),
    },
    loading,
    columns: [
      {
        title: '条件名称',
        dataIndex: 'name',
      },
      {
        title: '对象类型',
        dataIndex: 'objectType',
        render: code => {
          return dictNames.DXLX0001[code] || code;
        },
      },
      {
        title: '来源内容类型',
        dataIndex: 'sourceType',
        render: type => modulesContentType.$v_names[type] || type,
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
    dispatch({
      type: 'minimalCondition/fetchList',
      payload: {
        page,
        size,
        query: {
          editable: 1,
          ...urlQuery,
          ...query,
        },
      },
    });
  }

  function handleSearch(value) {
    setQuery({ name: value });
  }

  async function handleSubmit(ids, handleClose, handleClear) {
    const vals = await createForm.current.validateFields();
    const { legalPortraitTag, personalPortraitTag, personalAndLegalPortraitTag } = vals;

    await MINIMALCONDITION.miniConditionBatchEditUsingPOST({
      body: {
        ...vals,
        legalPortraitTag: _.get(legalPortraitTag, 'value'),
        personalPortraitTag: _.get(personalPortraitTag, 'value'),
        personalAndLegalPortraitTag: _.get(personalAndLegalPortraitTag, 'value'),
        ids,
      },
    });
    notification.success({
      message: '成功修改',
    });
    handleClose();
    handleClear();
    fetchList({ page: pageNum });
  }

  return (
    <BulkEdit
      title="条件数据"
      onForm={form => {
        createForm = form;
      }}
      tableOptions={tableOptions}
      initialValues={initialValues}
      onSearch={handleSearch}
      searchPlaceholder="根据条件名称搜索"
      handleSubmit={handleSubmit}
    >
      <FormCard title="条件数据">
        <BulkItem label="默认场景">
          <TItem name="applyScenario" {...defaultRightLayout}>
            <Select>
              {_.map(conditionApplyType, (v, k) => (
                <Select.Option key={k} value={v} label={conditionApplyType.$names[k]}>
                  {conditionApplyType.$names[k]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        </BulkItem>

        <BulkItem label="关联画像标签(法人)">
          <TItem name="legalPortraitTag" {...defaultRightLayout}>
            <PortraitTagDrawerSelect mode="single" type={appUserType.legalPerson} />
          </TItem>
        </BulkItem>
        <BulkItem label="关联画像标签(个人)">
          <TItem name="personalPortraitTag" {...defaultRightLayout}>
            <PortraitTagDrawerSelect mode="single" type={appUserType.self} />
          </TItem>
        </BulkItem>
        <BulkItem label="关联画像标签(个人/法人)">
          <TItem name="personalAndLegalPortraitTag" {...defaultRightLayout}>
            <PortraitTagDrawerSelect mode="single" type={null} />
          </TItem>
        </BulkItem>
      </FormCard>
    </BulkEdit>
  );
}

export default connect(({ minimalCondition, loading }) => ({
  ...minimalCondition,
  loading: loading.effects['minimalCondition/fetchList'],
}))(Index);
