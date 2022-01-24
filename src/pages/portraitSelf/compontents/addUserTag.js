import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Table, Space, message, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import _ from 'lodash';
import { TItem, TSelect, TButton, hooks } from '@/components/tis_ui';
import { appUserType } from '@/utils/constantEnum';
import { KERNEL } from '@/services/api';
import EmptyFn from '@/utils/EmptyFn';
import moment from 'moment';

const defaultPageSize = 4;
const { useUnmount } = hooks;

function FormItemWithTable({
  userTagValue = [],
  disabled,
  handleAddTag = EmptyFn,
  handleRemoveTag = EmptyFn,
  handleRefresh = EmptyFn,
  reload = EmptyFn,
  updateTime = '',
}) {
  const handledValue = [...userTagValue];
  const [selecteTag, setSelecteTag] = useState();
  const [tagOptions, setTagOptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const searchInputRef = useRef();
  const [safeExecute] = useUnmount();
  const { run: handleWordsSearchDebounce } = useDebounceFn(handleWordsSearch, { wait: 500 });
  // 标签的类别
  const categoryArray = handledValue.map(({ category }) => ({ text: category, value: category }));
  const uniqCategoryArray = _.uniqBy(categoryArray, 'value');
  useEffect(() => {
    // 拉取列表
    fetchTagList();
  }, []);

  // 根据名称模糊搜索
  function handleWordsSearch(val) {
    KERNEL.getPersonalTagNameListUsingGET({
      params: { size: 10, name: val, object: appUserType.self },
    })
      .then(items => {
        return _.map(items, ({ id, name, category }) => ({
          label: name,
          value: id,
          key: id,
          name,
          category,
          id,
        }));
      })
      .then(nextWords => {
        safeExecute(setTagOptions)(nextWords);
      });
  }

  // 拉取标签列表
  function fetchTagList() {
    KERNEL.getPersonalTagNameListUsingGET({
      params: { size: 10, object: appUserType.self },
    })
      .then(items => {
        return _.map(items, ({ id, name, category }) => ({
          label: name,
          value: id,
          key: id,
          category,
          name,
          id,
        }));
      })
      .then(nextWords => {
        safeExecute(setTagOptions)(nextWords);
      });
  }

  function handleTagSelect(tag) {
    setSelecteTag(tag);
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder="请输入名称"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => {
            confirm();
          }}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => {
              clearFilters();
            }}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          <Button
            type="primary"
            onClick={() => {
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            查询
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => {
      return (
        <div style={{ background: filtered ? '#e6f7ff' : undefined, height: '100%' }}>
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        </div>
      );
    },
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select(), 100);
      }
    },
  });

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
            placeholder="请输入标签名称"
            showSearch
            allowClear
            labelInValue
            value={selecteTag}
            optionFilterProp="children"
            onSearch={handleWordsSearchDebounce}
            onChange={handleTagSelect}
          >
            {_.map(tagOptions, ({ key, label, category }) => (
              <TSelect.Option key={key} title={label}>
                【{category}】{label}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>

        <Space>
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

          <TButton.Button
            type="primary"
            disabled={disabled}
            confirmText={
              updateTime
                ? `您确认要刷新吗? 上次更新时间为[${moment(updateTime).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )}]`
                : '您确认要刷新吗?'
            }
            onClick={() => {
              setRefreshing(true);
              handleRefresh().then(() => {
                safeExecute(setRefreshing)(false);
                safeExecute(reload)();
                message.success('刷新成功');
              });
            }}
            loading={refreshing}
          >
            刷新
          </TButton.Button>
        </Space>
      </Col>
      <Col span={24}>
        <Table
          rowKey="id"
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
            showSizeChanger: true,
            pageSizeOptions: [4, 10, 100],
          }}
          columns={[
            {
              title: '标签名称',
              dataIndex: 'name',
              width: '50%',
              ...getColumnSearchProps('name'),
            },
            {
              title: '标签分类',
              dataIndex: 'category',
              filters: uniqCategoryArray,
              onFilter: (value, record) => record.category.includes(value),
            },
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: (text, record) => (
                <div style={{ display: disabled ? 'none' : 'block' }}>
                  <TButton.Button
                    disabled={record.deletable === 0}
                    size="small"
                    type="link"
                    danger
                    confirmText="您确认要删除吗?"
                    onClick={() => {
                      handleRemoveTag(record.id);
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
