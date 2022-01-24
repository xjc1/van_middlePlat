import React, { useState } from 'react';
import {
  EmptyFn,
  FormRules,
  RichText,
  TFormList,
  TItem,
} from '@/components/tis_ui';
import { FileUpload, UploadImageUseFs } from '@/components/bussinessComponents';
import { Input, Select, Form } from 'antd';
import _ from 'lodash';
import { messageContentType, warningPictureType, commonNeedUnNeed } from '@/utils/constantEnum';
import TSearchWithModeSelectItem from '../TSearchWithModeSelector/TSearchWithModeSelectItem';
import MessageImgSelect from '../MessageImg/MessageImgSelect';
import AuthMethodSelect from './AuthMethodSelect';

function ContentSelect({ field = {}, disabled, value = {}, layout = {}, filterType = [],onTypeChange=EmptyFn }) {
  const { name, fieldKey, ...fieldOthers } = field;
  const { msgPicture = {}, content = {} } = value;
  const { pictureType } = msgPicture;
  const { type: contentType } = content;

  const [currentMessageContentType] = useState(() => {
    return _.reduce(
      messageContentType,
      (result, v, k) => {
        if (!_.includes(filterType, v)) {
          result.push({
            label: messageContentType.$names[k],
            v,
          });
        }
        return result;
      },
      [],
    );
  });

  return (
    <>
      <TItem
        {...fieldOthers}
        name={[name, 'msgPicture', 'pictureType']}
        fieldKey={[fieldKey, 'msgPicture', 'pictureType']}
        label="提醒配图类型"
        {...layout}
      >
        <Select disabled={disabled} allowClear>
          {_.map(warningPictureType, (v, k) => (
            <Select.Option key={k} value={v} label={warningPictureType.$names[k]}>
              {warningPictureType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      {pictureType === warningPictureType.pictureLib && (
        <TItem
          {...fieldOthers}
          name={[name, 'msgPicture', 'relatedPicture']}
          fieldKey={[fieldKey, 'msgPicture', 'relatedPicture']}
          label="提醒配图"
          {...layout}
        >
          <MessageImgSelect disabled={disabled} allowClear />
        </TItem>
      )}
      {pictureType === warningPictureType.customize && (
        <TItem
          {...fieldOthers}
          name={[name, 'msgPicture', 'uploadPicture']}
          fieldKey={[fieldKey, 'msgPicture', 'uploadPicture']}
          label="提醒配图"
          {...layout}
        >
          <UploadImageUseFs disabled={disabled} allowClear />
        </TItem>
      )}
      <TItem
        {...fieldOthers}
        name={[name, 'content', 'type']}
        fieldKey={[fieldKey, 'content', 'type']}
        label="消息正文类型"
        rules={[FormRules.required('必填')]}
        {...layout}
      >
        <Select disabled={disabled} allowClear onChange={onTypeChange}>
          {_.map(currentMessageContentType, ({ label, v }) => (
            <Select.Option disabled={disabled} key={v} value={v} label={label}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </TItem>

      {contentType === messageContentType.link && (
        <>
          <Form.Item label="链接" {...layout}>
            <TItem
              {...fieldOthers}
              name={[name, 'content', 'relatedLink', 'title']}
              fieldKey={[fieldKey, 'content', 'relatedLink', 'title']}
              extra="外链标题"
              wrapperCol={{ span: 24 }}
            >
              <Input disabled={disabled} />
            </TItem>
            <TItem
              {...fieldOthers}
              name={[name, 'content', 'relatedLink', 'url']}
              fieldKey={[fieldKey, 'content', 'relatedLink', 'url']}
              rules={[FormRules.required('必填')]}
              extra="外链地址"
              wrapperCol={{ span: 24 }}
            >
              <Input disabled={disabled} />
            </TItem>
            <TItem
              {...fieldOthers}
              name={[name, 'content', 'relatedLink', 'authentication']}
              fieldKey={[fieldKey, 'content', 'relatedLink', 'authentication']}
              extra="认证方式"
              wrapperCol={{ span: 24 }}
            >
              <AuthMethodSelect mode="multiple" disabled={disabled} />
            </TItem>
            <TItem
              {...fieldOthers}
              name={[name, 'content', 'relatedLink', 'isAccessToken']}
              fieldKey={[fieldKey, 'content', 'relatedLink', 'isAccessToken']}
              extra="访问令牌"
              wrapperCol={{ span: 24 }}
            >
              <Select placeholder="请选择是否需要访问令牌" allowClear>
                {_.map(commonNeedUnNeed, (val, key) => (
                  <Select.Option key={key} value={val}>
                    {commonNeedUnNeed.$names[key]}
                  </Select.Option>
                ))}
              </Select>
            </TItem>
          </Form.Item>
        </>
      )}
      {!filterType.includes(messageContentType.text) && contentType === messageContentType.text && (
        <Form.Item label="纯文本" {...layout}>
          <TItem
            {...fieldOthers}
            name={[name, 'content', 'text', 'content']}
            fieldKey={[fieldKey, 'content', 'text', 'content']}
            rules={[FormRules.required('必填')]}
            wrapperCol={{ span: 24 }}
          >
            <Input.TextArea rows={4} disabled={disabled} placeholder="请输入文本" />
          </TItem>
          <TItem
            {...fieldOthers}
            name={[name, 'content', 'text', 'authentication']}
            fieldKey={[fieldKey, 'content', 'text', 'authentication']}
            extra="认证方式"
            wrapperCol={{ span: 24 }}
          >
            <AuthMethodSelect mode="multiple" disabled={disabled} />
          </TItem>
        </Form.Item>
      )}
      {!filterType.includes(messageContentType.customize) &&
      [messageContentType.customize].includes(contentType) && (
        <Form.Item label="消息正文" {...layout}>
          <TItem
            {...fieldOthers}
            name={[name, 'content', 'text', 'content']}
            fieldKey={[fieldKey, 'content', 'text', 'content']}
            wrapperCol={{ span: 24 }}
          >
            <RichText readOnly={disabled} base64 />
          </TItem>
          <TItem
            {...fieldOthers}
            name={[name, 'content', 'text', 'authentication']}
            fieldKey={[fieldKey, 'content', 'text', 'authentication']}
            extra="认证方式"
            wrapperCol={{ span: 24 }}
          >
            <AuthMethodSelect mode="multiple" disabled={disabled} />
          </TItem>
        </Form.Item>
      )}
      {!filterType.includes(messageContentType.scene) &&
      [messageContentType.customize, messageContentType.scene].includes(contentType) && (
        <TSearchWithModeSelectItem
          required={contentType !== messageContentType.customize}
          field={field}
          bulkAdd={contentType === messageContentType.customize }
          formItemConfig={{ name: ['content', 'relatedScene'], label: '相关主题' }}
          type="scene"
          disabled={disabled}
          layout={layout}
          data={content.relatedScene}
          mode={contentType === messageContentType.customize ? undefined : 'single'}
        />
      )}
      {!filterType.includes(messageContentType.message) &&
      [messageContentType.customize, messageContentType.message].includes(contentType) && (
        <TSearchWithModeSelectItem
          required={contentType !== messageContentType.customize}
          field={field}
          bulkAdd={contentType === messageContentType.customize }
          formItemConfig={{ name: [name, 'content', 'relatedMessage'], label: '相关消息' }}
          fieldKey={[fieldKey, 'content', 'relatedMessage']}
          type="message"
          disabled={disabled}
          layout={layout}
          data={content.relatedMessage}
          mode={contentType === messageContentType.customize ? undefined : 'single'}
        />
      )}
      {!filterType.includes(messageContentType.matter) &&
      [messageContentType.customize, messageContentType.matter].includes(contentType) && (
        <TSearchWithModeSelectItem
          required={contentType !== messageContentType.customize}
          field={field}
          bulkAdd={contentType === messageContentType.customize }
          formItemConfig={{ name: ['content', 'relatedMatter'], label: '相关事项' }}
          type="matter"
          disabled={disabled}
          layout={layout}
          data={content.relatedMatter}
          mode={contentType === messageContentType.customize ? undefined : 'single'}
        />
      )}
      {!filterType.includes(messageContentType.convenience) &&
      [messageContentType.customize, messageContentType.convenience].includes(contentType) && (
        <TSearchWithModeSelectItem
          required={contentType !== messageContentType.customize}
          field={field}
          bulkAdd={contentType === messageContentType.customize }
          formItemConfig={{ name: ['content', 'relatedService'], label: '相关服务' }}
          type="convenience"
          disabled={disabled}
          layout={layout}
          data={content.relatedService}
          mode={contentType === messageContentType.customize ? undefined : 'single'}
        />
      )}
      {!filterType.includes(messageContentType.policyLibrary) &&
      [messageContentType.customize, messageContentType.policyLibrary].includes(contentType) && (
        <TSearchWithModeSelectItem
          required={contentType !== messageContentType.customize}
          field={field}
          bulkAdd={contentType === messageContentType.customize }
          formItemConfig={{ name: ['content', 'relatedPolicy'], label: '相关政策' }}
          type="policyLibrary"
          disabled={disabled}
          layout={layout}
          data={content.relatedPolicy}
          mode={contentType === messageContentType.customize ? undefined : 'single'}
        />
      )}
      {!filterType.includes(messageContentType.article) &&
      [messageContentType.customize, messageContentType.article].includes(contentType) && (
        <TSearchWithModeSelectItem
          required={contentType !== messageContentType.customize}
          field={field}
          bulkAdd={contentType === messageContentType.customize }
          formItemConfig={{ name: ['content', 'relatedArticle'], label: '相关文章' }}
          type="article"
          disabled={disabled}
          layout={layout}
          data={content.relatedArticle}
          mode={contentType === messageContentType.customize ? undefined : 'single'}
        />
      )}
      {!filterType.includes(messageContentType.project) &&
      [messageContentType.customize, messageContentType.project].includes(contentType) && (
        <TSearchWithModeSelectItem
          required={contentType !== messageContentType.customize}
          field={field}
          bulkAdd={contentType === messageContentType.customize }
          formItemConfig={{ name: ['content', 'relatedProject'], label: '相关项目' }}
          type="project"
          disabled={disabled}
          layout={layout}
          data={content.relatedProject}
          mode={contentType === messageContentType.customize ? undefined : 'single'}
        />
      )}
      {!filterType.includes(messageContentType.customize) &&
      [messageContentType.customize].includes(contentType) && (
        <>
          <TItem label="链接" {...layout}>
            <TItem
              {...fieldOthers}
              name={[name, 'content', 'relatedLink', 'title']}
              fieldKey={[fieldKey, 'content', 'relatedLink', 'title']}
              extra="外链标题"
              wrapperCol={{ span: 24 }}
            >
              <Input disabled={disabled} />
            </TItem>
            <TItem
              {...fieldOthers}
              name={[name, 'content', 'relatedLink', 'url']}
              fieldKey={[fieldKey, 'content', 'relatedLink', 'url']}
              extra="外链地址"
              wrapperCol={{ span: 24 }}
            >
              <Input disabled={disabled} />
            </TItem>
            <TItem
              {...fieldOthers}
              name={[name, 'content', 'relatedLink', 'authentication']}
              fieldKey={[fieldKey, 'content', 'relatedLink', 'authentication']}
              extra="认证方式"
              wrapperCol={{ span: 24 }}
            >
              <AuthMethodSelect mode="multiple" disabled={disabled} />
            </TItem>
            <TItem
              {...fieldOthers}
              name={[name, 'content', 'relatedLink', 'isAccessToken']}
              fieldKey={[fieldKey, 'content', 'relatedLink', 'isAccessToken']}
              extra="访问令牌"
              wrapperCol={{ span: 24 }}
            >
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
            name={[name, 'content', 'relatedFile']}
            addText="新增相关附件"
            {...layout}
            disabled={disabled}
          >
            {({ name: rName, isFirst, isSingle, ...otherAttr }) => {
              return (
                <TItem {...otherAttr} name={rName} label={`相关附件${rName + 1}`}>
                  <FileUpload download allowClear disabled={disabled} />
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
