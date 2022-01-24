import { FormCard, TItem } from '@/components/tis_ui';
import React from 'react';
import PortraitTag from './components/portraitTagSelect';
import { appUserType } from '@/utils/constantEnum';

function LegalPersonTag({ disabled }) {
  return (
    <FormCard title="法人画像信息" bordered={false}>
      <TItem name="legalOutputLinkedTags" label="画像标签">
        <PortraitTag disabled={disabled} object={appUserType.legalPerson} />
      </TItem>
    </FormCard>
  );
}
export default LegalPersonTag;
