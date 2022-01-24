import { Row, Input, Select } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { TItem } from '@/components/tis_ui';
import { DictIdSelect } from '@/components/bussinessComponents';

import _ from 'lodash';
import { commonYesNo } from '@/utils/constantEnum';

@connect(({ createQuestionForm }) => ({ ...createQuestionForm }))
class otherSettings extends PureComponent {
  render() {
    const { check } = this.props;
    return (
      <Fragment>
        <TItem name="tag" label="标签">
          <Input disabled={check} />
        </TItem>
        <TItem name="isHandle" label="是否梳理">
          <Select disabled={check}>
            {_.map(commonYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {commonYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem disabled={check} name="title" label="梳理问法">
          <Input disabled={check} />
        </TItem>
        <TItem name="category" label="分类">
          <DictIdSelect
            dict="WDFL"
            dictType="tree"
            multiple
            treeNodeFilterProp="title"
            disabled={check}
          />
        </TItem>
        <TItem name="sourceType" label="来源渠道">
          <Input disabled={check} />
        </TItem>
        <TItem name="source" label="来源方式">
          <Input disabled />
        </TItem>
      </Fragment>
    );
  }
}

export default otherSettings;
