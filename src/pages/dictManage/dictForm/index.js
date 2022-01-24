import React from 'react';
import { Form, Modal, Button } from 'antd';
import { pageStatus as pageEnum } from '@/utils/constantEnum';
import DictInfo from './dictInfo';

function DictFormModal({ width = 900, onFinish, onCancel, modalConfig, ...others }) {
  const [form] = Form.useForm();
  const { initData, pageStatus } = modalConfig;
  const { rootId, id: recordId } = initData || {};
  // 父级字典显示编辑按钮
  const lazyTreeConfig = {
    showEditButton: pageStatus === pageEnum.edit,
    showInputItem: pageStatus !== pageEnum.new,
    rootId,
    recordId,
  };

  return (
    <Modal
      visible
      title={`${pageEnum.$v_names[pageStatus]}字典`}
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
                  onFinish(vals, recordId, rootId);
                });
              }}
            >
              提交
            </Button>
          )}
        </div>
      }
      {...others}
    >
      <Form form={form} initialValues={initData}>
        <DictInfo lazyTreeConfig={lazyTreeConfig} rootId={rootId} recordId = {recordId} editAble={pageStatus !== pageEnum.view} />
      </Form>
    </Modal>
  );
}

export default DictFormModal;
