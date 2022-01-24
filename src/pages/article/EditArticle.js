import React from 'react';
import { Card, Spin } from 'antd';
import useArticleDetail from '@/pages/article/hooks/useArticleDetail';
import EditArticleForm from './editArticleForm';

function EditArticle(props) {
  const {
    match: {
      params: { articleId },
    },
  } = props;
  const info = useArticleDetail(articleId);
  return info.id ? (
    <EditArticleForm title="编辑文章" detailInfo={info} />
  ) : (
    <Card style={{ width: '100%', height: '100%' }}>
      <Spin />
    </Card>
  );
}

export default EditArticle;
