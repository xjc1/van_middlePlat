import React, { useEffect, useMemo, useState } from 'react';
import { EmptyFn, QueryBarCard, TButton, TItem, TSelect, TTable } from '@/components/tis_ui';
import { Input, Checkbox } from 'antd';
import classNames from 'classnames';
import Styles from './index.less';
import _ from 'lodash';
import { commonObjectType } from '@/utils/constantEnum';
import { DictSelect } from '@/components/bussinessComponents';
import { MATTER } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 23 },
};

function MatterSelectedList({
  hidden,
  matterSelecteds = [],
  setMatterSelecteds = EmptyFn,
  filterId,
  ...others
}) {
  const [matterList, setMatterList] = useState({
    totalElements: 0,
    content: [],
    number: 0,
    size: 10,
  });

  const [query, setQuery] = useState({ params: { page: 0, size: 10 }, body: {} });

  const [showSelected, setShowSelected] = useState(false);

  let queryForm = null;

  useEffect(() => {
    Code2Name(MATTER.listMatterUsingPOST(query), ['SH00XZQH', 'regions']).then(nextMatterList => {
      setMatterList(nextMatterList);
    });
  }, [query]);

  const rowSelection = useMemo(() => {
    return {
      type: 'checkbox',
      preserveSelectedRowKeys: true,
      selectedRowKeys: _.map(matterSelecteds, ({ id }) => id),
      getCheckboxProps: record => {
        return {
          disabled: record.id === filterId,
        };
      },
      onChange: (nextKeys, selectedRows) => {
        setMatterSelecteds(selectedRows);
      },
    };
  }, [matterSelecteds]);

  const { totalElements, content = [], number, size, dictNames } = matterList;

  const columns = [
    {
      title: '二级事项名称',
      dataIndex: 'name',
      width: '50%',
    },
    {
      title: '三级事项名称',
      dataIndex: 'subItemName',
    },
    {
      title: '行政区划',
      dataIndex: 'regions',
      render(text) {
        return _.get(dictNames, ['SH00XZQH', text]);
      },
    },
    {
      title: '对象类型',
      dataIndex: 'object',
      render(text) {
        return commonObjectType.$v_names[text];
      },
    },
  ];

  return (
    <div
      className={classNames(
        Styles.formCopyMatterSelectedList,
        hidden && Styles.formCopyContentHidden,
      )}
    >
      <QueryBarCard
        onForm={formRef => {
          queryForm = formRef;
        }}
        actions={
          <>
            <Checkbox
              checked={showSelected}
              onChange={({ target }) => {
                setShowSelected(target.checked);
              }}
            >
              只看选中项[共
              <span style={{ color: '#1890ff', fontWeight: 600, padding: '0 2px' }}>
                {matterSelecteds.length}
              </span>
              个]
            </Checkbox>
          </>
        }
        footer={
          <>
            <TButton.Search
              onClick={() => {
                queryForm.validateFields().then(queryObj => {
                  setShowSelected(false);
                  setQuery({
                    params: { page: 0, size: 10 },
                    body: queryObj,
                  });
                });
              }}
            >
              查询
            </TButton.Search>
          </>
        }
      >
        <TItem name="name" label="二级事项名称" col={6} {...layout}>
          <Input />
        </TItem>
        <TItem name="subItemName" label="三级事项名称" col={6} {...layout}>
          <Input />
        </TItem>
        <TItem name="regions" label="行政区划" col={6} {...layout}>
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear placeholder="请选择行政区划" />
        </TItem>
        <TItem name="object" label="对象类型" col={6} {...layout}>
          <TSelect placeholder="请选择对象类型">
            {_.map(commonObjectType, (v, k) => (
              <TSelect.Option key={k} value={v} label={commonObjectType.$names[k]}>
                {commonObjectType.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
      {showSelected ? (
        <TTable
          columns={columns}
          rowKey="id"
          dataSource={matterSelecteds}
          rowSelection={rowSelection}
        />
      ) : (
        <TTable
          columns={columns}
          rowKey="id"
          dataSource={content}
          rowSelection={rowSelection}
          pagination={{
            total: totalElements,
            pageSize: size,
            current: number,
            onChange: page => {
              const { params, body } = query;
              setQuery({
                params: {
                  ...params,
                  page,
                },
                body,
              });
            },
          }}
          {...others}
        />
      )}
    </div>
  );
}

export default MatterSelectedList;
