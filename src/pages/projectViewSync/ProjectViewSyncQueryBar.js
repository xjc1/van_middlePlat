
import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from "@/components/tis_ui";
import { DictSelect } from '@/components/bussinessComponents';

class ProjectViewSyncQueryBar extends PureComponent {

  render() {
    const { onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm}{...others}>
        <TItem col={8} name="regions" label="同步数据地区">
          <DictSelect dict="SH00XZQH" dictType="tree" labelInValue placeholder="全部" />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default ProjectViewSyncQueryBar;


