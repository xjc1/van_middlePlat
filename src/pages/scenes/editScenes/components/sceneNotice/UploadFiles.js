import React from 'react';
import { Upload, Button, message, Table, Divider, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import EmptyFn from '@/utils/EmptyFn';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

const fileIDGenerator = new IDGenerator('newFile');

const defaultFileType = ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png'];

function UploadFiles(props) {
  const {
    value = [],
    onChange = EmptyFn,
    disabled,
    fileTypeList = defaultFileType,
    maxFileSize = 2,
  } = props;

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    // 文件类型校验
    const fileTypeLegal = fileTypeList.includes(file.name.split('.').pop());
    if (!file || !fileTypeLegal) {
      message.error(`只能上传${fileTypeList.join('/')}文件!`);
    }
    const isLt2M = file.size / 1024 / 1024 < maxFileSize;
    if (!isLt2M) {
      message.error(`只支持小于 ${maxFileSize}MB 的文件!`);
    }
    return fileTypeLegal && isLt2M;
  }

  function handleUpload(info) {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, fileUrl => {
        const handledFile = { key: fileIDGenerator.next(), name: info.file.name, file: fileUrl };
        onChange([...value, handledFile]);
        message.success('上传成功');
      });
      return;
    }
    if (info.file.status === 'error') {
      message.error('上传失败');
    }
  }

  return (
    <>
      <Upload
        method="GET"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleUpload}
      >
        {!disabled && (
          <>
            <Button>
              <UploadOutlined /> 上传文件
            </Button>
            <p style={{ marginTop: 12, marginBottom: 12 }}>
              只能上传 {fileTypeList.join('/')} 文件，且不超过 {maxFileSize} MB
            </p>
          </>
        )}
      </Upload>
      <div style={{ margin: '20px 0' }}>已上传的文件：</div>
      <Table
        bordered
        size="small"
        columns={[
          {
            title: '文件名',
            dataIndex: 'name',
            ellipsis: true,
            render: name => (
              <Tooltip title={name} placement="topLeft">
                {name}
              </Tooltip>
            ),
          },
          {
            title: '操作',
            width: 120,
            align: 'center',
            render: file => {
              return (
                <>
                  <a onClick={() => onChange(value.filter(({ key }) => key !== file.key))}>删除</a>
                  <Divider type="vertical" />
                  <a href={file.file} download={file.name}>
                    下载
                  </a>
                </>
              );
            },
          },
        ]}
        dataSource={value}
      />
    </>
  );
}

export default UploadFiles;
