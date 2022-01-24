/* eslint-disable no-nested-ternary */
import { Form, Input, Select, Button, List, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { TItem, TButton, ModalForm } from '@/components/tis_ui';
import { connect } from 'dva';
import { functionType } from '@/utils/constantEnum';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function Index({ onCancel, isCheck, data = {}, dispatch }) {
  let [form] = Form.useForm();
  const [wordList, setWordList] = useState([]);
  const [type, setType] = useState(data.type);
  useEffect(() => {
    if (data.word && data.word.length > 0) {
      setWordList(
        data.word.map(item => {
          return { name: item, key: uuid() };
        }),
      );
    }
  }, []);
  function onFinish() {
    form.current.validateFields().then(resp => {
      if (type === 1 && wordList.length === 0) {
        message.info('请至少加一条同义词描述');
      } else {
        const { word } = resp;
        const req_body = {
          type: resp.type,
          word: type === 1 ? wordList.map(({ name }) => name) : _.isArray(word) ? word : [word],
          id: data.id,
        };
        dispatch({
          type: data.id ? 'functionWord/updateFunction' : 'functionWord/addFunction',
          data: req_body,
        });
      }
      onCancel();
    });
  }
  return (
    <div>
      <ModalForm
        onForm={resForm => {
          form = resForm;
        }}
        visible
        title="功能词维护"
        okText="确认"
        cancelText="取消"
        width="40%"
        maskClosable={false}
        handleCancel={onCancel}
        initialValues={{
          ...data,
          word: data.type === 1 ? '' : data.word,
        }}
        footer={
          <>
            <Button onClick={onCancel}>取消</Button>
            {!isCheck && (
              <TButton.Button type="primary" ghost={false} onClick={onFinish}>
                提交
              </TButton.Button>
            )}
          </>
        }
      >
        <TItem
          name="type"
          label="功能词类型"
          rules={[{ required: true, message: '功能词类型不能为空!' }]}
        >
          <Select
            disabled={isCheck}
            allowClear
            onChange={val => {
              setType(val);
              if (val !== 1) setWordList([]);
            }}
          >
            {_.map(functionType, (value, key) => (
              <Select.Option key={key} value={value}>
                {functionType.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        {type === 1 ? (
          <>
            <Row>
              <TItem
                col={18}
                name="word"
                label="功能词描述"
                {...layout}
                rules={type !== 1 && [{ required: true, message: '对象类型不能为空!' }]}
              >
                <Input disabled={isCheck} />
              </TItem>
              <TItem col={6}>
                <TButton.Button
                  disabled={isCheck}
                  onClick={() => {
                    const value = form.current.getFieldsValue();
                    if (_.find(wordList, { name: value.word })) {
                      message.warning('已经添加过此条数据，请不要重复添加');
                      return;
                    }
                    setWordList([...wordList, { name: value.word, key: uuid() }]);
                    form.current.setFieldsValue({ word: undefined });
                  }}
                >
                  添加
                </TButton.Button>
              </TItem>
            </Row>

            <TItem label="已添加列表">
              <List
                dataSource={wordList}
                style={{
                  width: '100%',
                }}
                bordered
                disabled={isCheck}
                pagination={{ pageSize: 5 }}
                itemLayout="vertical"
                renderItem={({ key, name }) => (
                  <List.Item
                    id="content"
                    key={key}
                    extra={
                      <a
                        disabled={isCheck}
                        onClick={() => setWordList(wordList.filter(item => item.key !== key))}
                      >
                        删除
                      </a>
                    }
                  >
                    {name}
                  </List.Item>
                )}
              />
            </TItem>
          </>
        ) : (
          <TItem
            name="word"
            label="功能词描述"
            rules={[{ required: true, message: '对象类型不能为空!' }]}
          >
            <Input disabled={isCheck} />
          </TItem>
        )}
      </ModalForm>
    </div>
  );
}
export default connect(({ functionWord }) => functionWord)(Index);
