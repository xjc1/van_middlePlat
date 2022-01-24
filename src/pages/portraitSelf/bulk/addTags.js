import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Space, message } from 'antd';
import { useDebounceFn } from 'ahooks';
import _ from 'lodash';
import { TItem, TSelect, TButton, hooks } from '@/components/tis_ui';
import { appUserType } from '@/utils/constantEnum';
import { KERNEL } from '@/services/api';
import EmptyFn from '@/utils/EmptyFn';

const defaultPageSize = 4;
const { useUnmount } = hooks;

function FormItemWithTable({
  userTagValue = [],
  disabled,
  object = appUserType.self,
  setUserTagValue = EmptyFn()
}) {
  const [selectTag, setSelectTag] = useState();
  const [tagOptions, setTagOptions] = useState([]);
  const [safeExecute] = useUnmount();
  const { run: handleWordsSearchDebounce } = useDebounceFn(handleWordsSearch, { wait: 500 });

  useEffect(() => {
    // 拉取列表
    fetchTagList();
  }, []);

  // 根据名称模糊搜索
  function handleWordsSearch(val) {
    KERNEL.getPersonalTagNameListUsingGET({
      params: { size: 10, name: val, object },
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
      params: { size: 10, object: object },
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
    setSelectTag(tag);
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
            placeholder="请输入标签名称"
            showSearch
            allowClear
            labelInValue
            value={selectTag}
            optionFilterProp="children"
            onSearch={handleWordsSearchDebounce}
            onChange={handleTagSelect}
          >
            {_.map(tagOptions, ({ key, label,category }) => (
              <TSelect.Option key={key} title={label}>
                【{category}】{label}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>

        <Space>
          <TButton.Button
            type="primary"
            disabled={!selectTag}
            onClick={() => {
              const { value } = selectTag;
              const isExist = _.find(userTagValue,{value})
              if(isExist){
                message.warning('您已经添加过该数据了，请不要重复添加')
                return
              }
              const select = _.find(tagOptions,{value})
              setSelectTag();
              setUserTagValue([...userTagValue,select])
            }}
          >
            添加
          </TButton.Button>
        </Space>
      </Col>
      <TItem
        col={24}
        labelCol={0}
        wrapperCol={20}
      >
        <Table
          rowKey="id"
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '标签名称',
              dataIndex: 'name',
              width: '50%',
            },
            {
              title: '标签分类',
              dataIndex: 'category',
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
                      setUserTagValue(userTagValue.filter(({id})=>id!==record.id));
                    }}
                  >
                    删除
                  </TButton.Button>
                </div>
              ),
            },
          ]}
          dataSource={userTagValue}
          size="small"
        />
      </TItem>

    </Row>
  );
}

export default FormItemWithTable;
