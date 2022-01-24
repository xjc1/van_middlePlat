import React from 'react';
import { Form, Modal, Button, message } from 'antd';
import { pageStatus as pageEnum } from '@/utils/constantEnum';
import { SCHEDULER } from '@/services/api';
import TaskInfo from './TaskInfo';

function TaskFormModal({ width = 900, onCancel, modalConfig, reload, ...others }) {
  const [form] = Form.useForm();
  const { initData = { status: 0 }, pageStatus } = modalConfig;
  // 不是查看状态则说明可编辑
  const editAble = pageStatus !== pageEnum.view;
  const { id: recordId } = initData || {};

  function onFinish(vals, updateId) {
    // 有ID则走更新流程
    if (updateId) {
      SCHEDULER.updateUsingPOST({ body: { ...vals, id: updateId } }).then(() => {
        message.success('更新成功');
        onCancel();
        reload({});
      });
    } else {
      SCHEDULER.createUsingPOST({ body: vals }).then(() => {
        message.success('新增成功');
        onCancel();
        reload({});
      });
    }
  }
  return (
    <Modal
      visible
      title={`${pageEnum.$v_names[pageStatus]}任务`}
      destroyOnClose
      maskClosable={false}
      onCancel={onCancel}
      width={width}
      bodyStyle={{
        background: '#f5f5f5',
        padding: '10px',
      }}
      footer={
        <div>
          <Button onClick={onCancel}>取消</Button>
          {pageStatus !== pageEnum.view && (
            <Button
              type="primary"
              onClick={() => {
                form.validateFields().then(vals => {
                  onFinish(vals, recordId);
                });
              }}
            >
              提交
            </Button>
          )}
        </div>
      }
    >
      <Form form={form} initialValues={initData}>
        <TaskInfo editAble={editAble} {...others} />
      </Form>
    </Modal>
  );
}

export default TaskFormModal;
