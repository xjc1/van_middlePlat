import React from 'react';
import { EyeInvisibleOutlined, EyeOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Tag, Typography } from "antd";

function PermissionTag({ type, valid, children, ...others }) {
  switch (type) {
    case "view":
      return valid ?
        <Tag color="blue" {...others}>{children}</Tag> :
        <Tag style={{ background: '#fff', borderStyle: 'dashed', borderColor: '#87d068' }} {...others}>
          <EyeInvisibleOutlined />
          <Typography.Text delete>{children}</Typography.Text>
        </Tag>;
    case 'data':
      return <Tag color="geekblue" {...others}><PaperClipOutlined /> {children}</Tag>;
    default:
      return <Tag color="geekblue" {...others}><EyeOutlined /> {children}</Tag>;
  }
}

export default PermissionTag;
