import React from 'react';
import layoutStyles from '@/layouts/PageLayout/layout.less';
import { List } from 'antd';
import { TButton, TTable } from '@/components/tis_ui';
import { connect } from 'dva';
import ApiDetail from './apiDetail';
import styles from '../index.less';

const apiGroups = [{ id: 0, name: '公共分类' }];
const apiList = [
  { id: 0, name: '登录', url: '', category: 0 },
  { id: 1, name: '获取当前用户', url: '', category: 0 },
];

function Index(props) {
  const { api, dispatch } = props;
  const isShowApiDetail = api !== '' && api !== null && api !== undefined;
  const columns = [
    {
      title: '接口名称',
      dataIndex: 'name',
      render: (name, record) => (
        <span className={styles.linkBtn} onClick={() => handleSelectApi(record.id)}>
          {name}
        </span>
      ),
    },
    {
      title: '接口路径',
      dataIndex: 'url',
    },
    {
      title: '接口分类',
      dataIndex: 'category',
    },
  ];

  function handleBack() {
    dispatch({
      type: 'apiManage/saveProject',
    });
    dispatch({
      type: 'apiManage/saveApi',
    });
  }

  function handleSelectCategory(categoryId) {
    console.log('categoryId', categoryId);
    dispatch({
      type: 'apiManage/saveCategory',
      category: categoryId,
    });
    dispatch({
      type: 'apiManage/saveApi',
    });
  }

  function handleSelectApi(apiId) {
    dispatch({
      type: 'apiManage/saveApi',
      api: apiId,
    });
  }

  return (
    <div className={layoutStyles.twoGridPage}>
      <div className={layoutStyles.leftGrid}>
        <h1>
          接口分类
          <TButton.Button type="link" onClick={handleBack}>
            返回项目列表
          </TButton.Button>
        </h1>
        <List>
          {apiGroups.map((group = {}) => (
            <List.Item key={group.id} onClick={() => handleSelectCategory(group.id)}>
              <span className={styles.linkBtn}>{group.name}</span>
            </List.Item>
          ))}
        </List>
      </div>
      <div className={layoutStyles.rightGrid} style={{ padding: '10px', background: '#fff' }}>
        {isShowApiDetail ? (
          <ApiDetail />
        ) : (
          <>
            <h1>接口列表</h1>
            <TTable dataSource={apiList} columns={columns} rowKey="id" />
          </>
        )}
      </div>
    </div>
  );
}

export default connect(({ apiManage }) => apiManage)(Index);
