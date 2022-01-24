/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import classNames from 'classnames';
import { useUpdateEffect } from 'ahooks';
import { CloseOutlined, MinusOutlined } from '@ant-design/icons';
import Styles from './index.less';
import EmptyFn from '../utils/EmptyFn';

const { Text } = Typography;

const colors = ['blue', 'red', 'purple', 'green'];

const circleColors = {
  blue: '#91d5ff',
  red: '#ffccc7',
  purple: '#d3adf7',
  green: '#d9f7be',
};

function Tooltip({
  children,
  width,
  height,
  point,
  tip,
  onChange = EmptyFn,
  onClose = EmptyFn,
  onDelete = EmptyFn,
}) {
  const [activeColor, setActiveColor] = useState(tip.color);

  const {
    source: { text },
  } = tip;

  useUpdateEffect(() => {
    onChange({
      ...tip,
      color: activeColor,
    });
  }, [activeColor]);

  return (
    <div>
      <div
        className={Styles.highLightTooltip}
        style={{
          width,
          height,
          top: point.top - height - 10,
          left: point.left < width / 2 ? 0 : point.left - width / 2,
        }}
      >
        <Row>
          <Col span={20}>
            <Row>
              {colors.map(color => {
                return (
                  <Col span={6} key={color}>
                    <div
                      className={classNames(
                        Styles.highLightCircle,
                        activeColor === color && Styles.highLightCircleActive,
                      )}
                      style={{ backgroundColor: circleColors[color] }}
                      onClick={() => {
                        setActiveColor(color);
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col
            span={4}
            style={{
              textAlign: 'right',
            }}
          >
            <CloseOutlined onClick={onClose} />
          </Col>
        </Row>
        <Text ellipsis copyable>
          {text}
        </Text>
        {children}
        <div className={Styles.highLightTooltipFooter}>
          <div
            onClick={() => {
              onDelete(tip);
            }}
            className={Styles.highLightDelete}
          >
            <MinusOutlined /> 删除
          </div>
        </div>
      </div>
      <div
        className={Styles.highLightTooltipArrow}
        style={{ top: point.top - 15, left: point.left < 0 ? 0 : point.left }}
      />
    </div>
  );
}

Tooltip.defaultProps = {
  width: 200,
  height: 100,
  tip: {},
};

export default Tooltip;
