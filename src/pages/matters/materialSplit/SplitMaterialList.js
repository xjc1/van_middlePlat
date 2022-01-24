import React from 'react';
import _ from 'lodash';
import { EmptyFn, OperateBar, TTable } from '@/components/tis_ui';
import { MinusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import Styles from './index.less';
import authEnum, { authCheck } from '@/utils/auth';

function SplitMaterialList({
  material,
  dictNames,
  extraOperate = EmptyFn,
  resolveMaterialDTOS = [],
  onDelete = EmptyFn,
}) {
  const splitMaterials = _.filter(resolveMaterialDTOS, record => {
    return record.parentId === material.id;
  });

  return (
    <div className={Styles.splitMaterialList}>
      <TTable
        bordered
        size="small"
        columns={[
          {
            title: '拆解材料名称',
            dataIndex: 'name',
            horizontal: true,
          },
          {
            title: '材料条件',
            dataIndex: 'action',
          },
          {
            title: '结果',
            ellipsis: true,
            dataIndex: 'result',
          },
          {
            title: '收件要点',
            ellipsis: true,
            dataIndex: 'needDesc',
          },
          {
            title: '材料主体',
            ellipsis: true,
            dataIndex: 'materialSubject',
            render: code => {
              return dictNames.SYCLZT[code] ? dictNames.SYCLZT[code] : code;
            },
          },
          {
            title: '标准材料名称',
            ellipsis: true,
            dataIndex: 'standardMaterialName',
          },
          {
            title: '操作',
            align: 'center',
            horizontal: true,
            width: 200,
            render(record) {
              return (
                <OperateBar>
                  {extraOperate(record)}
                  {authCheck(
                    authEnum.matters_origin,
                    <OperateBar.Button
                      danger
                      icon={<MinusOutlined />}
                      confirmText="警告"
                      confirmContent="确定您要删除选中此拆解材料吗?"
                      onClick={() => onDelete([record.id])}
                    >
                      删除
                    </OperateBar.Button>,
                  )}
                </OperateBar>
              );
            },
          },
        ]}
        rowKey="id"
        dataSource={splitMaterials}
      />
    </div>
  );
}

export default connect(({ split }) => {
  return { resolveMaterialDTOS: split.resolveMaterialDTOS };
})(SplitMaterialList);
