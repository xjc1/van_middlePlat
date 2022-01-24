import React from 'react';
import { AsySearchSelector } from '@/components/tis_ui';
import { KERNEL } from '@/services/api';
import _ from 'lodash';

function Index(props) {
  return (
    <AsySearchSelector
      placeholder="请选择要添加的输出模块"
      onTextSearch={text =>
        KERNEL.getDisplayPositionUsingGET({
          params: { size: 100, name: text },
        }).then(res => {
          const { content = [] } = res;
          return _.map(content, ({ id, name }) => ({
            label: name,
            value: id,
            key: id,
          }));
        })
      }
      {...props}
    />
  );
}

export default Index;
