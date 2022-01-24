import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { connect } from 'dva';

@connect(({ standardFieldStore }) => {
  return {
    categorys: standardFieldStore.categorys,
  };
})
class StandardFieldStoreQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, categorys, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="字段名称">
          <Input />
        </TItem>
        <TItem col={8} name="code" label="字段编码">
          <Input />
        </TItem>
        <TItem col={8} name="classification" label="字段分类">
          <Select showSearch optionLabelProp="label">
            {_.map(categorys, ({ name, id }) => (
              <Select.Option key={id} value={id} label={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default StandardFieldStoreQueryBar;
