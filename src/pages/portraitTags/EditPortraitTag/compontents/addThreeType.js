/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Row, Col, Cascader, Button, Table, Typography, Tooltip, message } from 'antd';
import _ from 'lodash';
import EmptyFn from '@/utils/EmptyFn';
import { DictCascader } from '@/components/bussinessComponents';
import DictAssistant from '@/utils/DictAssistant';
import useUnmount from '@/components/tis_ui/hooks/useUnmount';
import { appUserType } from '@/utils/constantEnum';

const fetchDict = DictAssistant.fetchTreeDictWithMemo;
const { item2treeNode } = DictCascader;

const PERSONAL_DICT = '1000';
const LEGALPERSON_DICT = 'FRSJFL1000';

const defaultPageSize = 4;

function formatTree(map) {
  const treeData = _.reduce(
    map,
    (result, list, dict) => {
      const groups = _.groupBy(list, 'parentcode');
      return result.concat(item2treeNode(groups[dict], groups));
    },
    [],
  );
  return treeData;
}
// 根据type进行切换
function AddThreeType({ value = [], onChange = EmptyFn, disabled, type = 'both' }) {
  const [threeTypeTree, setThreeTypeTree] = useState([]);
  const [selectedThreeType, setSelectedThreeType] = useState();
  const [safeExecute] = useUnmount();

  const $setThreeTypeTree = safeExecute(setThreeTypeTree);

  let cascaderRef = null;

  async function fetchThreeType() {
    const personal = await fetchDict(PERSONAL_DICT);
    const legalPerson = await fetchDict(LEGALPERSON_DICT);
    const personalData = { [PERSONAL_DICT]: personal };
    const legalpersonData = { [LEGALPERSON_DICT]: legalPerson };
    let result = {};
    if (type === appUserType.self) {
      result = formatTree(personalData);
    } else if (type === appUserType.legalPerson) {
      result = formatTree(legalpersonData);
    } else {
      result = formatTree({
        [PERSONAL_DICT]: personal,
        [LEGALPERSON_DICT]: legalPerson,
      });
    }
    $setThreeTypeTree(result);
  }

  useEffect(() => {
    fetchThreeType();
  }, []);

  function handleThreeTypeSelect(selected, nodes) {
    const currentTarget = _.last(selected);
    const threeTypePath = nodes.reduce((path, { label }) => `${path + label}/`, '').slice(0, -1);
    if (currentTarget) {
      setSelectedThreeType({
        label: threeTypePath,
        code: currentTarget,
        key: currentTarget,
      });
    }
  }

  function handleAdd() {
    if (!selectedThreeType) {
      message.error('不允许添加空值');
      return;
    }
    if (value.some(({ key }) => key === selectedThreeType.key)) {
      message.error('请勿重复添加');
      return;
    }
    onChange([...value, selectedThreeType]);
    setSelectedThreeType();
    cascaderRef.setValue([]);
  }

  return (
    <>
      <Row style={{ marginBottom: '20px' }}>
        {!disabled && (
          <>
            <Col span={10} style={{ marginRight: '20px' }}>
              <Cascader
                ref={cascader => (cascaderRef = cascader)}
                allowClear
                showSearch
                disabled={disabled}
                options={threeTypeTree}
                onChange={handleThreeTypeSelect}
                placeholder="请选择三级分类"
              />
            </Col>
            <Col>
              <Button type="primary" disabled={disabled} onClick={handleAdd}>
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
            title: '三级分类名称',
            dataIndex: 'label',
            width: '50%',
            render: label => (
              <Typography.Paragraph
                ellipsis={{
                  rows: 2,
                  ellipsis: true,
                }}
              >
                <Tooltip title={label}>{label}</Tooltip>
              </Typography.Paragraph>
            ),
          },
          {
            title: '编码',
            dataIndex: 'code',
          },
          {
            title: '操作',
            width: 120,
            align: 'center',
            render: record => (
              <a
                style={{ display: disabled ? 'none' : 'block' }}
                onClick={() => onChange(value.filter(({ key }) => key !== record.key))}
              >
                删除
              </a>
            ),
          },
        ]}
      />
    </>
  );
}

export default AddThreeType;
