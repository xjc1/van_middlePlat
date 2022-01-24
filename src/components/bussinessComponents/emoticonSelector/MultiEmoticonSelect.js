import React, { useEffect, useState } from 'react';
import { Popover, Row, Col, Empty } from 'antd';
import { EmptyFn, TButton } from '@/components/tis_ui';
import { EXPRESSIONS } from '@/services/api';
import classnames from 'classnames';
import _ from 'lodash';
import EmoticonList from './EmoticonList';
import styles from './index.less';

function MultiEmoticonSelect({ value = [], onChange = EmptyFn, disabled = false, col = 6 }) {
  const [initValue, setInitValue] = useState([]);
  const [nextSelect, setNextSelect] = useState([]);
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [editEmoticons, setEditEmoticons] = useState([]);

  useEffect(() => {
    const getDetails = value.map(id => EXPRESSIONS.getExpressionDetailUsingGET(id));
    Promise.all(getDetails).then(values => {
      setInitValue(values);
      setNextSelect(values);
    });
  }, [value.join()]);

  useEffect(() => {
    setNextSelect(initValue);
  }, [isShowSelect]);

  function handleSelect(emoticon) {
    if (!editEmoticons.find(({ id }) => emoticon.id === id)) {
      setEditEmoticons([...editEmoticons, emoticon]);
      return;
    }
    setEditEmoticons(editEmoticons.filter(({ id }) => emoticon.id !== id));
  }

  function handleDelete() {
    if (!editEmoticons.length) return;
    if (editEmoticons.length === initValue.length) {
      onChange([]);
      return;
    }
    const newValue = _.differenceBy(initValue, editEmoticons, 'id');
    onChange(newValue.map(({ id }) => id));
  }

  function handleComplete() {
    setIsOnEdit(false);
    setEditEmoticons([]);
  }

  return (
    <>
      {!disabled && (
        <>
          <Popover
            visible={isShowSelect}
            onVisibleChange={setIsShowSelect}
            content={
              <>
                <EmoticonList value={nextSelect} onChange={setNextSelect} />
                <TButton.Button
                  type="primary"
                  onClick={() => {
                    onChange(nextSelect.map(({ id }) => id));
                    setIsShowSelect(false);
                  }}
                  style={{ marginRight: '10px' }}
                >
                  确认
                </TButton.Button>
                <TButton.Button onClick={() => setIsShowSelect(false)}>关闭</TButton.Button>
              </>
            }
            trigger="click"
            placement="bottomLeft"
            overlayStyle={{ width: '45%' }}
          >
            <TButton.Button type="primary" onClick={handleComplete}>
              选择
            </TButton.Button>
          </Popover>
          <Row align="middle">
            <Col>已选择</Col>
            {isOnEdit && initValue.length ? (
              <Col flex={1} style={{ textAlign: 'right' }}>
                <TButton.Button
                  type="link"
                  className={styles.emoticonOperateBtn}
                  disabled={!initValue.length}
                  onClick={() => setEditEmoticons([...initValue])}
                >
                  全选
                </TButton.Button>
                <TButton.Button
                  type="link"
                  className={styles.emoticonOperateBtn}
                  disabled={!initValue.length}
                  onClick={() => setEditEmoticons(_.differenceBy(initValue, editEmoticons, 'id'))}
                >
                  反选
                </TButton.Button>
                <TButton.Button
                  danger
                  type="link"
                  className={styles.emoticonOperateBtn}
                  disabled={!initValue.length && !editEmoticons.length}
                  onClick={handleDelete}
                >
                  删除
                </TButton.Button>
                <TButton.Button
                  type="link"
                  className={styles.emoticonOperateBtn}
                  onClick={handleComplete}
                >
                  完成
                </TButton.Button>
              </Col>
            ) : (
              <Col flex={1} style={{ textAlign: 'right' }}>
                <TButton.Button
                  type="link"
                  className={styles.emoticonOperateBtn}
                  disabled={!initValue.length}
                  onClick={() => setIsOnEdit(true)}
                >
                  管理
                </TButton.Button>
              </Col>
            )}
          </Row>
        </>
      )}
      {initValue.length > 0 ? (
        <Row className={styles.emoticonList}>
          {initValue.map((emoticon = {}) => {
            const { id, name, icon = {} } = emoticon;
            return (
              <Col key={id} span={Math.ceil(24 / col)} className={styles.emoticonItem}>
                <img
                  className={classnames({
                    [styles.selectedEmoticon]: !!editEmoticons.find(item => item.id === id),
                    [styles.editItem]: isOnEdit,
                  })}
                  src={icon.url}
                  title={name}
                  alt=""
                  onClick={() => isOnEdit && handleSelect(emoticon)}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Empty className={styles.emoticonListEmpty} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
}

export default MultiEmoticonSelect;
