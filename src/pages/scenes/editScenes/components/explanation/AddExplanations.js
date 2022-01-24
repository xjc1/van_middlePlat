import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table, message } from 'antd';
import { TSearchSelector } from '@/components/bussinessComponents';
import EmptyFn from '@/utils/EmptyFn';
import { CONVENIENCE, KERNEL, POLICY } from '@/services/api';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';
import { OperateBar } from '@/components/tis_ui';
import { ArrowDownOutlined, ArrowUpOutlined, RollbackOutlined } from '@ant-design/icons';
import ArrayTools from '@/utils/ArrayTools';

const defaultPageSize = 4;

function AddExplanations({ value = [], onChange = EmptyFn, type, columns, disabled }) {
  const [selectedItems, setSelectedItems] = useState();

  useEffect(() => {
    onChange(value);
  }, []);

  async function handleAdd() {
    if (!selectedItems) {
      message.error('不允许添加空值');
      return;
    }
    if (selectedItems && selectedItems.some(({ key }) => value.some(({ id }) => id === key))) {
      message.error('请勿重复添加');
      return;
    }
    const ids = selectedItems.map(({ key }) => key);
    let list = null;
    switch (type) {
      case 'convenience':
        list = await CONVENIENCE.getConveniencesByIdsUsingPOST({ body: ids });
        break;
      case 'synonym':
        list = await KERNEL.getSynonymByIdsUsingPOST({ body: ids });
        break;
      case 'policyLibrary':
        list = await POLICY.getPolicyByIdsUsingPOST({ body: ids });
        break;
      default:
        list = [];
    }
    const translateRegions = await Code2Name(Promise.resolve({ content: list }), [
      'SH00XZQH',
      'regions',
    ]);
    onChange([
      ...value,
      ...list.map(item => ({
        ...item,
        key: item.id,
        regions: translateRegions.dictNames['SH00XZQH'][item.regions],
      })),
    ]);
    setSelectedItems();
  }

  return (
    <>
      <Row style={{ marginBottom: '20px' }}>
        {!disabled && (
          <>
            <Col span={18}>
              <TSearchSelector
                type={type}
                value={selectedItems}
                onChange={selected => setSelectedItems(selected)}
              />
            </Col>
            <Col span={4} offset={2}>
              <Button type="primary" onClick={handleAdd}>
                添加
              </Button>
            </Col>
          </>
        )}
      </Row>
      <Table
        bordered
        size="small"
        pagination={{
          defaultPageSize,
        }}
        dataSource={value}
        columns={[
          {
            title: '序号',
            dataIndex: 'no',
            render: (text, record) => {
              const recordIndex = _.findIndex(value, record);
              return recordIndex + 1;
            },
          },
          ...columns,
          {
            title: '操作',
            align: 'center',
            width: 150,
            render: record => (
              <OperateBar>
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="确定删除吗?"
                  onClick={() => {
                    onChange(value.filter(({ id }) => id !== record.id));
                  }}
                >
                  删除
                </OperateBar.Button>
                <OperateBar.Button
                  icon={<ArrowUpOutlined />}
                  onClick={() => {
                    const recordIndex = _.findIndex(value, record);
                    ArrayTools.upGo(value, recordIndex);
                    onChange([...value]);
                  }}
                >
                  上移
                </OperateBar.Button>
                <OperateBar.Button
                  icon={<ArrowDownOutlined />}
                  onClick={() => {
                    const recordIndex = _.findIndex(value, record);
                    ArrayTools.downGo(value, recordIndex);
                    onChange([...value]);
                  }}
                >
                  下移
                </OperateBar.Button>
              </OperateBar>
            ),
          },
        ]}
      />
    </>
  );
}

export default AddExplanations;
