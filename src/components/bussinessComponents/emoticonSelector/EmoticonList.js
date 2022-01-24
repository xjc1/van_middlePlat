import React, { useEffect, useState } from 'react';
import { Col, Empty, Pagination, Popover, Row } from 'antd';
import styles from './index.less';
import _ from 'lodash';
import classnames from 'classnames';
import { EmptyFn } from '@/components/tis_ui';
import { EXPRESSIONS } from '@/services/api';

function EmoticonList({ value = [], onChange = EmptyFn, multiple = true }) {
  const [listInfo, setListInfo] = useState({
    list: [],
    pageNum: 0,
    pageSize: 24,
    total: 0,
  });

  useEffect(() => {
    getEmoticons({});
  }, []);

  function getEmoticons({ page = 0, size = 24 }) {
    EXPRESSIONS.findAllExpressionUsingPOST({ params: { page, size } }).then(res => {
      const { content: list = [], number: pageNum, totalElements: total, size: pageSize } = res;
      setListInfo({
        list,
        pageNum,
        pageSize,
        total,
      });
    });
  }

  function isEmoticonSelected(id) {
    if (!multiple) {
      return value && value.id === id;
    }
    return Array.isArray(value) && !!value.find(item => item.id === id);
  }

  function handleMultiSelect(emoticon) {
    if (isEmoticonSelected(emoticon.id)) {
      onChange(value.filter(item => item.id !== emoticon.id));
      return;
    }
    onChange([...value, emoticon]);
  }

  return (
    <>
      {listInfo.list.length > 0 ? (
        <Row className={styles.emoticonList} gutter={8}>
          {_.map(listInfo.list, (emoticon = {}) => {
            const { id, name = '', icon = {} } = emoticon;
            return (
              <Col className={styles.emoticonItem} key={id} span={4}>
                <Popover
                  content={
                    <>
                      <h5>{name}</h5>
                      <div className={classnames([styles.emoticonPreview, styles.previewDisabled])}>
                        <img src={icon.url} alt="" />
                      </div>
                    </>
                  }
                  mouseEnterDelay={1}
                >
                  <img
                    className={classnames({
                      [styles.selectedEmoticon]: isEmoticonSelected(id),
                    })}
                    src={icon.url}
                    alt={name}
                    onClick={() => (multiple ? handleMultiSelect(emoticon) : onChange(emoticon))}
                  />
                </Popover>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Empty className={styles.emoticonListEmpty} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Pagination
        size="small"
        showQuickJumper
        total={listInfo.total}
        current={listInfo.pageNum + 1}
        pageSize={listInfo.pageSize}
        onChange={page => getEmoticons({ page: page - 1 })}
        style={{ textAlign: 'right' }}
      />
    </>
  );
}

export default EmoticonList;
