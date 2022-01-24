import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { professionalSourceType } from '@/utils/constantEnum';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';

class ProfessionalWordsQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="专业词名称">
          <Input />
        </TItem>
        <TItem col={8} name="wordFeature" label="词性">
          <DictSelect dict="WF1000" dictType="tree" allowClear placeholder="请选择词性" />
        </TItem>
        <TItem col={8} name="sourceType" label="来源">
          <Select>
            {_.map(professionalSourceType, (v, k) => (
              <Select.Option key={k} value={v}>
                {professionalSourceType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ProfessionalWordsQueryBar;
