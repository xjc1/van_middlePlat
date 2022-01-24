import React from 'react';
import _ from 'lodash';
import { KERNEL, TRANSLATE } from '@/services/api';
import { appUserType } from '@/utils/constantEnum';
import { AsySearchSelector } from '../../tis_ui';

function Personal(props) {
  return (
    <AsySearchSelector
      placeholder="请选择要添加的个人画像标签"
      onTextSearch={text =>
        KERNEL.getPersonalTagNameListUsingGET({
          params: { size: 100, object: appUserType.self, name: text },
        }).then(items =>
          _.map(items, ({ id, name,category }) => ({
            label: `【${category}】${name}`,
            value: id,
            key: id,
          })),
        )
      }
      onCode2Name={words => TRANSLATE.portraitTagTranslateUsingPOST({ body: words })}
      {...props}
    />
  );
}

function Legal(props) {
  return (
    <AsySearchSelector
      placeholder="请选择要添加的法人画像标签"
      onTextSearch={text =>
        KERNEL.getPersonalTagNameListUsingGET({
          params: { size: 100, object: appUserType.legalPerson, name: text },
        }).then(items =>
          _.map(items, ({ id, name, category }) => ({
            label: `【${category}】${name}`,
            value: id,
            key: id,
          })),
        )
      }
      onCode2Name={words => TRANSLATE.portraitTagTranslateUsingPOST({ body: words })}
      {...props}
    />
  );
}

export default { Legal, Personal };
