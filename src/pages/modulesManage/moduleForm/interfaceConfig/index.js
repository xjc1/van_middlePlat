import React, { useCallback, useEffect, useState } from 'react';
import { Alert, InputNumber } from 'antd';
import { TabForm, TItem, SwitchWrapper, CheckboxGroup } from '@/components/tis_ui';
import { modulesContentType } from '@/utils/constantEnum';
import { connect } from 'dva';
import _ from 'lodash';
import { field2Code } from '../index';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const innerLayout = {
  wrapperCol: { span: 16, offset: 4 },
};

function InterfaceConfig({
  dispatch,
  outputFieldList = {},
  needTranslateFieldsGroup = {},
  disabled = false,
  isPageUp,
  setIsPageUp,
  formRef,
  ...others
}) {
  const [translateFieldGroups, setTranslateFieldGroups] = useState({});
  const renderTranslateFields = useCallback(
    (type, list = [], label = ' ') => {
      return (
        <>
          <TItem
            name={field2Code[type]}
            label={label}
            style={{ marginTop: '24px', marginBottom: 0 }}
            {...layout}
          >
            <CheckboxGroup
              disabled={disabled}
              title={modulesContentType.$v_names[type]}
              dataset={outputFieldList[type]}
              onChange={val => handleChangeTranslateFieldsGroup(type, val)}
            />
          </TItem>
          {list.length > 0 && (
            <TItem name={['needTranslateFieldGroups', type]} {...innerLayout}>
              <CheckboxGroup disabled={disabled} dataset={list} />
            </TItem>
          )}
        </>
      );
    },
    [outputFieldList, needTranslateFieldsGroup, translateFieldGroups],
  );

  useEffect(() => {
    if (_.size(needTranslateFieldsGroup) > 0) {
      const values = formRef.getFieldsValue(Object.values(field2Code));
      const initTranslateGroups = Object.entries(field2Code).reduce((prev, [type, itemKey]) => {
        if (values[itemKey] && values[itemKey].length > 0)
          return { ...prev, [type]: values[itemKey] };
        return prev;
      }, {});
      setTranslateFieldGroups(
        _.reduce(
          initTranslateGroups,
          (result, fields, type) => {
            return {
              ...result,
              [type]: needTranslateFieldsGroup[type].filter(({ value }) => fields.includes(value)),
            };
          },
          {},
        ),
      );
    }
  }, [needTranslateFieldsGroup]);

  function handleChangeTranslateFieldsGroup(type, fields) {
    const translateFields = needTranslateFieldsGroup[type].filter(({ value }) =>
      fields.includes(value),
    );
    if (translateFields.length > 0) {
      setTranslateFieldGroups({
        ...translateFieldGroups,
        [type]: translateFields,
      });
      return;
    }
    setTranslateFieldGroups(_.omit(translateFieldGroups, type));
  }

  return (
    <TabForm.Tab {...others}>
      <TItem name="pageSize" label="????????????" {...layout}>
        <SwitchWrapper
          switchTitle="??????"
          name="limit"
          isChecked={isPageUp}
          onCheck={setIsPageUp}
          preText="??????"
          afterText="???"
          disableCheck={disabled}
          label="????????????"
          {...layout}
        >
          {(value, onChange) => (
            <InputNumber
              disabled={disabled}
              style={{ width: 100 }}
              min={1}
              value={value}
              onChange={onChange}
            />
          )}
        </SwitchWrapper>
      </TItem>
      <TItem name="limit" label=" " {...layout}>
        <SwitchWrapper
          switchTitle="??????"
          isChecked
          disableCheck
          onCheck={setIsPageUp}
          preText="??????"
          afterText="???"
          label=" "
          {...layout}
        >
          {(value, onChange) => (
            <InputNumber
              disabled={disabled}
              style={{ width: 100 }}
              min={1}
              value={value}
              onChange={onChange}
            />
          )}
        </SwitchWrapper>
      </TItem>
      <Alert
        style={{ textAlign: 'center', marginBottom: 10 }}
        message="??????????????????????????????????????????????????????????????????????????????????????????????????????"
        type="warning"
      />
      {renderTranslateFields(
        modulesContentType.SCENE,
        translateFieldGroups[modulesContentType.SCENE],
        '????????????',
      )}

      {renderTranslateFields(
        modulesContentType.MATTER,
        translateFieldGroups[modulesContentType.MATTER],
      )}

      {renderTranslateFields(
        modulesContentType.POLICY,
        translateFieldGroups[modulesContentType.POLICY],
      )}

      {renderTranslateFields(
        modulesContentType.ARTICLE,
        translateFieldGroups[modulesContentType.ARTICLE],
      )}

      {renderTranslateFields(
        modulesContentType.SERVICE,
        translateFieldGroups[modulesContentType.SERVICE],
      )}

      {renderTranslateFields(
        modulesContentType.POLICY_PROJECT,
        translateFieldGroups[modulesContentType.POLICY_PROJECT],
      )}
    </TabForm.Tab>
  );
}

export default connect(({ modulesManage }) => {
  return {
    outputFieldList: modulesManage.outputFieldList,
    needTranslateFieldsGroup: modulesManage.needTranslateFieldsGroup,
  };
})(InterfaceConfig);
