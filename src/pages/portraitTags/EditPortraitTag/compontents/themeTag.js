import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { CORE } from '@/services/api';

function ThemeTag({ value, onChange, disabled }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    CORE.getTagThemesUsingGET().then(data => {
      setList(data);
    });
  }
  return (
    <Select
      disabled={disabled}
      onChange={data => onChange(data)}
      allowClear
      mode="multiple"
      showSearch
      value={value}
    >
      {list.map(({ name, id }) => (
        <Select.Option value={id} key={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}
export default ThemeTag;
