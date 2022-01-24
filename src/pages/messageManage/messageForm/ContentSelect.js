import React, { useState } from 'react';
import {
  FormRules,
  RichText,
  TFormList,
  TItem,
} from '@/components/tis_ui';
import { FileUpload, UploadImageUseFs } from '@/components/bussinessComponents';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { messageContentType, warningPictureType, commonNeedUnNeed } from '@/utils/constantEnum';
import MessageRelatedWithModeSelector from '@/components/bussinessComponents/MessageRelatedWithModeSelector';
import MessageImgSelect from '@/pages/messageConfig/MessageImg/MessageImgSelect';
import AuthMethodSelect from './AuthMethodSelect';

const list = {
  scene: 0,
  matter: 1,
  convenience: 3,
  policyLibrary: 4,
  article: 5,
  project: 6,
};

function keyToName(key) {
  let result = '';
  _.forEach(list, (v, k) => {
    if (v === key) {
      result = k;
    }
  });
  return result;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const commonRelatedKeys = _.map(Object.entries(list), ([, val]) => val);

function ContentSelect({ id, isCheck, data = {}, formRef }) {
  const { msgPicture = {}, content = {} } = data;
  const [contentType, setContentType] = useState(content.type);
  const [pictureType, setPictureType] = useState(msgPicture.pictureType);
  return (
    <>
      <TItem name={[id, 'msgPicture', 'pictureType']} label="提醒配图类型">
        <Select
          disabled={isCheck}
          allowClear
          onChange={val => {
            // 清除上次选的图片内容
            formRef.current.setFields([
              { name: [id, 'msgPicture', 'relatedPicture'], value: undefined },
            ]);
            setPictureType(val);
          }}
        >
          {_.map(warningPictureType, (v, k) => (
            <Select.Option key={k} value={v} label={warningPictureType.$names[k]}>
              {warningPictureType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      {pictureType === warningPictureType.pictureLib && (
        <TItem name={[id, 'msgPicture', 'relatedPicture']} label="提醒配图">
          <MessageImgSelect disabled={isCheck} allowClear />
        </TItem>
      )}
      {pictureType === warningPictureType.customize && (
        <TItem name={[id, 'msgPicture', 'uploadPicture']} label="提醒配图">
          <UploadImageUseFs disabled={isCheck} allowClear />
        </TItem>
      )}
      <TItem
        name={[id, 'content', 'type']}
        label="消息正文类型"
        rules={[FormRules.required('必填')]}
      >
        <Select
          disabled={isCheck}
          allowClear
          onChange={val => {
            formRef.current.setFields([
              { name: [id, 'content', 'singleRelated'], value: undefined },
            ]);
            setContentType(val);
          }}
        >
          {_.map(messageContentType, (v, k) => (
            <Select.Option
              disabled={isCheck}
              key={k}
              value={v}
              label={messageContentType.$names[k]}
            >
              {messageContentType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>

      {contentType === messageContentType.link && (
        <>
          <TItem label="链接">
            <TItem name={[id, 'content', 'relatedLink', 'title']} extra="外链标题">
              <Input disabled={isCheck} />
            </TItem>
            <TItem
              name={[id, 'content', 'relatedLink', 'url']}
              rules={[FormRules.required('必填')]}
              extra="外链地址"
            >
              <Input disabled={isCheck} />
            </TItem>
            <TItem name={[id, 'content', 'relatedLink', 'authentication']} extra="认证方式">
              <AuthMethodSelect mode="multiple" disabled={isCheck} />
            </TItem>
            <TItem name={[id, 'content', 'relatedLink', 'isAccessToken']} extra="访问令牌">
              <Select placeholder="请选择是否需要访问令牌" allowClear>
                {_.map(commonNeedUnNeed, (val, key) => (
                  <Select.Option key={key} value={val}>
                    {commonNeedUnNeed.$names[key]}
                  </Select.Option>
                ))}
              </Select>
            </TItem>
          </TItem>
        </>
      )}
      {contentType === messageContentType.text && (
        <TItem label="纯文本">
          <TItem name={[id, 'content', 'text', 'content']} rules={[FormRules.required('必填')]}>
            <Input.TextArea rows={4} disabled={isCheck} placeholder="请输入文本" />
          </TItem>
          <TItem name={[id, 'content', 'text', 'authentication']} extra="认证方式">
            <AuthMethodSelect mode="multiple" disabled={isCheck} />
          </TItem>
        </TItem>
      )}
      {commonRelatedKeys.includes(contentType) && (
        <MessageRelatedWithModeSelector
          layout={layout}
          formItemConfig={{
            name: [id, 'content', 'singleRelated'],
            label: `相关${messageContentType.$v_names[contentType]}`,
          }}
          relatedRequire
          disabled={isCheck}
          type={keyToName(contentType)}
          mode="single"
        />
      )}
      {contentType === messageContentType.customize && (
        <>
          <TItem label="消息正文">
            <TItem name={[id, 'content', 'text', 'content']}>
              <RichText readOnly={isCheck} base64 />
            </TItem>
            <TItem name={[id, 'content', 'text', 'authentication']} extra="认证方式">
              <AuthMethodSelect mode="multiple" disabled={isCheck} />
            </TItem>
          </TItem>

          <MessageRelatedWithModeSelector
            layout={layout}
            formItemConfig={{ name: [id, 'content', 'relatedScene'], label: '相关主题' }}
            type="scene"
            disabled={isCheck}
          />
          <MessageRelatedWithModeSelector
            layout={layout}
            formItemConfig={{ name: [id, 'content', 'relatedMatter'], label: '相关事项' }}
            type="matter"
            disabled={isCheck}
          />
          <MessageRelatedWithModeSelector
            layout={layout}
            formItemConfig={{ name: [id, 'content', 'relatedService'], label: '相关服务' }}
            type="convenience"
            disabled={isCheck}
          />
          <MessageRelatedWithModeSelector
            layout={layout}
            formItemConfig={{ name: [id, 'content', 'relatedPolicy'], label: '相关政策' }}
            type="policyLibrary"
            disabled={isCheck}
          />
          <MessageRelatedWithModeSelector
            layout={layout}
            formItemConfig={{ name: [id, 'content', 'relatedArticle'], label: '相关文章' }}
            type="article"
            disabled={isCheck}
          />
          <MessageRelatedWithModeSelector
            layout={layout}
            formItemConfig={{ name: [id, 'content', 'relatedProject'], label: '相关项目' }}
            type="project"
            disabled={isCheck}
          />
          <TItem label="链接">
            <TItem name={[id, 'content', 'relatedLink', 'title']} extra="外链标题">
              <Input disabled={isCheck} />
            </TItem>
            <TItem name={[id, 'content', 'relatedLink', 'url']} extra="外链地址">
              <Input disabled={isCheck} />
            </TItem>
            <TItem name={[id, 'content', 'relatedLink', 'authentication']} extra="认证方式">
              <AuthMethodSelect mode="multiple" disabled={isCheck} />
            </TItem>
            <TItem name={[id, 'content', 'relatedLink', 'isAccessToken']} extra="访问令牌">
              <Select placeholder="请选择是否需要访问令牌" allowClear>
                {_.map(commonNeedUnNeed, (val, key) => (
                  <Select.Option key={key} value={val}>
                    {commonNeedUnNeed.$names[key]}
                  </Select.Option>
                ))}
              </Select>
            </TItem>
          </TItem>
          <TFormList
            name={[id, 'content', 'relatedFile']}
            addText="新增相关附件"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 11,
            }}
            disabled={isCheck}
          >
            {({ name, ...otherAttr }) => {
              return (
                <TItem {...otherAttr} name={name} label={`相关附件${name + 1}`}>
                  <FileUpload download allowClear disabled={isCheck} />
                </TItem>
              );
            }}
          </TFormList>
        </>
      )}
    </>
  );
}

export default ContentSelect;
