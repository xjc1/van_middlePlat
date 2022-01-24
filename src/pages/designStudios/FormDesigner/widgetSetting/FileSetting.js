import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { EmptyFn, TSelect, TSwitch } from '@/components/tis_ui';
import classNames from 'classnames';
import SettingStyle from '@/pages/designStudios/FormDesigner/widgetSetting/widgetSetting.less';
import { Divider, Form, Checkbox, InputNumber } from 'antd';
import tags from '../../components/apiTags';

const options = [
  { label: '*.xlsx', value: 'xlsx' },
  { label: '*.xls', value: 'xls' },
  { label: '*.csv', value: 'csv' },
  { label: '*.doc', value: 'doc' },
  { label: '*.docx', value: 'docx' },
  { label: '*.txt', value: 'txt' },
  { label: '*.png', value: 'png' },
  { label: '*.jpeg', value: 'jpeg' },
  { label: '*.jpg', value: 'jpg' },
  { label: '*.pdf', value: 'pdf' },
  { label: '*.zip', value: 'zip' },
];

function FileSetting({ apis, widgetConfig = {}, onUpdate = EmptyFn }) {
  const [formRef] = Form.useForm();

  const { action = {}, ...otherConfigs } = widgetConfig;

  const postApis = useMemo(() => {
    return _.filter(apis, ({ method }) => method === 'POST');
  }, [apis]);

  const onValuesChange = useCallback(() => {
    formRef.validateFields().then(({ action: nextAction, ...others }) => {
      const apiInstance = _.find(apis, { id: nextAction });
      onUpdate({
        widgetConfig: {
          action: apiInstance,
          ...others,
        },
      });
    });
  }, [formRef, apis]);

  return (
    <>
      <div className={classNames(SettingStyle.widgetSection, SettingStyle.widgetSectionDatasource)}>
        <Divider orientation="left">上传配置</Divider>
        <Form
          form={formRef}
          onValuesChange={onValuesChange}
          initialValues={{
            ...otherConfigs,
            action: action.id,
          }}
        >
          <Form.Item label="是否多选" name="multiFile">
            <TSwitch />
          </Form.Item>
          <Form.Item label="文件类型" name="fileTypes">
            <Checkbox.Group options={options} />
          </Form.Item>
          <Form.Item label="上传接口" name="action">
            <TSelect showSearch placeholder="选择您的接口" optionFilterProp="children">
              {_.map(postApis, ({ method, name, id, url }) => {
                return (
                  <TSelect.Option key={id} value={id} label={name || url}>
                    <div>
                      {tags[_.upperCase(method)]}
                      {name || url}
                    </div>
                  </TSelect.Option>
                );
              })}
            </TSelect>
          </Form.Item>
          <Form.Item label="大小限制(Mb)" name="fileSize">
            <InputNumber />
          </Form.Item>
          <Form.Item label="最大文件数" name="fileCount">
            <InputNumber />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

FileSetting.linkAble = true;

export default FileSetting;
