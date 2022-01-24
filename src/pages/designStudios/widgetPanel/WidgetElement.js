import React from 'react';
import { useDrag } from '@/components/react-dnd';
import classNames from 'classnames';
import { Col } from 'antd';
import Styles from './index.less';
import { oneFormAction } from '@/utils/constantEnum';

function WidgetElement({ iconfont, name, element }) {
  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: 'formElement',
      action: oneFormAction.addWrapper,
      element,
    },
    begin: () => {},
    end: () => {},

    collect: monitor => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  return (
    <Col ref={dragRef} style={{ opacity }} className={Styles.elementPanel_Item} span={24}>
      <div>
        <i className={classNames(Styles.wrapperIcon, iconfont)} />
        {name}
      </div>
    </Col>
  );
}

export default WidgetElement;
