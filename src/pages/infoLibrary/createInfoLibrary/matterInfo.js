import React, { useState } from 'react';
import { TItem, TabForm, FormRules, FormCard } from '@/components/tis_ui';
import { DictSelect, ConditionSelector, MatterMultiTable } from '@/components/bussinessComponents';
import MatterTable from './matterTable'
import { Input, Row } from 'antd';
import _ from 'lodash';

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 22 },
  col: 24,
};

function MatterInfo(props) {
  const { dictNames } = props;
  return (
      <FormCard title="事项信息" style={{ border: 'unset' }}>
      <Row style={{flex: 'auto', minWidth: 0}}>
        <TItem {...layout} name="matterBaseInfo" label='事项信息'>
          {/* <MatterMultiTable getPopupContainer={() => document.body}/> */}
          <MatterTable dictNames={dictNames}/>
        </TItem>
        </Row>
      </FormCard>
  );
}

export default MatterInfo;
