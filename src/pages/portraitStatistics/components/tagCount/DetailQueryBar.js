import React from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Select } from 'antd';
import _ from 'lodash';
import { portraitRowType, portraitColType } from '@/utils/constantEnum';
import TagTypeSelect from './TagTypeSelect';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

function DetailQueryBar({ onForm, userType, ...others }) {
  return (
    <QueryBarCard onForm={onForm} {...others}>
      <TItem col={8} name="rowType" label="行配置" {...layout}>
        <Select>
          {_.map(portraitRowType, (key, value) => (
            <Select.Option key={key} value={key}>
              {portraitRowType.$names[value]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem col={8} name="colType" label="列配置" {...layout}>
        <Select>
          {_.map(portraitColType, (key, value) => (
            <Select.Option key={key} value={key}>
              {portraitColType.$names[value]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem col={8} name="category" label="选择分类" {...layout}>
        <TagTypeSelect userType={userType} />
      </TItem>
    </QueryBarCard>
  );
}

export default DetailQueryBar;
