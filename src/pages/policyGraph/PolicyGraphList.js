import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DateTools, OperateBar, TTable } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { FileSearchOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { commonStatus, policyGraphAudit } from '@/utils/constantEnum';

@connect(({ policyGraph }) => policyGraph)
class PolicyGraphList extends PureComponent {
  render() {
    const {
      list,
      total,
      pageSize,
      pageNum,
      onPageSizeChange = EmptyFn,
      className,
      loading,
      onAnalysis = EmptyFn,
    } = this.props;
    return (
      <div className={className}>
        <TTable
          loading={loading}
          columns={[
            {
              title: '政策名称',
              dataIndex: 'name',
              width: 400,
              ellipsis: true,
              fixed: 'left',
            },
            {
              title: '政策分类',
              dataIndex: 'category',
              width: 150,
              show: true,
              ellipsis: true,
              sorter: true,
              render: text => {
                const { dictNames } = this.props;
                return _.map(text, ({ code }) => {
                  const [val] = _.at(dictNames, `ZCFL.${code}`);
                  return val;
                }).join(' | ');
              },
            },
            {
              title: '政策级别',
              dataIndex: 'level',
              show: true,
              width: 150,
              sorter: true,
              ellipsis: true,
              render: text => {
                const { dictNames } = this.props;
                const [val] = _.at(dictNames, `ZCJB0001.${text}`);
                return val;
              },
            },
            {
              title: '对象类型',
              dataIndex: 'objectType',
              width: 150,
              ellipsis: true,
              sorter: true,
              show: true,
              render: text => {
                const { dictNames } = this.props;
                const [val] = _.at(dictNames, `DXLX0001.${text}`);
                return val;
              },
            },
            {
              title: '行政区划',
              dataIndex: 'regions',
              width: 150,
              ellipsis: true,
              sorter: true,
              show: true,
              render: text => {
                const { dictNames } = this.props;
                const [val] = _.at(dictNames, `SH00XZQH.${text}`);
                return val;
              },
            },
            {
              title: '政策有效性',
              dataIndex: 'isEffective',
              width: 150,
              ellipsis: true,
              sorter: true,
              show: true,
              render: text => {
                return commonStatus.$v_names[text];
              },
            },
            {
              title: '审核状态',
              dataIndex: 'review',
              width: 150,
              ellipsis: true,
              sorter: true,
              show: true,
              render: review => {
                return review ? '已审核': '未审核';
              },
            },
            {
              title: '更新时间',
              dataIndex: 'updateTime',
              width: 150,
              ellipsis: true,
              show: true,
              render: timeStr => (timeStr ? DateTools.transformDefaultFormat(timeStr) : ''),
            },
            {
              title: '图谱关系',
              dataIndex: 'haveRelation',
              width: 150,
              ellipsis: true,
              show: true,
              render: haveRelation => {
                return haveRelation? '有': '无';
              },
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
                  <OperateBar>
                    <OperateBar.Button
                      icon={<FileSearchOutlined />}
                      onClick={() => {
                        onAnalysis(record);
                      }}
                    >
                      图谱分析
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
          scroll={{ x: 1500 }}
          rowKey="id"
        />
      </div>
    );
  }
}

export default PolicyGraphList;
