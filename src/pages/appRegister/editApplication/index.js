import React, { Component } from 'react';
import { TItem, ModalForm, FormRules, TButton } from '@/components/tis_ui';
import { DictSelect, } from '@/components/bussinessComponents';
import { Row, Input, Upload, message, Button, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { appUserType } from '@/utils/constantEnum';
import { connect } from 'dva';
import _ from 'lodash';
import styles from '../appRegister.less';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只支持 JPG/PNG 格式的图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

@connect(({ appRegister }) => appRegister)
class EditApplication extends Component {
  createForm = null;

  state = {
    imageUrl: this.props.info ? this.props.info.icon : null,
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  // 提交或保存
  handleSave = () => {
    const { dispatch, addOrEdit, info } = this.props;

    const icon = this.state.imageUrl;

    this.createForm.current.validateFields().then(vals => {
      vals.editable = true;
      vals.icon = icon;

      if (addOrEdit) {
        vals.id = info.id;

        dispatch({
          type: 'appRegister/updateApplication',
          payload: vals,
        });
      } else {
        dispatch({
          type: 'appRegister/addApplication',
          payload: vals,
        });
      }
    });
  };

  // 取消
  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'appRegister/resetVisible',
      payload: { view: false, addOrEdit: 0, info: null, readOnly: false },
    });
  };

  render() {
    const { addOrEdit, info, readOnly } = this.props;

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    let { imageUrl } = this.state;

    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible={true}
        title="应用信息"
        maskClosable={false}
        handleCancel={this.handleCancel}
        initialValues={addOrEdit ? info : null}
        footer={
          <>
            <Button onClick={this.handleCancel}>{readOnly ? '关闭' : '取消'}</Button>
            {readOnly ? null : (
              <TButton.Button type="primary" ghost={false} onClick={this.handleSave}>
                {addOrEdit ? '保存' : '提交'}
              </TButton.Button>
            )}
          </>
        }
      >
        <div className={styles.twoGridPage}>
          <div className={styles.leftGrid}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <TItem
                name="name"
                label="应用名称"
                col={12}
                {...layout}
                rules={[FormRules.required()]}
              >
                <Input placeholder="请输入" disabled={readOnly} />
              </TItem>
              <TItem
                name="telephone"
                label="联系电话"
                col={12}
                {...layout}
                rules={[
                  {
                    // ...FormRules.required(),
                    ...FormRules.phone(),
                  },
                ]}
              >
                <Input placeholder="请输入" disabled={readOnly} />
              </TItem>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <TItem
                name="regions"
                label="行政区"
                col={12}
                {...layout}
                rules={[FormRules.required()]}
              >
                <DictSelect
                  multiple
                  dict="SH00XZQH"
                  field="regions"
                  dictType="tree"
                  col={11}
                  disabled={readOnly}
                />
              </TItem>
              <TItem
                name="objectType"
                label="面向空间"
                col={12}
                {...layout}
                rules={[FormRules.required()]}
              >
                {/* <DictSelect
                  disabled={readOnly}
                  dict="DXLX0001"
                  field="objectType"
                  dictType="tree"
                /> */}
                <Select disabled={readOnly}>
                  {
                    _.map(appUserType, (v, k) => <Select.Option key={k}
                                                                value={v}>{appUserType.$names[k]}</Select.Option>)
                  }
                </Select>
              </TItem>
            </Row>
            <TItem
              name="deployPath"
              label="应用发布路径"
              col={24}
              {...layout}
              rules={[FormRules.required()]}
            >
              <Input placeholder="请输入" disabled={readOnly} />
            </TItem>
            <TItem name="path" label="应用地址" col={24} {...layout} rules={[FormRules.required()]}>
              <Input placeholder="请输入" disabled={readOnly} />
            </TItem>
            <TItem
              name="simple"
              label="应用简介"
              col={24}
              {...layout}
              rules={[FormRules.required()]}
            >
              <TextArea autoSize={{ minRows: 4 }} placeholder="请输入" disabled={readOnly} />
            </TItem>
          </div>
          <div className={styles.rightGrid}>
            <p>上传图标</p>
            <Upload
              name="avatar"
              method="GET"
              headers={{ 'Content-Type': 'application/json;charset=utf-8' }}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
              disabled={readOnly}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="application-icon" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </div>
      </ModalForm>
    );
  }
}

export default EditApplication;
