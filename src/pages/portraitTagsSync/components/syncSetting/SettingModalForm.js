import React from 'react';
import { EmptyFn, ModalForm, TItem } from '@/components/tis_ui';
import { Card, Input, Switch } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import PortraitTagSelect from '../PortraitTagSelect';

function SettingModalForm({ onClose = EmptyFn, onOk = EmptyFn, settingDetail = {}, ...others }) {
  let formRef = null;
  const { object } = settingDetail;

  function handleSubmit() {
    formRef.current.validateFields().then((values = {}) => {
      const { autoSyncSwitch: nextSwitchState, portraitTagId = {} } = values;
      onOk({
        ...settingDetail,
        ...values,
        portraitTagId: portraitTagId.value,
        autoSyncSwitch: nextSwitchState ? 1 : 0,
      });
    });
  }

  return (
    <ModalForm
      visible
      title="同步设置"
      onForm={form => {
        formRef = form;
      }}
      handleCancel={onClose}
      onOk={handleSubmit}
      initialValues={{
        ...settingDetail,
        autoSyncSwitch: Boolean(settingDetail.autoSyncSwitch),
        portraitTagId: [settingDetail.portraitTagId],
      }}
      width="45%"
      {...others}
    >
      <Card title="来自">
        <TItem name="object" label="对象类型">
          <DictSelect dict="DXLX0001" disabled />
        </TItem>
        <TItem name="sourceTagName" label="标签名称">
          <Input disabled />
        </TItem>
        <TItem name="sourceTagCode" label="标签编码">
          <Input disabled />
        </TItem>
        <TItem name="source" label="标签来源">
          <Input disabled />
        </TItem>
        <TItem name="deptCode" label="来源部门">
          <DictSelect dict="SHSSBMSH" disabled />
        </TItem>
      </Card>
      <Card title="同步至">
        <TItem name="portraitTagId" label="画像标签">
          <PortraitTagSelect type={object} mode="single" />
        </TItem>
        <TItem name="autoSyncSwitch" label="自动同步" valuePropName="checked">
          <Switch />
        </TItem>
      </Card>
    </ModalForm>
  );
}

export default SettingModalForm;
