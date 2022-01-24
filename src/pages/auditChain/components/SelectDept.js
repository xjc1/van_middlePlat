import React, { useState } from 'react';
import { Row, Col, message } from 'antd';
import {
  VerticalAlignTopOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import { TButton, TTable, OperateBar } from '@/components/tis_ui';
import EmptyFn from '@/utils/EmptyFn';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

const ORDER = {
  UP: 'up',
  DOWN: 'down',
  TOP: 'top',
  BOTTOM: 'bottom',
};

function SelectDept({ value = [], onChange = EmptyFn, columns = [], disabled = false }) {
  const [depts, setDepts] = useState([]);

  function handleSubmit() {
    if (depts.length === 0) {
      message.error('不允许添加空值');
      return null;
    }

    const inter = _.intersectionBy(value, depts, 'key');
    if (inter.length > 0) {
      message.error('请勿重复添加');
      return null;
    }

    const handledDepts = depts.map((item, index) => ({ ...item, order: index + value.length + 1 }));

    setDepts([]);
    onChange([...value, ...handledDepts]);
  }

  function handleDelete(record) {
    const recordIdx = value.findIndex(({ key }) => key === record.key);
    value.splice(recordIdx, 1);
    onChange(
      value.map((item, index) => {
        if (index >= recordIdx) {
          return {
            ...item,
            order: item.order - 1,
          };
        }
        return { ...item };
      }),
    );
  }

  function handleOrder(record, order) {
    const changeOrder = new Map([
      [
        ORDER.TOP,
        () =>
          onChange(
            value
              .map(item => ({ ...item, order: item.key === record.key ? 1 : item.order + 1 }))
              .sort((a, b) => a.order - b.order),
          ),
      ],
      [
        ORDER.UP,
        () => {
          onChange(
            value
              .map(item => {
                if (item.order === record.order - 1) {
                  return { ...item, order: item.order + 1 };
                }
                if (item.key === record.key) {
                  return { ...item, order: item.order - 1 };
                }
                return { ...item };
              })
              .sort((a, b) => a.order - b.order),
          );
        },
      ],
      [
        ORDER.DOWN,
        () =>
          onChange(
            value
              .map(item => {
                if (item.order === record.order + 1) {
                  return { ...item, order: item.order - 1 };
                }
                if (item.key === record.key) {
                  return { ...item, order: item.order + 1 };
                }
                return { ...item };
              })
              .sort((a, b) => a.order - b.order),
          ),
      ],
      [
        ORDER.BOTTOM,
        () =>
          onChange(
            value
              .map(item => {
                if (item.order > record.order) {
                  return { ...item, order: item.order - 1 };
                }
                if (item.key === record.key) {
                  return { ...item, order: value.length };
                }
                return { ...item };
              })
              .sort((a, b) => a.order - b.order),
          ),
      ],
    ]);

    changeOrder.get(order)();
  }

  return (
    <Row>
      {!disabled && (
        <>
          <Col span={20}>
            <DepartmentTreeSelect
              value={depts}
              labelInValue
              multiple
              allowClear
              onChange={(vals = []) => {
                setDepts(vals && vals.map(item => ({ ...item, key: item.value })));
              }}
            />
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <TButton.Button onClick={handleSubmit}>添加</TButton.Button>
          </Col>
        </>
      )}
      <Col span={24} style={{ marginTop: '10px' }}>
        <TTable
          size="small"
          bordered
          pagination={{ defaultPageSize: 5 }}
          columns={[
            ...columns,
            {
              title: '操作',
              width: 200,
              align: 'center',
              render: (text, record) =>
                !disabled && (
                  <OperateBar
                    more={
                      <>
                        <OperateBar.Button
                          icon={<VerticalAlignTopOutlined />}
                          disabled={record.order === 1}
                          onClick={() => handleOrder(record, ORDER.TOP)}
                        >
                          置顶
                        </OperateBar.Button>
                        <OperateBar.Button
                          icon={<ArrowUpOutlined />}
                          disabled={record.order === 1}
                          onClick={() => handleOrder(record, ORDER.UP)}
                        >
                          上移
                        </OperateBar.Button>
                        <OperateBar.Button
                          icon={<ArrowDownOutlined />}
                          disabled={record.order === value.length}
                          onClick={() => handleOrder(record, ORDER.DOWN)}
                        >
                          下移
                        </OperateBar.Button>
                        <OperateBar.Button
                          icon={<VerticalAlignBottomOutlined />}
                          disabled={record.order === value.length}
                          onClick={() => handleOrder(record, ORDER.BOTTOM)}
                        >
                          置底
                        </OperateBar.Button>
                      </>
                    }
                  >
                    <OperateBar.Button onClick={() => handleDelete(record)}>删除</OperateBar.Button>
                  </OperateBar>
                ),
            },
          ]}
          dataSource={value}
          rowKey="key"
        />
      </Col>
    </Row>
  );
}

export default SelectDept;
