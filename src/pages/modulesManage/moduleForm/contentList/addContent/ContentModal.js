import React, { useCallback, useEffect, useState } from 'react';
import { FormRules, ModalForm, TItem, TSelect } from '@/components/tis_ui';
import { Radio, Divider, Alert, Tooltip } from 'antd';
import { useUpdateEffect } from 'ahooks';
import _ from 'lodash';
import { modulesContentType, modulesCoverage } from '@/utils/constantEnum';
import ContentScreen from './ContentScreen';
import { MODULES } from '@/services/api';
import AddRelations from '@/components/bussinessComponents/Relation/AddRelations';
import { modulesContentTypeMapper, commonFormLayout as layout } from '../../../utils';

function ContentModal({ content = {}, onOk, disabled = false, ...others }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let formRef = null;

  const [screenType, setScreenType] = useState({});

  const [userSetting, setUserSetting] = useState();

  const [initialValues] = useState(() => {
    const { key, ...otherConent } = content;
    return otherConent;
  });

  const fetchScreen = useCallback(nextType => {
    MODULES.getFiltrateFieldsUsingGET({
      params: { contentType: [nextType] },
    }).then((nextOptions = []) => {
      setScreenType({ contentType: nextType, options: nextOptions });
    });
  }, []);

  const reSetContentType = nextType => {
    fetchScreen(nextType);
    formRef.current.setFieldsValue({
      filtrateValues: [],
      relatedContents: [],
    });
  };

  useEffect(() => {
    const { contentType, rangeType } = initialValues;
    if (!_.isUndefined(contentType)) {
      fetchScreen(contentType);
      setUserSetting(rangeType === modulesCoverage.CUSTOMIZE);
    }
  }, [initialValues]);

  const { options, contentType } = screenType;

  const isUserSetting = () => {
    return userSetting && !_.isUndefined(contentType);
  };

  useUpdateEffect(() => {
    formRef.current.setFieldsValue({
      relationMatchMatters: [],
      screen: [],
    });
  }, [screenType]);

  return (
    <ModalForm
      initialValues={initialValues}
      visible
      title="添加内容"
      onForm={form => {
        formRef = form;
      }}
      onOk={() => {
        return formRef.current.validateFields().then(vals => {
          onOk(vals);
          return Promise.resolve();
        });
      }}
      {...others}
    >
      <TItem name="contentType" label="内容类型" rules={[FormRules.required('必选')]} {...layout}>
        <TSelect onChange={type => reSetContentType(type)} disabled={disabled}>
          {_.map(modulesContentType, (v, k) => (
            <TSelect.Option value={v} key={k}>
              {modulesContentType.$names[k]}
            </TSelect.Option>
          ))}
        </TSelect>
      </TItem>
      <TItem name="rangeType" label="范围" rules={[FormRules.required('必选')]} {...layout}>
        <Radio.Group
          disabled={disabled}
          onChange={({ target: { value } }) => {
            setUserSetting(value === modulesCoverage.CUSTOMIZE);
          }}
        >
          {_.map(modulesCoverage, (v, k) => (
            <Radio value={v} key={k}>
              {modulesCoverage.$names[k]}
            </Radio>
          ))}
        </Radio.Group>
      </TItem>
      {isUserSetting() && (
        <div>
          <Divider orientation="left" plain>
            过滤条件配置
          </Divider>
          <Alert
            style={{ textAlign: 'center', marginBottom: 10 }}
            message="注意：再次修改内容类型会导致自定义过滤条件配置表单重置！"
            type="warning"
          />
          <TItem name="filtrateValues" label="筛选" {...layout}>
            <ContentScreen options={options} disabled={disabled} />
          </TItem>
          <TItem
            key={contentType}
            name="relatedContents"
            label={modulesContentType.$v_names[contentType]}
            {...layout}
          >
            <AddRelations
              disabled={disabled}
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
              type={modulesContentTypeMapper[contentType]}
              tableTitle={`${modulesContentType.$v_names[contentType]}名`}
            />
          </TItem>
        </div>
      )}
    </ModalForm>
  );
}

export default ContentModal;
