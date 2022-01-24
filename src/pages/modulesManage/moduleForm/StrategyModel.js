import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Modal, Form } from 'antd';
import { EmptyFn, FormRules, TItem, TSelect } from '@/components/tis_ui';
import { modulesContentType } from '@/utils/constantEnum';

function StrategyModel({ stragyItems, filterContentType, onOk = EmptyFn, ...others }) {
  const [formRef] = Form.useForm();
  const [stragyItem, setStragyItem] = useState();
  const [contentTypeList, setContentTypeList] = useState([]);

  useEffect(() => {
    if (stragyItem) {
      const { contentType = [] } = stragyItem;
      setContentTypeList(
        _.map(contentType, code => {
          return {
            code,
            name: modulesContentType.$v_names[code],
            disabled: _.includes(Array.from(filterContentType), code),
          };
        }),
      );
    }
  }, [stragyItem]);

  return (
    <Modal
      visible
      closable
      maskClosable
      width={500}
      title="添加推荐策略"
      onOk={() => {
        return formRef.validateFields().then(vals => {
          onOk({
            stragyItem,
            ...vals,
          });
          return Promise.resolve();
        });
      }}
      {...others}
    >
      <Form
        form={formRef}
        onValuesChange={({ strategy }) => {
          if (strategy) {
            const nextSuggestItem = _.find(stragyItems, { code: strategy });
            formRef.resetFields(['strategyContentType']);
            setStragyItem(nextSuggestItem);
          }
        }}
      >
        <TItem name="strategy" label="策略名称" rules={[FormRules.required('必填')]}>
          <TSelect>
            {_.map(stragyItems, ({ name, code }) => (
              <TSelect.Option key={code} value={code} label={name}>
                {name}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="strategyContentType" label="内容类型" rules={[FormRules.required('必填')]}>
          <TSelect mode="multiple">
            {_.map(contentTypeList, ({ name, code, disabled }) => (
              <TSelect.Option key={code} value={code} label={name} disabled={disabled}>
                {name}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      </Form>
    </Modal>
  );
}

StrategyModel.defaultProps = {
  stragyItems: [],
  filterContentType: [],
};

export default StrategyModel;
