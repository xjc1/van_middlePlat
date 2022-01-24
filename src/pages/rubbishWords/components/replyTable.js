import React from 'react';
import _ from 'lodash';
import Base64 from '@/utils/Base64';
import { TItem, RichText } from '@/components/tis_ui';
import { Input } from 'antd';
import PopoverMultiTable from './popoverTable'

const defaultLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

function ReplyTable(props) {
  const { disabled } = props;

  return (
    <TItem {...defaultLayout} {...props} label="回复" name="reply">
      <PopoverMultiTable
        title="添加"
        placement="right"
        showHeader
        disabled={disabled}
        columns={[
          {
            title: '文本',
            dataIndex: 'reply',
            
            width: '40%',
          },
          {
            title: '富文本',
            dataIndex: 'content',
            width: '50%',
            render: (text) => {
             return  text ? Base64.decodeBase64(text) : ''
            }
          },
        ]}
      >
        <TItem name="reply" label="文本" >
          <Input.TextArea />
        </TItem>
        <TItem name="content" label="富文本">
          <RichText base64 />
        </TItem>
      </PopoverMultiTable>
    </TItem>
  );
}

export default ReplyTable;
