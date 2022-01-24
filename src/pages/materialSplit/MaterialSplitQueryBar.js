import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { materialAuditStatus } from '@/utils/constantEnum';
import { Input } from 'antd';
import _ from 'lodash';

class MaterialSplitQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="matterTitle" label="一级名称">
          <Input />
        </TItem>
        <TItem col={6} name="matterName" label="二级名称">
          <Input />
        </TItem>
        <TItem col={6} name="matterSubItemName" label="三级名称">
          <Input />
        </TItem>
        <TItem col={6} name="name" label="拆解材料">
          <Input />
        </TItem>
        <TItem col={6} name="mattercode" label="事项编码">
          <Input />
        </TItem>
        <TItem col={6} name="regions" label="行政区划">
          <DictSelect dict="SH00XZQH" treeNodeFilterProp="title" showSearch dictType="tree" />
        </TItem>
        <TItem col={6} name="department" label="实施部门">
          <DictSelect dict="SHSSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
        </TItem>
        <TItem col={6} name="auditState" label="审核状态">
          <TSelect>
            {_.map(materialAuditStatus, (v, k) => (
              <TSelect.Option key={k} value={v} label={materialAuditStatus.$names[k]}>
                {materialAuditStatus.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default MaterialSplitQueryBar;
