import React from 'react';
import { EmptyFn, OperateBar, TTable } from '@/components/tis_ui';
import { ScissorOutlined } from '@ant-design/icons';
import Styles from '../index.less';
import { adaptText } from '@/utils/AdaptiveHelper';

function MaterialList({ materials = [], extraOperate, onCreate = EmptyFn, ...others }) {
  return (
    <TTable
      columns={[
        {
          title: '原始审批材料名称',
          dataIndex: 'name',
          ellipsis: true,
          horizontal: true,
        },
        {
          title: '送达方式',
          ellipsis: true,
          dataIndex: 'sdfs',
        },
        {
          title: '送达类型',
          horizontal: true,
          ellipsis: true,
          dataIndex: 'clienType',
          width: 150,
        },
        {
          title: '审批结果类型',
          horizontal: true,
          dataIndex: 'resultType',
          width: 150,
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
                  icon={<ScissorOutlined />}
                  onClick={() => {
                    const {
                      approvalResults,
                      oid,
                      name,
                      clienName,
                      clienType,
                      clienst,
                      ...otherPrams
                    } = record;
                    onCreate({
                      ...otherPrams,
                      originalName: name,
                      file: [clienst, clienName],
                    });
                  }}
                >
                  {adaptText('拆解')}
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

export default MaterialList;
