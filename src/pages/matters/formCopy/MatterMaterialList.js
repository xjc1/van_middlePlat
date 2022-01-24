import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Styles from '@/pages/matters/formCopy/index.less';
import { TTable } from '@/components/tis_ui';
import { Alert } from 'antd';

function MatterMaterialList({ hidden, materials = [] }) {
  return (
    <div
      className={classNames(
        Styles.formCopyMatterMaterialList,
        hidden && Styles.formCopyContentHidden,
      )}
    >
      <Alert
        style={{ textAlign: 'center', marginBottom: 10 }}
        message={
          <span>
            原始材料比复制的原始材料多,多出的材料将会被标记为
            <span style={{ color: 'red' }}>红色</span>。
          </span>
        }
        type="warning"
      />
      <TTable
        columns={[
          {
            title: '行政区划',
            dataIndex: 'regionsCn',
          },
          {
            title: '二级事项名称',
            dataIndex: 'name',
            ellipsis: true,
          },
          {
            title: '三级事项名称',
            dataIndex: 'subItemName',
          },
          {
            title: '原始材料信息',
            ellipsis: true,
            dataIndex: 'originalMaterials',
            render(text) {
              return _.map(text, ({ materialName, materialId, match }) => (
                <div
                  className={classNames(!match && Styles.formCopyMaterialNotmatch)}
                  key={materialId}
                >
                  {materialName}
                </div>
              ));
            },
          },
        ]}
        rowKey="id"
        dataSource={materials}
      />
    </div>
  );
}

export default MatterMaterialList;
