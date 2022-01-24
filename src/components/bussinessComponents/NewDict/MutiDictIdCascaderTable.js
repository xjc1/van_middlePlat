import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, message, Cascader } from 'antd';
import { DICT } from '@/services/api';
import _ from 'lodash';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';
import { EmptyFn } from '../../tis_ui';
import DictAssistant from '@/utils/DictAssistant';
import multiCardStyle from './MultiTableDictCascader.less';
import styles from './multiTableFormItem.less';

function MultiTableDictCascader({
  label,
  value = [],
  defaultPageSize = 4,
  dict,
  disabled = false,
  fetchDict = DictAssistant.fetchTreeDictWithMemo,
  onChange = EmptyFn,
  showSearch = false,
  labelCol = 6,
  contentCol = 16,
  rootDict = {},
}) {
  const [list, setList] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [inputText, setInputText] = useState(null);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    onChange(list);
  }, [list]);

  useEffect(() => {
    fetchDict(dict).then(data => {
      const groups = _.groupBy(data, 'parentcode');
      const dictArr = _.isArray(dict) ? dict : [dict];
      const result = _.flatten(
        _.map(dictArr, item => {
          return item2treeNode(groups[item], groups, {});
        }),
      );
      setTreeData(result);
      const body = _.map(_.groupBy(value, 'rootCode'), (val, key) => {
        return { rootId: rootDict[key], childIds: _.map(val, ({ id }) => id) };
      });
      const dictContion = { translateItems: body };
      DICT.batchTranslateDictPathByIdsUsingPOST({ body: dictContion }).then(dictData => {
        const dictList = _.reduce(
          dictData,
          (res, vals) => {
            return { ...res, ...vals };
          },
          {},
        );
        const initList = value.map(({ id }) => ({
          id,
          key: id,
          name: _.reduce(
            dictList[id].slice(1),
            (path, { name }) => {
              return `${path + name}/`;
            },
            '',
          ).slice(0, -1),
        }));
        setList(initList);
      });
    });
  }, []);

  function item2treeNode(roots, group) {
    return _.map(roots, ({ code, name, _id }) => ({
      value: _id,
      label: name,
      children: group[code] && item2treeNode(group[code], group),
    }));
  }

  return (
    <Col span={24}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Col span={labelCol} className={styles.multiTableLabel}>
          <span className={multiCardStyle.label}>{label}</span>
        </Col>
        <Col span={contentCol}>
          <Row>
            <Col span={20}>
              <Cascader
                changeOnSelect
                allowClear
                showSearch={showSearch}
                getPopupContainer={triggerNode => triggerNode.parentElement}
                disabled={disabled}
                dict={dict}
                value={inputText}
                options={treeData}
                onChange={(val, items) => {
                  setCurrentSelected({
                    key: _.takeRight(val, 1)[0],
                    val,
                    name: _.map(items, ({ label: text }) => text).join('/'),
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

export default connect(({ global: { rootDict } }) => ({ rootDict }))(MultiTableDictCascader);
