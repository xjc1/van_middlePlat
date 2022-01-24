import React, { useState, useEffect } from 'react';
import { DICT, TRANSLATE } from '@/services/api';
import _ from 'lodash';
import { Cascader, Button, Input, Table, message } from 'antd';
import DictAssistant from '@/utils/DictAssistant';

function DictLazyCasader(props) {
  const { onChange, value = [], disabled, dict = [], useRootId = true } = props;
  const [options, setOptions] = useState([]);
  const [list, setList] = useState([]);
  const [checkedValue, setCheckedValue] = useState({});

useEffect(() => {
  let newValue = [...list];
  if(useRootId){
    newValue = _.groupBy(list, 'rootId');
  }
 onChange(newValue)
}, [list])

  useEffect(() => {
    // 待后端数据格式更新

    DictAssistant.fetchDictsWithMemo(dict).then((rows = []) => {
      const initOptions = rows.map(({ _id, name, code }) => ({ value: _id, label: name, key: _id , code, isLeaf: false }));
      setOptions(initOptions);
    });
  }, []);

  const loadChild = selectedOptions => {
    const selected = selectedOptions[selectedOptions.length - 1];
    selected.loading = true;
    DictAssistant.fetchDictByIdWithMemo( selected.value).then(data => {
      const childOptions = data.map(({ id, name }) => ({ value: id, label: name, key: id, isLeaf: false }));
      selected.loading = false;
      selected.children = childOptions;
      setOptions([...options]);
    });
  };


  return (
    <>
    <div style={{display: 'flex'}}>
      <Cascader
      style={{flex: 1}}
        disabled={disabled}
        options={options}
        loadData={loadChild}
        onChange={(keysArray = [], items) => {
          const firstKey = keysArray[0];
          const lastKey = keysArray[keysArray.length-1];
          const newCheckedValue = {key: lastKey, name: _.map(items, ({ label}) => label).join('/')};
          if(useRootId){
            newCheckedValue.rootId = firstKey;
          }
          setCheckedValue(newCheckedValue);
        }}
        changeOnSelect
      />
      <Button style={{marginLeft: 10}} disabled={!checkedValue.key} type="primary" onClick={() => {
        const { key: checkedKey } = checkedValue;
        const checkItem = _.find(list, { key: checkedKey });
        if (checkItem) {
          message.warning('不要重复添加');
          return;
        }
        setList([...list, checkedValue])
      }}>添加</Button>
      </div>
      <Table dataSource={list} style={{marginTop: 10}} bordered columns = {[
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
      ]}/>
    </>
  );
}

export default DictLazyCasader;
