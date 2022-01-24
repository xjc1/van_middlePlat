import React, { useState } from 'react';
import _ from 'lodash';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Row, Col, Input, Select, Button, TreeSelect } from 'antd';
import { useUpdateEffect } from 'ahooks';
import Styles from './conditionSelect.less';
import CStyles from './index.less';
import { utils } from '@/components/tis_ui';
import { connect } from "dva";

const { IDGenerator } = utils;
const { Option } = Select;
const conditionId = new IDGenerator('condition');

const CONDITION_TYPES = {
  AND: 'AND',
  OR: 'OR',
};

const TreeData = [
  {
    title: '变量',
    value: "var",
    selectable: false,
    children: [
      {
        title: "行政区划",
        value: ['var', 'region'].join('.'),
      }
    ]
  }
];

function ConditionSelect({ value = [], slots = [], onChange, type = CONDITION_TYPES.AND }) {
  const [conditions, setConditions] = useState(() => {
    return _.map(value, item => {
      return {
        ...item,
        id: conditionId.next(),
      };
    });
  });

  useUpdateEffect(() => {
    onChange(conditions);
  }, [conditions]);

  function updateCondition(id, obj) {
    setConditions(
      _.map(conditions, condition => {
        if (id === condition.id) {
          return {
            ...condition,
            ...obj,
          };
        }
        return condition;
      }),
    );
  }

  return (
    <div>
      {_.map(conditions, ({ id, name, operator, value: operatorVal }) => {
        return (
          <div key={id} className={Styles.conditionSelect}>
            <div
              className={Styles.conditionSelectRemoveBtn}
              onClick={() => {
                setConditions(_.filter(conditions, ({ id: cId }) => cId !== id));
              }}
            >
              <MinusCircleOutlined />
            </div>
            <Row gutter={8}>
              <Col span={8}>
                <TreeSelect
                  value={name}
                  treeData={[
                    {
                      title: '槽位',
                      value: "slot",
                      selectable: false,
                      children: _.map(slots, (slot) => ({
                        title: slot.name,
                        value: ['slot', slot.id].join('.'),
                      }))
                    },
                    ...TreeData,
                  ]}
                  style={{ width: '100%' }}
                  dropdownMatchSelectWidth={false}
                  allowClear
                  onChange={val => {
                    updateCondition(id, { name: val });
                  }}
                />
              </Col>
              <Col span={8}>
                <Select
                  value={operator}
                  onChange={nextOperator => {
                    updateCondition(id, { operator: nextOperator });
                  }}
                >
                  <Option value="==">==</Option>
                  <Option value="!=">!=</Option>
                  <Option value="in">in</Option>
                  <Option value="nin">not in</Option>
                  <Option value="contains">contains</Option>
                  <Option value="ncontains">not contains</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Input
                  value={operatorVal}
                  onChange={({ target }) => {
                    updateCondition(id, { value: target.value });
                  }}
                />
              </Col>
            </Row>
          </div>
        );
      })}
      <div className={CStyles.conditionBranchExtBtnWrap}>
        <Button
          type="link"
          onClick={() => {
            setConditions([
              ...conditions,
              {
                id: conditionId.next(),
              },
            ]);
          }}
        >{` + 新增(${type})条件 `}</Button>
      </div>
    </div>
  );
}

ConditionSelect.CONDITION_TYPES = CONDITION_TYPES;

export default connect(({ dialogStudios }) => {
  return {
    slots: dialogStudios.slots,
  };
})(ConditionSelect);
