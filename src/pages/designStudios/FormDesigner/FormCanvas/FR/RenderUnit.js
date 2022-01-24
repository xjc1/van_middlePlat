import React from 'react';
import units, { names as unitNames } from '../../units';
import ErrorUnit from './ErrorUnit';
import { oneFormUnitStatus } from '@/utils/constantEnum';
import Styles from './styles.less';

function RenderUnit({ field = unitNames.button, ...others }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentState, initState = oneFormUnitStatus.visible } = others;
  const UnitRender = units[field];
  return UnitRender ? (
    <UnitRender className={Styles[`${initState}Status`]} {...others} />
  ) : (
    <ErrorUnit />
  );
}

export default RenderUnit;
