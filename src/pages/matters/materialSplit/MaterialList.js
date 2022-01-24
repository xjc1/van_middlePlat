import React from 'react';
import { EmptyFn, OperateBar, TTable } from '@/components/tis_ui';
import { materialStatus } from '@/utils/constantEnum';
import { Tooltip } from 'antd';
import globalStyle from '@/global.less';
import { EditOutlined, MinusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import Styles from './index.less';
import ModalType from './ModalType';

function MaterialList({
  materials = [],
  onDelete = EmptyFn,
  extraOperate = EmptyFn,
  dispatch,
  isValid = true,
  ...others
}) {
  return (
    <TTable
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
            if (isValid) {
              return (
                <OperateBar
                  more={
                    <>
                      <OperateBar.Button
                        icon={<EditOutlined />}
                        onClick={() => {
                          dispatch({
                            type: 'split/selectedItem',
                            material: record,
                            modalType: ModalType.Original,
                          });
                        }}
                      >
                        编辑
                      </OperateBar.Button>
                      <OperateBar.Button
                        danger
                        icon={<MinusOutlined />}
                        confirmText="警告"
                        confirmContent="确定您要删除选中此原始材料吗?"
                        onClick={() => onDelete([record.id])}
                      >
                        删除
                      </OperateBar.Button>
                    </>
                  }
                >
                  {extraOperate(record)}
                </OperateBar>
              );
            }
            return (
              <OperateBar>
                {extraOperate(record)}
                <OperateBar.Button
                  danger
                  icon={<MinusOutlined />}
                  confirmText="警告"
                  confirmContent="确定您要删除选中此原始材料吗?"
                  onClick={() => onDelete([record.id])}
                >
                  删除
                </OperateBar.Button>
              </OperateBar>
            );
          },
        },
      ]}
      dataSource={materials}
      rowClassName={Styles.splitMaterialListWrapper}
      {...others}
    />
  );
}

export default connect()(MaterialList);
