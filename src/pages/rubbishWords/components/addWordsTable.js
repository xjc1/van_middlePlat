import React, { useState } from "react";
import { TItem } from '@/components/tis_ui';
import { Input, Row, Table, Button, message } from "antd"
import EmptyFn from '@/utils/EmptyFn';
import _ from "lodash"

function AddWordsTable({ value = [], onChange = EmptyFn }) {
console.log("🚀 ~ file: addWordsTable.js ~ line 8 ~ AddWordsTable ~ value", value)

  const [inputValue, setInputValue] = useState(null);

  return (
    <div>
      <Row>
        <TItem col={20} wrapperCol={22}>
          <Input
            id="name"
            value={inputValue}
            onChange={(content) => {
              setInputValue(content.target.value)
            }}
          />
        </TItem>
        <TItem col={2} style={{ marginLeft: 10 }} >
          <Button type="primary" disabled={!inputValue} onClick={() => {
            if (inputValue) {
              const contentValue = inputValue.trim();
              const isExist = value.indexOf(contentValue) > -1;
              if (isExist) {
                message.info(`您已经添加过【${contentValue}】,请不要重复添加`)
              } else {
                onChange([...value, contentValue]);
                setInputValue(null)
              }
            } else {
              message.info("请先输入要添加的内容")
            }
          }}>
            添加
          </Button>
        </TItem>
        <TItem wrapperCol={24}>
          <Table
            columns={[{
              title: '名称',
              dataIndex: 'name',
            }, {
              title: '操作',
              dataIndex: 'id',
              width: 150,
              render: (text, record) => <a
                onClick={() => {
                  const newValue = value.filter(name => name !== record.name);
                  onChange(newValue)
                }}
              >删除</a>
            }]}
            pagination={{ defaultPageSize: 5 }}
            dataSource={value.map((item) => ({ name: item }))}
            rowKey="name"
          />
        </TItem>
      </Row>
    </div>
  )
}

export default AddWordsTable
