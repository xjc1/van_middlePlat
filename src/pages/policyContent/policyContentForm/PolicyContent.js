import React from 'react';
import { TabForm, RichText, TItem, TFormList } from '@/components/tis_ui';
import { Input } from 'antd';
import { FileUpload, TerminalCoverConfig } from '@/components/bussinessComponents';

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
};

function PolicyContent(props) {
  const { disabled, valibleClientType = [], ...others } = props;

  return (
    <TabForm.Tab {...others}>
      <TItem name="coverImages" label="终端封面" {...layout}>
        <TerminalCoverConfig valibleItems={valibleClientType} disabled={disabled} />
      </TItem>
      <TItem label="政策要点" name="mainPoint" {...layout}>
        <Input />
      </TItem>
      <TItem
        style={{ display: 'flex', justifyContent: 'center' }}
        name="content"
        label="政策正文"
        {...layout}
      >
        <RichText base64 readOnly={disabled} />
      </TItem>
      <TFormList name="files" addText="新增相关附件" {...layout}>
        {({ name, ...otherAttr }) => {
          return (
            <TItem {...otherAttr} name={name} label="附件">
              <FileUpload download allowClear maxFileSize={100} />
            </TItem>
          );
        }}
      </TFormList>
    </TabForm.Tab>
  );
}

export default PolicyContent;
