import React, { useEffect, useState } from 'react';
import { Col, Row, Table, message } from 'antd';
import { Code2Name } from '@/utils/DictTools';
import _ from 'lodash';
import { useDebounceFn } from 'ahooks';
import { TItem, TSelect, TButton } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import EmptyFn from '@/utils/EmptyFn';

const defaultPageSize = 4;

function FormItemWithTable({ value = [], onChange = EmptyFn, disabled, recordId }) {
  const handledValue = [...value];
  const [selecteTag, setSelecteTag] = useState();
  const [tagOptions, setTagOptions] = useState([]);
  const { run: handleWordsSearchDubounce } = useDebounceFn(handleWordsSearch, { wait: 500 });

  useEffect(() => {
    // 拉取列表
    fetchTagList();
  }, []);

  // 根据名称模糊搜索
  function handleWordsSearch(val) {
    fetchTagList(val);
  }

  // 拉取机构列表
  function fetchTagList(orgName) {
    Code2Name(
      KERNEL.getInstitutionsUsingGET({
        params: { page: 0, size: 20, name: orgName },
      }),
      ['SH00XZQH', 'regions'],
    )
      .then(({ content = [], dictNames = {} }) => {
        return _.map(content, ({ id, name, regions }) => ({
          label: name,
          value: id,
          key: id,
          name,
          id,
          regions: dictNames.SH00XZQH[regions] ? dictNames.SH00XZQH[regions] : regions,
        }));
      })
      .then(nextWords => setTagOptions(nextWords));
  }

  function handleTagSelect(tag) {
    setSelecteTag(tag);
  }

  function handleAddTag(labelId) {
    // 判断是否存在
    if (_.findIndex(handledValue, { id: labelId }) > -1) {
      message.info('已添加');
      return;
    }
    const tag = _.find(tagOptions, { id: labelId });
    const newValue = [...handledValue, tag];
    onChange(newValue);
  }

  return (
    <Row>
      <Col span={16} style={{ display: 'flex' }}>
        <TItem
          labelCol={0}
          wrapperCol={20}
          style={{
            marginBottom: 0,
            paddingRight: 16,
          }}
        >
          <TSelect
            disabled={disabled}
            placeholder="请输入部门名称"
            showSearch
            allowClear
            labelInValue
            value={selecteTag}
            optionFilterProp="children"
            onSearch={handleWordsSearchDubounce}
            onChange={handleTagSelect}
          >
            {_.map(tagOptions, ({ key, label }) => (
              <TSelect.Option key={key} title={label} disabled={recordId === key}>
                {label}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>

        <TButton.Button
          type="primary"
          confirmText="您确认要添加吗?"
          disabled={!selecteTag}
          onClick={() => {
            const { value: selectedID } = selecteTag;
            handleAddTag(selectedID);
            setSelecteTag();
          }}
        >
          添加
        </TButton.Button>
      </Col>
      <Col span={24}>
        <Table
          rowKey="id"
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '部门名称',
              dataIndex: 'name',
              width: '50%',
            },
            {
              title: '行政区划',
              dataIndex: 'regions',
            },
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: (text, record) => (
                <div style={{ display: disabled ? 'none' : 'block' }}>
                  <TButton.Button
                    size="small"
                    type="link"
                    danger
                    confirmText="您确认要删除吗?"
                    onClick={() => {
                      const newValue = handledValue.filter(({ id }) => id !== record.id);
                      onChange(newValue);
                    }}
                  >
                    删除
                  </TButton.Button>
                </div>
              ),
            },
          ]}
          dataSource={handledValue}
          size="small"
        />
      </Col>
    </Row>
  );
}

export default FormItemWithTable;
