/* eslint-disable import/no-extraneous-dependencies  */
import React from 'react';
import { Form } from 'antd';

const defaultLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

function CreateForm({ formList = [], className, layout = defaultLayout, ...others }) {
  return (
    <Form {...layout} className={className} {...others}>
      {formList.map(
        ({
          labelCol = defaultLayout.labelCol,
          wrapperCol = defaultLayout.wrapperCol,
          render,
          ...formOthers
        }) => (
          <Form.Item labelCol={labelCol} wrapperCol={wrapperCol} {...formOthers}>
            {render}
          </Form.Item>
        ),
      )}
    </Form>
  );
}

export default CreateForm;
