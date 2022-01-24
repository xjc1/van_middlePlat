import React from 'react';
import _ from 'lodash';
import { Col, Pagination, Row, Spin, Table } from 'antd';
import { connect } from 'dva';
import { EmptyFn } from '@/components/tis_ui';
import { terminalType, appUserType } from '@/utils/constantEnum';
import { renderCellText, CellTooltip, formatDateColumns, ViewTips } from '../utils';
import styles from '../index.less';

const columns = [
  {
    title: '消息标题',
    dataIndex: 'title',
    ellipsis: true,
    width: '240px',
    render: renderCellText,
  },
  {
    title: '对象类型',
    dataIndex: 'objectType',
    width: '100px',
    ellipsis: true,
    render: type => <CellTooltip text={appUserType.$v_names[type]} />,
  },
  {
    title: '总数',
    ellipsis: true,
    dataIndex: 'amount',
    render: renderCellText,
  },
];

function MessageSendListStatistic({ fetchList = EmptyFn, listInfo = {}, loading }) {
  const { content = [], pageNum = 0, pageSize = 10, total = 0 } = listInfo;
  const { messagePushDetail = [] } = _.first(content) || {};
  const [firstMsgSendDetail = {}] = messagePushDetail;
  const { detail: dateDetail = [] } = firstMsgSendDetail;
  const categoryDetail = content
    .map(item => {
      const { messageId, messagePushDetail: msgSendDetail = [] } = item;
      return msgSendDetail.reduce((category, { clientType, amount, detail }) => {
        return {
          ...category,
          [clientType]: detail.reduce((res, { date, count }) => ({ ...res, [date]: count }), {
            messageId,
            amount,
          }),
        };
      }, {});
    })
    .reduce((pre, cur = {}) => {
      _.forEach(cur, (v, k) => {
        if (String(k) in pre) {
          // eslint-disable-next-line no-param-reassign
          pre[k] = [...pre[k], v];
        } else {
          // eslint-disable-next-line no-param-reassign
          pre[k] = [v];
        }
      });
      return pre;
    }, {});

  return (
    <Spin spinning={loading}>
      <div className={styles.statisticList} style={{ overflow: 'auto' }}>
        <ViewTips />
        <Row wrap={false}>
          <Col span={content.length > 0 ? 9 : 24}>
            <div className={styles.statisticListHeader} />
            <Table
              bordered
              columns={columns}
              dataSource={content}
              pagination={false}
              rowKey="messageId"
            />
          </Col>
          {content.length > 0 &&
            _.map(categoryDetail, (data, clientType) => (
              <Col span={5} key={clientType}>
                <div className={styles.statisticListHeader}>
                  {terminalType.$v_names[clientType]}
                </div>
                <Table
                  bordered
                  columns={[
                    {
                      title: '总数',
                      dataIndex: 'amount',
                      width: '80px',
                      fixed: 'left',
                      ellipsis: true,
                      render: renderCellText,
                    },
                    ...formatDateColumns(dateDetail),
                  ]}
                  dataSource={data}
                  scroll={{ x: true }}
                  pagination={false}
                  rowKey="messageId"
                />
              </Col>
            ))}
        </Row>
      </div>
      <div className={styles.statisticPagination}>
        <Pagination
          showQuickJumper
          current={pageNum + 1}
          pageSize={pageSize}
          total={total}
          showTotal={totalCount => `总共${totalCount}条数据`}
          onChange={nextPage => {
            fetchList({ page: nextPage - 1 });
          }}
        />
      </div>
    </Spin>
  );
}

export default connect(({ messageListStatistic, loading }) => ({
  ...messageListStatistic,
  loading: loading.effects['messageListStatistic/fetchData'],
}))(MessageSendListStatistic);
