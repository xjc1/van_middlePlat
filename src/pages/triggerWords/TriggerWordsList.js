import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import { policyUpDownStatus, terminalType, appUserType, commonYesNo } from '@/utils/constantEnum';
import authEnum, { authCheck } from '@/utils/auth';

import _ from 'lodash';

@connect(({ triggerWords, loading }) => ({
  ...triggerWords,
  loading: loading.effects['triggerWords/fetchList'],
}))
class TriggerWordsList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      dispatch,
      pageNum,
      onChanePage = EmptyFn,
      className,
      loading,
    } = this.props;
    const columns = [
      {
        title: '触发词描述',
        dataIndex: 'description',
      },
      {
        title: '触发词类型',
        dataIndex: 'type',
        render: text => {
          const { dictNames } = this.props;
          return dictNames.CFCLX[text];
        },
      },
      {
        title: '对象类型',
        dataIndex: 'objectType',
        render: text => {
          return appUserType.$v_names[text] ? appUserType.$v_names[text] : text;
        },
      },
      {
        title: '终端类型',
        dataIndex: 'clientType',
        render: text => {
          return _.map(text, item => terminalType.$v_names[item]).join('；');
        },
      },
      {
        title: '行政区划',
        dataIndex: 'regions',
        render: text => {
          const { dictNames } = this.props;
          return dictNames.SH00XZQH[text];
        },
      },
      {
        title: '归属部门',
        dataIndex: 'attributionDepartment',
        render: text => {
          const { dictNames } = this.props;
          return _.map(text, code => {
            const [val] = _.at(dictNames, `SHGSBMSH.${code}`);
            // 不正确的也显示
            return val || code;
          }).join(' | ');
        },
      },
      {
        title: '上下架状态',
        dataIndex: 'status',
        render: text => {
          return policyUpDownStatus.$v_names[text];
        },
      },
      {
        title: '是否游客',
        dataIndex: 'tourist',
        render: text => {
          return commonYesNo.$v_names[text];
        },
      },
      {
        title: '操作',
        dataIndex: 'operator',
        align: 'center',
        render: (text, record) => (
          <OperateBar
            more={
              <>
                <OperateBar.Button
                  disabled={!authCheck(authEnum.triggerWords_edit_alias, true, false)}
                  icon={<EditOutlined />}
                  onClick={() => {
                    dispatch({ type: 'triggerWords/openModal', payload: record });
                  }}
                >
                  编辑
                </OperateBar.Button>
                <OperateBar.Button
                  disabled={!authCheck(authEnum.triggerWords_publish, true, false)}
                  icon={<VerticalAlignMiddleOutlined />}
                  confirmText="警告"
                  onClick={() => {
                    const { status, id } = record;
                    dispatch({
                      type: 'triggerWords/changeStatus',
                      payload: { status: status && status === 1 ? 0 : 1, id },
                    });
                  }}
                  confirmContent={record.status === 1 ? '确定需要下架吗?' : '确定需要上架吗?'}
                >
                  {record.status === 1 ? '下架' : '上架'}
                </OperateBar.Button>
                <OperateBar.Button
                  danger
                  disabled={!authCheck(authEnum.triggerWords_delete, true, false)}
                  icon={<RollbackOutlined />}
                  confirmText="警告"
                  confirmContent="删除触发词将不可能再恢复,确定删除吗?"
                  onClick={() => dispatch({ type: 'triggerWords/deleteTrigger', id: record.id })}
                >
                  删除
                </OperateBar.Button>
              </>
            }
          >
            <OperateBar.Button
              icon={<FileSearchOutlined />}
              onClick={() => {
                dispatch({ type: 'triggerWords/checkTrigger', payload: record });
              }}
            >
              查看
            </OperateBar.Button>
          </OperateBar>
        ),
      },
    ];
    return (
      <div className={className}>
        <TTable
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              onChanePage({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default TriggerWordsList;
