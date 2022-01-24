import React, { useState } from 'react';
import { Button } from 'antd';
import { TTable, utils, OperateBar } from '@/components/tis_ui';
import StrategyModel from '../StrategyModel';
import { modulesContentType } from '@/utils/constantEnum';

const { IDGenerator } = utils;

const suggestId = new IDGenerator();

function Index({ disabled, stragyItems, value = [], onChange }) {
  const [suggestModalVisible, setSuggestModalVisible] = useState(false);
  const [allreadyContentType, setAllreadyContentType] = useState([]);

  const columns = [
    {
      title: '推荐策略',
      dataIndex: 'name',
    },
    {
      title: '内容类型',
      dataIndex: 'contentType',
      render(content = []) {
        return content
          .map(code => {
            return modulesContentType.$v_names[code];
          })
          .join('|');
      },
    },
    {
      title: '操作',
      align: 'center',
      render: record => {
        return (
          <OperateBar>
            <OperateBar.Button
              danger
              disabled={disabled}
              confirmText="警告"
              confirmContent="确定删除吗?"
              onClick={() => {
                const newValue = value.filter(({ key }) => key !== record.key);
                onChange(newValue);
              }}
            >
              删除
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  return (
    <>
      <Button
        disabled={disabled}
        type="primary"
        onClick={() => {
          setSuggestModalVisible(true);
        }}
      >
        添加
      </Button>
      <TTable columns={columns} dataSource={value} rowKey="key" />
      {suggestModalVisible && (
        <StrategyModel
          stragyItems={stragyItems}
          filterContentType={allreadyContentType}
          onOk={({ strategy, stragyItem, strategyContentType }) => {
            setAllreadyContentType(new Set([...allreadyContentType, ...strategyContentType]));
            onChange([
              ...value,
              {
                key: suggestId.next(),
                code: strategy,
                name: stragyItem.name,
                contentType: strategyContentType,
              },
            ]);
            setSuggestModalVisible(false);
          }}
          onCancel={() => setSuggestModalVisible()}
        />
      )}
    </>
  );
}

Index.defaultProps = {
  value: [],
  stragyItems: [],
};

export default Index;
