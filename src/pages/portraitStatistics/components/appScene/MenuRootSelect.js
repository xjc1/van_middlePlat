import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { KERNEL } from '@/services/api';
import _ from 'lodash';

function MenuTreeSelect({ userType, ...others }) {
  const [selectList, setSelectList] = useState([]);
  useEffect(() => {
    KERNEL.getRootSpaceMenuTreeUsingGET({ params: { object: userType } }).then((data = []) => {
      const rootData = data.map(({ id, name }) => ({ id, name }));
      setSelectList(rootData);
    });
  }, [userType]);
  return (
    <Select {...others}>
      {_.map(selectList, ({ name, id }) => (
        <Select.Option label={name} value={id} key={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}

export default MenuTreeSelect;
