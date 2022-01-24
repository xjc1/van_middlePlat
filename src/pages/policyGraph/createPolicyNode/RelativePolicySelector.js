import React from 'react';
import { POLICYATLAS, TRANSLATE } from '@/services/api';
import _ from 'lodash';
import { AsySearchSelector } from '@/components/tis_ui';

function RelativePolicySelector({ defaultSize, ...others }) {
  return (
    <AsySearchSelector
      placeholder="请选择要添加的个人推荐限定条件"
      onTextSearch={text => {
        return POLICYATLAS.queryPolicyNodesUsingPOST({
          params: { size: defaultSize },
          body: { name: text },
        }).then(({ content = [] }) => {
          return _.map(content, ({ id, name, policyId }) => ({
            label: name,
            value: policyId,
            key: id,
          }));
        });
      }}
      onCode2Name={words => TRANSLATE.conditionTranslateUsingPOST({ body: words })}
      {...others}
    />
  );
}

RelativePolicySelector.defaultProps = {
  /** 最多获取多少条数据 */
  defaultSize: 200,
};

export default RelativePolicySelector;
