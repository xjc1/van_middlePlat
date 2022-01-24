import React, { useState } from 'react';
import { TabForm, TItem } from '@/components/tis_ui';
import {
  ConditionSelector,
  DictSelect,
  PortraitTagDrawerSelect,
} from '@/components/bussinessComponents';
import { InputNumber } from 'antd';
import {
  conditionObject,
  conditionType,
  commonObjectType,
  appUserType,
} from '@/utils/constantEnum';
import AddThreeType from '@/pages/scenes/editScenes/components/basicinfo/AddThreeType';
import ShowProtraitTreeLevel from './ShowProtraitTreeLevel';
import { objectDict } from '@/constants';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function Recommend({ disabled, objectType, instance, ...props }) {
  const [extraType, setExtraType] = useState({ value: [], updateTime: '' });
  function changeExtraType(value) {
    setExtraType({ value, updateTime: Date.now() });
  }
  return (
    <TabForm.Tab {...props}>
      <TItem name="frequency" label="办件频度" {...layout}>
        <InputNumber
          disabled={disabled}
          placeholder="请输入办件频度"
          style={{ width: '100%' }}
          min={0}
        />
      </TItem>
      <TItem name="rankingCondition" hidden label="排序条件" {...layout}>
        <ConditionSelector
          disabled
          mode="multiple"
          optionFilterProp="label"
          type={conditionType.order}
          placeholder="请选择条件"
        />
      </TItem>
      <TItem name="recommendTag" hidden label="推荐标签" {...layout}>
        <DictSelect
          mode="multiple"
          optionFilterProp="label"
          dict="FWTJ001"
          placeholder="请选择推荐标签"
          disabled
        />
      </TItem>
      <TItem name="restrictiveConditions" hidden label="个人推荐限定条件" {...layout}>
        <ConditionSelector
          mode="multiple"
          optionFilterProp="label"
          object={conditionObject.personal}
          type={conditionType.define}
          placeholder="请选择条件"
          disabled
        />
      </TItem>
      <TItem name="restrictiveConditionLegalPerson" hidden label="法人推荐限定条件" {...layout}>
        <ConditionSelector
          mode="multiple"
          optionFilterProp="label"
          object={conditionObject.legal}
          type={conditionType.define}
          placeholder="请选择条件"
          disabled
        />
      </TItem>
      <TItem name="personalPortraitTag" label="个人画像标签" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.self}
          disabled={objectType === objectDict.legalPerson || disabled}
        />
      </TItem>
      <TItem name="legalPersonPortraitTag" label="法人画像标签" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.legalPerson}
          disabled={objectType === commonObjectType.personal || disabled}
        />
      </TItem>
      <TItem name="type" label="事项所属分类" {...layout}>
        <AddThreeType
          disabled={disabled}
          key={objectType}
          object={objectType}
          extraType={extraType.value}
          updateTime={extraType.updateTime}
        />
      </TItem>
      <TItem name="threeLevelOfPortraitTag" label="画像所属分类" {...layout}>
        <ShowProtraitTreeLevel addToMatter={changeExtraType} disabled={disabled} />
      </TItem>
    </TabForm.Tab>
  );
}

export default Recommend;
