import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, message, Tooltip, Space, Popover } from 'antd';
import EmptyFn from '@/utils/EmptyFn';
import { ArrayFormatTextArea } from '@/components/tis_ui';
import { MODULES } from '@/services/api';
import _ from 'lodash';
import Translate from './translate';
import TSearchSelector from '../Dict/TSearchSelector';


const defaultPageSize = 4;

function AddRelations({
                        value = [],
                        onChange = EmptyFn,
                        type,
                        tableTitle,
                        disabled,
                        bulkAddType,
                        canDelete = true,
                        showBulkAdd = false,
                        firstTranslate = false,
                        extraColumn = [],
                      }) {
  const [selectedItems, setSelectedItems] = useState();
  const [bulkMatterCodes, setBulkMatterCodes] = useState([]);
  const [bulkPopoverVisible, setBulkPopoverVisible] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  useEffect(() => {
    if (firstTranslate && value.length && !_.get(value, '0.key')) {
      Translate[type](value).then(translateData => {
        onChange(value.map((rid) => ({
          rid,
          value: rid,
          label: translateData[rid],
          key: rid,
        })));
      });
    }
  }, []);

  function handleAdd() {
    if (!selectedItems) {
      message.error('不允许添加空值');
      return;
    }
    if (selectedItems && selectedItems.some(item => value.some(({ key }) => key === item.key))) {
      message.error('请勿重复添加');
      return;
    }
    onChange([...value, ...selectedItems]);
    setSelectedItems();
  }

  const onBulkAdd = async (codesArray = []) => {
    setBulkLoading(true);
    const bulkData = await MODULES.getContentsByIdsUsingGET({
      params: { contentType: bulkAddType, ids: codesArray.join(',') },
    });
    const formatData = bulkData.map(({ id, name, regions }) => ({
      label: name,
      value: id,
      key: id,
      regions,
    }));
    onChange(_.uniqBy([...value, ...formatData], 'key'));
    setBulkPopoverVisible(false);
    setBulkLoading(false);
  };

  return (
    <>
      <Row style={{ marginBottom: '20px' }}>
        {!disabled && (
          <>
            <Col span={16}>
              <TSearchSelector
                type={type}
                value={selectedItems}
                isFullInfo
                onChange={items => setSelectedItems(items)}
              />
            </Col>
            <Col span={6} offset={2}>
              <Space>
                <Button type="primary" onClick={handleAdd}>
                  添加
                </Button>
                {showBulkAdd && (
                  <Popover
                    visible={bulkPopoverVisible}
                    content={
                      <ArrayFormatTextArea
                        filter={[',', '，', '\\n', '\\s']}
                        style={{ width: 500 }}
                        value={bulkMatterCodes}
                        loading={bulkLoading}
                        onChange={val => setBulkMatterCodes(val)}
                        onSubmit={onBulkAdd}
                        placeholder="请输入编码,以换行或英文逗号分隔,并点击格式化按钮,例如:
                5f97c1ef67a79e221dc21219,5f8e4ddc2e0e4357fb2e4b1b"
                      />
                    }
                    trigger="click"
                    onVisibleChange={visible => setBulkPopoverVisible(visible)}
                  >
                    <Button loading={bulkLoading} type="primary">
                      通过编码添加
                    </Button>
                  </Popover>
                )}
              </Space>
            </Col>
          </>
        )}
      </Row>
      <Table
        bordered
        size="small"
        columns={_.compact([
          {
            title: tableTitle,
            dataIndex: 'label',
            ellipsis: true,
            render: label => (
              <Tooltip title={label} placement="topLeft">
                {label}
              </Tooltip>
            ),
          },
          ...extraColumn,
          canDelete && {
            title: '操作',
            width: 120,
            align: 'center',
            render: record => (
              <a
                style={{ display: disabled ? 'none' : 'block' }}
                onClick={() => {
                  onChange(value.filter(({ key }) => key !== record.key));
                }}
              >
                删除
              </a>
            ),
          },
        ])}
        // dataSource={Array.isArray(value) ? value : _.compact([value])}
        dataSource={value}
        pagination={{
          defaultPageSize,
        }}
      />
    </>
  );
}

export default AddRelations;
