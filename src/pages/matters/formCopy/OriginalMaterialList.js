import React from 'react';
import { materialStatus } from '@/utils/constantEnum';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import globalStyle from '@/global.less';
import { EmptyFn, OperateBar, TTable } from '@/components/tis_ui';
import { EditOutlined } from '@ant-design/icons';
import Styles from './index.less';

function OriginalMaterialList({ materials = [], onEdit = EmptyFn, hidden = true, ...others }) {
  return (
    <div
      className={classNames(
        Styles.formCopyOriginalMaterialList,
        hidden && Styles.formCopyContentHidden,
      )}
    >
      <TTable
        rowKey="id"
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            width: 80,
            render: text => materialStatus.$v_names[text],
          },
          {
            title: '原始材料名称',
            dataIndex: 'name',
            horizontal: true,
          },
          {
            title: '材料情形',
            dataIndex: 'condition',
          },
          {
            title: '材料类型',
            ellipsis: true,
            horizontal: true,
            dataIndex: 'materialFormat',
            width: 150,
          },
          {
            title: '表格名称',
            dataIndex: 'sheetName',
            width: 100,
            render: text => (
              <Tooltip getPopupContainer={triggerNode => triggerNode.parentElement} title={text}>
                <div style={{ width: 100 }} className={globalStyle.textOverviewEllipsis}>
                  {text}
                </div>
              </Tooltip>
            ),
          },
          {
            title: '必要性',
            dataIndex: 'need',
            width: 100,
          },
          {
            title: '备注',
            dataIndex: 'memo',
            width: 200,
            ellipsis: true,
          },
          {
            title: '操作',
            align: 'center',
            horizontal: true,
            width: 200,
            render(record) {
              return (
                <OperateBar>
                  <OperateBar.Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      onEdit(record);
                    }}
                  >
                    编辑
                  </OperateBar.Button>
                </OperateBar>
              );
            },
          },
        ]}
        dataSource={materials}
        {...others}
      />
    </div>
  );
}

export default OriginalMaterialList;
