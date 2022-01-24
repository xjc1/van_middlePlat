import React, { useState, useEffect } from 'react';
import { DICT } from '@/services/api';
import _ from 'lodash';
import { Cascader, Button, Table, message } from 'antd';

function MultiRootDictTable(props) {
  const { onChange, value = [], disabled, dict } = props;
  const [options, setOptions] = useState([]);
  const [list, setList] = useState([]);
  const [checkedValue, setCheckedValue] = useState({});
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    let newValue = [...list];
    // 多个根字典
    const groupValue = _.groupBy(list, 'rootId');

    newValue = Object.entries(groupValue).map(([k, v]) => ({
      rootId: k,
      childIds: v.map(({ key }) => key),
    }));
    onChange(newValue);
  }, [list]);

  useEffect(() => {
    // 数据初始化
    const groupValue = _.groupBy(value, 'rootId');
    const forMatValue = Object.entries(groupValue).map(([k, v]) => ({
      rootId: k,
      childIds: _.flattenDeep(v.map(({ childIds = [] }) => childIds)),
    }));

    if (forMatValue.length > 0) {
      // 数据做回显
      DICT.batchTranslateDictPathByIdsUsingPOST({ body: { translateItems: forMatValue } }).then(
        data => {
          const initData = [];
          Object.entries(data).forEach(([k, v]) => {
            Object.entries(v).forEach(([key, val]) => {
              initData.push({
                rootId: k,
                name: val.map(({ name }) => name).join('/'),
                key,
                value: key,
              });
            });
          });
          setList(initData);
        },
      );
    }

    // 获取所有根节点
    DICT.findTreeDictionaryUsingPOST({ body: { id: dict } }).then((rows = []) => {
      const initOptions = rows.map(({ id, name, code }) => ({
        value: id,
        label: name,
        key: id,
        code,
        isLeaf: false,
      }));
      setOptions(initOptions);
    });
  }, []);

  const loadChild = selectedOptions => {
    const selected = selectedOptions[selectedOptions.length - 1];
    selected.loading = true;
    DICT.findTreeDictionaryUsingPOST({ body: { id: selected.value } }).then(data => {
      const childOptions = data.map(({ id, name }) => ({
        value: id,
        label: name,
        key: id,
        isLeaf: false,
      }));
      selected.loading = false;
      selected.children = childOptions;
      setOptions([...options]);
    });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Cascader
          style={{ flex: 1 }}
          disabled={disabled}
          options={options}
          loadData={loadChild}
          value={inputValue}
          onChange={(keysArray = [], items) => {
            const firstKey = keysArray[0];
            const lastKey = keysArray[keysArray.length - 1];
            const newCheckedValue = {
              key: lastKey,
              name: _.map(items, ({ label }) => label).join('/'),
              rootId: firstKey,
            };
            setCheckedValue(newCheckedValue);
            setInputValue(keysArray);
          }}
          changeOnSelect
        />
        <Button
          style={{ marginLeft: 10 }}
          disabled={!checkedValue.key}
          type="primary"
          onClick={() => {
            const { key: checkedKey } = checkedValue;
            const checkItem = _.find(list, { key: checkedKey });
            if (checkItem) {
              message.warning('不要重复添加');
              return;
            }
            setList([...list, checkedValue]);
            setInputValue(null);
          }}
        >
          添加
        </Button>
      </div>
      <Table
        dataSource={list}
        style={{ marginTop: 10 }}
        bordered
        pagination={{
          defaultPageSize: 5,
        }}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '操作',
            width: 100,
            align: 'center',
            render: (text, record) => (
              <span>
                {!disabled && (
                  <a
                    onClick={() => {
                      setList(_.filter(list, ({ key }) => key !== record.key));
                    }}
                  >
                    删除
                  </a>
                )}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}

export default MultiRootDictTable;
