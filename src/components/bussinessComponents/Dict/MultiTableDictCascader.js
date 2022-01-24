import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, message, Cascader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DICT } from '@/services/api';
import _ from 'lodash';
import DictCascader from './DictCascader';
import { EmptyFn } from '../../tis_ui';
import DictAssistant from '@/utils/DictAssistant';
import multiCardStyle from './MultiTableDictCascader.less';
import styles from './multiTableFormItem.less';
import { cascaderDropdownRender } from './DictLabel';

function MultiTableDictCascader({
  label,
  value,
  defaultPageSize = 4,
  dict,
  rootCode,
  // 用code通过接口批量翻译,需要传rootCode
  disabled = false,
  fetchDict = DictAssistant.fetchTreeDictWithMemo,
  changeOnSelect = true,
  onChange = EmptyFn,
  showSearch = false,
  showCode = false,
}) {
  const [list, setList] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [inputText, setInputText] = useState(null);
  const [treeData, setTreeData] = useState([]);
  useEffect(() => {
    onChange(list);
  }, [list]);

  const translateCodesByApi = (codes, rootDict) => {
    // 这里的数据格式是[[code]]
    const flattenValue = _.flatten(codes);
    DICT.batchTranslateDictPathByCodesUsingPOST({
      body: {
        rootCode: rootDict,
        childCodes: flattenValue,
      },
    }).then(translateItem => {
      const translateList = _.map(flattenValue, val => {
        const fullPathAndName = _.reduce(
          translateItem[val].slice(1),
          (result, { code, name }) => {
            result.names.push(name);
            result.codes.push(code);
            return result;
          },
          { names: [], codes: [] },
        );
        return {
          key: fullPathAndName.codes.join('_'),
          val: fullPathAndName.codes, // 这里的值为数组
          labelArray: fullPathAndName.names,
        };
      });
      setList(translateList);
    });
  };

  useEffect(() => {
    fetchDict(dict).then(data => {
      const groups = _.groupBy(data, 'parentcode');
      let result = [];
      // 多个字典
      if (_.isArray(dict)) {
        dict.forEach(ditCode => {
          const dictRootItem = _.find(data, { code: ditCode });
          if (dictRootItem) {
            result.push({
              value: ditCode,
              label: dictRootItem.name,
              children: DictCascader.item2treeNode(groups[ditCode], groups, {}),
            });
          }
        });
      } else {
        result = DictCascader.item2treeNode(groups[dict], groups, {});
      }
      setTreeData(result);
      // 有rootCode用批量翻译接口
      if (rootCode) {
        translateCodesByApi(value, rootCode);
      } else {
        setList(
          _.map(value, val => ({
            key: _.join(val, '_'),
            val,
            labelArray: _.map(val, itemId => {
              const piece = _.find(data, { code: itemId });
              return piece ? piece.name : itemId;
            }),
          })),
        );
      }
    });
  }, []);
  return (
    <Col span={24}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Col span={6} className={styles.multiTableLabel}>
          <span className={multiCardStyle.label}>{label}</span>
        </Col>
        <Col span={16}>
          <Row>
            <Col span={20}>
              <Cascader
                allowClear
                showSearch={showSearch}
                getPopupContainer={triggerNode => triggerNode.parentElement}
                disabled={disabled}
                dict={dict}
                value={inputText}
                options={treeData}
                changeOnSelect={changeOnSelect}
                dropdownRender={showCode && cascaderDropdownRender({ root: dict })}
                onChange={(val, items) => {
                  setCurrentSelected({
                    key: _.join(val, '_'),
                    val,
                    labelArray: _.map(items, ({ label: text }) => text),
                  });
                  setInputText(val);
                }}
              />
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                disabled={!inputText}
                style={{ marginLeft: 10 }}
                icon={<PlusOutlined />}
                onClick={() => {
                  const checkItem = _.find(list, { key: currentSelected.key });
                  if (checkItem) {
                    message.warning('不要重复添加');
                    return;
                  }
                  setList([...list, currentSelected]);
                  setInputText(null);
                }}
                size="normal"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                disabled={disabled}
                bordered
                locale={{
                  emptyText: '已选列表',
                }}
                showHeader={false}
                style={{ margin: '10px 0' }}
                pagination={{
                  defaultPageSize,
                }}
                columns={[
                  {
                    title: '名称',
                    dataIndex: 'labelArray',
                    render: arr => _.join(arr, ' | '),
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
                dataSource={list}
                size="small"
              />
            </Col>
          </Row>
        </Col>
      </div>
    </Col>
  );
}

export default MultiTableDictCascader;
