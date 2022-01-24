import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { Input } from 'antd';
import _ from 'lodash';
import { appUserType, modulesContentType } from '@/utils/constantEnum';

class ModulesManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem name="name" label="模块名称" col={8}>
          <Input />
        </TItem>
        <TItem name="code" label="模块编码" col={8}>
          <Input />
        </TItem>
        <TItem name="object" label="对象类型" col={8}>
          <TSelect>
            {_.map(appUserType, (v, k) => (
              <TSelect.Option key={k} value={v}>
                {appUserType.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="contentType" label="覆盖内容类型" col={8}>
          <TSelect>
            {_.map(modulesContentType, (v, k) => (
              <TSelect.Option key={k} value={v}>
                {modulesContentType.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ModulesManageQueryBar;
