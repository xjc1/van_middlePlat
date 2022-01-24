import React from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { EmptyFn } from '@/components/tis_ui';
import styles from './index.less';

function RefreshCard(props) {
  const { title = '', tip, onRefresh = EmptyFn, loading = false, disabled = false } = props;
  return (
    <div className={styles.refreshCard}>
      {loading && <div className={styles.progress} />}
      <Typography.Text ellipsis className={styles.title}>
        <Tooltip title={tip || title}>{title}</Tooltip>
      </Typography.Text>
      <Button disabled={disabled} loading={loading} icon={<ReloadOutlined />} onClick={onRefresh}>
        刷新
      </Button>
    </div>
  );
}

export default RefreshCard;
