/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import { Upload, message } from 'antd';
import _ from 'lodash';
import { Editor } from '@tinymce/tinymce-react';
// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import tinymce from 'tinymce/tinymce';
import EventEmitter from 'events';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/help';
import 'tinymce/plugins/imagetools';
import './indent2em';
import uploadImg from './uploadImg';

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
// eslint-disable-next-line import/no-unresolved
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';

// eslint-disable-next-line import/no-unresolved
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';

import Base64 from '../utils/Base64';

const editorObj = {
  language: 'zh_CN',
  language_url: `${window.location.origin}${window.location.pathname}tinyLang/zh_CN.js`,
  menubar: false,
  skin: false,
  min_height: 400,
  lineheight_formats: '1 1.1 1.2 1.3 1.4 1.5 1.75 2 2.5 3',
  fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
  content_css: false,
  statusbar: false,
  content_style: [contentCss, contentUiCss].join('\n'),
  paste_data_images: true,
  automatic_uploads: false,
  convert_urls: false,
  paste_preprocess(plugin, img) {
    const { content } = img;
    if (_.startsWith(content, '<img')) {
      // eslint-disable-next-line no-param-reassign
      img.content = _.replace(content, '<img', '<img style="max-width: 100%"');
    }
  },
};

const { BASE_URL = '' } = process.env;

function Index({
  value,
  onChange,
  readOnly,
  contentStyle = { height: 300 },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  imageUploadUrl = `${BASE_URL}/fsc_upload/v1.0`,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  imageLoadUrl = `${BASE_URL}/fsc_download/v1.0?fileId=`,
  base64,
}) {
  const upladForm = useRef();
  const [eventEmitter] = useState(() => new EventEmitter());

  const [options] = useState(() => {
    uploadImg(upladForm, eventEmitter);
    return {
      ...editorObj,
      plugins: 'lists link image preview code paste media imagetools uploadImg table indent2em',
      toolbar: `undo redo | formatselect | bold italic forecolor backcolor fontsizeselect lineheight |
      hr link image uploadImg | alignleft aligncenter alignright alignjustify indent2em |
      numlist bullist outdent indent | media fullscreen table code preview`,
      height: contentStyle.height || 300,
    };
  });

  const [valueString, setValueString] = useState(() => {
    if (value && base64) {
      return Base64.decodeBase64(value);
    }
    return _.isUndefined(value) ? '' : value;
  });

  useEffect(() => {
    onChange(base64 ? Base64.base64(valueString) : valueString);
  }, [valueString]);

  return (
    <div>
      <Upload
        accept="image/*"
        showUploadList={false}
        action={imageUploadUrl}
        onChange={info => {
          if (info.file.status === 'done') {
            eventEmitter.emit('file', `${imageLoadUrl}${info.file.response.response.fileId}`);
          }
          if (info.file.status === 'error') {
            message.error(info.file.error.message || '上传失败！');
            eventEmitter.emit('file');
          }
        }}
        ref={upladForm}
      />
      <Editor
        inline={false}
        selector="editorStateRef" // 选择器
        value={valueString}
        disabled={readOnly}
        init={options}
        onEditorChange={txt => {
          setValueString(txt);
        }}
      />
    </div>
  );
}

Index.defaultProps = {
  base64: false,
  imageUploadUrl: `${BASE_URL}/fsc_upload/v1.0`,
  imageLoadUrl: `${BASE_URL}/fsc_download/v1.0?fileId=`,
};

export default Index;
