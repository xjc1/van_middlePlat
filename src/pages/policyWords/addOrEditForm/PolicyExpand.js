import React, { Fragment } from 'react';
import { TItem, UploadImage } from '@/components/tis_ui';
import { Input, Row, Select } from 'antd';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { commonYesNo, sourceType } from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function PolicyExpand({ isCheck }) {
  return (
    <Fragment>
      <Row>
        <TItem name="isShare" label="是否共享" {...layout}>
          <Select allowClear showArrow disabled={isCheck}>
            {_.map(commonYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="note" label="备注" {...layout}>
          <Input disabled={isCheck} />
        </TItem>
        <TItem name="source" label="来源渠道" {...layout}>
          <DictSelect
            dict="LYQD0001"
            name="source"
            dictType="list"
            allowClear
            showArrow
            disabled={isCheck}
            style={{ width: '100%' }}
          />
        </TItem>
        <TItem name="sourceType" label="来源方式" {...layout}>
          <Select allowClear showArrow disabled={isCheck}>
            {_.map(sourceType, (key, value) => (
              <Select.Option key={key} value={key}>
                {sourceType.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="tuningWord" label="调节词" {...layout}>
          <Input disabled={isCheck} />
        </TItem>
        <TItem name="image" label="上传图片" {...layout}>
          <UploadImage disabled={isCheck} allowClear imgStyle={{ background: '#ccc' }} />
        </TItem>
      </Row>
    </Fragment>
  );
}

export default PolicyExpand;
