import React, { Component } from 'react';
import { ModalForm, TButton, TItem } from '@/components/tis_ui';
import { Button, Row, Input, message } from 'antd';
import { DIMENSION } from '@/services/api';
import AddTag from './addTag';

class CreateDimension extends Component {
  createForm = null;

  state = {};

  handelSubmit = async values => {
    const { handleCancel, initData, reload } = this.props;
    const { id } = initData || {};
    // 如果有ID则走更新流程
    if (id) {
      const updateData = Object.assign({ ...values }, { id });
      await DIMENSION.updateDimensionUsingPOST({ body: updateData });
    } else {
      await DIMENSION.addOneDimensionUsingPOST({ body: values });
    }

    message.success('提交成功');
    handleCancel();
    reload();
  };

  render() {
    const { handleCancel, initData, editVisible } = this.props;
    const { id } = initData || {};
    return (
      <ModalForm
        onForm={form => {
          this.createForm = form;
        }}
        visible
        title="维度维护"
        maskClosable={false}
        handleCancel={handleCancel}
        initialValues={initData}
        footer={
          <>
            <Button onClick={handleCancel}>取消</Button>
            {editVisible && (
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
            name="dimensionUnique"
            label="维度ID"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[a-z]{3}$/, 'g'),
                message: '维度ID为三个小写字母',
              },
            ]}
          >
            <Input disabled={!!id} placeholder="维度ID为三个小写字母" />
          </TItem>

          <TItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            name="name"
            label="维度名称"
            rules={[{ required: true, message: '维度名称不能为空!' }]}
          >
            <Input disabled={!editVisible} />
          </TItem>

          <TItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            name="leadingWords"
            label="多选项引导语"
            rules={[{ required: true, message: '多选项引导语不能为空!' }]}
          >
            <Input disabled={!editVisible} />
          </TItem>
          <TItem
            name="labels"
            label="维度标签"
            rules={[{ required: true, message: '维度标签不能为空!' }]}
          >
            <AddTag editVisible={editVisible} />
          </TItem>
        </Row>
      </ModalForm>
    );
  }
}

export default CreateDimension;
