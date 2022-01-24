import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import _ from 'lodash';
import { appUserType, commonUpDownStatus, sourceType, terminalType } from '@/utils/constantEnum';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
  ShareAltOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import router from '@/utils/tRouter';

@connect(({ dialogManager, loading }) => ({
  ...dialogManager,
  loading: loading.effects['dialogManager/fetchList'],
}))
class DialogManagerList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      dispatch,
      onPageSizeChange = EmptyFn,
      handleDelete = EmptyFn,
      onEdit = EmptyFn,
      onView = EmptyFn,
      changeStatus = EmptyFn,
      className,
      dictNames,
      loading,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          loading={loading}
          scroll={{ x: 1500 }}
          columns={[
            {
              title: '会话名称',
              dataIndex: 'name',
              width: 300,
            },
            {
              title: '更新时间',
              dataIndex: 'updateTime',
              width: 200,
            },
            {
              title: '行政区划',
              dataIndex: 'regions',
              width: 200,
              render: code => {
                return dictNames.SH00XZQH[code] ? dictNames.SH00XZQH[code] : code;
              },
            },
            {
              title: '归属部门',
              dataIndex: 'attributionDepartment',
              width: 200,
              render: text => {
                return _.map(text, code => {
                  return _.get(dictNames, `SHGSBMSH.${code}`, code);
                }).join(' | ');
              },
            },
            {
              title: '对象类型',
              dataIndex: 'object',
              width: 100,
              render: code => {
                return appUserType.$v_names[code];
              },
            },
            {
              title: '上下架状态',
              dataIndex: 'status',
              width: 150,
              render: status => commonUpDownStatus.$v_names[status],
            },
            {
              title: '终端类型',
              dataIndex: 'clientType',
              width: 200,
              render: text => {
                return _.map(text, item => terminalType.$v_names[item]).join('；');
              },
            },
            {
              title: '来源方式',
              dataIndex: 'sourceType',
              width: 150,
              render: source => sourceType.$v_names[source],
            },
            {
              title: '操作',
              dataIndex: 'operation',
              show: true,
              width: 200,
              fixed: 'right',
              align: 'center',
              render: (text, record) => {
                return (
                  <OperateBar
                    more={
                      <>
                        <OperateBar.Button
                          icon={<EditOutlined />}
                          onClick={() => {
                            onEdit(record);
                          }}
                        >
                          编辑
                        </OperateBar.Button>
                        <OperateBar.Button
                          icon={<ShareAltOutlined />}
                          onClick={() => {
                            router.push({
                              name: 'dialogManager_detail',
                              params: { id: record.id },
                            });
                          }}
                        >
                          对话配置
                        </OperateBar.Button>
                        <OperateBar.Button
                          icon={<VerticalAlignMiddleOutlined />}
                          confirmText="警告"
                          onClick={() => {
                            changeStatus(record);
                          }}
                          confirmContent={
                            record.status === 0 ? '确定需要上架吗?' : '确定需要下架吗?'
                          }
                        >
                          {record.status === 1 ? '下架' : '上架'}
                        </OperateBar.Button>
                        <OperateBar.Button
                          icon={<CopyOutlined />}
                          confirmText="提示"
                          confirmContent="请问是否要克隆当前的多轮会话？"
                          onClick={() =>
                            dispatch({
                              type: 'dialogManager/cloneDialog',
                              id: record.id,
                            })
                          }
                        >
                          克隆
                        </OperateBar.Button>
                        <OperateBar.Button
                          danger
                          icon={<RollbackOutlined />}
                          confirmText="警告"
                          confirmContent="删除将不可能再恢复,确定删除吗?"
                          onClick={() => {
                            handleDelete(record.id);
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
                        onView(record);
                      }}
                    >
                      查看
                    </OperateBar.Button>
                  </OperateBar>
                );
              },
            },
          ]}
          dataSource={list}
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

export default DialogManagerList;
