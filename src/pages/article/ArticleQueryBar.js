import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Input, Select, DatePicker } from 'antd';
import { policyUpDownStatus } from '@/utils/constantEnum';
import _ from 'lodash';
import { connect } from 'dva';

const { RangePicker } = DatePicker;
@connect(({ user }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class ArticleQueryBar extends PureComponent {
  render() {
    const { onForm, deptCode, dispatch, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="文章名称">
          <Input />
        </TItem>
        <TItem col={6} name="level" label="文章级别">
          <DictSelect dict="ZCJB0001" />
        </TItem>
        <TItem col={6} name="status" label="上下架状态">
          <Select>
            {_.map(policyUpDownStatus, (key, value) => (
              <Select.Option key={key} value={key}>
                {policyUpDownStatus.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={6} name="region" label="行政区划">
          <DictSelect dict="SH00XZQH" dictType="tree" allowClear placeholder="请选择行政区划" />
        </TItem>
        <TItem col={6} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" />
        </TItem>
        <TItem col={6} name="timeRange" label="发布日期">
          <RangePicker allowEmpty={[true, true]} />
        </TItem>

        <TItem col={6} name="attributionDepartment" label="归属部门">
          <DictSelect dict="SHGSBMSH" dictType="tree" showSearch treeNodeFilterProp="title" />
        </TItem>
        <TItem name="objectType" label="对象类型" col={6}>
          <DictSelect dict="DXLX0001" dictType="tree" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ArticleQueryBar;
