import React, { Component } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Select } from 'antd';
import { userType } from '@/utils/constantEnum';
import _ from 'lodash';
import { connect } from 'dva';
import { DictSelect } from '@/components/bussinessComponents';

@connect(
  ({ hotWords, user }) => ({ ...hotWords, deptCode: _.get(user, 'currentUser.dept.departNum') }),
  null,
  null,
  { forwardRef: true },
)
class HotWordsQuerybar extends Component {
  state = {
    ctDisabled: true,
    depDisabled: true,
  };

  changeField = (changedFields, allFields) => {
    if (allFields[0].value) {
      this.setState({ depDisabled: false });
    } else {
      this.setState({ depDisabled: true });
    }
    if (allFields[1].value) {
      this.setState({ ctDisabled: false });
    } else {
      this.setState({ ctDisabled: true });
    }
  };

  setDisabled = () => {
    this.setState({ ctDisabled: true, depDisabled: true });
  };

  render() {
    const { onForm, actions, footer, forwardedRef } = this.props;
    const { ctDisabled, depDisabled } = this.state;
    return (
      <QueryBarCard
        onForm={onForm}
        ref={forwardedRef}
        onFieldsChange={this.changeField}
        actions={actions}
        footer={footer}
      >
        <TItem col={8} name="objectType" label="对象类型">
          <Select allowClear>
            {_.map(userType, (value, key) => (
              <Select.Option key={key} value={value}>
                {userType.$names[key]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="attributionDepartment" label="归属部门">
          <DictSelect
            dict="SHGSBMSH"
            dictType="tree"
            showSearch
            treeNodeFilterProp="title"
            disabled={depDisabled}
          />
        </TItem>
        <TItem col={8} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" disabled={ctDisabled} />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default HotWordsQuerybar;
