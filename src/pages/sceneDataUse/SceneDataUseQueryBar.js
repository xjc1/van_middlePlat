import React, { PureComponent } from 'react';
import { QueryBarCard, TItem } from '@/components/tis_ui';
import { Input, Select } from 'antd';
import _ from 'lodash';
import { scenesDataUseType, scenesDataUseSceneType } from '@/utils/constantEnum';
import {DictSelect} from "@/components/bussinessComponents";

class SceneDataUseQueryBar extends PureComponent {
  render() {
    const { dispatch, list, focusItem, onForm, ...others } = this.props;
    return (
      <QueryBarCard onForm={onForm} {...others}>
        <TItem col={8} name="sceneName" label="场景名称">
          <Input />
        </TItem>
        <TItem col={8} name="sceneCode" label="场景编码">
          <Input />
        </TItem>
        <TItem col={8} name="sceneType" label="场景类型">
          <Select allowClear>
            {_.map(scenesDataUseSceneType, (v, k) => (
              <Select.Option key={k} value={v}>
                {scenesDataUseSceneType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="dataType" label="用数类型">
          <Select allowClear>
            {_.map(scenesDataUseType, (v, k) => (
              <Select.Option key={k} value={v}>
                {scenesDataUseType.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem col={8} name="department" label="实施部门" >
          <DictSelect
            showSearch
            treeNodeFilterProp="title"
            dictType="tree"
            treeNodeLabelProp="title"
            dict="SHSSBMSH"
          />
        </TItem>
      </QueryBarCard>
    );
  }
}

export default SceneDataUseQueryBar;
