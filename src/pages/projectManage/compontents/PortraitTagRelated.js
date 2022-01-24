import React, { useState } from 'react';
import { Table, Space, Button } from 'antd';
import { DECLAREPROJECT } from '@/services/api';
import { conditionApplyType } from '@/utils/constantEnum';
import router from '@/utils/tRouter';

function PortraitTagRelated({ value = [], projectId }) {
  const [tableData, setTableData] = useState(value);
  const [loading, setLoading] = useState(false);
  const columns = [
    { title: '标签名称', dataIndex: 'name' },
    { title: '标签分类', dataIndex: 'category' },
    {
      title: '是否关联用户',
      dataIndex: 'linkUser',
      render: isLinkUser => (isLinkUser ? '是' : '否'),
    },
    {
      title: '应用场景',
      dataIndex: 'applicationScenario',
      render: text => conditionApplyType.$v_names[text] || text,
    },
    {
      title: '操作',
      render: record => {
        return (
          <Space>
            <a
              onClick={() => {
                router.push({
                  name: 'tags_view',
                  params: { tagId: record.id },
                });
              }}
            >
              查看
            </a>
            <a
              onClick={() => {
                router.push({
                  name: 'tags_edit',
                  params: { tagId: record.id },
                });
              }}
            >
              编辑
            </a>
          </Space>
        );
      },
    },
  ];
  const refreshTagInfo = id => {
    setLoading(true);
    DECLAREPROJECT.getConditionTagsUsingGET(id).then(data => {
      setTableData(data);
      setLoading(false);
    });
  };
  return (
    <>
      <div style={{ paddingBottom: 16 }}>
        <Button type="primary" onClick={() => refreshTagInfo(projectId)}>
          更新画像标签
        </Button>
      </div>
      <Table loading={loading} bordered dataSource={tableData} columns={columns} rowKey="id" />
    </>
  );
}

export default PortraitTagRelated;
