/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Upload, message } from 'antd';
import { TButton } from '@/components/tis_ui';
import PropTypes from 'prop-types';
import EmptyFn from '@/utils/EmptyFn';
import { defaultBaseUrl } from '@/constants';

// 默认支持的文件类型
const defaultFileType = ['xls', 'xlsx'];

// 默认按钮名称
const defaultButtonName = '文件上传';

function FileUpload({
  maxFileSize,
  onChange = EmptyFn,
  setButtonLoading = EmptyFn,
  action,
  baseUrl,
  fileTypeList,
  buttonName,
  disabled = false,
  ...others
}) {

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

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setButtonLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setButtonLoading(false);
      const { data = [] } = info.file.response;
      onChange(data);
      message.success('上传成功');
    }
  };

  return (
    <>
      <Upload
        headers={{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }}
        action={baseUrl+action}
        showUploadList={false}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        disabled={disabled}
        {...others}
      >
        <TButton.Button type="link" disabled={disabled}>
          {buttonName}
        </TButton.Button>
      </Upload>
    </>
  );
}

FileUpload.defaultProps = {
  onChange: EmptyFn,
  action: '',
  baseUrl: defaultBaseUrl,
  fileTypeList: defaultFileType,
  maxFileSize: 10,
  buttonName: defaultButtonName,
  disabled: false,
};

FileUpload.propTypes = {
  /**
   * 变化时触发
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
   * 禁用
   * @type {Boolean}
   */
  disabled: PropTypes.bool,

  baseUrl: PropTypes.string,
};

export default FileUpload;
