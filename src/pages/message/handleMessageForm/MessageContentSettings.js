import { Divider, Input, Select, Col, Row } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import styles from './index.less';
import { RichText, TItem, UploadImage } from '@/components/tis_ui';
import { TSearchSelector } from '@/components/bussinessComponents';
import { contentType } from '@/utils/constantEnum';
import LinkData from './linkData';
import Content from './content';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

@connect(({ createMessageForm }) => ({
  ...createMessageForm.step,
  ...createMessageForm,
}))
class MessageContentSettings extends PureComponent {
  createForm = React.createRef();

  // eslint-disable-next-line no-shadow
  changeContentType = contentType => {
    const { dispatch, formData } = this.props;
    formData.contentType = contentType;
    dispatch({
      type: 'createMessageForm/saveFormData',
      payload: formData,
    });
  };

  changeHaveLink = haveLink => {
    const { dispatch, formData } = this.props;
    formData.haveLink = haveLink;
    dispatch({
      type: 'createMessageForm/saveFormData',
      payload: formData,
    });
    if (haveLink === 0) {
      dispatch({
        type: 'createMessageForm/changeLinkData',
        payload: [],
      });
    }
  };

  changeRichContent = content => {
    const { dispatch, formData } = this.props;
    formData.richContent = content.richContent;
    dispatch({
      type: 'createMessageForm/saveFormData',
      payload: formData,
    });
  };

  render() {
    const { formData, check } = this.props;
    return (
      <Fragment>
        <div style={{ width: '100%' }} className={styles.desc}>
          <strong>消息内容配置</strong>
        </div>
        <Divider style={{ margin: '10px 0 10px' }} />
        <Row>
          <TItem
            col={20}
            name="title"
            label="消息标题"
            {...layout}
            rules={[{ required: true, message: '消息标题不能为空!' }]}
          >
            <Input disabled={check} style={{ width: '100%' }} />
          </TItem>
          <TItem
            col={20}
            name="source"
            label="消息来源"
            {...layout}
            rules={[{ required: true, message: '消息来源不能为空!' }]}
          >
            <Input disabled={check} style={{ width: '100%' }} />
          </TItem>
          <TItem col={20} name="background" {...layout} label="背景图片">
            <UploadImage disabled={check} size={10} allowClear imgStyle={{ background: '#ccc' }} />
          </TItem>
          <Col span={4}>
            <span style={{ color: 'blue' }}>图片建议30px * 30px</span>
          </Col>
        </Row>
        <TItem col={20} name="contentType" label="内容类型" {...layout}>
          <Select onChange={this.changeContentType} disabled={check}>
            {_.map(contentType, (value, key) => (
              <Select.Option key={key} value={value}>
                {contentType.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        {formData.contentType === 3 && <Content />}
        {formData.contentType === 2 && (
          <TItem col={20} name="originalUrl" label="原文链接" {...layout}>
            <Input disabled={check} />
          </TItem>
        )}
        {formData.contentType === 1 && (
          <TItem col={20} name="richContent" {...layout} label="内容">
            <RichText
              readOnly={check}
              content={!formData.messageContent ? '' : formData.messageContent.richContent}
              onChange={richContent => this.changeRichContent({ richContent })}
            />
          </TItem>
        )}
        {formData.contentType === 0 && (
          <TItem col={20} name="content" {...layout} label="内容">
            <Input.TextArea rows={4} disabled={check} />
          </TItem>
        )}
        {formData.contentType !== 2 && (
          <div>
            <TItem col={20} {...layout} name="scenes" label="关联主题">
              <TSearchSelector type="scene" disabled={check} />
            </TItem>
            <TItem col={20} {...layout} name="matters" label="关联事项">
              <TSearchSelector type="matter" disabled={check} />
            </TItem>
            <TItem col={20} {...layout} name="services" label="关联服务">
              <TSearchSelector type="convenience" disabled={check} />
            </TItem>
            <TItem col={20} {...layout} name="policy" label="关联政策">
              <TSearchSelector type="policyLibrary" disabled={check} />
            </TItem>
            <TItem col={20} {...layout} name="qa" label="关联问答">
              <TSearchSelector type="synonym" disabled={check} />
            </TItem>
            <TItem col={20} {...layout} name="articles" label="关联文章">
              <TSearchSelector type="article" disabled={check} />
            </TItem>
            <TItem col={20} name="haveLink" label="自定义链接" {...layout}>
              <Select disabled={check} onChange={this.changeHaveLink}>
                <Select.Option value={0}>无</Select.Option>
                <Select.Option value={1}>有</Select.Option>
              </Select>
            </TItem>
            {formData.haveLink === 1 && <LinkData />}
          </div>
        )}
      </Fragment>
    );
  }
}
export default MessageContentSettings;
