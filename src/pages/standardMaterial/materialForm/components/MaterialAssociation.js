import React from 'react';
import { AsySearchSelector } from '@/components/tis_ui';
import { CORE } from '@/services/api';
import _ from 'lodash';

function MaterialAssociation({ classification, ...props }) {
  return (
    <AsySearchSelector
      mode={null}
      placeholder="请选择所属分组"
      onTextSearch={text =>
        CORE.listStandardMaterialUsingGET({
          params: { page: 0, size: 20, classification, name: text },
        }).then(({ content: items }) =>
          _.map(items, ({ code, name }) => ({
            label: `${name}[${code}]`,
            value: code,
            key: code,
          })),
        )
      }
      {...props}
    />
  );
}

export default MaterialAssociation;
