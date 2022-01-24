import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { modulesContentType } from '@/utils/constantEnum';
import _ from 'lodash';
import AddRelations from '@/components/bussinessComponents/Relation/AddRelations';
import { EmptyFn, FormRules, ModalForm, TItem, TSelect } from '@/components/tis_ui';
import { modulesContentTypeMapper, commonFormLayout as layout } from '../../utils';

function ContentListModal({ title = '添加置顶内容', disabled, onOk = EmptyFn, ...others }) {
  const [contentType, setContentType] = useState(modulesContentType.SCENE);
  let formRef = null;

  function handleContentTypeChange(nextType) {
    setContentType(nextType);
    formRef.current.setFieldsValue({ list: [] });
  }

  function handleSubmit() {
    formRef.current.validateFields().then(val => {
      const { contentType: currentType, list = [] } = val;
      const newVal = list.map(({ key, label, ...item }) => ({
        ...item,
        id: key,
        contentType: currentType,
        name: label,
      }));
      onOk(newVal);
    });
  }

  return (
    <ModalForm
      visible
      title={title}
      onForm={form => {
        formRef = form;
      }}
      initialValues={{
        contentType: modulesContentType.SCENE,
      }}
      onOk={handleSubmit}
      width="65%"
      {...others}
    >
      <TItem name="contentType" label="内容类型" {...layout}>
        <TSelect onChange={type => handleContentTypeChange(type)} disabled={disabled}>
          {_.map(modulesContentType, (v, k) => (
            <TSelect.Option value={v} key={k}>
              {modulesContentType.$names[k]}
            </TSelect.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem
        key={contentType}
        name="list"
        label={modulesContentType.$v_names[contentType]}
        rules={[FormRules.required('不能为空')]}
        {...layout}
      >
        <AddRelations
          type={modulesContentTypeMapper[contentType]}
          bulkAddType={contentType}
          extraColumn={[
            {
              title: '区划',
              dataIndex: 'regions',
              ellipsis: true,
              render: regions => (
                <Tooltip title={regions} placement="topLeft">
                  {regions}
                </Tooltip>
              ),
            },
          ]}
          showBulkAdd
          tableTitle={`${modulesContentType.$v_names[contentType]}名`}
          disabled={disabled}
        />
      </TItem>
    </ModalForm>
  );
}

export default ContentListModal;
