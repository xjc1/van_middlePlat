/* eslint-disable import/order */
import React from 'react';
import { EmptyFn, EditCellAbleTable } from '@/components/tis_ui';
import { Space, notification, Select, Switch, Alert } from 'antd';
import _ from 'lodash';
import { scenesSubjectType, scenesDataUseType } from '@/utils/constantEnum';
import FieldAssociationSearch from './FieldAssociationSearch';

function RelatedLetter({
  value = [],
  onChange = EmptyFn,
  selectMatters,
  currentDataType,
  disabled,
}) {
  const columns = [
    {
      title: '主体',
      dataIndex: 'subject',
      width: 100,
      render: (text, record) => {
        return (
          <Select
            disabled={disabled}
            value={text}
            onChange={val => {
              const newValue = value.map(item => {
                if (item.id === record.id) {
                  return { ...item, subject: val };
                }
                return item;
              });
              onChange(newValue);
            }}
          >
            {_.map(scenesSubjectType, (key, v) => (
              <Select.Option key={key} value={key}>
                {scenesSubjectType.$names[v]}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '标准字段',
      dataIndex: 'standardFieldName',
      render: (text, record) => {
        return <span style={{ color: record.isError ? 'red' : 'inherit' }}>{text}</span>;
      },
    },
    { title: '表名', dataIndex: 'tableName' },
    { title: '表字段', dataIndex: 'fieldName' },
    {
      title: '主规则',
      dataIndex: 'masterRule',
      width: '12%',
      render: (masterRule, record) => {
        return (
          <Switch
            checked={masterRule}
            onChange={nextVal => {
              const newValue = value.map(item => {
                const { id } = item;
                if (id === record.id) {
                  return {
                    ...item,
                    id,
                    masterRule: nextVal,
                  };
                }
                return item;
              });
              onChange(newValue);
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      {!disabled && (
        <Space>
          <FieldAssociationSearch
            isUseMatter={currentDataType === scenesDataUseType.matter}
            linkMatters={selectMatters}
            onSubmit={val => {
              const newValue = val.map(({ name, id, tableAlias, fieldName, ...otherInfo }) => ({
                ...otherInfo,
                standardFieldName: name,
                subject: scenesSubjectType.person,
                masterRule: false,
                fieldName,
                tableName: tableAlias,
                isError: !(tableAlias && fieldName), // 表名和表字段不能为空
                id,
              }));
              const newValues = [...value, ...newValue];
              const uniqData = _.uniqBy(newValues, 'id');
              if (uniqData.length < newValues.length) {
                notification.info({ message: '关联数据与列表数据有重复，已做去重处理' });
              }
              onChange(uniqData);
            }}
          />
        </Space>
      )}
      <div style={{ marginTop: 16 }}>
        <Alert
          style={{ marginBottom: 16 }}
          type="info"
          message="标准字段标红的为不可关联数据。同一张表，多个表字段，且主体相同时，须定义一个字段为主规则"
        />
        <EditCellAbleTable
          size="small"
          dataSource={value}
          columns={columns}
          operateStyle={{ width: 50, align: 'center' }}
          changeDataSource={onChange}
          disabled={disabled}
          rowKey="id"
        />
      </div>
    </>
  );
}

export default RelatedLetter;
