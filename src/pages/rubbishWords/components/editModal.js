import React, { Component } from 'react';
import { ModalForm, TButton, TItem } from '@/components/tis_ui';
import { Button, Row, Input, message } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import { BANNEDWORD } from '@/services/api';

class CreateRubbish extends Component {
  createForm = null;

  state = {};

  handelSubmit = async values => {
    const { handleCancel, reload, initialValues } = this.props;
    const { id } = initialValues;
    await BANNEDWORD.updateBannedWordUsingPOST({ body: { ...values, id } });
    message.success('提交成功');
    handleCancel();
    reload({});
  };

  render() {
    const { handleCancel, initialValues = {}, editAble = false } = this.props;
    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible
        title={`${editAble ? '编辑' : '查看'}垃圾词`}
        maskClosable={false}
        initialValues={initialValues}
        handleCancel={handleCancel}
        footer={
          <>
            <Button onClick={handleCancel}>取消</Button>
            {editAble && (
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
            )}
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
            <DictSelect disabled={!editAble} dict="BWT1000" dictType="tree" />
          </TItem>

          <TItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            name="word"
            label="垃圾词条"
            rules={[{ required: true, message: '垃圾词条' }]}
          >
            <Input disabled={!editAble} />
          </TItem>
        </Row>
      </ModalForm>
    );
  }
}

export default CreateRubbish;
