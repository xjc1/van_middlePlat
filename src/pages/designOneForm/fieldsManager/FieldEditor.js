import React, { useState } from 'react';
import { Divider, Checkbox } from 'antd';
import { infoes } from '@/pages/designStudios/FormDesigner/widgets';
import { connect } from 'dva';
import ValidateSetting from '@/pages/designStudios/validateSetting';
import CommonSetting from '@/pages/designStudios/FormDesigner/widgetSetting/CommonSetting';
import RemoteValidateSetting from '@/pages/designStudios/validateSetting/RemoteValidateSetting';
import { useDebounceFn } from 'ahooks';
import _ from 'lodash';
import Styles from './index.less';

function FieldEditor({ widget, dispatch }) {
  const {
    field,
    id,
    validator = {},
    initialValue = {},
    widgetConfig = {},
    dataSource = {},
    ...commonProps
  } = widget;

  const { rules = [], remote = {} } = validator;
  const [dynamicValidate, setDynamicValidate] = useState(!_.isEmpty(remote));
  const WidgetSetting = infoes[field].setting;

  const { run: onUpdate } = useDebounceFn(
    allValues => {
      dispatch({
        type: 'fieldStore/updateSelectedItem',
        payload: {
          ...widget,
          ...allValues,
        },
      });
    },
    {
      wait: 300,
    },
  );

  return (
    <>
      <CommonSetting field={field} onUpdate={onUpdate} {...commonProps} />
      <WidgetSetting
        onUpdate={onUpdate}
        dataSource={dataSource}
        initialValue={initialValue}
        widgetConfig={widgetConfig}
        field={field}
      />
      <Divider orientation="left">表单校验</Divider>
      <ValidateSetting
        formId={id}
        rules={rules}
        onUpdate={({ rules: nextRules }) => {
          onUpdate({
            validator: {
              rules: nextRules,
              remote,
            },
          });
        }}
      />
      <div className={Styles.extraConfigWrapper}>
        <Divider />
        <Checkbox
          defaultChecked={dynamicValidate}
          onChange={e => {
            setDynamicValidate(e.target.checked);
          }}
        >
          动态校验
        </Checkbox>
      </div>
      {dynamicValidate && (
        <RemoteValidateSetting
          validator={remote}
          onUpdate={values => {
            onUpdate({
              validator: {
                rules,
                remote: values,
              },
            });
          }}
        />
      )}
    </>
  );
}

export default connect()(FieldEditor);
