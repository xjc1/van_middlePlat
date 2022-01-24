import React, { useState } from 'react';
import { Divider, Checkbox } from 'antd';
import _ from 'lodash';
import { infoes } from '@/pages/designStudios/FormDesigner/widgets';
import { connect } from 'dva';
import Styles from './index.less';
import ValidateSetting from '../validateSetting';
import LinkSetting from '../linkSetting';
import CommonSetting from '@/pages/designStudios/FormDesigner/widgetSetting/CommonSetting';
import RemoteValidateSetting from '@/pages/designStudios/validateSetting/RemoteValidateSetting';

function WidgetViewEdit({ dispatch, ctxSchema, ctxField, ...others }) {
  const {
    field,
    id,
    validator = {},
    links = [],
    initialValue = {},
    widgetConfig = {},
    dataSource = {},
    ...commonProps
  } = others;
  const { rules = [], remote = {} } = validator;
  const [dynamicValidate, setDynamicValidate] = useState(!_.isEmpty(remote));
  const WidgetSetting = infoes[field].setting;

  const [update] = useState(() =>
    _.debounce(allValues => {
      dispatch({
        type: 'formDesigner/updateSelectedItem',
        payload: {
          id,
          ...allValues,
        },
      });
    }, 300),
  );

  return (
    <>
      <CommonSetting field={field} onUpdate={update} {...commonProps} />
      <WidgetSetting
        onUpdate={update}
        dataSource={dataSource}
        initialValue={initialValue}
        widgetConfig={widgetConfig}
        field={field}
        ctxSchema={ctxSchema}
      />
      {WidgetSetting.validateAble && (
        <>
          <Divider orientation="left">表单校验</Divider>
          <ValidateSetting
            formId={id}
            rules={rules}
            onUpdate={({ rules: nextRules }) => {
              update({
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
              ctxField={ctxField}
              validator={remote}
              onUpdate={values => {
                update({
                  validator: {
                    rules,
                    remote: values,
                  },
                });
              }}
            />
          )}
        </>
      )}
      {WidgetSetting.linkAble && <LinkSetting formId={id} links={links} />}
    </>
  );
}

export default connect(({ formDesigner, interfaceManage }) => {
  return {
    ctxSchema: formDesigner.ctxSchema,
    ctxField: formDesigner.ctxField,
    apis: interfaceManage.apis,
  };
})(WidgetViewEdit);
