import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Modal } from 'antd';
import { TItem } from '@/components/tis_ui';

function EditScene(props) {
  const { record, list, setList } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        title="编辑主题信息"
        visible={visible}
        maskClosable={false}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form
          initialValues={record}
          onFinish={vals => {
            const handledMatter = { ...record, ...vals };
            const currentMatters = list.map(item => ({ ...item }));
            setList(
              currentMatters.map(item => (item.key === record.key ? (item = handledMatter) : item)),
            );
            setVisible(false);
          }}
        >
          <TItem name="sceneName" label="主题名称">
            <Input disabled />
          </TItem>
          <TItem name="region" label="行政区划">
            <Input disabled />
          </TItem>
          <TItem name="fileAddr" label="解读文件地址">
            <Input />
          </TItem>
          <TItem name="display" label="显示状态">
            <Radio.Group disabled={!record.sceneStatus}>
              <Radio value={1}>显示</Radio>
              <Radio value={0}>隐藏</Radio>
            </Radio.Group>
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
      </Modal>
      <Button
        type="link"
        ghost={false}
        onClick={() => setVisible(!visible)}
        style={{ padding: 0, margin: 0 }}
      >
        编辑
      </Button>
    </>
  );
}

export default EditScene;
