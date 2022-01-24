import React, { useState } from 'react';
import { TSelect } from '@/components/tis_ui';
import _ from 'lodash';
import Styles from './InterfaceSelect.less';
import { Form, Button, Divider, Row, Col, Tag } from 'antd';
import { PlusOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import InterfaceApiSelect from '@/pages/designStudios/components/InterfaceApiSelect';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import LabelValueOptions from './LabelValueOptions';

const requestTags = {
  query: <Tag color="blue">Q</Tag>,
  body: <Tag color="gold">B</Tag>,
};

function transformCtxField(ctxField) {
  return _.reduce(
    ctxField,
    (result, item, index) => {
      result[index] = item;
      return result;
    },
    {},
  );
}

function transformReqField(reqFields) {
  return _.reduce(
    reqFields,
    (result, { ctx, request }) => {
      result[request] = { ctx };
      return result;
    },
    {},
  );
}

function InterfaceFieldSelect({
  apis = [],
  valueAble = false,
  linkValueAble = false,
  renderResponse,
  ctxSchema = [],
  ctxField = [],
}) {
  const [responseFields, setResponseFields] = useState([]);
  const [requestFields, setRequestFields] = useState([]);
  const [ctxFields, setCtxFields] = useState(ctxField);

  return (
    <div className={Styles.interfaceSelect}>
      <Form.Item name="api" label="接口名称">
        <InterfaceApiSelect
          apis={apis}
          onResponseFields={setResponseFields}
          onRequestFields={setRequestFields}
        />
      </Form.Item>
      <div>
        <Divider>提交参数</Divider>
        <Row>
          <Col span={11} style={{ textAlign: 'center' }}>
            字段
          </Col>
          <Col span={2} style={{ textAlign: 'center' }} />
          <Col span={11} style={{ textAlign: 'center' }}>
            参数
          </Col>
        </Row>
        {_.map(requestFields, ({ type, desc, name }) => {
          return (
            <Row key={name}>
              <Col span={11}>
                <Form.Item name={['reqFields', `${name}__${type}`, 'ctx']}>
                  <TSelect
                    allowClear
                    showSearch
                    className={Styles.fieldSelect}
                    placeholder="选择您的字段"
                  >
                    {linkValueAble && (
                      <TSelect.Option value="$linkValue" label="ss">
                        <div>
                          <Tag color="blue">联动字段值</Tag>
                        </div>
                      </TSelect.Option>
                    )}

                    {valueAble && (
                      <TSelect.Option value="$value" label="ss">
                        <div>
                          <Tag color="blue">字段值</Tag>
                        </div>
                      </TSelect.Option>
                    )}

                    {_.map(ctxSchema, ({ description, pathKey }) => {
                      const pathKeyChain = _.join(pathKey, '.');
                      return (
                        <TSelect.Option key={pathKeyChain} value={pathKeyChain} label={description}>
                          <div>
                            <Tag color="gold">上下文</Tag>
                            {pathKeyChain}
                          </div>
                        </TSelect.Option>
                      );
                    })}
                  </TSelect>
                </Form.Item>
              </Col>
              <Col span={2} style={{ textAlign: 'center' }}>
                <SwapRightOutlined style={{ fontSize: '18px' }} />
              </Col>
              <Col span={11}>
                <Form.Item
                  name={['reqFields', `${name}__${type}`, 'request']}
                  initialValue={`${name}__${type}`}
                >
                  <TSelect
                    disabled
                    showSearch
                    className={Styles.fieldSelect}
                    placeholder="上下文字段"
                  >
                    <TSelect.Option value={`${name}__${type}`} label={desc}>
                      {requestTags[type]}
                      <span>{desc}</span>
                    </TSelect.Option>
                  </TSelect>
                </Form.Item>
              </Col>
            </Row>
          );
        })}
        <Divider>返回值设值</Divider>
        {renderResponse && renderResponse(responseFields)}
        {ctxFields.length > 0 && (
          <Row>
            <Col span={11} style={{ textAlign: 'center' }}>
              上下文
            </Col>
            <Col span={2} style={{ textAlign: 'center' }} />
            <Col span={11} style={{ textAlign: 'center' }}>
              返回值
            </Col>
          </Row>
        )}
        {_.map(ctxFields, ({ id }, index) => {
          return (
            <Row key={index}>
              <Col span={11}>
                <Form.Item name={['ctxField', index, 'consumer']}>
                  <TSelect showSearch className={Styles.fieldSelect} placeholder="选择您的字段">
                    {_.map(ctxSchema, ({ pathKey }) => {
                      const pathKeyChain = _.join(pathKey, '.');
                      return (
                        <TSelect.Option
                          key={pathKeyChain}
                          value={pathKeyChain}
                          label={pathKeyChain}
                        >
                          <div>{pathKeyChain}</div>
                        </TSelect.Option>
                      );
                    })}
                  </TSelect>
                </Form.Item>
              </Col>
              <Col span={2} style={{ textAlign: 'center' }}>
                <SwapLeftOutlined style={{ fontSize: '18px' }} />
              </Col>
              <Col span={11}>
                <Form.Item name={['ctxField', index, 'publisher']}>
                  <TSelect showSearch className={Styles.fieldSelect} placeholder="上下文字段">
                    {_.map(responseFields, ({ pathKey, desPath }) => {
                      const pathKeyChain = _.join(pathKey, '.');
                      const desPathChain = _.join(desPath, '.');
                      return (
                        <TSelect.Option
                          key={pathKeyChain}
                          value={pathKeyChain}
                          label={desPathChain}
                        >
                          <div>{desPathChain}</div>
                        </TSelect.Option>
                      );
                    })}
                  </TSelect>
                </Form.Item>
              </Col>
            </Row>
          );
        })}
        <Divider>
          <Button
            type="primary"
            style={{
              paddingLeft: '1px',
              paddingBottom: '1px',
            }}
            onClick={() => {
              setCtxFields([
                ..._.map(ctxFields, (val, key) => {
                  return {
                    id: key,
                    ...val,
                  };
                }),
                {
                  id: IDGenerator.nextName('preEvents', 10),
                  ctxField: undefined,
                  responseField: undefined,
                },
              ]);
            }}
            icon={<PlusOutlined />}
            size="small"
          >
            添加新设值
          </Button>
        </Divider>
      </div>
    </div>
  );
}

export default connect(({ interfaceManage, formDesigner }) => {
  return {
    apis: interfaceManage.apis,
    ctxSchema: formDesigner.ctxSchema,
  };
})(InterfaceFieldSelect);

export { transformCtxField, transformReqField, LabelValueOptions };
