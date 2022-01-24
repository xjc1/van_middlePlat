/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, message } from 'antd';
import _ from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { EmptyFn } from '../../tis_ui';
import TSearchSelector from './TSearchSelector';

const defaultColumn = [
  {
    title: '名称',
    dataIndex: 'label',
  },
];
function TSearchMultiTable({
  value = [],
  defaultPageSize = 4,
  disabled = false,
  onChange = EmptyFn,
  getPopupContainer,
  type,
  columns=defaultColumn,
  mode,
  onTranslate,
  showHeader = false,
}) {
  const [currentSelected, setCurrentSelected] = useState([]);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (value.length > 0) {
      onTranslate(value).then(items => {
        onChange(items);
        setIsInit(true);
      });
    } else {
      setIsInit(true);
    }
  }, []);

  function handleAdd() {
    const inter = _.intersectionBy(currentSelected, value, 'key');
    if (inter.length > 0) {
      message.error('请勿重复添加');
      return;
    }
    onChange([...value, ...currentSelected]);
    setCurrentSelected([]);
  }

  return (
    <Col span={24}>
      {!disabled && (
        <Row>
          <Col span={20}>
            <TSearchSelector
              mode={mode}
              getPopupContainer={getPopupContainer}
              value={currentSelected}
              type={type}
              onChange={vals => {
                setCurrentSelected(vals);
              }}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              disabled={!isInit && currentSelected.length === 0}
              style={{ marginLeft: 10 }}
              icon={<PlusOutlined />}
              onClick={handleAdd}
              size="normal"
            />
          </Col>
        </Row>
      )}
      <Row>
        {isInit && (
          <Col span={24}>
            <Table
              disabled={disabled}
              bordered
              locale={{
                emptyText: '已选列表',
              }}
              showHeader={showHeader}
              style={{ margin: '10px 0' }}
              pagination={{
                defaultPageSize,
              }}
              columns={[
              ...columns,
                {
                  title: '操作',
                  width: 100,
                  align: 'center',
                  render: (text, record) => (
                    <span>
                      {!disabled && (
                        <a
                          onClick={() => {
                            onChange(_.filter(value, ({ key }) => key !== record.key));
                          }}
                        >
                          删除
                        </a>
                      )}
                    </span>
                  ),
                },
              ]}
              dataSource={value}
              size="small"
            />
          </Col>
        )}
      </Row>
    </Col>
  );
}

TSearchMultiTable.propTypes = {
  /** 表格数据 */
  value: PropTypes.array,
  /** 表格每一页的数据条数 */
  defaultPageSize: PropTypes.number,
  /** 是否可添加 */
  disabled: PropTypes.bool,
  /** 添加内容事件 */
  onChange: PropTypes.func,
  /** 类型 */
  type: PropTypes.string,
  /**
   * 翻译函数，处理数据在表格中的回显问题。
   * @param {array} value
   * @returns {object} { key: 'id或者其它键值', label: '中文', value: '实际的值' }
   */
  onTranslate: PropTypes.func,
  /** 是否显示表格的表头 */
  showHeader: PropTypes.bool,
};

export default TSearchMultiTable;
