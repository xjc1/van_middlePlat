/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import _ from 'lodash';
import { Form, Button, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Styles from './TFormList.less';
import { EmptyAsyncFn } from '../utils/EmptyFn';

const defaultLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function TFormList({
  removeAble = true,
  children,
  labelCol = defaultLayout.labelCol,
  wrapperCol = defaultLayout.wrapperCol,
  addText = '新增',
  onDelete = EmptyAsyncFn,
  disabled = false,
  ...others
}) {
  return (
    <Form.List labelCol={labelCol} wrapperCol={wrapperCol} {...others}>
      {(fields = [], { add, remove }) => {
        return (
          <div className={Styles.tFormList}>
            {_.map(fields, field => {
              const { key, ...otherFields } = field;
              return (
                <div key={key} className={Styles.tFormListLine}>
                  {children({
                    ...otherFields,
                    labelCol,
                    isSingle: fields.length === 1,
                    isFirst: field.name === 0,
                    wrapperCol: {
                      span: removeAble ? wrapperCol.span - 2 : wrapperCol.span,
                    },
                  })}
                  {fields.length > 1 && removeAble && !disabled && (
                    <Col className={Styles.tFormListLineExtra} span={1} offset={20}>
                      <Form.Item wrapperCol={{ span: wrapperCol.span, offset: labelCol.span }}>
                        <Button
                          danger
                          type="dashed"
                          onClick={() => {
                            onDelete().then(() => {
                              remove(field.name);
                            });
                          }}
                          icon={<MinusOutlined />}
                        >
                          删除
                        </Button>
                      </Form.Item>
                    </Col>
                  )}
                </div>
              );
            })}
            {!disabled && (
              <Form.Item
                wrapperCol={{ span: wrapperCol.span, offset: labelCol.span }}
                className={Styles.tFormListFootbar}
              >
                <Button type="dashed" block onClick={() => add()} icon={<PlusOutlined />}>
                  {addText}
                </Button>
              </Form.Item>
            )}
          </div>
        );
      }}
    </Form.List>
  );
}

export default TFormList;
