import React from 'react';
import { objectDict } from '@/constants';
import { PortraitTagDrawerSelect } from '@/components/bussinessComponents';
import { appUserType } from '@/utils/constantEnum';

const portraitSelect = (type, props = {}) => {
  const map = {
    [objectDict.person]: <PortraitTagDrawerSelect type={appUserType.self} {...props} />,
    [objectDict.legalPerson]: <PortraitTagDrawerSelect type={appUserType.legalPerson} {...props} />,
  };
  return map[type];
};

function PortraitTagSelect({ type, ...props }) {
  return portraitSelect(type, props);
}

export default PortraitTagSelect;
