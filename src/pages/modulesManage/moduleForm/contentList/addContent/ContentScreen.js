import React, { useEffect, useState } from 'react';
import { Button, Col, message, Row, Space } from 'antd';
import { EmptyFn, TSelect, TTable } from '@/components/tis_ui';
import _ from 'lodash';
import { MinusOutlined } from '@ant-design/icons';
import Styles from './index.less';
import { DictIdSelect as MultiRootIdDictTreeSelect } from '@/components/bussinessComponents';

function ContentScreen({ options = [], value = [], disabled = false, onChange = EmptyFn }) {
  const [selectedField, setSelectedField] = useState();

  const [fieldValue, setFieldValue] = useState();

  useEffect(() => {
    setFieldValue();
  }, [selectedField]);

  const handleDeleteRecord = record => {
    const { key } = record;
    const nextValue = value.filter(item => item.key !== key);
    onChange(nextValue);
  };

  function handleAddContent() {
    const selectOption = _.find(options, { dictCode: selectedField });
    const nextFields = _.map(fieldValue, ({ label, value: fieldId }) => {
      return {
        ...selectOption,
        label,
        value: fieldId,
        key: `${selectOption.field}_${fieldId}`,
      };
    });
    console.log('-> value', value, nextFields);
    const nextArray = _.unionBy(value, nextFields, 'key');
    if (nextArray.length < value.length + nextFields.length) {
      message.warning('重复添加的选项会被排除掉。');
    }
    onChange(nextArray);
    setFieldValue();
  }

  const columns = [
    {
      title: '字段',
      dataIndex: 'fieldName',
    },
    {
      title: '字段值',
      dataIndex: 'label',
    },
    {
      title: '操作',
      width: 50,
      render: record => (
        <Space>
          <Button
            disabled={disabled}
            icon={<MinusOutlined />}
            danger
            type="link"
            onClick={() => handleDeleteRecord(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className={Styles.contentScreen}>
      <Row gutter={20} className={Styles.contentScreenForm}>
        <Col span={8}>
          <TSelect value={selectedField} onChange={setSelectedField} disabled={disabled}>
            {_.map(options, ({ dictCode, field, fieldName }) => (
              <TSelect.Option value={dictCode} key={field}>
                {fieldName}
              </TSelect.Option>
            ))}
          </TSelect>
        </Col>
        <Col span={12}>
          {selectedField && (
            <MultiRootIdDictTreeSelect
              disabled={disabled}
              key={selectedField}
              dict={_.split(selectedField, ',')}
              value={fieldValue}
              dictType="tree"
              labelInValue
              multiple
              onChange={setFieldValue}
            />
          )}
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            disabled={_.isNil(selectedField) || _.isNil(fieldValue)}
            onClick={handleAddContent}
          >
            添加
          </Button>
        </Col>
      </Row>
      <TTable
        bordered
        showHeader={false}
        columns={columns}
        size="small"
        dataSource={value}
        rowKey="key"
      />
    </div>
  );
}

export default ContentScreen;
