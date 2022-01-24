import React, { useState, useEffect } from 'react';
import { Row, Col, Cascader, Button, Table, Typography, Tooltip, message } from 'antd';
import _ from 'lodash';
import EmptyFn from '@/utils/EmptyFn';
import { DictCascader } from '@/components/bussinessComponents';
import DictAssistant from '@/utils/DictAssistant';
import useUnmount from '@/components/tis_ui/hooks/useUnmount';
import { cascaderDropdownRender } from '@/components/bussinessComponents/Dict/DictLabel';
import { commonObjectType } from '@/utils/constantEnum';

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

function AddThreeType({
  value = [],
  onChange = EmptyFn,
  extraType = [],
  updateTime = '',
  disabled,
  object = commonObjectType.personalLegalPerson,
}) {
  const [threeTypeTree, setThreeTypeTree] = useState([]);
  const [selectedThreeType, setSelectedThreeType] = useState();
  const [safeExecute] = useUnmount();

  const $setThreeTypeTree = safeExecute(setThreeTypeTree);

  let cascaderRef = null;

  async function fetchThreeType() {
    let personal = [];
    let legalPerson = [];
    if (object === commonObjectType.personal) {
      personal = await fetchDict(PERSONAL_DICT);
    } else if (object === commonObjectType.legalPerson) {
      legalPerson = await fetchDict(LEGALPERSON_DICT);
    } else {
      personal = await fetchDict(PERSONAL_DICT);
      legalPerson = await fetchDict(LEGALPERSON_DICT);
    }

    const result = formatTree({
      [PERSONAL_DICT]: personal,
      [LEGALPERSON_DICT]: legalPerson,
    });
    $setThreeTypeTree(result);
  }

  useEffect(() => {
    fetchThreeType();
  }, []);

  // 与画像所属分类联动
  useEffect(() => {
    onChange(_.uniqBy([...value, ...extraType], 'key'));
  }, [updateTime]);

  function handleThreeTypeSelect(selected, nodes) {
    const currentTarget = _.last(selected);
    const threeTypePath = nodes.reduce((path, { label }) => `${path + label}/`, '').slice(0, -1);
    // 处理为空的情况
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
                ref={cascader => {
                  cascaderRef = cascader;
                }}
                allowClear
                showSearch
                disabled={disabled}
                options={threeTypeTree}
                onChange={handleThreeTypeSelect}
                placeholder="请选择三级分类"
                dropdownRender={cascaderDropdownRender()}
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
