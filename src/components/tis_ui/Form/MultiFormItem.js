/* eslint-disable import/no-extraneous-dependencies  */
import React, { useState } from 'react';
import { Row, Button, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import TItem from './TItem';
import multiCardStyle from './multiFormItem.less';

function MultiFormItem({ label, name, indx = 1, children }) {
  const [items, setItems] = useState(
    _.map(new Array(indx), (val, index) => ({ key: index, valid: true })),
  );

  const validItems = _.filter(items, item => item.valid);

  return (
    <Col span={24}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Col span={6} className={multiCardStyle.multiLabel}>
          <span className={multiCardStyle.label}>{label}</span>
        </Col>
        <Col span={16}>
          {_.map(validItems, validItem => (
            <Row key={`${name}_${validItem.key}`}>
              <TItem
                col={20}
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                label=""
                name={[name, `${validItem.key}`]}
              >
                {children()}
              </TItem>
              <Col span={4}>
                {validItems.length > 1 && (
                  <Button
                    type="ghost"
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      validItem.valid = false;
                      setItems([...items]);
                    }}
                    icon={<MinusOutlined />}
                    size="normal"
                  />
                )}
                {validItem.key === validItems[validItems.length - 1].key && (
                  <Button
                    type="primary"
                    style={{ marginLeft: 10 }}
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setItems([...items, { key: items.length, valid: true }]);
                    }}
                    size="normal"
                  />
                )}
              </Col>
            </Row>
          ))}
        </Col>
      </div>
    </Col>
  );
}

export default MultiFormItem;
