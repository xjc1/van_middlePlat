import React, { useState } from 'react';
import { TItem, FormRules, TSelect } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import { Select, Input, DatePicker, Row, Checkbox } from 'antd';
import _ from 'lodash';
import { commonYesNo, portraitIsLinkUser } from '@/utils/constantEnum';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';
import TagApplyScenario from './tagApplyScenario';
import ThemeTag from './themeTag';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function BaseInfo(props) {
  const {
    permanent = false,
    editVisible = true,
    recordId,
    formRef,
    shareToAll: shareAll = false,
  } = props;
  const [showTime, setShowTime] = useState(!permanent);
  // 判断是否永久有效
  const [expireTimeType, setExpireTimeType] = useState(permanent ? 1 : 2);
  const [shareToAll, setShareToAll] = useState(shareAll);

  return (
    <>
      <TItem name="name" label="标签名称" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={!editVisible} placeholder="请输入标签名称" />
      </TItem>
      <TItem name="category" label="标签分类" rules={[FormRules.required('必填')]} {...layout}>
        <Input disabled={!editVisible} placeholder="请输入标签分类" />
      </TItem>
      <TItem name="tagThemes" label="标签主题" {...layout}>
        <ThemeTag disabled={!editVisible} />
      </TItem>
      <TItem name="regions" label="适用行政区划" {...layout}>
        <DictSelect
          disabled={!editVisible}
          multiple
          showSearch
          allowClear
          treeNodeFilterProp="title"
          dictType="tree"
          treeDefaultExpandAll
          treeNodeLabelProp="title"
          dict="SH00XZQH"
        />
      </TItem>
      <Row>
        <TItem col={16} name="shareDept" label="共享部门">
          <DictSelect
            disabled={!editVisible || shareToAll}
            multiple
            showSearch
            allowClear
            treeNodeFilterProp="title"
            dictType="tree"
            treeDefaultExpandAll
            treeNodeLabelProp="title"
            dict="SHSSBMSH"
          />
        </TItem>

        <TItem col={8} name="shareToAll">
          <Checkbox
            disabled={!editVisible}
            checked={shareToAll}
            onChange={({ target }) => {
              // 更新表单数据
              formRef.setFieldsValue({ shareToAll: target.checked, shareDept: [] });
              setShareToAll(target.checked);
            }}
          >
            共享至全部部门
          </Checkbox>
        </TItem>
      </Row>
      {recordId && (
        <TItem name="publishDepartment" label="发布部门" {...layout}>
          <DepartmentTreeSelect disabled={!editVisible} allowClear />
        </TItem>
      )}
      {recordId && (
        <TItem name="collectDepartment" label="采录部门" {...layout}>
          <DictSelect disabled dict="SHSSBMSH" />
        </TItem>
      )}
      {recordId && (
        <TItem name="createTime" label="标签录入时间" {...layout}>
          <DatePicker disabled style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" showTime />
        </TItem>
      )}
      {recordId && (
        <TItem label="应用场景" {...layout}>
          <TagApplyScenario tagId={recordId} />
        </TItem>
      )}
      <TItem name="linkUser" label="是否关联用户" {...layout}>
        <TSelect disabled>
          {_.map(portraitIsLinkUser, (v, k) => (
            <TSelect.Option key={k} value={v}>
              {portraitIsLinkUser.$names[k]}
            </TSelect.Option>
          ))}
        </TSelect>
      </TItem>
      <Row>
        <TItem label="标签有效期" col={12} labelCol={{ span: 8 }} wrapperCol={{ span: 15 }}>
          <Select
            disabled={!editVisible}
            allowClear
            placeholder="请选择有效期类型"
            value={expireTimeType}
            onSelect={value => {
              if (value === 2) {
                setShowTime(true);
              } else {
                setShowTime(false);
              }
              setExpireTimeType(value);
            }}
          >
            <Select.Option key={1} value={1} label="永久有效">
              永久有效
            </Select.Option>
            <Select.Option key={2} value={2} label="选择到期日期">
              选择到期日期
            </Select.Option>
          </Select>
        </TItem>
        {showTime && (
          <TItem name="expireTime" col={12} labelCol={{ span: 0 }} wrapperCol={{ span: 16 }}>
            <DatePicker
              disabled={!editVisible}
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime
            />
          </TItem>
        )}
      </Row>
      {recordId && (
        <TItem name="updateTime" label="标签最后修改时间" {...layout}>
          <DatePicker disabled style={{ width: '100%' }} format="YYYY-MM-DD HH:mm:ss" showTime />
        </TItem>
      )}

      {recordId && (
        <TItem name="isUse" label="标签是否在用" {...layout}>
          <Select disabled placeholder="请选择">
            {_.map(commonYesNo, (v, k) => (
              <Select.Option key={k} value={v} label={commonYesNo.$names[k]}>
                {commonYesNo.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>
      )}
    </>
  );
}

export default BaseInfo;
