import React from 'react';
import { Row, Input, Select } from 'antd';
import { TabForm, TItem } from '@/components/tis_ui';
import {
  DictSelect,
  MultiTableDictCascader,
  PortraitTagDrawerSelect,
  TerminalCoverConfig,
} from '@/components/bussinessComponents';
import _ from 'lodash';
import { appUserType, commonYesNo } from '@/utils/constantEnum';
import { objectDict } from '@/constants';
import getDictType from '@/utils/threeTypeByObject';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function ArticleExpand({
  disabled,
  valibleClientType,
  objectType,
  object,
  disabledObjectType,
  ...others
}) {
  return (
    <TabForm.Tab {...others}>
      <Row>
        <TItem name="tuningWord" label="调节词" {...layout}>
          <Input disabled={disabled} />
        </TItem>
        <TItem name="personalPortraitTag" label="个人画像标签(和关系)" {...layout}>
          <PortraitTagDrawerSelect
            type={appUserType.self}
            disabled={disabled || disabledObjectType === objectDict.person}
          />
        </TItem>
        <TItem name="personalOrPortraitTag" label="个人画像标签(或关系)" {...layout}>
          <PortraitTagDrawerSelect
            type={appUserType.self}
            disabled={disabled || disabledObjectType === objectDict.person}
          />
        </TItem>
        <TItem name="legalPersonPortraitTag" label="法人画像标签(和关系)" {...layout}>
          <PortraitTagDrawerSelect
            type={appUserType.legalPerson}
            disabled={disabled || disabledObjectType === objectDict.legalPerson}
          />
        </TItem>
        <TItem name="legalPersonOrPortraitTag" label="法人画像标签(或关系)" {...layout}>
          <PortraitTagDrawerSelect
            type={appUserType.legalPerson}
            disabled={disabled || disabledObjectType === objectDict.legalPerson}
          />
        </TItem>
        <TItem name="category" {...layout}>
          <MultiTableDictCascader
            label="所属分类"
            name="category"
            dict="articleCategories"
            disabled={disabled}
          />
        </TItem>
        <TItem name="threeType" {...layout}>
          <MultiTableDictCascader
            label="三级分类"
            name="threeType"
            dict={getDictType(object)}
            disabled={disabled}
            key={disabledObjectType}
          />
        </TItem>
        <TItem name="top" label="是否置顶" {...layout}>
          <Select allowClear showArrow disabled={disabled}>
            {_.map(commonYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem name="coverImages" label="终端封面" {...layout}>
          <TerminalCoverConfig valibleItems={valibleClientType} disabled={disabled} />
        </TItem>
        <TItem name="department" label="实施部门" {...layout}>
          <DictSelect
            disabled={disabled}
            dict="SHSSBMSH"
            multiple
            dictType="tree"
            treeNodeFilterProp="title"
          />
        </TItem>
      </Row>
    </TabForm.Tab>
  );
}

export default ArticleExpand;
