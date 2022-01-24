import React from 'react';
import { TabForm, TItem } from '@/components/tis_ui';
import {
  ConditionDesigner,
  PortraitTagDrawerSelect,
  MutiDictIdCascaderTable,
} from '@/components/bussinessComponents';
import { objectDict } from '@/constants';
import { appUserType } from '@/utils/constantEnum';
import getDictType from '@/utils/threeTypeByObject';

import PortraitTagRelated from './PortraitTagRelated';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function ConditionRelated({ disabled = false, policyContent, objectType, targetId, ...others }) {
  return (
    <TabForm.Tab {...others}>
      <TItem label="条件拆解" name="minimalConditionRelation" {...layout}>
        <ConditionDesigner
          base64
          content={policyContent}
          disabled={disabled}
          objectType={objectType}
        />
      </TItem>
      <TItem label="画像标签" name="minimalConditionPortraits" {...layout}>
        <PortraitTagRelated policyId={targetId} />
      </TItem>
      <TItem name="personalPortraitTag" label="个人画像标签(必要)" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.self}
          disabled={objectType === objectDict.legalPerson || disabled}
        />
      </TItem>
      <TItem name="personalUnnecessaryPortraitTag" label="个人画像标签(非必要)" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.self}
          disabled={objectType === objectDict.legalPerson || disabled}
        />
      </TItem>
      <TItem name="legalPersonPortraitTag" label="法人画像标签(必要)" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.legalPerson}
          disabled={objectType === objectDict.person || disabled}
        />
      </TItem>
      <TItem name="legalPersonUnnecessaryPortraitTag" label="法人画像标签(非必要)" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.legalPerson}
          disabled={objectType === objectDict.person || disabled}
        />
      </TItem>
      <TItem labelCol={{ span: 0 }} wrapperCol={{ span: 16 }} name="occupationTag">
        <MutiDictIdCascaderTable
          label="职业人群"
          name="occupationTag"
          dict="ZYRQ0001"
          disabled={disabled}
        />
      </TItem>

      <TItem labelCol={{ span: 0 }} wrapperCol={{ span: 16 }} name="currencyTag">
        <MutiDictIdCascaderTable
          label="通用行业标签"
          name="currencyTag"
          dict="TYHY1000"
          disabled={disabled}
        />
      </TItem>
      <TItem labelCol={{ span: 0 }} wrapperCol={{ span: 16 }} name="threeType">
        <MutiDictIdCascaderTable
          label="三级分类"
          name="threeType"
          dict={getDictType(objectType)}
          disabled={disabled}
          key={objectType}
        />
      </TItem>
    </TabForm.Tab>
  );
}

export default ConditionRelated;
