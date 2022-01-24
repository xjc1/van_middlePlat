import React, { useEffect, useState } from 'react';
import { DatePicker, Col, Row, Button, Table, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EmptyFn from '@/utils/EmptyFn';
import { utils } from '@/components/tis_ui';
import _ from 'lodash';

const { IDGenerator } = utils;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const idGenerator = new IDGenerator('time');

function TimeTable({ value = [], onChange = EmptyFn, disabled }) {
  const [tableVals, setTableVals] = useState(value);
  const [timeTemp, setTimeTemp] = useState();

  useEffect(() => {
    onChange(tableVals);
  }, [tableVals]);

  return (
    <Col span={24}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Col span={22}>
          <Row>
            {!disabled && (
              <>
                <RangePicker
                  showTime
                  format={dateFormat}
                  value={timeTemp}
                  onChange={val => {
                    setTimeTemp(val);
                  }}
                />

                <Button
                  type="primary"
                  disabled={!timeTemp}
                  style={{ marginLeft: 10 }}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const [startTime, endTime] = timeTemp;
                    const newVals = [
                      ...tableVals,
                      {
                        startTime: startTime.format(dateFormat),
                        endTime: endTime.format(dateFormat),
                        key: idGenerator.next(),
                        main: tableVals.length === 0,
                      },
                    ];
                    setTableVals(newVals);
                    setTimeTemp(null);
                  }}
                  size="normal"
                />
              </>
            )}
          </Row>
          <Row>
            <Col span={24}>
              <Table
                disabled={disabled}
                bordered
                locale={{
                  emptyText: '已选列表',
                }}
                // showHeader={false}
                style={{ margin: '10px 0' }}
                pagination={{
                  defaultPageSize: 5,
                }}
                columns={[
                  {
                    title: '开始时间',
                    dataIndex: 'startTime',
                  },
                  {
                    title: '结束时间',
                    dataIndex: 'endTime',
                  },
                  {
                    title: '操作',
                    align: 'center',
                    width: 100,
                    render: (text, record, index) => (
                      <span>
                        {!disabled && (
                          <a
                            onClick={() => {
                              const newValue = _.filter(tableVals, (it, ind) => ind !== index);
                              setTableVals(newValue);
                            }}
                          >
                            删除
                          </a>
                        )}
                      </span>
                    ),
                  },
                  {
                    title: '主申报时间',
                    align: 'center',
                    width: 100,
                    render: (text, record) => (
                      <span>
                        {!disabled && (
                          <Radio
                            checked={record.main}
                            onChange={() => {
                              setTableVals(
                                _.map(tableVals, val => {
                                  const { key } = record;
                                  return {
                                    ...val,
                                    main: key === val.key,
                                  };
                                }),
                              );
                            }}
                          />
                        )}
                      </span>
                    ),
                  },
                ]}
                dataSource={tableVals}
                size="small"
              />
            </Col>
          </Row>
        </Col>
      </div>
    </Col>
  );
}

export default TimeTable;
