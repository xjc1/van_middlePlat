import React from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

function KVItems({ name }) {
  return (
    <div>
      <Row>
        <Col span={12} style={{ textAlign: 'center' }}>
          显示名称
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          值
        </Col>
      </Row>
      {
        <Form.List name={name}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, fieldKey, name: fieldName, ...others }) => {
                return (
                  <Row key={key}>
                    <Col span={10}>
                      <Form.Item
                        {...others}
                        name={[fieldName, 'label']}
                        fieldKey={[fieldKey, 'label']}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{ textAlign: 'center' }}>
                      :
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        {...others}
                        name={[fieldName, 'value']}
                        fieldKey={[fieldKey, 'value']}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={2} style={{ textAlign: 'center' }}>
                      <CloseOutlined
                        style={{ color: '#ff4d4f' }}
                        onClick={() => remove(fieldName)}
                      />
                    </Col>
                  </Row>
                );
              })}
              <Button onClick={() => add()}>添加</Button>
            </>
          )}
        </Form.List>
      }
    </div>
  );
}

export default KVItems;
