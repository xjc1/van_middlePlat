import React, { useState } from 'react';
import { Button, Col, Row, Table, Modal, Space, Form } from 'antd';
import _ from 'lodash';
import ModalForm from './ModalForm';
import EmptyFn from '../utils/EmptyFn';

function FormItemWithTable({
  title = '请选择',
  btnText = '添加',
  formInitialValue = {},
  value = [],
  defaultPageSize = 4,
  children,
  columns = [],
  showHeader = true,
  onChange = EmptyFn,
  disabled,
  width = '65%',
  loading = false,
  editAble = true,
  deleteAble = true,
}) {
  const [visible, setVisible] = useState(false);

  let modalForm = null;

  function handleSubmit() {
    modalForm.current.validateFields().then(vals => {
      onChange([...value, { ...vals, key: value.length }]);
      modalForm.current.resetFields();
      setVisible(false);
    });
  }

  function handleCancel() {
    modalForm.current.resetFields();
    setVisible(false);
  }

  return (
    <Row>
      <Col>
        {!disabled && editAble && (
          <Button type="primary" onClick={() => setVisible(true)}>
            {btnText}
          </Button>
        )}
        <ModalForm
          title={title}
          onForm={form => {
            modalForm = form;
          }}
          visible={visible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          initialValues={formInitialValue}
          width={width}
        >
          {children}
        </ModalForm>
      </Col>
      <Col span={24}>
        <Table
          bordered
          showHeader={showHeader}
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={_.filter(
            [
              ...columns,
              !disabled && {
                title: '操作',
                align: 'center',
                width: 150,
                render: (text, record) => (
                  <Space>
                    <span>
                      <Button
                        type="link"
                        disabled={!editAble}
                        onClick={() => {
                          const formRef = React.createRef();
                          Modal.confirm({
                            title: '编辑',
                            width,
                            content: (
                              <div>
                                <Form ref={formRef} initialValues={record}>
                                  {children}
                                </Form>
                              </div>
                            ),
                            onOk() {
                              formRef.current.validateFields().then(vals => {
                                const index = value.findIndex(({ key }) => key === record.key);
                                value.splice(index, 1, { ...vals, key: record.key });
                                onChange([...value]);
                              });
                            },
                          });
                        }}
                      >
                        编辑
                      </Button>
                    </span>
                    <span>
                      <Button
                        type="link"
                        disabled={!deleteAble}
                        onClick={() => {
                          onChange(_.filter(value, ({ key }) => key !== record.key));
                        }}
                      >
                        删除
                      </Button>
                    </span>
                  </Space>
                ),
              },
            ],
            column => column,
          )}
          dataSource={value}
          size="small"
          rowKey="key"
          loading={loading}
        />
      </Col>
    </Row>
  );
}

export default FormItemWithTable;
