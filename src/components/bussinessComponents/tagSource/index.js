import React from 'react';
import { AsySearchSelector } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import _ from 'lodash';

function Index(props) {
  return (
    <AsySearchSelector
      placeholder="请选择要添加的标签来源"
      onTextSearch={text =>
        KERNEL.findAllSourcesByPageUsingGET({
          params: { size: 100, name: text },
        }).then(res => {
          const { content = [] } = res;
          return _.map(content, ({ code, name }) => ({
            label: name,
            value: code,
            key: code,
          }));
        })
      }
      {...props}
    />
  );
}

export default Index;
