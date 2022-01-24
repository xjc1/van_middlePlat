import React from 'react';
import _ from 'lodash';
import classNames from "classnames";
import { ApartmentOutlined } from '@ant-design/icons';
import { EmptyFn, TItem } from '@/components/tis_ui';
import { Form, Input } from 'antd';
import { connect } from "dva";
import SlotSetting from "./SlotSetting";
import Styles from '../settingPanel.less';
import SlotStyles from './index.less';

function Index({ model, onChange = EmptyFn, onOpenEdit }) {
  const [formRef] = Form.useForm();
  const { setting: formData } = model;
  console.log("-> formData", formData);

  return (
    <div className={classNames(Styles.settingPanel, SlotStyles.slotSettingPanel)}>
      <h4 className={Styles.settingPanelTitle}>
        <span>
          <ApartmentOutlined className={classNames(Styles.settingPanelIcon, SlotStyles.slotSettingPanelIcon)} />
          填槽节点
        </span>
      </h4>
      <div className={Styles.settingPanelContent}>
        <Form
          form={formRef}
          initialValues={formData}
          onValuesChange={(vals, allVals) => {
            console.log("-> allVals", allVals);
            onChange(allVals);
          }}
        >
          <TItem name="name" label="节点名称">
            <Input />
          </TItem>
          <SlotSetting name="options"
                       onOpenEdit={onOpenEdit}
          />
        </Form>
      </div>
    </div>
  );
}

export default Index;
