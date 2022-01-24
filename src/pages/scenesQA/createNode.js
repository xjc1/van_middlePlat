import React from 'react';
import { Form, Input, Modal, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormRules, TItem } from '@/components/tis_ui';

let i = 0;

function generateId() {
  i += 1;
  return i;
}

function setMaxI(nextId) {
  if (nextId >= i) {
    i = nextId;
  }
}

function createNode(fn) {
  const form = React.createRef();
  Modal.confirm({
    title: '节点基本信息配置',
    icon: <PlusOutlined />,
    content: (
      <Form ref={form}>
        <Row>
          <TItem label="名称" name="name" rules={[FormRules.required('节点名称必填')]}>
            <Input />
          </TItem>
        </Row>
      </Form>
    ),
    okText: '确定',
    okType: 'primary',
    cancelText: '取消',
    onOk(close) {
      const { current } = form;

      current.validateFields().then(vals => {
        fn(vals);
        close();
      });
    },
  });
}

export default createNode;
export { setMaxI, generateId };
