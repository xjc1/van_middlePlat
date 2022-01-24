import React from 'react';
import { useDrag } from '@/components/react-dnd';
import classNames from 'classnames';
import { Col } from 'antd';
import Styles from './index.less';
import { infoes } from '@/pages/designStudios/FormDesigner/widgets';
import { oneFormAction } from '@/utils/constantEnum';

function LayoutElement({ name, displayName, field, ...others }) {
  const [{ opacity }, dragRef] = useDrag({
    item: {
      type: 'formElement',
      action: oneFormAction.addField,
      element: {
        ...infoes[field].element,
        name,
        displayName,
        ...others,
      },
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
        <i className={classNames(Styles.wrapperIcon, infoes[field].iconfont)} />
        {`${displayName}[${name}]`}
      </div>
    </Col>
  );
}

export default LayoutElement;
