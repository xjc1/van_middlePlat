/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import EmptyFn from '../utils/EmptyFn';

function UploadImage({ value, onChange, size, disabled, allowClear, imgStyle, ...others }) {
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">{!disabled && '上传'}</div>
    </div>
  );

  function formatBase64(imgSrc = '') {
    if (imgSrc.slice(0, 10) === 'data:image') {
      return imgSrc;
    }
    return atob(imgSrc);
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('只支持 JPG/PNG/GIF 格式的图片!');
    }
    const isLimit = file.size / 1024 / 1024 < size;
    if (!isLimit) {
      message.error(`图片必须小于 ${size}MB`);
    }
    return isJpgOrPng && isLimit;
  }

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        onChange(imageUrl);
        message.success('上传成功');
      });
    }
    if (info.file.status === 'error') {
      message.error('上传失败');
    }
  }

  return (
    <>
      <Upload
        method="GET"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        disabled={disabled}
        {...others}
      >
        {value ? (
          <img src={formatBase64(value)} alt="背景图片" style={{ width: '100%', ...imgStyle }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <p>{`只支持 JPG/PNG/GIF 格式的图片，且不超过 ${size} MB`}</p>
      {disabled || (allowClear && <Button onClick={() => onChange()}>删除图片</Button>)}
    </>
  );
}

UploadImage.defaultProps = {
  onChange: EmptyFn,
  size: 2,
  disabled: false,
  allowClear: false,
  imgStyle: {},
  value: undefined,
};

UploadImage.propTypes = {
  /** 图片路径 */
  value: PropTypes.string,
  /** 选择图片的处理函数 */
  onChange: PropTypes.func,
  /** 上传图片的大小上限（MB） */
  size: PropTypes.number,
  /** 禁用 */
  disabled: PropTypes.bool,
  /** 删除图片按钮 */
  allowClear: PropTypes.bool,
  /** 图片展示的样式 */
  imgStyle: PropTypes.object,
};

export default UploadImage;
