import React from 'react';
import { Row, Input, Select } from 'antd';
import { TabForm, TItem, RichText } from '@/components/tis_ui';
import { DictIdSelect, DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { commonYesNo } from '@/utils/constantEnum';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function SynonymsExpand({ check, ...others }) {
  return (
    <TabForm.Tab {...others}>
      <Row>
        <TItem name="tuningWord" label="调节词" {...layout}>
          <Input disabled={check} />
        </TItem>
        <TItem name="department" label="实施部门" {...layout}>
          <DictSelect disabled={check} dict="SHSSBMSH" dictType="tree" treeNodeFilterProp="title" />
        </TItem>
        <TItem name="content" label="回复内容" {...layout}>
          <RichText readOnly={check} />
        </TItem>
        <TItem name="tag" label="标签" {...layout}>
          <Input disabled={check} />
        </TItem>
        <TItem name="isHandle" label="是否梳理" {...layout}>
          <Select disabled={check}>
            {_.map(commonYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem disabled={check} name="title" label="梳理问法" {...layout}>
          <Input disabled={check} />
        </TItem>
        <TItem name="category" label="分类" {...layout}>
          <DictIdSelect
            dict="WDFL"
            dictType="tree"
            multiple
            treeNodeFilterProp="title"
            disabled={check}
          />
        </TItem>
        <TItem name="sourceType" label="来源渠道" {...layout}>
          <Input disabled={check} />
        </TItem>
        <TItem name="source" label="来源方式" {...layout}>
          <Input disabled />
        </TItem>
      </Row>
    </TabForm.Tab>
  );
}

export default SynonymsExpand;
