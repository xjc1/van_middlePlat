import React from 'react';
import _ from 'lodash';
import { List, Row, Col, InputNumber, message } from 'antd';
import { modulesContentType } from '@/utils/constantEnum';

const defaultValue = _.map(modulesContentType, v => {
  return { contentType: v };
});

function Index({ value = defaultValue, onChange, disabled }) {
  const dataSource = _.map(value, ({ contentType, percent }) => {
    return {
      contentType,
      name: modulesContentType.$v_names[contentType],
      key: contentType,
      percent,
    };
  });
  const count = _.reduce(
    value,
    (result, { percent = 0 }) => {
      return result + percent;
    },
    0,
  );
  return (
    <List
      bordered
      dataSource={dataSource}
      renderItem={item => (
        <List.Item>
          <Row style={{ minWidth: 180 }}>
            <Col span={8}>{item.name}</Col>
            <Col span={16}>
              <InputNumber
                min={0}
                max={100}
                value={item.percent}
                disabled={disabled}
                onChange={nextPercent => {
                  const { percent: currentPercent = 0 } = item;
                  if (count - currentPercent + nextPercent > 100) {
                    message.warning('百分比总和不得超过100%');
                    return;
                  }
                  const { contentType } = item;
                  const index = _.findIndex(dataSource, { key: contentType });
                  const newValue = [...value];
                  newValue[index] = { ...newValue[index], percent: nextPercent };
                  onChange(newValue);
                }}
              />
              <span> %</span>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
}

export default Index;
