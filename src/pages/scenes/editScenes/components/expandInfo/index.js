import React from 'react';
import { TItem, TLink } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { matterNeedAppointment, matterNeedLogistics } from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function ExpandInfo({ disabled }) {
  return (
    <>
      <TItem name="isNeedLogistics" label="需要物流" {...layout}>
        <Select disabled={disabled} placeholder="请选择是否需要物流" allowClear>
          {_.map(matterNeedLogistics, (v, k) => (
            <Select.Option key={k} value={v}>
              {matterNeedLogistics.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="isNeedOrder" label="需要预约" {...layout}>
        <Select disabled={disabled} placeholder="请选择是否需要预约" allowClear>
          {_.map(matterNeedAppointment, (v, k) => (
            <Select.Option key={k} value={v}>
              {matterNeedAppointment.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="basicMatterCode" label="事项基本编码" {...layout}>
        <Input placeholder="请输入主题编码" disabled={disabled} />
      </TItem>
      <TLink dependencies={['isNeedOrder']}>
        {({ isNeedOrder }) => {
          if (!isNeedOrder) return <></>;
          return (
            <TItem
              name="orderAddress"
              label="预约地址"
              required
              rules={[{ required: true, message: '预约地址必填' }]}
              {...layout}
            >
              <Input placeholder="请输入预约地址" disabled={disabled} />
            </TItem>
          );
        }}
      </TLink>
    </>
  );
}

export default ExpandInfo;
