import React, { useState } from 'react';
import { Popover, Form, Input, Button } from 'antd';
import { TItem, RichText } from '@/components/tis_ui';

function EditPopver(props) {
  const { record, index, setValue, disabled = false } = props;
  const [visible, setVisible] = useState(false);

  function handleVisibleChange(visible) {
    if(disabled) {
      return;
    }
    setVisible(visible);
  }

  return (
    <Popover
      title="编辑"
      disabled={disabled}
      visible={visible}
      placement="left"
      onVisibleChange={handleVisibleChange}
      content={
        <div style={{ width: 600 }}>
          <Form
            initialValues={record}
            onFinish={vals => {
              const newValue = { ...vals };
              setValue(index, newValue)
              setVisible(false)
            }}
          >
               <TItem name="reply" label="文本" >
          <Input.TextArea />
        </TItem>
        <TItem name="content" label="富文本">
          <RichText base64 />
        </TItem>
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button  type="primary" htmlType="submit">
                确定
              </Button>
            </div>
          </Form>
        </div>
      }
      trigger="click"
    >
      <Button disabled={disabled} type="link" ghost={false} style={{padding: 0, margin: 0}}>
        编辑
      </Button>
    </Popover>
  )
}

export default EditPopver;