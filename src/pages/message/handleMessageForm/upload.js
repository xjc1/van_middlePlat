import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您只能上传格式为JPG,PNG的图片 !');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('图片大小请控制在10MB以内!');
  }
  return isJpgOrPng && isLt10M;
}

class Avatar extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {
    const { props } = this;
    this.setState({ imageUrl: props.ImageUrl });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ imageUrl: nextProps.ImageUrl });
  }

  handleChange = info => {
    const { getPhotoContent } = this.props;
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        getPhotoContent(imageUrl);
        this.setState({
          imageUrl,
          loading: false,
        });
      });
    }
  };

  render() {
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          method="GET"
          headers={{ 'Content-Type': 'application/json;charset=utf-8' }}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </div>
    );
  }
}

export default Avatar;
