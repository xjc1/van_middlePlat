import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { Col, Typography } from 'antd';
import { ElementType } from '../types';
import Styles from './styles.less';
import { confirmAble } from '@/components/tis_ui';
import { DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from '@/components/react-dnd';
import RenderWrapper from './RenderWrapper';
import RenderWidget from './RenderWidget';
import RenderUnit from './RenderUnit';
import { connect } from 'dva';
import { oneFormAction } from '@/utils/constantEnum';

const { Paragraph } = Typography;

const positionBordered = {
  inside: {
    border: '1px solid #1890ff',
  },
  left: {},
  right: {},
};

function getPositionBordered(isActive, position) {
  return isActive && positionBordered[position];
}

function FrWrapper({ type, col = 24, content = [], selectedItem = {}, dispatch, id, ...others }) {
  const { id: selectedId = '' } = selectedItem;
  const boxRef = useRef(null);
  const [position, setPosition] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [active, setActive] = useState(false);
  const { name } = others;
  const [{ isDragging, opacity }, dragRef, dragPreview] = useDrag({
    item: {
      type: 'formElement',
      action: oneFormAction.moveElement,
      eType: type,
      id,
    },
    begin: () => {
      // dragBegin($id);
      dispatch({
        type: 'formDesigner/dragBegin',
        id,
      });
    },
    end: () => {},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'formElement',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop || isDragging) {
        return;
      }

      if (item.id === id) {
        return;
      }

      switch (item.action) {
        case oneFormAction.addWrapper:
          dispatch({
            type: 'formDesigner/addWrapper',
            payload: {
              type,
              position,
              id,
              element: item.element,
            },
          });
          break;
        case oneFormAction.addField:
          dispatch({
            type: 'formDesigner/addField',
            payload: {
              type,
              position,
              id,
              element: item.element,
            },
          });
          break;
        case oneFormAction.addUnit:
          dispatch({
            type: 'formDesigner/addUnit',
            payload: {
              type,
              position,
              id,
              element: item.element,
            },
          });
          break;
        default:
          dispatch({
            type: 'formDesigner/dragEnd',
            payload: {
              type,
              position,
              id,
            },
          });
          break;
      }
    },
    hover: (item, monitor) => {
      // 只检查被hover的最小元素
      const didHover = monitor.isOver({ shallow: false });
      if (didHover) {
        // Determine rectangle on screen
        const hoverBoundingRect = boxRef.current && boxRef.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        const dragOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientX = dragOffset.x - hoverBoundingRect.left;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (type === ElementType.WRAPPER) {
          setPosition('inside');
        } else {
          if (hoverClientX <= hoverMiddleX) {
            setPosition('left');
          }
          // Dragging upwards
          if (hoverClientX > hoverMiddleX) {
            setPosition('right');
          }
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: false }),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleMouseEnter = e => {
    e.stopPropagation();
    setActive(true);
  };

  const handleMouseLeave = e => {
    e.stopPropagation();
    setActive(false);
  };

  function handleDeleteElement(e) {
    e.stopPropagation();
    confirmAble({
      confirmText: '确定要删除此字段吗?',
      onClick() {
        dispatch({
          type: 'formDesigner/deleteElement',
          id,
        });
      },
    })();
  }

  const handleClick = e => {
    e.stopPropagation();
    dispatch({
      type: 'formDesigner/selectedItem',
      id,
    });
  };

  dragPreview(dropRef(boxRef));
  const isActive = canDrop && isOver;

  return (
    <Col
      ref={boxRef}
      className={classNames(
        Styles.frElement,
        content.length > 0 ? Styles.contentWrapper : Styles.widgetWrapper,
        id === selectedId && Styles.selected,
      )}
      style={{ opacity, ...getPositionBordered(isActive, position) }}
      span={col}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={Styles.dragBox} ref={dragRef} />
      <LeftOutlined
        className={Styles.arrowLeft}
        style={{ display: isActive && position === 'left' ? 'flex' : 'none' }}
      />
      {type === ElementType.WRAPPER && <RenderWrapper id={id} content={content} {...others} />}

      {type === ElementType.WIDGET && <RenderWidget id={id} {...others} />}

      {type === ElementType.UNIT && <RenderUnit id={id} {...others} />}

      <RightOutlined
        className={Styles.arrowRight}
        style={{ display: isActive && position === 'right' ? 'flex' : 'none' }}
      />
      <div className={Styles.extraOper} onClick={e => e.stopPropagation()}>
        <Paragraph className={classNames(Styles.extraOper_icon, Styles.extraOper_copy)} copyable>
          <div className={Styles.extraOper_name}>{name || id}</div>
        </Paragraph>
        <DeleteOutlined
          onClick={handleDeleteElement}
          className={classNames(
            Styles.extraOper_icon,
            Styles.extraOper_warring,
            Styles.extraOper_top,
          )}
        />
      </div>
    </Col>
  );
}

export default connect(({ formDesigner }) => {
  return {
    selectedItem: formDesigner.selectedItem || {},
  };
})(FrWrapper);
