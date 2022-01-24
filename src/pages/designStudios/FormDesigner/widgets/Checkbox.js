import React from 'react';
import { Checkbox, Form, Row, Col } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import { getlabel } from './tools';

const defaultStyles = {
  width: '100%',
};

const CheckboxHoc = React.memo(
  ({
    id,
    extraClass = [],
    style = defaultStyles,
    disabled,
    readonly,
    label,
    innerSpan,
    displayName,
    orderIndex,
    className,
    itemSpan = 8,
    dataSource = {},
  }) => {
    const { staticItems = [] } = dataSource;
    const cleanItems = _.filter(staticItems, obj => obj && obj.label && obj.value);

    return (
      <Form.Item
        className={className}
        name={id}
        label={getlabel(displayName, label, orderIndex)}
        {...innerSpan}
      >
        <Checkbox.Group style={style} className={classNames(extraClass)}>
          <Row>
            {_.map(cleanItems, ({ label: text, value }) => {
              return (
                <Col span={itemSpan} key={value}>
                  <Checkbox value={value} disabled={disabled || readonly}>
                    {text}
                  </Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    );
  },
);

export default CheckboxHoc;
