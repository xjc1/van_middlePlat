/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import Styles from './index.less';

function Index({ pagination, ...others }) {
  const needPagination = pagination && !_.isUndefined(pagination.current);

  return (
    <Table
      className={Styles.ttable}
      pagination={{
        showSizeChanger: false,
        showQuickJumper: true,
        showTotal: total => `总共 ${total} 条数据`,
        ...pagination,
        ...(needPagination && {
          current: pagination.current + 1,
          onChange: (page, size) => pagination.onChange && pagination.onChange(page - 1, size),
        }),
      }}
      {...others}
    />
  );
}

export default Index;
