import React, { useState } from 'react';
import { TabForm, DateTools, TItem, Checkbox } from '@/components/tis_ui';
import { DictIdSelect, DictSelect, TSearchSelector } from '@/components/bussinessComponents';
import { DatePicker, Input, Select, Row } from 'antd';
import _ from 'lodash';
import { stringYesNo } from '@/utils/constantEnum';

const { range } = DateTools;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function PolicyCover(props) {
  const { disabled = true, form, recordId, showPredict, permanent = false, ...others } = props;
  const [longTime, setLongTime] = useState(permanent);

  return (
    <TabForm.Tab {...others}>
      <Row>
        <TItem
          label="政策有效期"
          name="expireTime"
          col={16}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          // rules={!longTime ? [FormRules.required('政策有效期必填')] : []}
        >
          {!longTime ? (
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              disabled={disabled}
              ranges={{
                今天: range.today,
                本月: range.thisMonth,
                今年: range.thisYear,
              }}
            />
          ) : (
            <Input disabled />
          )}
        </TItem>
        <TItem
          col={6}
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          name="permanent"
          {...layout}
        >
          <Checkbox
            disabled={disabled}
            checked={longTime}
            onChange={({ target }) => {
              // 更新表单数据
              form.setFieldsValue({ permanent: target.checked, expireTime: null });
              setLongTime(target.checked);
            }}
          >
            长期有效
          </Checkbox>
        </TItem>
        <TItem
          label="政策有效期(机提)"
          name={['policyInfoPredicted', 'expireTime']}
          col={16}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          style={{ display: !showPredict && 'none' }}
        >
          <Input disabled />
        </TItem>
        <TItem
          name={['policyInfoPredicted', 'longTime']}
          col={6}
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          style={{ display: !showPredict && 'none' }}
          {...layout}
        >
          <Checkbox disabled>长期有效</Checkbox>
        </TItem>
        <TItem
          label="发布日期"
          name="pubTime"
          // rules={[{ required: true, message: '发布日期不能为空!' }]}
          {...layout}
        >
          <DatePicker
            disabled={disabled}
            style={{ width: '100%' }}
            ranges={{
              今天: range.today,
            }}
          />
        </TItem>
        <TItem
          label="施行日期(机提)"
          name={['policyInfoPredicted', 'releaseTime']}
          style={{ display: !showPredict && 'none' }}
          {...layout}
        >
          <Input disabled />
        </TItem>
        <TItem label="精准推送" name="precisePush" {...layout}>
          <Select>
            {_.map(stringYesNo, (key, value) => (
              <Select.Option key={key} value={key}>
                {stringYesNo.$names[value]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
        <TItem label="立即办理链接" name="handleUrl" {...layout}>
          <Input disabled={disabled} />
        </TItem>
        <TItem label="调节词" name="tuningWord" {...layout}>
          <Input disabled={disabled} />
        </TItem>

        <TItem label="公文种类" name="officialDocumentsTypes" {...layout}>
          <DictIdSelect
            disabled={disabled}
            dict="GWZL"
            dictType="tree"
            showSearch
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>
        <TItem
          label="面向对象(机提)"
          name={['policyInfoPredicted', 'objectType']}
          style={{ display: !showPredict && 'none' }}
          {...layout}
        >
          <DictSelect
            disabled
            treeNodeFilterProp="title"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="DXLX0001"
          />
        </TItem>

        <TItem
          label="实施部门"
          name="department"
          // rules={[FormRules.required('实施部门必填!')]}
          {...layout}
        >
          <DictIdSelect
            disabled={disabled}
            multiple
            showSearch
            treeNodeFilterProp="title"
            dictType="tree"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="SHSSBMSH"
          />
        </TItem>

        <TItem label="政策标签" name="talentProject" hidden {...layout}>
          <DictIdSelect
            disabled
            multiple
            showSearch
            treeNodeFilterProp="title"
            dictType="tree"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="SHRCXM"
          />
        </TItem>

        <TItem name="restrictiveCondition" hidden label="个人推荐限定条件" {...layout}>
          <TSearchSelector type="restrictiveCondition" disabled />
        </TItem>
        <TItem name="restrictiveConditionLegalPerson" hidden label="法人推荐限定条件" {...layout}>
          <TSearchSelector type="restrictiveConditionLegalPerson" disabled />
        </TItem>
      </Row>
    </TabForm.Tab>
  );
}

export default PolicyCover;
