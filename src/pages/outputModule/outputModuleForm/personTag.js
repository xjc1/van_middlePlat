import { FormCard, TItem } from '@/components/tis_ui';
import React from 'react';
import PortraitTag from '@/pages/outputModule/outputModuleForm/components/portraitTagSelect';
import { appUserType } from '@/utils/constantEnum';

function PersonTag({ disabled }) {
  return (
    <FormCard title="个人画像信息" bordered={false}>
      <TItem name="personalOutputLinkedTags" label="画像标签">
        <PortraitTag disabled={disabled} object={appUserType.self} />
      </TItem>
    </FormCard>
  );
}
export default PersonTag;
