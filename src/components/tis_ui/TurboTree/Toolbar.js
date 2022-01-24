/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Card, Button, Input } from 'antd';
import classNames from 'classnames';
import { PlusCircleOutlined, ReloadOutlined, RollbackOutlined } from '@ant-design/icons';
import styles from './index.less';
import EventCenter from '../utils/EventCenter';

function Toolbar({ readOnly, onSave, canSave, onCreateTree, onSearch }) {
  return (
    <Card bodyStyle={{ padding: '5px 0px', display: 'flex' }} className={styles.scenesQAToolbar}>
      {canSave ? (
        <>
          {!readOnly && (
            <Button
              className={styles.btn}
              type="primary"
              icon={<ReloadOutlined />}
              loading={false}
              onClick={onSave}
            >
              保存
            </Button>
          )}
          <Input.Search
            className={classNames(styles.queryInput)}
            placeholder="查询问答树"
            onSearch={onSearch}
          />
        </>
      ) : (
        <>
          <Button
            className={styles.btn}
            type="primary"
            icon={<ReloadOutlined />}
            loading={false}
            onClick={onSave}
          >
            保存
          </Button>
          <Button
            className={styles.btn}
            style={{ width: '100%' }}
            type="primary"
            icon={<PlusCircleOutlined />}
            loading={false}
            onClick={onCreateTree}
          >
            新建
          </Button>
        </>
      )}
      <Button
        icon={<RollbackOutlined />}
        onClick={() => EventCenter.emit('goBack')}
        style={{ marginLeft: '10px' }}
      >
        返回
      </Button>
    </Card>
  );
}

export default Toolbar;
