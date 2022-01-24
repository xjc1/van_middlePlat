import _ from 'lodash';
import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import { commonYesNo, appUserType } from '@/utils/constantEnum';
import MultiRootDictTreeSelect from '@/components/bussinessComponents/Dict/MultiRootDictTreeSelect';

class ProjectViewQueryBar extends PureComponent {
  render() {
    const { onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="name" label="项目名称">
          <Input />
        </TItem>
        <TItem col={8} name="classification" label="项目一览分类">
          <MultiRootDictTreeSelect
            dict={['XMYLNEW']}
            multiple
            leafOnly
          />
        </TItem>
        <TItem col={8} name="objectType" label="对象类型">
          <Select allowClear>
            {_.map(appUserType, (key, value) => (
              <Select.Option key={key} value={key}>
                {appUserType.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="deptName" label="实施机关">
          <Input />
        </TItem>
        <TItem col={8} name="configExam" label="关联体检">
          <Select allowClear>
            {_.map(commonYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ProjectViewQueryBar;
