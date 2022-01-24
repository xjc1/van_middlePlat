import React, { useState } from 'react';
import { Col, Input, message, Row } from 'antd';
import { EmptyFn, TButton, TTable } from '@/components/tis_ui';
import { POLICY } from '@/services/api';
import classnames from 'classnames';
import styles from '../index.less';

function SearchPolicyList({ columns = [], targetId, filterIds = [], onSuccess = EmptyFn }) {
  const [searchText, setSearchText] = useState();
  const [loadingList, setLoadingList] = useState(false);
  const [searchedPolicyListInfo, setSearchedPolicyListInfo] = useState({
    content: [],
    total: 0,
    pageNum: 0,
  });

  const fetchPolicyList = (args = {}) => {
    const { page = 0, size = 5, ...body } = args;
    setLoadingList(true);
    POLICY.listPolicyUsingPOST({
      params: { page, size },
      body,
    })
      .then(res => {
        const { content = [], number, totalElements: total } = res;
        setSearchedPolicyListInfo({
          content,
          total,
          pageNum: number,
        });
        if (!content.length) {
          message.info('暂无数据');
        }
      })
      .finally(() => setLoadingList(false));
  };

  const handleSearchPolicy = () => {
    if (!searchText) {
      message.warn('请输入政策名称');
      return;
    }
    fetchPolicyList({ name: searchText });
  };

  return (
    <>
      <Row>
        <Col span={18}>
          <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
        </Col>
        <Col span={4} offset={2}>
          <TButton.Search loading={loadingList} onClick={handleSearchPolicy}>
            搜索
          </TButton.Search>
        </Col>
      </Row>
      {searchedPolicyListInfo.content.length > 0 && (
        <TTable
          loading={loadingList}
          columns={[
            ...columns,
            {
              title: '操作',
              render: record => {
                return (
                  <span
                    className={classnames(styles.similarPolicyOperate, {
                      [styles.disabled]: filterIds.includes(record.id),
                    })}
                    onClick={() => {
                      if (filterIds.includes(record.id)) return;
                      POLICY.manuallyAddDuplicatesUsingPOST({
                        params: { targetId, sourceId: record.id },
                      }).then(() => {
                        message.success('成功关联');
                        onSuccess();
                      });
                    }}
                  >
                    关联
                  </span>
                );
              },
            },
          ]}
          dataSource={searchedPolicyListInfo.content}
          pagination={{
            size: 'small',
            current: searchedPolicyListInfo.pageNum,
            total: searchedPolicyListInfo.total,
            onChange: page => fetchPolicyList({ page, name: searchText }),
          }}
          rowKey="id"
        />
      )}
    </>
  );
}

export default SearchPolicyList;
