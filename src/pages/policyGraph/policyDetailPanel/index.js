import React, { useState } from 'react';
import _ from 'lodash';
import Styles from './index.less';
import classNames from 'classnames';
import { Form, Input, Select } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import { TItem } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import { commonStatus, policyCollectStatus } from '@/utils/constantEnum';

function Index({ policyDetail = {}, onDrill }) {
  const [initialValues] = useState(() => {
    const { category = [], ...others } = policyDetail;
    return {
      ...others,
      category: _.map(category, ({ code }) => code),
    };
  });

  return (
    <div className={classNames(Styles.settingPanel, Styles.policyDetailPanel)}>
      <div className={Styles.policyDetailPanelTitle}>
        <span>节点属性</span>
        {onDrill && policyDetail.id && (
          <span className={Styles.policyDetailPanelCloseBtn}>
            <span style={{ cursor: 'pointer' }} onClick={onDrill}>
              <AimOutlined />
              下钻
            </span>
          </span>
        )}
      </div>
      <div className={Styles.policyDetailPanelContent}>
        <Form initialValues={initialValues}>
          <TItem name="name" label="政策名称">
            <Input />
          </TItem>
          <TItem name="category" label="政策分类">
            <DictSelect
              rootDict="ZCFL"
              dict="ZCFL"
              dictType="tree"
              showSearch
              multiple
              treeNodeFilterProp="title"
            />
          </TItem>
          <TItem name="level" label="政策级别">
            <DictSelect dict="ZCJB0001" />
          </TItem>
          <TItem name="objectType" label="对象类型">
            <DictSelect dict="DXLX0001" dictType="tree" />
          </TItem>
          <TItem name="regions" label="行政区划">
            <DictSelect dict="SH00XZQH" dictType="tree" />
          </TItem>
          <TItem name="isEffective" label="政策有效性">
            <Select>
              {_.map(commonStatus, (key, value) => (
                <Select.Option key={key} value={key}>
                  {commonStatus.$names[value]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
          <TItem name="publishDepartment" label="发布部门">
            <DepartmentTreeSelect allowClear />
          </TItem>
          <TItem name="collectStatus" label="录入状态">
            <Select>
              {_.map(policyCollectStatus, (key, value) => (
                <Select.Option key={key} value={key}>
                  {policyCollectStatus.$names[value]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        </Form>
      </div>
    </div>
  );
}

export default Index;
