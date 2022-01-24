/* eslint-disable import/no-extraneous-dependencies  */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDebounceFn } from 'ahooks';
import DSelect from './Dict/Select';
import PropTypes from 'prop-types';

function defaultChange({ name, code }) {
  return {
    value: code,
    label: name,
  };
}

function AsySelector({ initOptions = [], fetchList, delay = 500, ...others }) {
  const [options, setOptions] = useState([]);
  const { run: handleWordsSearchDebounce } = useDebounceFn(handleWordsSearch, { wait: delay });

  useEffect(() => {
    fetchList().then(data => {
      setOptions(_.uniqBy([...data, ...initOptions], 'key'));
    });
  }, []);

  function handleWordsSearch(value) {
    fetchList(value).then(data => setOptions(data));
  }

  return (
    <DSelect
      onSearch={handleWordsSearchDebounce}
      allowClear
      getPopupContainer={triggerNode => triggerNode.parentElement}
      options={options}
      {...others}
    />
  );
}

AsySelector.propTypes = {
  fetchList: PropTypes.func.isRequired,
};

export default AsySelector;
