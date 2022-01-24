import React from 'react';
import Styles from './styles.less';
import { useDrop } from '@/components/react-dnd';
import { ElementType } from './types';
import { connect } from 'dva';
import { oneFormAction } from '@/utils/constantEnum';

function PageWrapper({ children, dispatch }) {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'formElement',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      switch (item.action) {
        case oneFormAction.addWrapper:
          dispatch({
            type: 'formDesigner/addWrapper',
            payload: {
              type: ElementType.PAGE,
              element: item.element,
            },
          });
          break;

        case oneFormAction.addField:
          dispatch({
            type: 'formDesigner/addField',
            payload: {
              type: ElementType.PAGE,
              element: item.element,
            },
          });
          break;

        case oneFormAction.addUnit:
          dispatch({
            type: 'formDesigner/addUnit',
            payload: {
              type: ElementType.PAGE,
              element: item.element,
            },
          });
          break;
        default:
          dispatch({
            type: 'formDesigner/dragEnd',
            payload: {
              type: ElementType.PAGE,
            },
          });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: false }),
    }),
  });

  return (
    <div
      className={Styles.pageWrapper}
      ref={dropRef}
      onClick={e => {
        e.stopPropagation();
        dispatch({
          type: 'formDesigner/resetSelected',
        });
      }}
    >
      {children}
    </div>
  );
}

export default connect()(PageWrapper);
