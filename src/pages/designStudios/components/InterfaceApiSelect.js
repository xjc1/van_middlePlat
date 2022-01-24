import React, { useEffect } from 'react';
import _ from 'lodash';
import { EmptyFn, TSelect } from '@/components/tis_ui';
import { INTERFACES } from '@/services/api';
import { flattenSchema } from '@/utils/tools';
import tags from './apiTags';

function InterfaceApiSelect({
  apis,
  onResponseFields,
  onChange,
  value,
  onRequestFields = EmptyFn,
}) {
  useEffect(() => {
    if (value) {
      INTERFACES.getApiInterfaceUsingGET(value).then(
        ({ resBodySchema = '{}', queryParams = '{}', reqBodySchema = '{}' }) => {
          const bodySchema = JSON.parse(resBodySchema);
          const reqBodyFields = flattenSchema(JSON.parse(reqBodySchema)).filter(({ key }) => key);
          const items = flattenSchema(bodySchema);
          const validFilds = _.chain(items)
            .filter(
              ({ key, description, childrenLength }) => key && description && childrenLength === 0,
            )
            .value();
          onResponseFields(validFilds);
          onRequestFields([
            ..._.map(queryParams, ({ desc, required = false, name }, index) => {
              return {
                id: index,
                type: 'query',
                desc,
                name,
                required,
              };
            }),
            ..._.map(reqBodyFields, ({ pathKey, required = false, description }, index) => {
              const key = pathKey.join('.');
              return {
                id: index,
                type: 'body',
                desc: description || key,
                name: key,
                required,
              };
            }),
          ]);
        },
      );
    }
  }, [value]);

  return (
    <TSelect
      showSearch
      value={value}
      placeholder="选择您的接口"
      optionFilterProp="children"
      onChange={onChange}
    >
      {_.map(apis, ({ method, name, id, url }) => {
        return (
          <TSelect.Option key={id} value={id} label={name || url}>
            <div>
              {tags[_.upperCase(method)]}
              {name || url}
            </div>
          </TSelect.Option>
        );
      })}
    </TSelect>
  );
}

export default InterfaceApiSelect;
