/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { Table, Tooltip, Switch, Select, Input } from 'antd';
import EmptyFn from '@/utils/EmptyFn';
import _ from 'lodash';
import { commonScenesQaRequiredType } from '@/utils/constantEnum';

const filterInputStyle = {
  width: '50%',
  marginLeft: '20px',
};

function FieldBox({ fields, selectedRows = [], onCheck = EmptyFn, onChange = EmptyFn }) {
  const [needFilter, setNeedFilter] = useState(false);
  const [wordFilter, setWordFilter] = useState();
  const [changeWord] = useState(() => {
    return _.debounce(setWordFilter, 500);
  });
  const selectedKeys = _.map(selectedRows, ({ key }) => key);

  const filterItems = needFilter
    ? _.filter(fields, ({ descriptionId: id, modelId }) =>
        _.includes(selectedKeys, `${id}_${modelId}`),
      )
    : fields;

  return (
    <div
      style={{
        paddingRight: 10,
      }}
    >
      <Table
        columns={[
          {
            title: '关键词标签',
            dataIndex: 'labelName',
            filteredValue: wordFilter ? [wordFilter] : [],
            onFilter: (value, record) => record.labelName.includes(value),
          },
          {
            title: '关键词值',
            dataIndex: 'typeId',
            render: (typeId, record) => {
              const { dictionary, descriptionId, value, open = false } = record;
              switch (typeId) {
                case 'select':
                  return (
                    <Select
                      disabled={!open}
                      defaultValue={value}
                      key={descriptionId}
                      onChange={val => {
                        record.value = dictionary[val] ? dictionary[val] : val;
                        record.inputOrSelect = 1;
                        onChange();
                      }}
                    >
                      {_.map(dictionary, (v, k) => (
                        <Select.Option key={k} value={k}>
                          {v}
                        </Select.Option>
                      ))}
                    </Select>
                  );
                default:
                  return (
                    <Input
                      disabled={!open}
                      defaultValue={value}
                      key={descriptionId}
                      onChange={({ target }) => {
                        record.value = target.value;
                        record.inputOrSelect = 0;
                        onChange();
                      }}
                    />
                  );
              }
            },
          },
          {
            title: '是否必填',
            dataIndex: 'required',
            render: (typeId, record) => {
              const { required = '1', descriptionId, open = false } = record;
              return (
                <Select
                  disabled={!open}
                  defaultValue={required}
                  key={descriptionId}
                  onChange={val => {
                    record.required = val;
                    onChange();
                  }}
                >
                  {_.map(commonScenesQaRequiredType, (value, key) => (
                    <Select.Option key={key} value={value}>
                      {commonScenesQaRequiredType.$v_names[value]}
                    </Select.Option>
                  ))}
                </Select>
              );
            },
          },
          {
            title: '分类',
            dataIndex: 'typename',
          },
          {
            title: '一表受理模型',
            dataIndex: 'modelName',
            render: modelName => <span>{modelName}</span>,
          },
        ]}
        rowKey="key"
        size="middle"
        dataSource={filterItems}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (nextChecked, records) => {
            const nextRecord = _.filter(records, record => !!record);
            _.forEach(nextRecord, record => {
              record.open = true;
            });
            onCheck(nextRecord);
          },
        }}
        title={() => (
          <div style={{ textAlign: 'left' }}>
            <Tooltip title="只看选中项" placement="top">
              <Switch
                style={{ marginRight: 10 }}
                onChange={result => {
                  setNeedFilter(result);
                }}
              />
            </Tooltip>
            <Input
              style={filterInputStyle}
              placeholder="请输入查询条件"
              allowClear
              onChange={({ target }) => {
                changeWord(target.value);
              }}
            />
          </div>
        )}
        bordered
      />
    </div>
  );
}

export default FieldBox;
