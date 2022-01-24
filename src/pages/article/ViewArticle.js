import React from 'react';
import { Card, Spin } from 'antd';
import EditArticleForm from './editArticleForm';
import useArticleDetail from './hooks/useArticleDetail';

function ViewArticle(props) {
  const {
    match: {
      params: { articleId },
    },
  } = props;
  const info = useArticleDetail(articleId);
  return info.id ? (
    <EditArticleForm title="查看文章" detailInfo={info} disabled />
  ) : (
    <Card style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Card>
  );
}

export default ViewArticle;
