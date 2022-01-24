/* eslint-disable import/order */
import React from 'react';
import { EmptyFn, EditCellAbleTable } from '@/components/tis_ui';
import { Space, notification, Select } from 'antd';
import _ from 'lodash';
import { scenesSubjectType, scenesDataUseType, materialShareSource } from '@/utils/constantEnum';
import FieldAssociationSearch from './MaterialAssociationSearch';

function RelatedMaterial({
  value = [],
  onChange = EmptyFn,
  selectMatters,
  currentDataType,
  disabled,
}) {
  return (
    <>
      {!disabled && (
        <Space>
          <FieldAssociationSearch
            isUseMatter={currentDataType === scenesDataUseType.matter}
            linkMatters={selectMatters}
            onSubmit={val => {
              const newValue = val.map(({ name, id, ...others }) => ({
                ...others,
                materialName: name,
                standardMaterialName: name,
                id,
                name,
                subject: scenesSubjectType.person,
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
        <EditCellAbleTable
          disabled={disabled}
          columns={[
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
              title: '材料名称',
              dataIndex: 'name',
            },
            {
              title: '材料来源',
              dataIndex: 'sourceCn',
              width: 110,
            },
            {
              title: '共享来源渠道',
              dataIndex: 'shareSource',
              width: 110,
              render: text => materialShareSource.$v_names[text] || text,
            },
            {
              title: '证照类型编码',
              dataIndex: 'type',
            },
          ]}
          bordered
          size="small"
          operateStyle={{ width: 50, align: 'center' }}
          dataSource={value}
          pagination={{ defaultPageSize: 10 }}
          changeDataSource={onChange}
          rowKey="id"
        />
      </div>
    </>
  );
}

export default RelatedMaterial;
