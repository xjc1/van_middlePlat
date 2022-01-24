import { Button, Row, Input, Table, Form, Modal, message, List, Divider } from "antd";
import { TItem, utils } from '@/components/tis_ui';
import React, {useState} from "react";
import _ from 'lodash'
const {IDGenerator} = utils;
const deptIDGenerator = new IDGenerator("dept");

function acceptDepartment({ value=[], onChange, disabled }) {

  const [visible, setVisible] = useState(false);
  const [phoneForm] = Form.useForm();
  const [phoneList, setPhoneList] = useState([]);
  const [initialValues, setInitialValues] = useState({})

  function addPhone() {
    const vals = phoneForm.getFieldsValue();
    if(vals.phone && vals.phone !== '') {
      setPhoneList([...phoneList, { name: vals.name, phone: vals.phone, extension: vals.extension, key:deptIDGenerator.next() }]);
      phoneForm.setFieldsValue({
        extension: undefined,
        name: undefined,
        phone: undefined
      });
    }else{
      message.info('电话号码不能为空')
    }
  }

  function addDept() {
    phoneForm.validateFields().then((vals)=>{
      if( initialValues.key ) {
        const index = _.findIndex(value, { key: initialValues.key })
        value.splice( index, 1, { deptName:vals.deptName, address:vals.address,
          contacts:phoneList, key:deptIDGenerator.next()})
        onChange([...value])
      } else {
        onChange([...value, { deptName:vals.deptName, address:vals.address,
          contacts:phoneList, key:deptIDGenerator.next()}]);
      }
      setVisible(false)
    })
  }

  function editDept(id) {
    const deptInfo = _.find(value, { key: id })
    if(deptInfo){
      setInitialValues(deptInfo);
      setPhoneList(deptInfo.contacts || [])
    }
    setVisible(true)
  }

  return(
    <div>
      <TItem>
        <Button
          onClick={()=>{
            setVisible(true);
            setPhoneList([]);
            phoneForm.resetFields();
          }}
          disabled={disabled}
        >
          添加
        </Button>
      </TItem>
      <Row>
        <TItem wrapperCol={{ span: 24 }} >
          <Table
            columns={[
              {
                title: '部门',
                dataIndex: 'deptName',
              },
              {
                title: '地址',
                dataIndex: 'address',
              },
              {
                title: '联系方式',
                dataIndex: 'contacts',
                render: (text=[] )=> (
                  <List
                    dataSource={text}
                    renderItem={item => (
                      <List.Item>
                        {item.name && item.name + ':'} {item.phone}
                      </List.Item>
                    )}
                  />
                )
              },
              {
                title: '操作',
                dataIndex: 'key',
                render: delKey=>(
                  <>
                    <a
                      onClick={()=>editDept(delKey)}
                      disabled={disabled}
                    >
                      编辑
                    </a>
                    <Divider type='vertical'/>
                    <a
                      onClick={()=>onChange(value.filter(({key})=>key !== delKey ))}
                      disabled={disabled}
                    >
                      删除
                    </a>
                  </>
                )
              },
            ]}
            pagination={{defaultPageSize:5}}
            dataSource={value}
            rowKey="key"
          />
        </TItem>
      </Row>
      <Modal
        visible={visible}
        title={ initialValues.key? '编辑受理部门' : '添加受理部门' }
        destroyOnClose
        maskClosable={false}
        width="50%"
        onCancel={()=>setVisible(false)}
        onOk={ addDept }
        okText='提交'
      >
        <Form form={phoneForm} initialValues={initialValues}>
          <TItem
            name="deptName"
            label="部门名称"
            labelCol={{ span:3 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: true, message: '部门名称不能为空!' }]}
          >
            <Input placeholder="请输入部门"/>
          </TItem>
          <TItem
            name="address"
            label="地址"
            wrapperCol={{ span: 20 }}
            labelCol={{ span:3 }}
          >
            <Input placeholder="请输入地址"/>
          </TItem>
          <Row>
            <TItem labelCol={{ span:8 }} wrapperCol={{ span: 14 }}  col={9} name='name' label="联系方式">
              <Input placeholder="请输入名称"/>
            </TItem>
            <TItem name="phone" col={6} wrapperCol={{ span: 20 }}>
              <Input placeholder="请输入电话号码"/>
            </TItem>
            <TItem name="extension" col={6} wrapperCol={{ span: 20 }}>
              <Input placeholder="请输入分机号"/>
            </TItem>
            <TItem col={3}>
              <Button onClick={addPhone}>添加</Button>
            </TItem>
          </Row>
          <TItem wrapperCol={{ span: 24 }} >
            <Table
              columns={[
                {
                  title: '名称',
                  dataIndex: 'name',
                },
                {
                  title: '电话号码',
                  dataIndex: 'phone',
                },
                {
                  title: '分机号',
                  dataIndex: 'extension',
                },
                {
                  title: '操作',
                  dataIndex: 'key',
                  render: delKey=>(
                    <a
                      onClick={()=>setPhoneList(phoneList.filter(({key})=>key !== delKey ))}
                    >
                      删除
                    </a>
                  )
                },
              ]}
              pagination={{defaultPageSize:5}}
              dataSource={phoneList}
              rowKey="key"
            />
          </TItem>
        </Form>
      </Modal>
    </div>
  )
}

export default acceptDepartment
