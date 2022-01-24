import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, Popover, Form, Input, Tooltip, Typography } from 'antd';
import _ from 'lodash';
import { TItem, FormRules } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import { DictSelect } from '@/components/bussinessComponents';
import DictAssistant from '@/utils/DictAssistant';

const defaultPageSize = 4;

function FormItemWithTable({ value = {}, onChange = EmptyFn, disabled }) {
  const handledValue = _.flatten(
    _.map(value, (v, k) => {
      return [...v.map(item => ({ sceneTag: k, tagContent: item, key: k + item }))];
    }),
  );
  const [visible, setVisible] = useState(false);
  const [dictMap, setDictMap] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    DictAssistant.fetchChildrenDictWithMemo('SCENETAG').then(resp => {
      const result = _.reduce(
        resp,
        (item, obj) => {
          const { name = '', code = '' } = obj;
          item[code] = name;
          return item;
        },
        {},
      );
      setDictMap(result);
    });
  }, []);

  function handleChangeTags(tags) {
    const resetValue = {};
    tags.forEach(({ sceneTag, tagContent }) => {
      resetValue[sceneTag] && resetValue[sceneTag].length
        ? resetValue[sceneTag].push(tagContent)
        : (resetValue[sceneTag] = [tagContent]);
    });
    return resetValue
  }

  function handleVisibleChange(visible) {
    setVisible(visible);
  }

  return (
    <Row>
      <Col>
        <TItem
          style={{
            marginBottom: 0,
          }}
        >
          <Popover
            title="添加主题标签"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            content={
              <div style={{ width: 600 }}>
                <Form
                  form={form}
                  initialValues={value}
                  onFinish={vals => {
                    const formatValue = handleChangeTags([...handledValue, { ...vals, key: Date.now() }]);
                    onChange(formatValue);
                    form.resetFields();
                    setVisible(false);
                  }}
                >
                  <TItem name="sceneTag" label="主题标签" rules={[FormRules.required('必填')]}>
                    <DictSelect dict="SCENETAG" />
                  </TItem>
                  <TItem name="tagContent" label="标签内容" rules={[FormRules.required('必填')]}>
                    <Input />
                  </TItem>
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                  </div>
                </Form>
              </div>
            }
            trigger="click"
          >
            {!disabled && <Button type="primary">添加</Button>}
          </Popover>
        </TItem>
      </Col>
      <Col span={24}>
        <Table
          bordered
          style={{ margin: '10px 0' }}
          pagination={{
            defaultPageSize,
          }}
          columns={[
            {
              title: '主题标签',
              dataIndex: 'sceneTag',
              render: tag => dictMap[tag],
            },
            {
              title: '标签内容',
              dataIndex: 'tagContent',
              width: '50%',
              render: tagContent => (
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                    ellipsis: true,
                  }}
                >
                  <Tooltip title={tagContent}>{tagContent}</Tooltip>
                </Typography.Paragraph>
              ),
            },
            {
              title: '操作',
              align: 'center',
              width: 100,
              render: (text, record) => (
                <span style={{ display: disabled ? 'none' : 'block' }}>
                  <a
                    onClick={() => {
                      const formatValue = handleChangeTags(_.filter(handledValue, ({ key }) => key !== record.key));
                      onChange(formatValue)
                    }}
                  >
                    删除
                  </a>
                </span>
              ),
            },
          ]}
          dataSource={handledValue}
          size="small"
        />
      </Col>
    </Row>
  );
}

export default FormItemWithTable;
