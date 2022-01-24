import React, { Component } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input } from 'antd';
import { PortraitTagDrawerSelect } from '@/components/bussinessComponents';
import { appUserType } from '@/utils/constantEnum';

class PortraitSelfQueryBar extends Component {
  componentDidMount() {}

  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="uniqueCode" label="证件号码">
          <Input />
        </TItem>
        <TItem col={8} name="tagIds" label="画像标签名称">
          {/* <Select mode="tags"  dropdownClassName = {styles.noSelectOpen}/> */}
          <PortraitTagDrawerSelect type={appUserType.self} />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default PortraitSelfQueryBar;
