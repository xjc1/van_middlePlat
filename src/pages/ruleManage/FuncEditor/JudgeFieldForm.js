import { EmptyFn, FormRules, ModalForm, TItem } from '@/components/tis_ui';
import React, { useEffect, useState } from 'react';
import { Button, Input, message, Radio, Select, Table, Divider } from 'antd';
import _ from 'lodash';
import { FuncSchemaInput } from '@/components/bussinessComponents';
import { METHODSCHEMAS, PORTRAIT } from '@/services/api';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';

const fileIDGenerator = new IDGenerator('field');

function JudgeFieldForm({
  isCheck = false,
  objectType,
  value = [],
  onChange = EmptyFn,
  tableType,
}) {
  let modalForm = null;
  const [visible, setVisible] = useState(false);
  const [formatType, setFormatType] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [funChildren, setFunChildren] = useState([]);
  const [formSchema, setFormSchema] = useState(null);
  const [fieldData, setFieldData] = useState([]);
  const [initValue, setInitValue] = useState({});

  useEffect(() => {
    findPreMethod().then(data => {
      handleData(data);
    });
  }, []);

  useEffect(() => {
    getTableList();
  }, [objectType]);

  function handleData(data) {
    const newValue = value.map(item => {
      const { relatedFunction = {}, dataFormat } = item;
      const { functionId } = relatedFunction;
      if (relatedFunction) {
        const { children = [] } = _.find(data, { name: dataFormat }) || {};
        const { cname } = _.find(children, { id: functionId }) || {};
        return { ...item, funcName: cname, functionId };
      }
      return item;
    });
    onChange(newValue);
    setFormatType(data);
  }

  async function findPreMethod() {
    const data = await METHODSCHEMAS.findPreHandleMethodSchemaUsingGET();
    return data;
  }

  async function getTableList() {
    const data = await PORTRAIT.getUsingTableListUsingGET({ params: { objectType, tableType } });
    setTableData(data);
  }

  function onSubmit() {
    modalForm.current
      .validateFields()
      .then(vals => {
        if (initValue.key) {
          const newValue = value.map(item => {
            if (item.key === initValue.key) {
              return { ...vals, key: initValue.key };
            }
            return item;
          });
          onChange(newValue);
        } else {
          const { tableName, field } = vals;
          const isExist = _.find(value, { tableName, field });
          if (isExist) {
            message.error(`已经添加过表名为[${tableName}],字段名为[${field}]的数据了`);
            return;
          }
          onChange([...value, { ...vals, key: fileIDGenerator.next() }]);
        }
        clearForm();
      })
      .catch(() => {
        message.error('请检查必填项是否全部填写完毕！！！');
      });
  }

  function clearForm() {
    setFunChildren([]);
    setFieldData([]);
    setFormSchema([]);
    setVisible(false);
    if (modalForm.current) {
      modalForm.current.resetFields();
    }
  }

  function edit(record) {
    const { type, tableName, functionId } = record;
    const funList = _.get(_.find(formatType, { key: type }), 'children', []);
    const tableObj = _.find(tableData, { enName: tableName }) || {};
    const { tableSchema = '[]' } = tableObj;
    const selectFuncObj = _.find(funList, { id: functionId }) || {};
    const { schema = [], cname } = selectFuncObj;
    setFormSchema(schema);
    setInitValue({ ...record, funcName: cname });
    setVisible(true);
    setFieldData(JSON.parse(tableSchema));
    setFunChildren(funList);
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
          setInitValue({});
        }}
        disabled={isCheck}
      >
        添加
      </Button>
      <Table
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            width: '15%',
          },
          {
            title: '表别名',
            dataIndex: 'tableAlias',
            width: '15%',
          },
          {
            title: '字段名',
            dataIndex: 'field',
            width: '10%',
          },
          {
            title: '字段操作',
            dataIndex: 'type',
            width: '15%',
            render: text => {
              const data = _.find(formatType, { key: text });
              return data ? data.name : text;
            },
          },
          {
            title: '取值',
            dataIndex: 'funcName',
            width: '15%',
          },
          {
            title: '样例数据',
            dataIndex: 'examples',
            width: '15%',
          },
          {
            title: '操作',
            dataIndex: 'key',
            width: '18%',
            render: (id, record) =>
              !isCheck && (
                <span>
                  <a onClick={() => edit(record)}>编辑</a>
                  <Divider type="vertical" />
                  <a onClick={() => onChange(value.filter(({ key }) => key !== id))}>删除</a>
                </span>
              ),
          },
        ]}
        dataSource={value}
        type="small"
        key="key"
      />
      <ModalForm
        title="判断字段管理"
        onForm={form => {
          modalForm = form;
        }}
        visible={visible}
        onOk={onSubmit}
        onCancel={() => clearForm()}
        initialValues={initValue}
        width="50%"
        destroyOnClose
      >
        <TItem name="type" label="格式" rules={[FormRules.required('必填')]}>
          <Radio.Group
            onChange={e => {
              const { value: val } = e.target;
              setFunChildren([]);
              setFormSchema(null);
              modalForm.current.setFieldsValue({ functionId: undefined });
              _.get(_.find(formatType, { key: val }), 'children', []);
              setFunChildren(_.get(_.find(formatType, { key: val }), 'children', []));
            }}
          >
            {formatType.map(({ key, name }) => (
              <Radio value={key} key={key}>
                {name}
              </Radio>
            ))}
          </Radio.Group>
        </TItem>
        <TItem name="name" label="名称">
          <Input />
        </TItem>
        <TItem name="tableAlias" label="表别名">
          <Select
            onChange={enName => {
              const tableObj = _.find(tableData, { enName }) || {};
              const { tableSchema = '[]', fullName } = tableObj;
              setFieldData(JSON.parse(tableSchema));
              modalForm.current.setFieldsValue({ tableName: fullName });
            }}
            allowClear
          >
            {tableData.map(({ enName, id }) => (
              <Select.Option value={enName} key={id}>
                {enName}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="field" label="字段名">
          <Select allowClear disabled={fieldData.length === 0}>
            {fieldData.map(({ field }) => (
              <Select.Option value={field} key={field}>
                {field}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="examples" label="样例数据">
          <Input />
        </TItem>
        <TItem style={{ display: 'none' }} name="tableName" label="表名">
          <Input />
        </TItem>
        <TItem name="functionId" label="取值">
          <Select
            disabled={funChildren.length === 0}
            onChange={id => {
              const selectFuncObj = _.find(funChildren, { id }) || {};
              const { schema = [], cname } = selectFuncObj;
              modalForm.current.setFieldsValue({ funcName: cname });
              setFormSchema(schema);
            }}
            allowClear
          >
            {funChildren.map(({ cname, id }) => (
              <Select.Option value={id} key={id}>
                {cname}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem style={{ display: 'none' }} name="funcName">
          <Input />
        </TItem>
        {formSchema && <FuncSchemaInput parentName={['relatedFunction']} schema={formSchema} />}
        <TItem name="dataFormat" label="多条数据取值" rules={[FormRules.required('必填')]}>
          <Radio.Group>
            <Radio value="one" key="one">
              任意一条
            </Radio>
            <Radio value="all" key="all">
              全部
            </Radio>
            <Radio value="latestOne" key="latestOne">
              最新更新的一条
            </Radio>
            <Radio value="count" key="count">
              计算总条数
            </Radio>
          </Radio.Group>
        </TItem>
      </ModalForm>
    </div>
  );
}
export default JudgeFieldForm;
