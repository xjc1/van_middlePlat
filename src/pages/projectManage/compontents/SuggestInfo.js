import React from 'react';
import { TabForm, TItem } from '@/components/tis_ui';
import {
  MutiDictIdCascaderTable,
  PortraitTagDrawerSelect,
  ConditionDesigner,
} from '@/components/bussinessComponents';
import { objectDict } from '@/constants';
import { appUserType } from '@/utils/constantEnum';
import InputWithTable from '@/pages/triggerWords/triggerWordForm/inputWithTable';
import getDictType from '@/utils/threeTypeByObject';
import PortraitTagRelated from './PortraitTagRelated';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function SuggestInfo(props) {
  const { editVisible, portraitType, conditionText, targetId } = props;
  return (
    <TabForm.Tab {...props}>
      {targetId && (
        <TItem label="条件拆解" name="minimalConditionRelation" {...layout}>
          <ConditionDesigner
            base64
            content={conditionText}
            disabled={!editVisible}
            objectType={portraitType}
          />
        </TItem>
      )}
      {targetId && (
        <TItem label="画像标签" name="minimalConditionPortraits" {...layout}>
          <PortraitTagRelated projectId={targetId} />
        </TItem>
      )}
      <TItem name="personalPortraitTag" label="个人画像标签(必要)" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.self}
          disabled={portraitType === objectDict.legalPerson || !editVisible}
        />
      </TItem>
      <TItem name="personalUnnecessaryPortraitTag" label="个人画像标签(非必要)" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.self}
          disabled={portraitType === objectDict.legalPerson || !editVisible}
        />
      </TItem>
      <TItem name="legalPersonPortraitTag" label="法人画像标签(必要)" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.legalPerson}
          disabled={portraitType === objectDict.person || !editVisible}
        />
      </TItem>
      <TItem name="legalPersonUnnecessaryPortraitTag" label="法人画像标签(非必要)" {...layout}>
        <PortraitTagDrawerSelect
          type={appUserType.legalPerson}
          disabled={portraitType === objectDict.person || !editVisible}
        />
      </TItem>
      <TItem name="suggestTags" label="推荐展示标签" {...layout}>
        <InputWithTable isCheck={!editVisible} />
      </TItem>
      <TItem name="classification" wrapperCol={{ span: 24 }}>
        <MutiDictIdCascaderTable
          label="项目分类"
          name="classification"
          dict="XMYLNEW"
          disabled={!editVisible}
          labelCol={4}
          contentCol={16}
        />
      </TItem>
      <TItem name="projectTypes" wrapperCol={{ span: 24 }}>
        <MutiDictIdCascaderTable
          label="项目类型"
          dict={getDictType(portraitType)}
          key={portraitType}
          name="classification"
          disabled={!editVisible}
          labelCol={4}
          contentCol={16}
        />
      </TItem>
    </TabForm.Tab>
  );
}

export default SuggestInfo;
