import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Select } from 'antd';
import { connect } from 'dva';
import { commonQuestionObject } from '@/utils/constantEnum';
import { DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';

@connect(({ user }) => ({
  deptCode: _.get(user, 'currentUser.dept.departNum'),
}))
class CommonQuestionQueryBar extends PureComponent {
  state = {
    clientTypeEditAble: false,
    deptAble: false,
  };

  setClientEditAble = val => {
    this.setState({ clientTypeEditAble: val });
  };

  setDeptEditAble = val => {
    this.setState({ deptAble: val });
  };

  clear = () => {
    this.setState({ clientTypeEditAble: false, deptAble: false });
  };

  render() {
    const { dispatch, list, focusItem, onForm, onQuery, deptCode, ...others } = this.props;
    onQuery({ clear: this.clear });
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="objectType" label="对象类型">
          {/* 这里的value是字符串 */}
          <Select allowClear onChange={value => this.setDeptEditAble(!!value)}>
            {_.map(commonQuestionObject, (v, k) => (
              <Select.Option key={k} value={v}>
                {commonQuestionObject.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="attributionDepartment" label="归属部门">
          <DictSelect
            dict="SHGSBMSH"
            dictType="tree"
            showSearch
            onChange={value => this.setClientEditAble(!!value)}
            treeNodeFilterProp="title"
            disabled={!this.state.deptAble}
          />
        </TItem>
        <TItem col={8} name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" disabled={!this.state.clientTypeEditAble} />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default CommonQuestionQueryBar;
