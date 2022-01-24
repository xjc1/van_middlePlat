import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, Tooltip, Typography, Divider, message } from 'antd';
import { useDebounceFn } from 'ahooks';
import _ from 'lodash';
import { TSelect } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { DIMENSION } from '@/services/api';

const defaultPageSize = 4;
const defaultSize = 200;

function DimensionSign({
  value = [],
  onChange = EmptyFn,
  handleDelete = EmptyFn,
  index,
  handleValueChange,
}) {
  const [selecteDimension, setSelecteDimension] = useState();
  const [selecteTag, setSelecteTag] = useState();
  const [dimensionOptions, setDimensionOptions] = useState({});
  const [tagsOptions, setTagsOptions] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const { run: handleWordsSearchDebounce } = useDebounceFn(handleWordsSearch, {wait: 500});

  useEffect(() => {
    // 拉取维度列表
    fetchDimensionList();
  }, []);

  async function handleDimensionSelect(dimension) {
    setSelecteDimension(dimension);
    const { key: dimensionSelectId, label: dimensionName } = dimension || {};
    const { value: dimensionUnique } =
      dimensionOptions.find(it => it.key === dimensionSelectId) || {};
    if (dimensionSelectId) {
      // 根据选择的维度去查询对应的标签
      const res = await DIMENSION.getLabelsByDimensionIdUsingGET(dimensionSelectId);
      const newTagOptions = res.map(({ id, label }) => ({ label, key: id, value: id }));
      const tagsDataArray = res.map(({ id, otherWords, label, dimensionId }) => ({
        labelId: id,
        otherWords,
        labelName: label,
        dimensionUnique,
        dimensionName,
        dmId: dimensionId,
      }));
      setTagsOptions(newTagOptions);
      setTagsArray(tagsDataArray);
      // 维度变化则重置已选择的标签
      setSelecteTag();
    }
  }

  // 拉取维度列表
  function fetchDimensionList() {
    DIMENSION.searchDimensionUsingPOST({
      params: { size: defaultSize },
      body: {},
    })
      .then(items =>
        _.map(items, ({ id, name, dimensionUnique }) => ({
          label: name,
          value: dimensionUnique,
          key: id,
        })),
      )
      .then(nextWords => setDimensionOptions(nextWords));
  }

  function handleTagsSelect(tag) {
    setSelecteTag(tag);
  }

  function handleAddData() {
    const newValue = _.cloneDeep(value);
    // 重复数据提醒
    if (selecteTag && value.some(it => it.labelId === selecteTag.key)) {
      message.error('请勿重复添加');
      return;
    }
    value.some(it => it.labels === selecteTag.label);
    const { key } = selecteTag;
    const data = tagsArray.find(it => it.labelId === key);
    newValue.push(data);
    handleValueChange(index, newValue);
  }

  // 根据维度名称模糊搜索
  function handleWordsSearch(val) {
    DIMENSION.searchDimensionUsingPOST({
      params: { size: defaultSize },
      body: { name: val },
    })
      .then(items =>
        _.map(items, ({ id, name, dimensionUnique }) => ({
          label: name,
          value: dimensionUnique,
          key: id,
        })),
      )
      .then(nextWords => setDimensionOptions(nextWords));
  }

  function onDelete() {
    handleDelete(index);
  }

  const canAdd = () => {
    if (selecteDimension && selecteTag) {
      return false;
    }
    return true;
  };

  return (
    <Row>
      <Col span={6} style={{ marginRight: '20px' }}>
        <TSelect
          placeholder="请先输入维度"
          showSearch
          allowClear
          labelInValue
          value={selecteDimension}
          optionFilterProp="children"
          onSearch={handleWordsSearchDebounce}
          onChange={handleDimensionSelect}
        >
          {_.map(dimensionOptions, ({ key, label }) => (
            <TSelect.Option key={key} title={label}>
              {label}
            </TSelect.Option>
          ))}
        </TSelect>
      </Col>
      <Col span={6} style={{ marginRight: '20px' }}>
        <TSelect
          showSearch
          placeholder="请选择标签"
          disabled={!selecteDimension}
          allowClear
          labelInValue
          value={selecteTag}
          optionFilterProp="children"
          onChange={handleTagsSelect}
        >
          {_.map(tagsOptions, ({ key, label }) => (
            <TSelect.Option key={key} title={label}>
              {label}
            </TSelect.Option>
          ))}
        </TSelect>
      </Col>
      <Col span={10}>
        <Button type="primary" onClick={handleAddData} disabled={canAdd()}>
          添加
        </Button>
        <Divider type="vertical" />
        {index > 0 && (
          <Button danger onClick={onDelete}>
            删除分组
          </Button>
        )}
      </Col>
      <Col span={24}>
        <Table
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '维度',
              dataIndex: 'dimensionName',
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
              title: '标签',
              dataIndex: 'labelName',
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
              title: '不同说法',
              dataIndex: 'otherWords',
              render: (label, record) => {
                const { otherWords = [] } = record;
                return (
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 2,
                      ellipsis: true,
                    }}
                  >
                    <Tooltip title={otherWords.join('|')}>{otherWords.join('|')}</Tooltip>
                  </Typography.Paragraph>
                );
              },
            },
            {
              title: '操作',
              align: 'center',
              width: 120,
              render: (text, record) => (
                <a
                  onClick={() => {
                    handleValueChange(
                      index,
                      _.filter(value, ({ labelId }) => labelId !== record.labelId),
                    );
                  }}
                >
                  删除
                </a>
              ),
            },
          ]}
          dataSource={value}
          size="small"
        />
      </Col>
    </Row>
  );
}

export default DimensionSign;
