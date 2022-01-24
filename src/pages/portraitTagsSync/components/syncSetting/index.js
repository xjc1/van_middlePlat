import React, { useRef, useState } from 'react';
import { EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { OperateBar } from '@/components/tis_ui';
import { CORE, PORTRAITTAGSYNCCONFIGS } from '@/services/api';
import { message, notification, Tooltip } from 'antd';
import { Code2Name } from '@/utils/DictTools';
import { commonSwitch } from '@/utils/constantEnum';
import CommonTable from '../CommonTable';
import SettingModalForm from './SettingModalForm';

const ellipsisContent = {
  width: '20%',
  ellipsis: true,
  render: content => (
    <Tooltip title={content} placement="topLeft">
      {content}
    </Tooltip>
  ),
};

function Index() {
  const [settingDetail, setSettingDetail] = useState(null);
  const tableRef = useRef();
  const columns = [
    {
      title: '来自标签名称',
      dataIndex: 'sourceTagName',
      ...ellipsisContent,
    },
    {
      title: '来自标签编码',
      dataIndex: 'sourceTagCode',
    },
    {
      title: '至标签',
      dataIndex: 'tagName',
      ...ellipsisContent,
    },
    {
      title: '标签对象',
      dataIndex: 'objectType',
    },
    {
      title: '自动同步',
      dataIndex: 'autoSyncSwitch',
      render: autoSwitch => commonSwitch.$v_names[autoSwitch],
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render: record => (
        <OperateBar>
          <OperateBar.Button icon={<EditOutlined />} onClick={() => setSettingDetail(record)}>
            编辑
          </OperateBar.Button>
          <OperateBar.Button
            danger
            icon={<RollbackOutlined />}
            confirmText="警告"
            confirmContent="删除后将不可能再恢复，确定删除吗？"
            onClick={() => handleDelete(record.id)}
          >
            删除
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  async function fetchNotSyncList(params) {
    try {
      const {
        content = [],
        totalElements: total,
        number: pageNum,
        size: pageSize,
        dictNames = {},
      } = await Code2Name(CORE.getPortraitTagSyncConfigsUsingGET({ params }), [
        'DXLX0001',
        'object',
      ]);
      return {
        list: content.map(item => ({ ...item, objectType: dictNames.DXLX0001[item.object] })),
        total,
        pageNum,
        pageSize,
      };
    } catch (e) {
      message.error(`获取列表失败，${e.msg}`);
    }
    return {};
  }

  function handleDelete(id) {
    PORTRAITTAGSYNCCONFIGS.deletePortraitTagSyncConfigUsingPOST(id)
      .then(() => {
        notification.success({
          message: '成功删除同步配置',
        });
        tableRef.current.refresh();
      })
      .catch(e => {
        notification.error({
          message: `删除失败，${e.msg}`,
        });
      });
  }

  function handleSubmit(values) {
    PORTRAITTAGSYNCCONFIGS.updatePortraitTagSyncConfigUsingPOST({ body: values })
      .then(() => {
        notification.success({
          message: '成功修改同步设置',
        });
        setSettingDetail(null);
        tableRef.current.refresh();
      })
      .catch(e => {
        notification.error({
          message: `修改同步设置失败，${e.msg}`,
        });
      });
  }

  return (
    <>
      <CommonTable ref={tableRef} columns={columns} request={fetchNotSyncList} />
      {settingDetail && (
        <SettingModalForm
          onClose={() => setSettingDetail(null)}
          onOk={values => handleSubmit(values)}
          settingDetail={settingDetail}
        />
      )}
    </>
  );
}

export default Index;
