import React, { Component } from 'react';
import { ModalForm, TButton, TItem } from '@/components/tis_ui';
import { Button, Row, message } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import AddWordsTable from './addWordsTable';
import { CORE } from '@/services/api';

class CreateRubbish extends Component {
  createForm = null;

  state = {};

  handelSubmit = async values => {
    const { handleCancel, reload } = this.props;
    await CORE.addBannedWordUsingPOST({ body: values });
    message.success('提交成功');
    handleCancel();
    reload({});
  };

  render() {
    const { handleCancel } = this.props;
    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible
        title="新增垃圾词"
        maskClosable={false}
        handleCancel={handleCancel}
        footer={
          <>
            <Button onClick={handleCancel}>取消</Button>
            <TButton.Button
              type="primary"
              ghost={false}
              onClick={() => {
                this.createForm.current.validateFields().then(vals => {
                  this.handelSubmit(vals);
                });
              }}
            >
              提交
              </TButton.Button>
          </>
        }
      >
        <Row style={{ flex: 'auto', minWidth: 0 }}>

          <TItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            name="typeCode"
            label="词条类型"
            rules={[{ required: true, message: '词条类型不能为空' }]}
          >
            <DictSelect
              dict="BWT1000"
              dictType="tree"
            />
          </TItem>

          <TItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            name="words"
            label="垃圾词条"
            rules={[{ required: true, message: '垃圾词条不能为空' }]}
          >
            <AddWordsTable />
          </TItem>
        </Row>
      </ModalForm>
    );
  }
}

export default CreateRubbish;
