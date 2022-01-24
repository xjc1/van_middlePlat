import { Input } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { FormRules as Rules, TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';

@connect(({ createQuestionForm }) => ({ ...createQuestionForm }))
class questionSettings extends PureComponent {
  render() {
    const { check } = this.props;
    return (
      <Fragment>
        <TItem name="question" label="问题" rules={[Rules.required('问题必填')]}>
          <Input disabled={check} />
        </TItem>
        <TItem name="tuningWord" label="调节词">
          <Input disabled={check} />
        </TItem>
        <TItem name="clientType" label="适用终端" rules={[Rules.required('终端类型必填')]}>
          <DictSelect dict="ZDLX" dictType="tree" disabled={check} multiple />
        </TItem>
        <TItem name="regions" label="行政区划">
          <DictSelect
            dict="SH00XZQH"
            disabled={check}
            treeNodeFilterProp="title"
            showSearch
            dictType="tree"
            rules={[Rules.required('行政区划必填')]}
          />
        </TItem>
        <TItem name="department" label="实施部门">
          <DictSelect disabled={check} dict="SHSSBMSH" dictType="tree" treeNodeFilterProp="title" />
        </TItem>
        <TItem
          name="attributionDepartment"
          label="归属部门"
          rules={[Rules.required('归属部门必填')]}
        >
          <DictSelect
            disabled={check}
            dict="SHGSBMSH"
            dictType="tree"
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>
      </Fragment>
    );
  }
}

export default questionSettings;
