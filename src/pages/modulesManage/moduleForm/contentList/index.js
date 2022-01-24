import React from 'react';
import { TabForm, TItem } from '@/components/tis_ui';
import { Alert } from 'antd';
import AddContent from './addContent';
import TopContent from './topContent';
import TopList from '../TopList';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function ContentList({ disabled, ...others }) {
  return (
    <TabForm.Tab {...others}>
      <TItem name="contentList" label="内容清单" {...layout}>
        <AddContent disabled={disabled} />
      </TItem>
      <Alert
        style={{ textAlign: 'center', marginBottom: 10 }}
        message="注意：特殊内容不限制配置，但是最终只会输出内容清单里配置了的内容类型！"
        type="warning"
      />
      <TItem name="specialList" label="特殊内容" {...layout}>
        <TopContent disabled={disabled} />
      </TItem>
      <TItem name="topList" label="置顶内容" {...layout}>
        <TopList disabled={disabled} />
      </TItem>
    </TabForm.Tab>
  );
}

export default ContentList;
