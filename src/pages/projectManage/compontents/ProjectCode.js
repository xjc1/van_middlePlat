import { Button, Card, Input, Row, AutoComplete } from 'antd';
import React, { useState } from 'react';
import { TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { PROJECTOVERVIEWS } from '@/services/api';
import _ from 'lodash';

const { Option } = AutoComplete;
const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 20 },
};

function isEnough(value = '', length) {
  const len = length - value.length;
  if (value.length !== length) {
    for (let i = 0; i < len; i++) {
      value += '0';
    }
  }
  return value;
}

function ProjectCode({ form, disabled, ...others }) {
  const [options, setOptions] = useState([]);

  function merge() {
    const fv = form.getFieldsValue();
    const regionCode = fv.regionCode && fv.regionCode.substring(2, 8);
    form.setFieldsValue({
      code:
        isEnough(fv.mainCode, 4) +
        isEnough(fv.sonCode, 3) +
        isEnough(fv.grandsonCode, 3) +
        isEnough(regionCode, 6) +
        isEnough(fv.otherCode, 8),
    });
  }

  function onChange(value) {
    const data = _.find(options, { code: value });
    if (data) {
      const { name, code } = data;
      form.setFieldsValue({
        name,
        mainCode: code && code.substring(0, 4),
        sonCode: code && code.substring(4, 7),
        grandsonCode: code && code.substring(7, 10),
        regionCode: code && `QH${code.substring(10, 16)}`,
        otherCode: code && code.substring(16, 25),
      });
    } else {
      form.setFieldsValue({
        mainCode: value && value.substring(0, 4),
        sonCode: value && value.substring(4, 7),
        grandsonCode: value && value.substring(7, 10),
        regionCode: value && `QH${value.substring(10, 16)}`,
        otherCode: value && value.substring(16, 25),
      });
    }
  }

  function onSearch(value) {
    PROJECTOVERVIEWS.searchProjectOverviewUsingGET({ params: { code: value } }).then(
      (resp = []) => {
        setOptions(resp);
      },
    );
  }

  return (
    <TItem label="项目一览项目编码" {...others}>
      <Card>
        <Row gutter={20}>
          <TItem col={3} name="mainCode" label="项目" {...formItemLayout}>
            <Input maxLength={4} disabled={disabled} />
          </TItem>
          <TItem col={3} name="sonCode" label="子项" {...formItemLayout}>
            <Input maxLength={3} disabled={disabled} />
          </TItem>
          <TItem col={3} name="grandsonCode" label="孙项" {...formItemLayout}>
            <Input maxLength={3} disabled={disabled} />
          </TItem>
          <TItem col={7} name="regionCode" label="行政区划" {...formItemLayout}>
            <DictSelect
              disabled={disabled}
              dict="QH100000"
              name="department"
              dictType="tree"
              allowClear
              showArrow
              style={{ width: '100%' }}
              placeholder="请选择区划"
            />
          </TItem>
          <TItem col={5} name="otherCode" label="预留字段" {...formItemLayout}>
            <Input maxLength={8} disabled={disabled} />
          </TItem>
          <TItem col={3}>
            <Button
              style={{ marginTop: '35px' }}
              type="primary"
              onClick={merge}
              disabled={disabled}
            >
              {' '}
              合并
            </Button>
          </TItem>
        </Row>
        <TItem
          name="code"
          label="合并项目编码"
          labelCol={{ span: 0 }}
          rules={[{ required: true, message: '项目编码不能为空!' }]}
        >
          <AutoComplete onChange={onChange} onSearch={onSearch} disabled={disabled}>
            {options.map(({ name, code }) => (
              <Option key={code} value={code}>
                {name}_{code}
              </Option>
            ))}
          </AutoComplete>
        </TItem>
      </Card>
    </TItem>
  );
}

export default ProjectCode;
