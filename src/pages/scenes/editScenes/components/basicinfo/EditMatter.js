import React, { useState } from 'react';
import { Popover, Form, Input, Button } from 'antd';
import { TItem } from '@/components/tis_ui';

function EditMatter(props) {
  const { record, list, setList } = props;
  const [visible, setVisible] = useState(false);

  function handleVisibleChange(nextStatus) {
    setVisible(nextStatus);
  }

  return (
    <Popover
      title="编辑事项信息"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      content={
        <div style={{ width: 400 }}>
          <Form
            initialValues={record}
            onFinish={values => {
              const handledMatter = { ...record, ...values };
              const currentMatters = list.map(item => ({ ...item }));
              setList(
                currentMatters
                  .map(item => (item.key === record.key ? handledMatter : item))
                  .sort((a, b) => a.no - b.no),
              );
              setVisible(false);
            }}
          >
            <TItem name="label" label="事项名称">
              <Input disabled />
            </TItem>
            <TItem name="category" label="分类">
              <Input />
            </TItem>
            <TItem name="no" label="序号">
              <Input type="number" min={1} />
            </TItem>
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </div>
          </Form>
        </div>
      }
      trigger="click"
    >
      <Button type="link" ghost={false} style={{ padding: 0, margin: 0 }}>
        编辑
      </Button>
    </Popover>
  );
}

export default EditMatter;
