import React, { useState } from 'react';
import { DataImport, TButton } from '@/components/tis_ui';
import { portraitImportUrl, portraitTagExcelUrl } from '@/constants';
import { message, Space } from 'antd';
import commonDownload from '@/services/commonDownload';
import BulkForm from './bulkForm';
import { dataInit } from './dataFormat';

function BulkAdd() {
  const [data, setData] = useState([]);

  async function downloadEmpty() {
    const onClose = message.loading('下载中', 0);
    await commonDownload({ url: portraitTagExcelUrl, name: '画像标签导入模板.xlsx' });
    onClose();
  }

  async function getData(response) {
    const initData = await dataInit(response);
    setData([]);
    setTimeout(() => setData(initData), 500);
  }

  return (
    <div>
      <Space>
        <TButton.Download onClick={downloadEmpty}>模板下载</TButton.Download>
        <DataImport action={portraitImportUrl} refresh={getData} />
      </Space>
      {data.length > 0 && <BulkForm data={data} setData={setData} />}
    </div>
  );
}
export default BulkAdd;
