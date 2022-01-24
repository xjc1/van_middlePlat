import React from 'react';
import {Alert, Input, message, Select, Row, Col} from 'antd';
import { EmptyFn, TItem } from '@/components/tis_ui';
import { scenesDataUseType, scenesDataUseSceneType, formYesNo } from '@/utils/constantEnum';
import _ from 'lodash';
import { DictSelect, TSearchSelector } from '@/components/bussinessComponents';

function BaseInfo(props) {
  const {
    disabled,
    formRef,
    currentDataType,
    setCurrentDataType = EmptyFn,
    setSelectMatters = EmptyFn,
    selectMatters = [],
  } = props;
  const resetConfigData = () => {
    const { sceneDataFields = [], sceneDataMaterials = [] } = formRef.getFieldsValue();
    if (sceneDataFields.length || sceneDataMaterials.length) {
      formRef.setFieldsValue({ sceneDataFields: undefined, sceneDataMaterials: undefined });
      message.info('用数类型与选择事项变化，用数配置数据被清空');
    }
  };
  return (
    <>
      <TItem name="sceneName" label="场景名称" rules={[{ required: true }]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="sceneCode" label="场景编码">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="sceneType" label="场景类型">
        <Select disabled={disabled} allowClear>
          {_.map(scenesDataUseSceneType, (v, k) => (
            <Select.Option key={k} value={v}>
              {scenesDataUseSceneType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="authorize" label="是否需要授权" rules={[{ required: true }]}>
        <Select disabled={disabled} allowClear>
          {_.map(formYesNo, (v, k) => (
            <Select.Option key={k} value={v}>
              {formYesNo.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="clientType" label="终端类型">
        <DictSelect dict="ZDLX" dictType="tree" disabled={disabled} allowClear />
      </TItem>
      <TItem name="department" label="实施部门" >
        <DictSelect
          disabled={disabled}
          multiple
          showSearch
          treeNodeFilterProp="title"
          dictType="tree"
          treeDefaultExpandAll
          treeNodeLabelProp="title"
          dict="SHSSBMSH"
        />
      </TItem>
      <Row style={{ marginBottom: 24 }}>
        <Col span={6} />
        <Col span={16}>
          <Alert
            type="info"
            message="【用数类型】与【选择事项】变化将会导致【用数配置】数据被清空!"
          />
        </Col>
      </Row>
      <TItem name="dataType" label="用数类型">
        <Select
          disabled={disabled}
          allowClear
          onChange={val => {
            resetConfigData();
            setCurrentDataType(val);
          }}
        >
          {_.map(scenesDataUseType, (v, k) => (
            <Select.Option key={k} value={v}>
              {scenesDataUseType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      {currentDataType === scenesDataUseType.matter && (
        <TItem name="sameKindMatter" label="是否同类事项" rules={[{ required: true }]}>
          <Select disabled={disabled} allowClear>
            {_.map(formYesNo, (v, k) => (
              <Select.Option key={k} value={v}>
                {formYesNo.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      )}
      {currentDataType === scenesDataUseType.matter && (
        <TItem name="matters" label="选择事项">
          <TSearchSelector
            value={selectMatters}
            type="matter"
            disabled={disabled}
            onChange={(val = [], otherInfo = {}) => {
              // 判断是否是初始化后的数据
              const { isInit = false } = otherInfo;
              if (!isInit) {
                resetConfigData();
                setSelectMatters(val);
              }
            }}
          />
        </TItem>
      )}
      <TItem name="sceneDescription" label="场景描述">
        <Input.TextArea disabled={disabled} rows={3} />
      </TItem>
    </>
  );
}

export default BaseInfo;
