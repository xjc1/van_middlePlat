/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import _ from 'lodash';
import { TRANSLATE } from '@/services/api';
import TSearchMultiTable from '../Dict/TSearchMultiTable';

function ScenceMultiTable(props) {
  return (
    <TSearchMultiTable
      type="scene"
      onTranslate={value =>
        TRANSLATE.sceneTranslateUsingPOST({ body: value }).then(items =>
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

export default ScenceMultiTable;
