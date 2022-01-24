import React from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { EmptyFn } from '@/components/tis_ui';
import styles from './index.less';

function ViewCard(props) {
  const { title = '', tip, onView = EmptyFn } = props;
  return (
    <div className={styles.viewCard}>
      <Typography.Text ellipsis className={styles.title}>
        <Tooltip title={tip || title}>{title}</Tooltip>
      </Typography.Text>
      <Button icon={<FileSearchOutlined />} onClick={onView}>
        查看
      </Button>
    </div>
  );
}

export default ViewCard;