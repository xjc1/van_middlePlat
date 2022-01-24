import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import _ from 'lodash';
import { QueryBarCard, TItem, TSelect } from '@/components/tis_ui';
import {
  commonAuditState,
  appUserType,
  conditionReviewType,
  portraitAuditState,
} from '@/utils/constantEnum';
import { DictSelect } from '@/components/bussinessComponents';

@connect(({ portraitTagsAudit }) => ({
  isShowCollectDept: portraitTagsAudit.curReviewType === conditionReviewType.NEED_REVIEW,
}))
class PortraitTagsAuditQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, isShowCollectDept, ...others } = this.props;

    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem name="name" label="标签名称" col={6}>
          <Input />
        </TItem>
        <TItem name="category" label="标签分类" col={6}>
          <Input />
        </TItem>
        <TItem name="objectType" label="对象类型" col={6}>
          <TSelect>
            <TSelect.Option value="">全部</TSelect.Option>
            {_.map(appUserType, (v, k) => (
              <TSelect.Option value={v} key={k}>
                {appUserType.$names[k]}
              </TSelect.Option>
            ))}
          </TSelect>
        </TItem>
        <TItem name="status" label="审核状态" col={6}>
          <TSelect>
            <TSelect.Option value="">全部</TSelect.Option>
            {_.map(commonAuditState, (value, key) => (
              <TSelect.Option key={key} value={value}>
                {commonAuditState.$names[key]}
              </TSelect.Option>
            ))}
            <TSelect.Option value={portraitAuditState.INTERRUPT}>
              {portraitAuditState.$names.INTERRUPT}
            </TSelect.Option>
          </TSelect>
        </TItem>
        {isShowCollectDept && (
          <TItem name="collectionDept" label="采录部门" col={6}>
            <DictSelect dict="SHSSBMSH" />
          </TItem>
        )}
      </QueryBarCard>
    );
  }
}

export default PortraitTagsAuditQueryBar;
