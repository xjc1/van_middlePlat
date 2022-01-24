/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState, useEffect, useRef, PureComponent } from 'react';
import { Table, Input, Popconfirm, Form, Button } from 'antd';
import styles from './index.less';

const EditableContext = React.createContext(null);

const defaultOperationRender = ({ initialOperation }) => initialOperation;

function EditableRow({ index, ...props }) {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
}

function EditableCell({ title, editable, children, dataIndex, record, handleSave, ...restProps }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('字段保存失败:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} 必填.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className={styles.editableCellValueWrap}
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
}

class Index extends PureComponent {
  handleDelete = id => {
    const { changeDataSource, dataSource } = this.props;
    changeDataSource(dataSource.filter(item => item.id !== id));
  };

  handleSave = row => {
    const { dataSource, changeDataSource } = this.props;
    const newData = dataSource.map(item => {
      if (item.id === row.id) {
        return { ...item, ...row };
      }
      return item;
    });
    changeDataSource(newData);
  };

  render() {
    const {
      dataSource,
      columns: baseColumns,
      disabled,
      operateStyle = { width: 200 },
      renderOperations = defaultOperationRender,
      ...others
    } = this.props;

    const operateColumns = [
      ...baseColumns,
      {
        title: '操作',
        dataIndex: 'id',
        ...operateStyle,
        render: (text, record) =>
          !disabled &&
          renderOperations({
            text,
            record,
            initialOperation: (
              <Popconfirm title="确认要删除么?" onConfirm={() => this.handleDelete(record.id)}>
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>
            ),
          }),
      },
    ];

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = operateColumns.map(col => {
      if (!col.editable || disabled) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <Table
        components={components}
        rowClassName={styles.editableRow}
        bordered
        dataSource={dataSource}
        columns={columns}
        {...others}
      />
    );
  }
}

export default Index;
