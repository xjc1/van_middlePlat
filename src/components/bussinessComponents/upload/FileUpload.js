/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Tooltip, Modal, Space } from 'antd';
import PropTypes from 'prop-types';
import { DeleteOutlined } from '@ant-design/icons';
import EmptyFn from '@/components/tis_ui/utils/EmptyFn';
import Request from '@/utils/request';

const { BASE_URL = '' } = process.env;


// 默认支持的文件类型
const defaultFileType = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'ppt', 'pptx', 'txt'];
// 默认的文件大小限制
const defaultMaxFileSize = 5;

// 默认上传地址
const defaultUrl = `${BASE_URL}/fsc_upload/v1.0`;

// 默认按钮名称
const defaultButtonName = '文件上传';

// 默认下载地址前缀
const startOfDownload = `${BASE_URL}/fsc_download/v1.0?fileId=`;

// 默认删除地址前缀
const deleteUrl = `${BASE_URL}/fsc_delete/v1.0?fileId=`;

// 默认请求方式
const defaultMethod = 'POST';

function doFileDelete(id) {
  const url = deleteUrl + id;
  return new Promise(resolve => {
    Modal.confirm({
      title: '警告',
      content: '此操作会删除服务器上的文件, 确定要执行删除操作么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        Request(url, {
          method: 'post',
        }).then(resp => {
          const { response } = resp;
          if (response) {
            resolve();
            message.success('文件删除成功');
          } else {
            message.error('文件删除失败');
          }
        });
      },
    });
  });
}

function FileUpload({
  value,
  onChange,
  action,
  maxFileSize,
  fileTypeList,
  buttonName,
  downloadHead,
  templateUrl,
  tip,
  disabled,
  download,
  base64,
  showAddress,
  allowClear,
  method,
  onProxyDeleteControl,
  ...others
}) {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [name, setName] = useState('');
  const [fieldId, setFieldId] = useState('');
  const [deleteFileId, setDeleteFileId] = useState();

  function handleDelete(id) {
    doFileDelete(id).then(() => {
      onChange([]);
      setName('');
    });
  }

  useEffect(() => {
    if (onProxyDeleteControl) {
      onProxyDeleteControl(() => handleDelete(deleteFileId));
    }
  }, [deleteFileId]);

  useEffect(() => {
    // 如果需要文件名则返回下载地址与文件名的对象
    const [url, fileName] = value || [];
    if (url) {
      const id = url.split('fileId=')[1];
      setFieldId(id);
    }
    setDownloadUrl(url);
    setName(fileName);
  }, [value]);

  const beforeUpload = file => {
    // 文件类型校验
    const fileTypeAccept = fileTypeList.includes(file.name.split('.').pop());
    if (!file || !fileTypeAccept) {
      message.error(`只能上传${fileTypeList.join('/')}文件!`);
    }
    const fileSizeAccept = file.size / 1024 / 1024 < maxFileSize;
    if (!fileSizeAccept) {
      message.error(`文件大小请控制在${maxFileSize}MB以内!`);
    }
    return fileTypeAccept && fileSizeAccept;
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // base64单独处理
      if (base64) {
        getBase64(info.file.originFileObj, fileData => {
          setLoading(false);
          onChange([fileData, info.file.name]);
          setName(info.file.name);
          setDownloadUrl(fileData);
          message.success('上传成功');
        });
        return;
      }
      // Get this url from response in real world.
      const { fileId } = info.file.response.response;
      const fileUrl = downloadHead + fileId;
      const fileName = info.file.name;
      setLoading(false);
      setFieldId(fileId);
      onChange([fileUrl, fileName]);
      setName(fileName);
      setDownloadUrl(fileUrl);
      message.success('上传成功');
    }
  };

  // 删除文件服务器上的文件
  function deleteFile() {
    // 不需要单独控制的话就走默认逻辑
    if (!onProxyDeleteControl) {
      handleDelete(fieldId);
      return;
    }
    onChange([]);
    setDeleteFileId(fieldId);
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  return (
    <>
      <Space>
        <Upload
          action={!base64 ? action : undefined}
          method={!base64 ? method : 'GET'}
          showUploadList={false}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          disabled={disabled}
          {...others}
        >
          <Button type="primary" disabled={disabled} loading={loading}>
            {buttonName}
          </Button>
        </Upload>
      </Space>
      {templateUrl && (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a style={{ marginLeft: 12 }} href={templateUrl} target="_blank">
          (模板下载)
        </a>
      )}
      {tip && (
        <p style={{ marginTop: 12, marginBottom: 12 }}>
          只能上传 {fileTypeList.join('/')} 文件，且不超过 {maxFileSize} MB
        </p>
      )}
      {showAddress && <p>下载地址: {downloadUrl}</p>}
      {download && name && (
        <p>
          附件下载：
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a href={downloadUrl} download={name} target="_blank">
            {name}
          </a>
          {allowClear && !disabled && (
            <Tooltip title="删除">
              <DeleteOutlined onClick={deleteFile} style={{ marginLeft: '10px', color: 'red' }} />
            </Tooltip>
          )}
        </p>
      )}
    </>
  );
}

FileUpload.defaultProps = {
  onChange: EmptyFn,
  value: null,
  templateUrl: null,
  action: defaultUrl,
  maxFileSize: defaultMaxFileSize,
  fileTypeList: defaultFileType,
  buttonName: defaultButtonName,
  downloadHead: startOfDownload,
  disabled: false,
  download: false,
  showAddress: false,
  allowClear: false,
  base64: false,
  tip: true,
  method: defaultMethod,
};

FileUpload.propTypes = {
  /**
   * 字段值[path,name]
   * @type {Array}
   */
  value: PropTypes.array,

  /**
   * value变化时触发
   * @type {Function}
   */
  onChange: PropTypes.func,

  /**
   * 上传地址
   * @type {String}
   */
  action: PropTypes.string,

  /**
   * 最大文件大小(MB)
   * @type {Number}
   */
  maxFileSize: PropTypes.number,

  /**
   * 文件格式
   * @type {Array}
   */
  fileTypeList: PropTypes.array,

  /**
   * 按钮文字
   * @type {String}
   */
  buttonName: PropTypes.string,

  /**
   * 下载地址头部
   * @type {String}
   */
  downloadHead: PropTypes.string,

  /**
   * 禁用
   * @type {Boolean}
   */
  disabled: PropTypes.bool,

  /**
   * 是否可下载
   */
  download: PropTypes.bool,

  /**
   * 是否需要显示提示
   */
  tip: PropTypes.bool,

  /**
   * 展示下载地址
   */
  showAddress: PropTypes.bool,

  /**
   * 模板文件下载地址
   */
  templateUrl: PropTypes.string,

  /**
   * 支持清除上传文件
   */
  allowClear: PropTypes.bool,

  /**
   * base64编码
   */
  base64: PropTypes.bool,

  /**
   * 请求方式
   */
  method: PropTypes.string,
};

FileUpload.doFileDelete = doFileDelete;

export default FileUpload;

/*
 * 入参: [string, string]   文件路径 , 文件名
 * 出参: [string, string]文件路径 , 文件名
 * */
