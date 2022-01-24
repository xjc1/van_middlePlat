import { Select } from 'antd';
import { MESSAGEPICTURES } from '@/services/api';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { EmptyFn } from '@/components/tis_ui';
import { UploadImageUseFs } from '@/components/bussinessComponents';

function MessageImgSelect({ type, value, disabled, onChange = EmptyFn, ...otherProps }) {
  const [selectOption, setSelectOption] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState({});
  const fetchOptions = () => {
    MESSAGEPICTURES.getAllMessagePictureUsingGET().then((content = []) => {
      const selectOptions = content.map(({ id, name, picture }) => ({
        key: id,
        value: id,
        label: name,
        picture,
      }));
      const initSelected = _.find(selectOptions, { value }) || { picture: {} };
      setSelectOption(selectOptions);
      setSelectedPicture(initSelected.picture);
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []);
  return (
    <>
      <div style={{ paddingBottom: 16 }}>
        <Select
          disabled={disabled}
          value={value}
          onChange={val => {
            const { value: id, picture = {} } = _.find(selectOption, { value: val }) || {};
            onChange(id);
            setSelectedPicture(picture);
          }}
        >
          {_.map(selectOption, ({ key, label }) => (
            <Select.Option key={key} title={label}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </div>

      <UploadImageUseFs
        value={[selectedPicture.url, selectedPicture.name]}
        disabled
        {...otherProps}
      />
    </>
  );
}

export default MessageImgSelect;
