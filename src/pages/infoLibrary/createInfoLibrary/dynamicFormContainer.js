import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Modal, message, Form, Divider, Popover, Input } from 'antd';
import _ from 'lodash';
import { TItem, TButton, FormRules } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
// import DynamicForm from './dynamicForm';
import AddTag from './addTag';
import styles from './create.less';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
  col: 24,
};

function DynamicFormContainer({
  value = [],
  columns,
  inputItem,
  onChange = EmptyFn,
  reload = EmptyFn,
  cid,
  type,
  editVisible = true,
  mark = false,
  handleCancel,
}) {
  const [groupData, setGroupData] = useState(value);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {}, []);

  function handleDelete(index) {
    const newData = groupData.filter((it, ind) => ind !== index);
    setGroupData(newData);
    onChange(newData);
  }

  const handleValueChange = async (index, newData) => {
    const data = [...groupData];
    data[index] = newData;
    setGroupData(data);
    onChange(data);
  };

  function renderList(value = []) {
    return value.map((it, index) => {
      const { name, formItem = [] } = it;
      return (
        <Col span={24}>
          <TItem
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
            col={24}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <AddTag
              value={formItem}
              columns={columns}
              inputItem={inputItem}
              headClass={styles.flexEndBox}
              head={
                <div style={{ marginRight: 'auto' }}>
                  <span>表格名称：{name}</span>
                </div>
              }
              extra={
                <>
                  <Divider type="vertical" style={{ height: 'inherit' }} />
                  <Button
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    删除
                  </Button>
                </>
              }
              onChange={vals => handleValueChange(index, { name, formItem: vals })}
            />
          </TItem>
        </Col>
      );
    });
  }

  function addGroup(vals) {
    const { name } = vals;
    const newData = groupData.concat({ name });
    setGroupData(newData);
    onChange(newData);
  }

  return (
    <Row>
      {renderList(groupData)}
      <Col span={24} style={{ justifyContent: 'center', display: 'flex' }}>
        {groupData.length < 10 && (
          <Popover
            title="添加动态表格"
            visible={modalVisible}
            onVisibleChange={nextVisible => {
              setModalVisible(nextVisible);
              if (!nextVisible) {
                form.resetFields();
              }
            }}
            content={
              <div style={{ width: 600 }}>
                <Form
                  form={form}
                  // initialValues={initialValues}
                  onFinish={vals => {
                    addGroup(vals);
                    setModalVisible(false);
                  }}
                >
                  <TItem name="name" label="名称(中文)" rules={[FormRules.required('必填')]}>
                    <Input />
                  </TItem>
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button
                      onClick={() => {
                        form.resetFields();
                        setModalVisible(false);
                      }}
                    >
                      取消
                    </Button>
                    <Divider type="vertical" />
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                  </div>
                </Form>
              </div>
            }
            trigger="click"
          >
            <Button>添加表格</Button>
          </Popover>
        )}
      </Col>
    </Row>
  );
}

export default DynamicFormContainer;
