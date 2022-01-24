/* eslint-disable import/order */
import React from 'react';
import { EmptyFn, TButton } from '@/components/tis_ui';
import FieldAssociationSearch from './FieldAssociationSearch';
import commonDownload from '@/services/commonDownload';
import { message, Space, Button, notification } from 'antd';
import FieldImport from './FiledImport';
import EditCellAbleTable from './EditCellAbleTable';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

function FieldAssociation({ value = [], onChange = EmptyFn, standardMaterialId, disabled }) {
  const columns = [
    { title: '材料字段名称', width: '30%', editable: true, dataIndex: 'materialFieldName' },
    { title: '标准字段', dataIndex: 'standardFieldName' },
  ];
  // 下载模板
  const downloadTemplate = async () => {
    const onClose = message.loading('下载中', 0);
    await commonDownload({
      url: '/standardMaterials/attributes/export',
      name: '字段导入模板.xlsx',
    });
    onClose();
  };

  const fieldExport = query => {
    const onClose = message.loading('字段导出中', 0);
    commonDownload({
      url: '/standardMaterials/attributes/export',
      name: '字段.xls',
      method: 'POST',
      condition: { ...query },
    }).then(() => {
      onClose();
      message.success('导出成功！');
    });
  };

  const handleImport = (response = []) => {
    const importValue = response.map(it => ({ ...it, id: IDGenerator.next('importField') }));
    const newValue = [...value, ...importValue];
    const uniqueValue = _.uniqBy(newValue, 'standardFieldName');
    if (newValue.length > uniqueValue.length) {
      notification.info({ message: '导入数据与列表数据有重复，已做去重处理' });
    }
    onChange(uniqueValue);
  };

  return (
    <>
      {!disabled && (
        <Space>
          <FieldAssociationSearch
            onSubmit={val => {
              const newValue = val.map(({ name, id }) => ({
                materialFieldName: name,
                standardFieldName: name,
                id,
              }));
              const newValues = [...value, ...newValue];
              const uniqData = _.uniqBy(newValues, 'standardFieldName');
              if (uniqData.length < newValues.length) {
                notification.info({ message: '关联数据与列表数据有重复，已做去重处理' });
              }
              onChange(uniqData);
            }}
          />
          <FieldImport handleResponse={handleImport} />
          <TButton.Download onClick={downloadTemplate}>模板下载</TButton.Download>

          {standardMaterialId && (
            <Button
              type="primary"
              onClick={() => {
                fieldExport({ standardMaterialId });
              }}
            >
              导出字段
            </Button>
          )}
        </Space>
      )}
      <div style={{ marginTop: 16 }}>
        <EditCellAbleTable
          dataSource={value}
          columns={columns}
          changeDataSource={onChange}
          disabled={disabled}
        />
      </div>
    </>
  );
}

export default FieldAssociation;
