/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { Badge, Input } from 'antd';
import classNames from 'classnames';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import style from './index.less';
import TTable from '../TTable';
import TButton from '../TButton';
import TCard from '../TCard';
import EventCenter from '../utils/EventCenter';

class LeftCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    columns: PropTypes.array,
    pagination: PropTypes.object,
    list: PropTypes.array.isRequired,
    leftToRight: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    showSearch: PropTypes.bool,
    extra: PropTypes.object,
    hiddenBack: PropTypes.bool,
  };

  static defaultProps = {
    title: '',
    extra: null,
    columns: this.defaultColumns,
    pagination: { defaultPageSize: 10 },
    loading: false,
    searchPlaceholder: '请输入并点击搜索',
    showSearch: true,
    hiddenBack: false,
  };
  /**
   * onSearch 输入框查询，数据过滤
   * onSelectChange 选中数据后的变化
   * list 列表数据
   * selectedKeys 选中的数据id
   */

  render() {
    const {
      title,
      onSearch,
      onSelectChange,
      selectedKeys,
      list,
      columns,
      pagination,
      extra,
      leftToRight,
      rightKeys,
      loading,
      showSearch,
      searchPlaceholder,
      hiddenBack,
    } = this.props;
    return (
      <TCard
        tight
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              {title}
              {showSearch && (
                <Input.Search
                  placeholder={searchPlaceholder}
                  allowClear
                  onSearch={onSearch}
                  style={{ width: 200, marginLeft: 10, marginRight: 10 }}
                />
              )}
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', marginLeft: 10 }}>
              <Badge
                style={{
                  backgroundColor: '#1890ff',
                }}
                offset={[-15, 0]}
                count={selectedKeys.length}
                overflowCount={999}
              >
                {extra}
                <TButton.Button
                  type="primary"
                  disabled={selectedKeys.length === 0}
                  icon={<PlusOutlined />}
                  className={style.action}
                  onClick={() => leftToRight(selectedKeys)}
                >
                  选择
                </TButton.Button>
              </Badge>
              {!hiddenBack && (
                <TButton.Button
                  type="link"
                  style={{ marginRight: '10px' }}
                  onClick={() => EventCenter.emit('goBack')}
                >
                  返回列表
                </TButton.Button>
              )}
            </div>
          </div>
        }
        className={classNames(style.splitBox)}
      >
        <div className={style.innerboxScroll}>
          <TTable
            size="small"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedKeys,
              preserveSelectedRowKeys: true,
              getCheckboxProps: record => ({
                disabled: rightKeys.indexOf(record.id) > -1,
              }),
              onChange: keys => {
                onSelectChange(keys);
              },
            }}
            loading={loading}
            pagination={pagination}
            columns={columns}
            dataSource={list}
            rowKey="id"
          />
        </div>
      </TCard>
    );
  }
}

export default LeftCard;
