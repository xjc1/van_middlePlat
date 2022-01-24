/* eslint-disable import/no-extraneous-dependencies  */
import _ from 'lodash';
import { Cascader, Form, Select, Col, TreeSelect } from 'antd';
import React, { forwardRef } from 'react';

const defaultStyle = {
  width: '100%',
  lineHeight: 'inherit',
};

function renderOptions(options) {
  return _.map(options, ({ label, value, data, disabled }) => (
    <Select.Option value={value} key={value} label={label} disabled={disabled} data={data}>
      {label}
    </Select.Option>
  ));
}

const DSelect = forwardRef(
  (
    { options = [], group, treeNodeFilterProp, treeDefaultExpandAll, treeNodeLabelProp, ...others },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
  ) => {
    if (group) {
      const groups = _.groupBy(options, group);
      return (
        <Select allowClear style={defaultStyle} {...others}>
          {_.map(groups, (innerOptions, name) => (
            <Select.OptGroup key={name} label={name}>
              {renderOptions(innerOptions)}
            </Select.OptGroup>
          ))}
        </Select>
      );
    }
    return (
      <Select allowClear style={defaultStyle} {...others}>
        {renderOptions(options)}
      </Select>
    );
  },
);

const DCascader = forwardRef(
  (
    {
      options = [],
      col = 24,
      group,
      loadData,
      treeNodeFilterProp,
      treeDefaultExpandAll,
      treeNodeLabelProp,
      ...others
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
  ) => {
    return (
      <Col span={col}>
        <Form.Item {...others}>
          <Cascader
            allowClear
            notFoundContent="无下级数据"
            changeOnSelect={false}
            options={options}
            loadData={loadData}
          />
        </Form.Item>
      </Col>
    );
  },
);

const DTreeSelect = forwardRef(
  (
    {
      treeData = [],
      group,
      treeNodeFilterProp,
      placeholder,
      treeDefaultExpandAll,
      treeNodeLabelProp,
      ...others
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
  ) => {
    return (
      <TreeSelect
        allowClear
        getPopupContainer={triggerNode => triggerNode.parentElement}
        treeData={treeData}
        placeholder={placeholder}
        treeNodeFilterProp={treeNodeFilterProp}
        treeDefaultExpandAll={treeDefaultExpandAll}
        treeNodeLabelProp={treeNodeLabelProp}
        {...others}
      />
    );
  },
);

export default DSelect;
export { DCascader, DTreeSelect };
