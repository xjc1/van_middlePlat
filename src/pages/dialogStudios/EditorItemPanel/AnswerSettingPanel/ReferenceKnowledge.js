import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {  Drawer, Breadcrumb,  } from 'antd';
import { TItem, TButton, TTable } from '@/components/tis_ui';
import { commonContentType } from '@/utils/constantEnum';
// import { DictSelect } from '@/components/bussinessComponents';
import Styles from './index.less';
import AnswerQueryBar from './AnswerQueryBar';
import relationOperate from '@/components/bussinessComponents/utils/relationOperate';
import relationOperateWithId from '@/components/bussinessComponents/utils/relationOperateTranslate';

const DATA_SOURCE = {
  [commonContentType.SCENE]: relationOperate.relationScenes,
  [commonContentType.MATTER]: relationOperate.relationMatter,
  [commonContentType.POLICY]: relationOperate.relationPolicy,
  [commonContentType.SERVICE]: relationOperate.relationConvenience,
  [commonContentType.PROJECT]: relationOperate.relationProject,
  [commonContentType.QUESTION]: relationOperate.relationQuestion,
  [commonContentType.ARTICLE]: relationOperate.relationArticle,
  [commonContentType.WIKI]: relationOperate.relationPolicyWords,
};

const DATA_SOURCE_ID = {
  [commonContentType.SCENE]: relationOperateWithId.relationScenes,
  [commonContentType.MATTER]: relationOperateWithId.relationMatter,
  [commonContentType.POLICY]: relationOperateWithId.relationPolicy,
  [commonContentType.SERVICE]: relationOperateWithId.relationConvenience,
  [commonContentType.PROJECT]: relationOperateWithId.relationProject,
  [commonContentType.QUESTION]: relationOperateWithId.relationQuestion,
  [commonContentType.ARTICLE]: relationOperateWithId.relationArticle,
  [commonContentType.WIKI]: relationOperateWithId.relationPolicyWords,
};
const columns = [
  {
    title: '政策名称',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: '地区',
    dataIndex: 'regions',
    key: 'regions',
    width: 100,
  },
];

function ReferenceKnowledge({ value, onChange }) {
  const [editoMode, setEditMode] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [queryInfo,setQueryInfo] = useState({
    type:value?.type??0
  })
  const [pageInfo, setPageInfo] = useState({
    list: [],
    total: 0,
    currentPage: 0,
  });

  useEffect(() => {
    if (value && value.value) {
      const { type, value: contentValue } = value;
      DATA_SOURCE_ID[type](contentValue).then(obj => {
        const {type:selectedType} = queryInfo
        onChange({
          ...obj,
          type:selectedType
        });
      });
    }
  }, []);
  function fetchList({ page = 0, text = '', type = 0,...others}) {
    setInitLoading(true);
    DATA_SOURCE[type]({
      text,
      pageNum: page,
      ...others
    })
      .then(({ data, totalElements }) => {
        setPageInfo({
          list: data,
          total: totalElements,
          currentPage: page,
        });
      })
      .finally(() => {
        setInitLoading(false);
      });
  }

  return (
    <div className={Styles.referenceKnowledge}>
      <TItem name="knowledge" label="知识引用">
        <Breadcrumb
          onClick={() => {
            setEditMode(true);
          }}
        >
          {value?.value ? (
            <>
              <Breadcrumb.Item className={Styles.referenceKnowledgeInputStr}>
                <a>{commonContentType.$v_names[value.type]}</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item className={Styles.referenceKnowledgeInputStr}>
                <a>{value.label}</a>
              </Breadcrumb.Item>
            </>
          ) : (
            <Breadcrumb.Item className={Styles.referenceKnowledgeColor}>
              点击配置知识引用
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </TItem>
      <Drawer
        title="知识引用"
        width={840}
        className={Styles.knowledgeSelectDrawer}
        placement="right"
        bodyStyle={{ position: 'relative' }}
        onClose={() => {
          setEditMode(false);
        }}
        visible={editoMode}
      >
        <AnswerQueryBar
          initialValues={{ type: commonContentType.SCENE }}
          onFinish={vals => {
            const { name = '',...others } = vals;
            setQueryInfo({
              ...vals
            })
            fetchList({ text: name,...others });
          }}
          footer={
            <>
              <TButton.Search type="primary" htmlType="submit">
                查询
              </TButton.Search>
            </>
          }
        />
        <TTable
          loading={initLoading}
          className={Styles.knowledgeSelectContent}
          rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys, nodes) => {
              const [nextSelectedNode] = nodes;
              const { label, regions } = nextSelectedNode;
              const {type} = queryInfo
              onChange({
                ...nextSelectedNode,
                label: `${_.isEmpty(regions) ? label : `${label}_${regions}`}`,
                type,
              });
            },
          }}
          pagination={{
            total: pageInfo.total,
            current: pageInfo.currentPage,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: page => {
              const { name,...others } = queryInfo;
              fetchList({ page, text:name, ...others });
            },
          }}
          dataSource={pageInfo.list}
          columns={columns}
        />
      </Drawer>
    </div>
  );
}

export default ReferenceKnowledge;
