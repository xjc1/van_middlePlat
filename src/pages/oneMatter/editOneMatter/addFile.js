/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { TItem, PopoverMultiTable } from '@/components/tis_ui';
import { FileUpload } from '@/components/bussinessComponents';
import { Input, Divider, DatePicker } from 'antd';
import moment from 'moment';

function AddFile(props) {
  const { disabled } = props;

  return (
    <PopoverMultiTable
      {...props}
      coverData={vals => {
        const { file, postDate } = vals;
        const [downloadUrl, fileName] = file || [];
        const formatTime = moment(postDate).format('YYYY-MM-DD');
        return { ...vals, downloadUrl, postDate: formatTime, fileName };
      }}
      title="添加"
      placement="right"
      showHeader
      disabled={disabled}
      columns={[
        {
          title: '文件名称',
          dataIndex: 'fileName',
        },
        {
          title: '发文单位',
          dataIndex: 'postUnit',
        },
        {
          title: '发文时间',
          dataIndex: 'postDate',
        },
      ]}
      extra={record => (
        <>
          <Divider type="vertical" />
          <a
            href={record.downloadUrl}
            download={record.fileName}
            target="_blank"
            style={{ marginRight: '10px' }}
          >
            下载
          </a>
        </>
      )}
    >
      <TItem name="postUnit" label="发文单位">
        <Input allowClear />
      </TItem>
      <TItem name="postDate" label="发文时间">
        <DatePicker format="YYYY-MM-DD" />
      </TItem>
      <TItem name="file" label="上传附件">
        <FileUpload download allowClear imgStyle={{ background: '#ccc' }} />
      </TItem>
    </PopoverMultiTable>
  );
}

export default AddFile;
