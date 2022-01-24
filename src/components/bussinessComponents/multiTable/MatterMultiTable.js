/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import _ from 'lodash';
import { TRANSLATE } from '@/services/api';
import TSearchMultiTable from '../Dict/TSearchMultiTable';

function MatterMultiTable(props) {
  return (
    <TSearchMultiTable
      type="matter"
      onTranslate={value =>
        TRANSLATE.matterTranslateUsingPOST({ body: value }).then(items =>
          _.map(items, (v, k) => ({
            key: k,
            label: v,
            value: v,
          })),
        )
      }
      {...props}
    />
  );
}

export default MatterMultiTable;
