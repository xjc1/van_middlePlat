// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import EmptyFn from '@/components/tis_ui/utils/EmptyFn';
import FileUpload from './FileUpload';

const defaultImgStyle = {
  width: '100px',
  height: '100px',
  border: '1px dashed #eee',
  marginBottom: '10px',
  textAlign: 'center',
  lineHeight: '100px',
  background: 'center / contain no-repeat #eee ',
  borderRadius: '5%',
};

function UploadImageUseFs({
  value = [],
  onChange = EmptyFn,
  onProxyDeleteControl,
  imgStyle = {},
  emptyTip = '未上传',
  ...others
}) {
  const [imageSrc] = value;
  function handleUpload(val) {
    onChange(val);
  }
  return (
    <>
      <div
        style={{
          ...defaultImgStyle,
          ...imgStyle,
          backgroundImage: `url(${imageSrc})`,
        }}
      >
        {!imageSrc && emptyTip}
      </div>
      <FileUpload
        value={value}
        onChange={handleUpload}
        buttonName="图片上传"
        fileTypeList={['jpg', 'png', 'gif']}
        download
        allowClear
        onProxyDeleteControl={onProxyDeleteControl}
        {...others}
      />
    </>
  );
}

export default UploadImageUseFs;
