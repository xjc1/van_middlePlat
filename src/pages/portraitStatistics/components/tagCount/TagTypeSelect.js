import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { PORTRAITTAGNUMSTATISTICS } from '@/services/api';
import _ from 'lodash';

function TagTypeSelect({ value, onChange, userType }) {
  const [typeList, setTypeList] = useState([]);
  useEffect(() => {
    PORTRAITTAGNUMSTATISTICS.getTagCategoryUsingGET({ params: { object: userType } }).then(
      tagList => {
        setTypeList(tagList);
      },
    );
  }, [userType]);
  return (
    <Select showSearch allowClear value={value} onChange={onChange} mode="multiple">
      {_.map(typeList, name => (
        <Select.Option key={name} title={name}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}

export default TagTypeSelect;
