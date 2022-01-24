import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { FileSearchOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { message } from 'antd';
import router from '@/utils/tRouter';
import { SCENEDATA } from '@/services/api';
import {
  scenesDataUseSceneType,
  scenesDataUseType,
  scenesPublishStatus,
} from '@/utils/constantEnum';
import _ from "lodash";

@connect(({ sceneDataUse,department, loading }) => ({
  ...sceneDataUse,
  flatDeparts: department.flatDeparts,
  loading: loading.effects['sceneDataUse/fetchList'],
}))
class SceneDataUseList extends PureComponent {
  columns = [
    {
      title: '场景编码',
      dataIndex: 'sceneCode',
    },
    {
      title: '场景名称',
      dataIndex: 'sceneName',
    },
    {
      title: '场景类型',
      dataIndex: 'sceneType',
      render: text => scenesDataUseSceneType.$v_names[text] || text,
    },
    {
      title: '用数类型',
      dataIndex: 'dataType',
      render: text => scenesDataUseType.$v_names[text] || text,
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
    },
    {
      title: '发布状态',
      dataIndex: 'publishState',
      render: text => scenesPublishStatus.$v_names[text] || text,
    },
    {
      title: '实施部门',
      dataIndex: 'department',
      render: text => {
        const { flatDeparts } = this.props;
        return _.map(text, item => flatDeparts[item]).join('；');
      },
    },
    {
      title: '操作',
      show: true,
      width: 200,
      align: 'center',
      render: record => {
        return (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    router.push({ name: 'sceneDataReuseManage_edit', params: { id: record.id } });
                  }}
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Button
                  danger
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="删除将不可能再恢复,确定删除吗?"
                  onClick={() => {
                    this.handleDelete(record.id);
                  }}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => {
                router.push({ name: 'sceneDataReuseManage_view', params: { id: record.id } });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        );
      },
    },
  ];

  handleDelete = id => {
    const { onPageSizeChange } = this.props;
    SCENEDATA.deleteUsingPOST(id).then(() => {
      message.success('操作成功');
      onPageSizeChange({ page: 0 });
    });
  };

  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      className,
      loading,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          dataSource={list}
          loading={loading}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              onPageSizeChange({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default SceneDataUseList;
