import React from 'react';
import { Col, Pagination, Row, Spin, Table } from 'antd';
import { connect } from 'dva';
import { EmptyFn } from '@/components/tis_ui';
import { messageHistoryType, terminalType, appUserType } from '@/utils/constantEnum';
import { renderCellText, CellTooltip, formatDateColumns, ViewTips } from './utils';
import styles from './index.less';

function MessageListStatistic({
  msgType = messageHistoryType.pull,
  fetchList = EmptyFn,
  listInfo = {},
  loading,
}) {
  const { content = [], pageNum = 0, pageSize = 10, total = 0 } = listInfo;
  const columns = [
    {
      title: msgType === messageHistoryType.pull ? '消息标题' : '提醒标题',
      dataIndex: 'title',
      ellipsis: true,
      width: '240px',
      render: renderCellText,
    },
    {
      title: '终端类型',
      dataIndex: 'clientType',
      ellipsis: true,
      render: (types = []) => {
        const translations = types.map(type => terminalType.$v_names[type]).join(' / ');
        return <CellTooltip text={translations} />;
      },
    },
    {
      title: '对象类型',
      dataIndex: 'objectType',
      ellipsis: true,
      render: type => <CellTooltip text={appUserType.$v_names[type]} />,
    },
    {
      title: '总数',
      dataIndex: 'amount',
      ellipsis: true,
      render: renderCellText,
    },
  ];
  const [first = {}] = content;
  const { detail: dateData = [] } = first.weeklyDetail || {};
  return (
    <Spin spinning={loading}>
      <Row className={styles.statisticList}>
        <Col span={24}>
          <ViewTips />
        </Col>
        <Col span={content.length > 0 ? 12 : 24}>
          <Table
            bordered
            columns={columns}
            dataSource={content}
            pagination={false}
            rowKey="messageId"
          />
        </Col>
        {content.length > 0 && (
          <Col span={12}>
            <Table
              bordered
              columns={formatDateColumns(dateData)}
              dataSource={content.map(({ messageId, weeklyDetail = {} }) => {
                const { detail = [] } = weeklyDetail;
                return detail.reduce((pre, cur) => ({ ...pre, [cur.date]: cur.count }), {
                  messageId,
                });
              })}
              scroll={{
                x: true,
              }}
              pagination={false}
              rowKey="messageId"
            />
          </Col>
        )}
        <Col span={24} className={styles.statisticPagination}>
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
        </Col>
      </Row>
    </Spin>
  );
}

export default connect(({ messageListStatistic, loading }) => ({
  ...messageListStatistic,
  loading: loading.effects['messageListStatistic/fetchData'],
}))(MessageListStatistic);
