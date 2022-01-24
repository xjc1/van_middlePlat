/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'antd';
import classNames from 'classnames';
import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import style from './index.less';
import TCard from '../TCard';
import TTable from '../TTable';
import TButton from '../TButton';

// eslint-disable-next-line react/prefer-stateless-function
class RightCard extends Component {
  static defaultProps = {
    title: '',
    columns: [],
    onDelete: null,
    onEdit: null,
    showBulkDelete: false,
    showBulkEdit: false,
  };

  static propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array,
    list: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    showBulkDelete: PropTypes.bool,
    showBulkEdit: PropTypes.bool,
  };

  /**
   * onSearch 输入框查询，数据过滤
   * list 列表数据
   */

  render() {
    const {
      title,
      list,
      columns,
      onEdit,
      onDelete,
      showBulkDelete,
      pagination,
      showBulkEdit,
    } = this.props;
    return (
      <TCard
        tight
        title={title}
        className={classNames(style.splitBox)}
        style={{ flex: 1 }}
        bodyStyle={{
          position: 'absolute',
          width: '100%',
          overflow: 'auto',
          top: '48px',
          padding: 0,
          bottom: 0,
        }}
        extra={
          <>
            {showBulkEdit && (
              <Badge
                style={{
                  backgroundColor: '#1890ff',
                }}
                offset={[-15, 0]}
                count={list.length}
                overflowCount={999}
              >
                {onEdit && (
                  <Button
                    type="primary"
                    disabled={!list.length}
                    className={style.action}
                    onClick={onEdit}
                    icon={<EditOutlined />}
                  >
                    批量编辑
                  </Button>
                )}
              </Badge>
            )}
            {showBulkDelete && (
              <Badge
                style={{
                  backgroundColor: '#1890ff',
                }}
                offset={[-15, 0]}
                count={list.length}
                overflowCount={999}
              >
                <TButton.Button
                  style={{ marginRight: 10 }}
                  type="danger"
                  disabled={list.length === 0}
                  confirmText="警告"
                  icon={<MinusOutlined />}
                  confirmContent={`确定您要删除选中的${list.length}条数据吗?`}
                  className={style.action}
                  onClick={onDelete}
                >
                  批量删除
                </TButton.Button>
              </Badge>
            )}
          </>
        }
      >
        <div className={style.innerboxScroll}>
          <TTable
            size="small"
            columns={columns}
            pagination={pagination}
            dataSource={list}
            rowKey="id"
          />
        </div>
      </TCard>
    );
  }
}

export default RightCard;
