import React from 'react';
import _ from 'lodash';
import { Col, Form, Input, Row } from 'antd';
import { QuestionOutlined, SwapLeftOutlined } from '@ant-design/icons';
import { TSelect } from '@/components/tis_ui';
import Styles from '@/pages/designStudios/widgetWrapperView/index.less';

function LabelValueOptions({ responseFields = [] }) {
  return (
    <>
      {_.map(['label', 'value'], widgetField => (
        <Row key={widgetField}>
          <Col span={11}>
            <Input prefix={<QuestionOutlined />} placeholder={widgetField} disabled />
          </Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            <SwapLeftOutlined style={{ fontSize: '18px' }} />
          </Col>
          <Col span={11}>
            <Form.Item name={['select', widgetField]}>
              <TSelect showSearch className={Styles.fieldSelect} placeholder="上下文字段">
                {_.map(
                  responseFields.filter(({ parentType }) => parentType === 'array'),
                  ({ pathKey, desPath }) => {
                    const pathKeyChain = _.join(pathKey, '.');
                    const desPathChain = _.join(desPath, '.');
                    return (
                      <TSelect.Option key={pathKeyChain} value={pathKeyChain} label={desPathChain}>
                        <div>{desPathChain}</div>
                      </TSelect.Option>
                    );
                  },
                )}
              </TSelect>
            </Form.Item>
          </Col>
        </Row>
      ))}
    </>
  );
}

export default LabelValueOptions;
