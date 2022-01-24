import React, { useState } from 'react';
import { Row, Col, Radio, Input } from 'antd';
import { EmptyFn } from '@/components/tis_ui';
import { POLICY_NAME_TYPE } from './consts';
import RelativePolicySelector from "@/pages/policyGraph/createPolicyNode/RelativePolicySelector";

function PolicyNameInput({ onChange = EmptyFn, type = POLICY_NAME_TYPE.SEARCH, disabled }) {
  const [nextType, setNextType] = useState(type);
  return (
    <Row gutter={16}>
      {nextType === POLICY_NAME_TYPE.SEARCH && (
        <Col span={16}>
          <RelativePolicySelector mode="single" onChange={({ value: nextValue }) => {
            onChange({
              idLinked: Number(nextValue),
            });
          }} />
        </Col>
      )}
      {nextType === POLICY_NAME_TYPE.INPUT && (
        <Col span={16}>
          <Input
            onChange={({ target }) => {
              onChange({
                name: target.value,
              });
            }}
            placeholder="请输入政策名称"
            disabled={disabled}
          />
        </Col>
      )}
      <Col span={8}>
        <Radio.Group
          onChange={({ target }) => {
            setNextType(target.value);
          }}
          defaultValue={POLICY_NAME_TYPE.SEARCH}
          buttonStyle="solid"
        >
          <Radio.Button value={POLICY_NAME_TYPE.SEARCH}>筛选</Radio.Button>
          <Radio.Button value={POLICY_NAME_TYPE.INPUT}>输入</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  );
}

export default PolicyNameInput;
