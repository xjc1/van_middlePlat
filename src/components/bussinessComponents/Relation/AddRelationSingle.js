import React, { useState } from 'react';
import { Col, Row, Button, Popover, Form, Input, message } from 'antd';
import TSearchSelector from "@/components/bussinessComponents/Dict/TSearchSelector";
import EmptyFn from "@/utils/EmptyFn";
import { FormRules } from "@/components/tis_ui";
import { MODULES } from "@/services/api";

function AddRelationSingle({
                             value,
                             onChange = EmptyFn,
                             type,
                             bulkAddType,
                             disabled,
                           }) {
  const [popVisible, setPopVisible] = useState(false);
  const [formRef] = Form.useForm();

  return (
    <>
      <Row>
        <Col span={18}>
          <TSearchSelector
            disabled={disabled}
            type={type}
            value={value}
            mode="single"
            onChange={onChange}
          />
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Popover title={false}
                   visible={popVisible}
                   content={<Form
                     form={formRef}
                     layout="inline"
                     onFinish={({ code }) => {
                       MODULES.getContentsByIdsUsingGET({
                         params: { contentType: bulkAddType, ids: code },
                       }).then(([piece]) => {
                         if (piece) {
                           const { id, name, regions } = piece;
                           onChange({
                             label: `${name}--${regions}`,
                             value: id,
                             key: id,
                             regions,
                           });
                         } else {
                           message.error('没有找到对应的数据.');
                         }
                         formRef.resetFields();
                         setPopVisible(false);
                       });
                     }}
                   >
                     <Form.Item name="code" label="编码" rules={[FormRules.required('必填')]}>
                       <Input />
                     </Form.Item>
                     <Form.Item>
                       <Button type="primary" htmlType="submit">
                         添加
                       </Button>
                     </Form.Item>
                   </Form>}>
            <Button type="primary"
                    disabled={disabled}
                    onClick={() => {
                      setPopVisible(true);
                    }}>通过编码添加</Button>
          </Popover>
        </Col>
      </Row>
    </>
  );
}

export default AddRelationSingle;
