import React, { useState } from 'react';
import { Alert, Tooltip } from 'antd';
import { modulesContentType, modulesSpecialType } from '@/utils/constantEnum';
import _ from 'lodash';
import AddRelations from '@/components/bussinessComponents/Relation/AddRelations';
import { EmptyFn, FormRules, ModalForm, TItem, TSelect } from '@/components/tis_ui';
import { modulesContentTypeMapper, commonFormLayout as layout } from '../../../utils';

function ContentListModal({
  title = '添加内容',
  initialValues = {},
  disabled,
  onOk = EmptyFn,
  ...others
}) {
  const [contentType, setContentType] = useState(() => {
    const { contentType: initType = modulesContentType.SCENE } = initialValues;
    return initType;
  });
  const [isEdit] = useState(initialValues.hasOwnProperty('contentType'));
  let formRef = null;

  function handleContentTypeChange(nextType) {
    setContentType(nextType);
    formRef.current.setFieldsValue({ list: [] });
  }

  function handleSubmit() {
    formRef.current.validateFields().then(val => {
      onOk({ ...initialValues, ...val });
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
        specialType: modulesSpecialType.COMMON,
        ...initialValues,
      }}
      onOk={handleSubmit}
      width="65%"
      {...others}
    >
      {!isEdit && (
        <Alert
          style={{ textAlign: 'center', marginBottom: 10 }}
          message="注意：再次修改内容类型会导致已添加的内容被重置清空！"
          type="warning"
        />
      )}
      <TItem name="specialType" label="特殊列表" {...layout}>
        <TSelect disabled={disabled || isEdit}>
          {_.map(_.omit(modulesSpecialType, 'TOP'), (v, k) => (
            <TSelect.Option value={v} key={k}>
              {modulesSpecialType.$names[k]}
            </TSelect.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="contentType" label="内容类型" {...layout}>
        <TSelect onChange={type => handleContentTypeChange(type)} disabled={disabled || isEdit}>
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
