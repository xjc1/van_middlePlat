import React from 'react';
import { Modal, Form, Divider } from 'antd';
import { EmptyFn, TItem, CodeEditor } from '@/components/tis_ui';
import Styles from './NewFormModal.less';

const ctxDesctiption = `
动态表单的运行可能需要依赖在内部组件间共享的数据, 
这些数据可能来自上一个流程传入,
也可能是在前置接口返回数据中获取.
在配置表单的时候我们需要申明这些数据的命名和默认值. 
在这里请申明一个json来描述.
在后面的配置中,我们可以对$ctx对象来读取或者设置这些数据. 
`;

function NewFormModal({
  title,
  children,
  formEditorData,
  onForm,
  onOk = EmptyFn,
  onCancel = EmptyFn,
}) {
  const [formRef] = Form.useForm();

  const {
    context = `{
  

  
}`,
    businessId,
    ...others
  } = formEditorData;

  onForm(formRef);
  return (
    <Modal
      bodyStyle={{ padding: 0 }}
      title={title}
      visible
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      width="70%"
    >
      <Form
        initialValues={{
          ...others,
          context,
          sceneId: [businessId],
        }}
        form={formRef}
      >
        <div className={Styles.newFormModal}>
          <div className={Styles.newFormModalLeft}>
            <Divider>基础配置</Divider>
            {children}
          </div>
          <div className={Styles.newFormModalRight}>
            <Divider orientation="right">{TItem.getLabel('上下文配置', ctxDesctiption)}</Divider>
            <TItem name="context" labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
              <CodeEditor mode="json" name="CONTEXT_SETTING" height="300px" style={{ flex: 1 }} />
            </TItem>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default NewFormModal;
