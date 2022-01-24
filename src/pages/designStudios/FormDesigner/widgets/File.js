import React from 'react';
import { Upload, Form, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { getlabel } from './tools';

const defaultStyles = {
  width: '100%',
};

const FileHoc = React.memo(
  ({
    extraClass = [],
    style = defaultStyles,
    disabled,
    readonly,
    id,
    label,
    innerSpan,
    displayName,
    orderIndex,
    className,
    placeholder = '点击上传文件',
    action = '',
  }) => {
    return (
      <Form.Item
        className={className}
        valuePropName="fileList"
        name={id}
        label={getlabel(displayName, label, orderIndex)}
        {...innerSpan}
      >
        <Upload
          className={classNames(extraClass)}
          action={action}
          style={style}
          disabled={disabled || readonly}
        >
          <Button icon={<UploadOutlined />}>{placeholder}</Button>
        </Upload>
      </Form.Item>
    );
  },
);

export default FileHoc;
