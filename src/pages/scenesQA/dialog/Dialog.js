import React, { useState } from 'react';
import { Card, Divider, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './dialog.less';
import classNames from 'classnames';
import dialogStyles from '@/pages/scenesQA/dialog/dialog.less';
import _ from 'lodash';
import QuestionComment from './QuestionComment';

function Dialog({ node }) {
  const [process, setProcess] = useState([node]);
  return (
    <div className={classNames(dialogStyles.mask)}>
      <Card hoverable className={styles.dialog}>
        {_.map(process, nextNode => (
          <QuestionComment key={nextNode.cid} node={nextNode} onNext={setProcess} />
        ))}
        <Divider>
          <Button type="primary" size="normal" shape="circle" icon={<DownOutlined />} />
        </Divider>
      </Card>
    </div>
  );
}

export default Dialog;
