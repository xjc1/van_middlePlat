import React from 'react';
import { TItem } from '@/components/tis_ui';
import AddRelations from '@/components/bussinessComponents/Relation/AddRelations';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function Relations(props) {
  const { disabled } = props;

  return (
    <>
      <TItem name="relationMatchPolicy" label="关联政策" {...layout}>
        <AddRelations type="policyLibrary" tableTitle="政策名" disabled={disabled} />
      </TItem>
      <TItem name="relationMatchMatters" label="关联事项" {...layout}>
        <AddRelations type="matter" tableTitle="事项名" disabled={disabled} />
      </TItem>
      <TItem name="relationMatchService" label="关联服务" {...layout}>
        <AddRelations type="convenience" tableTitle="服务名" disabled={disabled} />
      </TItem>
      <TItem name="relationMatchProject" label="关联项目" {...layout}>
        <AddRelations type="project" tableTitle="项目名" disabled={disabled} />
      </TItem>
      <TItem name="relationArticles" label="关联文章" {...layout}>
        <AddRelations type="article" tableTitle="文章名" disabled={disabled} />
      </TItem>
    </>
  );
}

export default Relations;
