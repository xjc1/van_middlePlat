import React, { useState } from 'react';
import { connect } from 'dva';
import { Form, Input, message, Radio } from 'antd';
import _ from 'lodash';
import { configUsed } from '@/utils/constantEnum';
import { TButton, TItem, UploadImage } from '@/components/tis_ui';
import { SYS } from '@/services/api';
import styles from '../index.less';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const RADIO_GROUP = ['theme_preview', 'loginValidation'];

const IMAGE_GROUP = ['loginBackground'];

function Index(props) {
  const [submitting, setSubmitting] = useState(false);
  const [isValueChanged, setIsValueChanged] = useState(false);

  const { config = {}, dispatch } = props;
  const { code, name, nextLayer = [] } = config;

  const initialValues = {
    code,
    name,
    ...nextLayer.reduce((prev, field) => {
      const { code: nextCode, value } = field;
      return { ...prev, [nextCode]: value };
    }, {}),
  };

  function getFields() {
    return nextLayer.map((item = {}) => {
      const { code: fieldCode, name: fieldName } = item;
      const field = {
        name: fieldCode,
        label: fieldName,
      };
      // 判断是否在单选里的
      if (RADIO_GROUP.indexOf(fieldCode) > -1) {
        return {
          ...field,
          children: (
            <Radio.Group>
              {_.map(configUsed, (v, k) => (
                <Radio key={k} value={String(v)}>
                  {configUsed.$names[k]}
                </Radio>
              ))}
            </Radio.Group>
          ),
        };
      }
      // 判断是否在上传图片里
      if (IMAGE_GROUP.indexOf(fieldCode) > -1) {
        return {
          ...field,
          children: (
          <UploadImage/>
          ),
        };
      }
      return field;
    });
  }

  function renderChildren() {
    const fields = getFields();
    return fields.map((field = {}) => {
      const { children, name: fieldName, label } = field;
      return (
        <TItem name={fieldName} label={label} key={fieldName} {...layout}>
          {children || <Input />}
        </TItem>
      );
    });
  }

  function handleSubmit(values) {
    const { code: groupCode, name: groupName, ...nextFields } = values;
    const nextValue = {
      code: groupCode,
      name: groupName,
      nextLayer: _.map(nextFields, (v = '', k) => ({
        code: k,
        value: v,
      })),
    };
    setSubmitting(true);
    SYS.saveSystemConfigUsingPOST({ body: nextValue })
      .then(() => {
        message.success('保存成功');
        dispatch({
          type: 'systemParamsConfig/fetchConfigList',
        });
        // 更新系统名称
        dispatch({
          type: 'systemParamsConfig/fetchTitle',
        })
        setIsValueChanged(false);
      })
      .catch(() => message.error('保存失败'))
      .finally(() => setSubmitting(false));
  }

  return (
    <Form
      initialValues={initialValues}
      onFinish={handleSubmit}
      onValuesChange={(changedValues, allValues) => {
        setIsValueChanged(!_.isEqual(allValues, initialValues));
      }}
    >
      <TItem name="code" label="配置编码" {...layout}>
        <Input disabled />
      </TItem>
      <TItem name="name" label="配置名称" {...layout}>
        <Input disabled />
      </TItem>
      {renderChildren()}
      <TButton.Commit
        className={styles.configSubmitButton}
        htmlType="submit"
        disabled={!isValueChanged}
        loading={submitting}
      >
        保存
      </TButton.Commit>
    </Form>
  );
}

export default connect(({ systemParamsConfig }) => systemParamsConfig)(Index);
