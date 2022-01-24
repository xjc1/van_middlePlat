import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from '@/utils/tRouter';
import { TTable, OperateBar } from '@/components/tis_ui';
import { policyUpDownStatus, commonShelf } from '@/utils/constantEnum';
import EmptyFn from '@/utils/EmptyFn';
import {
  EditOutlined,
  FileSearchOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';
import { STANDARDMATERIALS } from '@/services/api';
import _ from 'lodash';
import authEnum, { hasAuth } from '@/utils/auth';

@connect(({ standardMaterial, loading }) => ({
  ...standardMaterial,
  loading: loading.effects['standardMaterial/fetchList'],
}))
class StandardMaterialList extends PureComponent {
  columns = [
    {
      title: '材料编码',
      dataIndex: 'code',
    },
    {
      title: '材料名称',
      dataIndex: 'name',
    },
    {
      title: '行政层级',
      dataIndex: 'administrativeLevel',
      render: text => {
        const { dictNames } = this.props;
        const [val] = _.at(dictNames, `XZCJ.${text}`);
        return val || text;
      },
    },
    {
      title: '材料来源',
      dataIndex: 'source',
      render: text => {
        const { dictNames } = this.props;
        const [val] = _.at(dictNames, `CLLY.${text}`);
        return val || text;
      },
    },
    {
      title: '上下架状态',
      dataIndex: 'status',
      render: text => policyUpDownStatus.$v_names[text],
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: 200,
      align: 'center',
      render: (id, record) => (
        <OperateBar
          more={
            <>
              <OperateBar.Button
                icon={<EditOutlined />}
                onClick={() => router.push({ name: 'standardMaterial_edit', params: { materialId: id } })}
                disabled={!hasAuth(authEnum.standardMaterial_edit_alias)}
              >
                编辑
              </OperateBar.Button>
              <OperateBar.Button
                icon={<VerticalAlignMiddleOutlined />}
                confirmText="警告"
                disabled={!hasAuth(authEnum.standardMaterial_publish)}
                onClick={() => this.onChangeMaterialStatus(record.id, record.status)}
                confirmContent={`确定需要${commonShelf.$v_names[record.status]}吗?`}
              >
                {commonShelf.$v_names[record.status]}
              </OperateBar.Button>
              <OperateBar.Button
                danger
                icon={<RollbackOutlined />}
                confirmText="警告"
                confirmContent="删除材料将不可能再恢复,确定删除吗?"
                disabled={!hasAuth(authEnum.standardMaterial_delete)}
                onClick={() => this.onDelete(id)}
              >
                删除
              </OperateBar.Button>
            </>
          }
        >
          <OperateBar.Button
            icon={<FileSearchOutlined />}
            onClick={() =>
              router.push({ name: 'standardMaterial_view', params: { materialId: record.id } })
            }
          >
            查看
          </OperateBar.Button>
        </OperateBar>
      ),
    },
  ];

  onChangeMaterialStatus = async (id, status) => {
    const { fetchList } = this.props;
    await STANDARDMATERIALS.updateStandardMaterialStatusUsingPOST({
      body: {
        id,
        status: status === policyUpDownStatus.up ? policyUpDownStatus.down : policyUpDownStatus.up,
      },
    });
    notification.success({
      message: `成功${commonShelf.$v_names[status]}材料`,
    });
    fetchList({});
  };

  onDelete = async id => {
    const { fetchList } = this.props;
    await STANDARDMATERIALS.deleteStandardMaterialUsingPOST(id);
    notification.success({ message: '删除成功' });
    fetchList({});
  };

  render() {
    const { list, total, pageSize, pageNum, fetchList = EmptyFn, className, loading } = this.props;
    return (
      <div className={className}>
        <TTable
          columns={this.columns}
          loading={loading}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            current: pageNum,
            onChange: page => {
              fetchList({ page, size: pageSize });
            },
          }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default StandardMaterialList;
