import React from 'react';
import widgets, { names as widgetNames, defaultSpan } from '../../widgets';
import { oneFormWidgetStatus } from '@/utils/constantEnum';
import Styles from './styles.less';

function RenderWidget({ field = widgetNames.input, innerSpan = defaultSpan, ...others }) {
  const { initState = oneFormWidgetStatus.visible } = others;
  const FieldRender = widgets[field];
  return <FieldRender className={Styles[`${initState}Status`]} innerSpan={innerSpan} {...others} />;
}

export default RenderWidget;
