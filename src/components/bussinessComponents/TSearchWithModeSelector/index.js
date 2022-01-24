import React from 'react';
import { Select, Space, Input, Row, Col } from 'antd';
import _ from 'lodash';
import { warningFormat, commonNeedUnNeed } from '@/utils/constantEnum';
import TSearchSelector from '../Dict/TSearchSelector';
import AuthMethodSelect from '@/pages/messageManage/messageForm/AuthMethodSelect';
import { EmptyFn } from '@/components/tis_ui';

function TSearchWithModeSelector({
  value = {
    format: warningFormat.default,
    name: undefined,
    content: undefined,
    relatedId: undefined,
    appId: undefined,
    authentication: undefined,
    isAccessToken: undefined,
  },
  onChange,
  customValidate = EmptyFn,
  type,
  disabled,
  ...others
}) {
  const handleChange = val => {
    onChange(val);
    customValidate(val);
  };
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Select
        disabled={disabled}
        value={value.format}
        onChange={val => handleChange({ format: val })}
      >
        {_.map(warningFormat, (v, k) => (
          <Select.Option key={k} value={v} label={warningFormat.$names[k]}>
            {warningFormat.$names[k]}
          </Select.Option>
        ))}
      </Select>
      {value.format === warningFormat.default ? (
        <>
          <TSearchSelector
            disabled={disabled}
            type={type}
            {...others}
            value={value.relatedId}
            onChange={(val = {}) => {
              handleChange({ ...value, name: undefined, content: undefined, relatedId: val });
            }}
          />
        </>
      ) : (
        <>
          <Input
            value={value.name}
            placeholder="自定义:名称"
            onChange={e => {
              handleChange({ ...value, name: e.target.value, relatedId: undefined });
            }}
          />
          <Input
            value={value.content}
            placeholder="自定义:路径"
            onChange={e => {
              handleChange({ ...value, content: e.target.value, relatedId: undefined });
            }}
          />
        </>
      )}
      <Row>
        <Col span={2} style={{ textAlign: 'right', marginRight: 16 }}>
          认证方式:
        </Col>
        <Col span={16}>
          {' '}
          <AuthMethodSelect
            disabled={disabled}
            type={type}
            {...others}
            value={value.authentication}
            onChange={val => {
              handleChange({ ...value, authentication: val });
            }}
          />
        </Col>
      </Row>
      {[warningFormat.customize, warningFormat.pagePath, warningFormat.outsideApp].includes(
        value.format,
      ) && (
        <>
          <Select
            value={value.isAccessToken}
            placeholder="访问令牌"
            onChange={val => {
              handleChange({ ...value, isAccessToken: val });
            }}
            allowClear
          >
            {_.map(commonNeedUnNeed, (val, key) => (
              <Select.Option key={key} value={val}>
                {commonNeedUnNeed.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </>
      )}
      {warningFormat.outsideApp === value.format && (
        <>
          <Input
            placeholder="应用ID"
            value={value.appId}
            onChange={e => {
              handleChange({ ...value, appId: e.target.value });
            }}
          />
        </>
      )}
    </Space>
  );
}

export default TSearchWithModeSelector;
