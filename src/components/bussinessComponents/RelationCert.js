/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { TSelect } from '../tis_ui';
import _ from 'lodash';
import { ONEFORM } from '@/services/api';

const findStuffTypeListUsingGET = _.memoize(
  () =>
    new Promise(resolve => {
      ONEFORM.findStuffTypeListUsingGET({ params: { type: 2 } }).then(items => {
        const nextItems = _.unionBy(items, 'value');
        resolve(
          _.map(nextItems, ({ label, value }) => ({
            key: value,
            label,
            value,
          })),
        );
      });
    }),
);

function RelationCert(props) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    findStuffTypeListUsingGET().then(items => {
      setOptions(items);
    });
  }, []);

  return (
    <TSelect showSearch allowClear optionFilterProp="label" {...props}>
      {_.map(options, ({ value, label, key }) => (
        <TSelect.Option value={value} key={key} label={label}>
          {label}
        </TSelect.Option>
      ))}
    </TSelect>
  );
}

export default RelationCert;
