import React from 'react';
import { EmptyFn, ModalForm, TItem, TSelect } from '@/components/tis_ui';
import { Card, Checkbox, Input } from 'antd';
import _ from 'lodash';
import { commonRepeat } from '@/utils/constantEnum';
import PortraitTagSelect from '../PortraitTagSelect';

function SyncModalForm({ records = [], onOk = EmptyFn, onClose = EmptyFn, ...others }) {
  let formRef = null;

  function handleSubmit() {
    formRef.current.validateFields().then(values => {
      const { memo, remember, repeat, ...tags } = values;
      const portraitTagIds = _.mapValues(tags, (tag = {}) => tag.value);
      onOk({
        memo,
        remember,
        repeat,
        ...portraitTagIds,
      });
    });
  }

  return (
    <ModalForm
      title="同步选项"
      onForm={form => {
        formRef = form;
      }}
      visible
      handleCancel={onClose}
      onOk={handleSubmit}
      width="45%"
      {...others}
    >
      <Card bordered>
        {records.map(({ object, deptCode, source, sourceTagCode, sourceTagName }) => {
          const id = `${object}_${deptCode}_${source}_${sourceTagCode}_${sourceTagName}`;
          return (
            <TItem key={id} name={id} label={sourceTagName}>
              <PortraitTagSelect type={object} mode="single" />
            </TItem>
          );
        })}
        <TItem name="repeat" label="重复数据">
          <TSelect>
            {_.map(commonRepeat, (v, k) => (
              <TSelect.Option value={v} key={k}>
                {commonRepeat.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="memo" label="备注">
          <Input />
        </TItem>
        <TItem name="remember" valuePropName="checked" wrapperCol={{ span: 16, offset: 6 }}>
          <Checkbox>记住这次选择</Checkbox>
        </TItem>
      </Card>
    </ModalForm>
  );
}

export default SyncModalForm;
