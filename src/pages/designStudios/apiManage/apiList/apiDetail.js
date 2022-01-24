import React from 'react';
import { connect } from 'dva';
import { TTable } from '@/components/tis_ui';
import styles from '../index.less';

function ApiDetail({ api }) {
  return (
    <div>
      <h3 className={styles.sectionTitle}>基本信息{api}</h3>
      <p>接口名称：登录</p>
      <p>接口地址：</p>
      <p>更新时间：</p>
      <h3 className={styles.sectionTitle}>请求参数</h3>
      <h4>headers</h4>
      <TTable columns={[{ title: '参数名称', dataIndex: 'name' }]} dataSource={[]} />
      <h4>Body</h4>
      <TTable columns={[{ title: '名称', dataIndex: 'name' }]} dataSource={[]} />
      <h3 className={styles.sectionTitle}>返回结果</h3>
    </div>
  );
}

export default connect(({ apiManage }) => apiManage)(ApiDetail);
