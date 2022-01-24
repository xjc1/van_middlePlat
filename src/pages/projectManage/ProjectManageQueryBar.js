import React, { PureComponent } from 'react';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import { DictSelect, DictCascader } from '@/components/bussinessComponents';
import _ from 'lodash';
import { Input, Select } from 'antd';
import { commonUpDownStatus, projectReportingPeriod } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

class ProjectManageQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={6} name="name" label="项目名称" {...layout}>
          <Input />
        </TItem>
        <TItem col={6} name="policyLevel" label="政策级别" {...layout}>
          <DictSelect dict="ZCJB0001" />
        </TItem>
        <TItem col={6} name="objectType" label="面向对象" {...layout}>
          <DictSelect dict="DXLX0001" />
        </TItem>
        <TItem col={6} initialValue="all" name="status" label="上下架状态" {...layout}>
          <Select>
            <Select.Option key="all" value="all">
              全部
            </Select.Option>
            {_.map(commonUpDownStatus, (v, k) => (
              <Select.Option key={k} value={v}>
                {commonUpDownStatus.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>

        <TItem col={6} initialValue="all" name="relateExam" label="关联体检" {...layout}>
          <Select>
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value={1}>已关联</Select.Option>
            <Select.Option value={0}>未关联</Select.Option>
          </Select>
        </TItem>

        <TItem col={6} name="publishDept" label="发布部门" {...layout}>
          <DepartmentTreeSelect allowClear dropdownMatchSelectWidth={false} />
        </TItem>

        <TItem col={6} name="classification" label="项目分类" {...layout}>
          <DictCascader dict="XMYLNEW" />
        </TItem>

        <TItem col={6} name="department" label="受理部门" {...layout}>
          <Input allowClear />
        </TItem>

        <TItem col={6} name="inTimeTag" label="申报时间" {...layout}>
          <TSelect allowClear>
            {_.map(projectReportingPeriod, (v, k) => (
              <Select.Option key={k} value={v}>
                {projectReportingPeriod.$names[k]}
              </Select.Option>
            ))}
          </TSelect>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ProjectManageQueryBar;
