import React from 'react';
import { Row, Input, Select } from 'antd';
import { EmptyFn, FormRules, ModalForm, TButton, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { appUserType } from '@/utils/constantEnum';

function DialogForm({
  title,
  item = {},
  isCreate = false,
  disabled = false,
  onClose = EmptyFn,
  onSubmit = EmptyFn,
}) {
  let formRef = null;

  return (
    <ModalForm
      title={isCreate ? `创建${title}` : `编辑${title}`}
      visible
      onCancel={onClose}
      initialValues={item}
      width="45%"
      footer={
        <>
          <TButton.Button onClick={onClose}>取消</TButton.Button>
          {!disabled && (
            <TButton.Button
              type="primary"
              onClick={() => {
                formRef.current.validateFields().then(vals => {
                  const { clientType = [] } = vals;
                  onSubmit({
                    ...vals,
                    clientType: _.map(clientType, Number),
                  });
                });
              }}
            >
              确定
            </TButton.Button>
          )}
        </>
      }
      onForm={form => {
        formRef = form;
      }}
    >
      <Row>
        <TItem name="name" label="对话名称" rules={[FormRules.required()]}>
          <Input disabled={disabled} />
        </TItem>
        <TItem name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" multiple disabled={disabled} />
        </TItem>
        <TItem name="object" label="对象类型">
          <Select disabled={disabled}>
            {_.map(appUserType, (v, k) => (
              <Select.Option key={k} value={v}>
                {appUserType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="regions" label="行政区划">
          <DictSelect
            dict="SH00XZQH"
            disabled={disabled}
            dictType="tree"
            allowClear
            placeholder="请选择行政区划"
          />
        </TItem>
        <TItem name="attributionDepartment" label="归属部门">
          <DictSelect
            dict="SHGSBMSH"
            disabled={disabled}
            dictType="tree"
            showSearch
            treeNodeFilterProp="title"
            multiple
          />
        </TItem>
      </Row>
    </ModalForm>
  );
}

export default DialogForm;
