import React, { useState, useEffect } from 'react';
import { Table, Select, Button, Divider, Tooltip, Typography, message } from 'antd';
import _ from 'lodash';
import { terminalType } from '@/utils/constantEnum';
import { ModalForm, TItem, FormRules, RichText, utils, EmptyFn } from '@/components/tis_ui';
import Styles from './AddFillNotice.less';

const { Option } = Select;
const { Base64 } = utils;

const defaultPageSize = 5;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function AddFillNotice({ value = [], onChange = EmptyFn, sceneForm, disabled }) {
  const [record, setRecord] = useState(null);
  const [limitTerminalType, setLimitTerminalType] = useState([]);

  let fillForm = null;

  useEffect(() => {
    const clientType = sceneForm.getFieldValue('clientType') || _.map(terminalType, val => val);
    setLimitTerminalType(clientType);
  }, []);

  function handleAddBtn() {
    setLimitTerminalType(sceneForm.getFieldValue('clientType'));
    setRecord({});
  }

  function handleOk() {
    fillForm.current.validateFields().then(vals => {
      if (record.key) {
        const current = JSON.parse(JSON.stringify(value));
        onChange(
          current.map(item => {
            if (item.key === record.key) {
              return { ...item, ...vals };
            }
            return item;
          }),
        );
      } else {
        let isUniq = true;
        value.forEach(({ clientType }) => {
          const exist = _.intersection(clientType, vals.clientType);
          if (exist.length) {
            exist.forEach(item => {
              message.error(`已经添加过${terminalType.$v_names[item]}类型，请勿重复添加`);
            });
            isUniq = false;
          }
        });
        if (!isUniq) {
          return;
        }
        onChange([...value, { ...vals, key: Date.now() }]);
      }
      fillForm.current.resetFields();
      setRecord(null);
    });
  }

  function handleCancel() {
    setRecord(null);
    fillForm.current.resetFields();
  }

  return (
    <>
      {!disabled && (
        <Button
          type="primary"
          onClick={handleAddBtn}
          style={{ marginBottom: '20px' }}
          disabled={disabled}
        >
          添加
        </Button>
      )}
      {record && (
        <ModalForm
          onForm={form => {
            fillForm = form;
          }}
          title={record.key ? '编辑填报须知' : '新增填报须知'}
          visible
          maskClosable={false}
          handleCancel={handleCancel}
          onOk={handleOk}
          okText={record.key ? '保存' : '添加'}
          initialValues={record}
        >
          <TItem
            name="clientType"
            label="终端类型"
            rules={[FormRules.required('必填')]}
            {...layout}
          >
            <Select mode="multiple" getPopupContainer={triggerNode => triggerNode.parentNode}>
              {limitTerminalType.map(item => (
                <Option key={item} value={item}>
                  {terminalType.$v_names[item]}
                </Option>
              ))}
            </Select>
          </TItem>
          <TItem name="content" label="填报内容" rules={[FormRules.required('必填')]} {...layout}>
            <RichText base64 />
          </TItem>
        </ModalForm>
      )}
      <Table
        bordered
        pagination={{
          defaultPageSize,
        }}
        size="small"
        columns={[
          {
            title: '终端类型',
            dataIndex: 'clientType',
            width: '20%',
            render: types => {
              return types.map(item => terminalType.$v_names[item]).join(' | ');
            },
          },
          {
            title: '填报须知内容',
            dataIndex: 'content',
            className: Styles.addFillNoticeFixedColumn,
            width: '60%',
            render: content => {
              const cnt = Base64.decodeBase64(content);
              return (
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                    ellipsis: true,
                  }}
                >
                  <Tooltip
                    title={cnt}
                    overlayStyle={{
                      maxHeight: '300px',
                      overflow: 'auto',
                    }}
                  >
                    {cnt}
                  </Tooltip>
                </Typography.Paragraph>
              );
            },
          },
          {
            title: '操作',
            align: 'center',
            width: 120,
            render: notice => {
              return (
                <span style={{ display: disabled ? 'none' : 'block' }}>
                  <a onClick={() => setRecord(notice)}>编辑</a>
                  <Divider type="vertical" />
                  <a
                    onClick={() => {
                      onChange(value.filter(({ key }) => key !== notice.key));
                    }}
                  >
                    删除
                  </a>
                </span>
              );
            },
          },
        ]}
        dataSource={value}
      />
    </>
  );
}

export default AddFillNotice;
