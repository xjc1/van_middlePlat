/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Button, Card, Form, Row, Space } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import _ from 'lodash';
import EmptyFn from '../utils/EmptyFn';

const bodyStyle = {
  padding: '15px 20px',
  background: 'white',
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function QueryBarCard({
  children,
  className,
  actions,
  footer,
  onForm = EmptyFn,
  initialValues = {},
  ...others
}) {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const validChildren = _.isArray(children) ? children.filter(Boolean) : children;

  const items = _.isArray(validChildren)
    ? _.filter(validChildren, ({ props }) => !props.expanded)
    : validChildren;

  onForm(form);
  return (
    <Card className={classnames(className, styles.querybar)} bodyStyle={bodyStyle}>
      <Form form={form} initialValues={initialValues} {...layout} {...others}>
        <Row>{expand ? validChildren : items}</Row>
        {(actions || footer) && (
          <div
            style={{
              textAlign: 'right',
              marginTop: 10,
              paddingTop: 10,
              minHeight: 20,
              borderTop: '1px solid #ddd',
            }}
          >
            <div style={{ float: 'left' }}>
              <Space>{actions}</Space>
            </div>
            <Space>
              {footer}
              {items.length < validChildren.length && (
                <Button
                  type="link"
                  size="small"
                  icon={expand ? <UpOutlined /> : <DownOutlined />}
                  style={{
                    fontSize: 12,
                    color: '#1890ff',
                  }}
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  {expand ? '收起' : '展开'}
                </Button>
              )}
            </Space>
          </div>
        )}
      </Form>
    </Card>
  );
}

export default QueryBarCard;
