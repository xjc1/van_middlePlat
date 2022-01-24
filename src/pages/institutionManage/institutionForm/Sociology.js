import React from 'react';
import { Input } from 'antd';
import { TItem, FormItemWithTable, FormRules } from '@/components/tis_ui';
import { DictIdSelect, DictSelect } from '@/components/bussinessComponents';
import AddAliasName from '@/pages/institutionManage/institutionForm/AddAliasName';
import Linksitution from '@/pages/institutionManage/institutionForm/LinkInstitution';

function Sociology(props) {
  const { disabled, recordId } = props;
  return (
    <>
      <TItem name="alias" label="机构别名">
        <AddAliasName disabled={disabled} />
      </TItem>
      <TItem name="category" label="机构分类">
        <DictSelect
          dict="JGFL"
          dictType="tree"
          allowClear
          placeholder="请选择机构分类"
          disabled={disabled}
        />
      </TItem>
      <TItem name="street" label="所在街道">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="lon" label="地址经度">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="lat" label="地址纬度">
        <Input disabled={disabled} />
      </TItem>

      <TItem name="dealTime" label="办理时间">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="derive" label="来源渠道">
        <DictSelect dict="LYQD0001" placeholder="请选择来源渠道" disabled={disabled} />
      </TItem>
      <TItem name="relatedInstitutions" label="关联机构">
        <Linksitution disabled={disabled} recordId={recordId} />
      </TItem>
      <TItem name="city" label="所属城市">
        <DictIdSelect
          dict="JGSSCS"
          dictType="tree"
          allowClear
          placeholder="请选择机构分类"
          disabled={disabled}
        />
      </TItem>
      <TItem name="setUpYears" label="成立年限">
        <Input disabled={disabled} />
      </TItem>
      <TItem name="serviceType" label="服务类别">
        <DictIdSelect
          dict="JGFFLB"
          dictType="tree"
          allowClear
          placeholder="请选择服务类别"
          disabled={disabled}
          multiple
        />
      </TItem>
      <TItem name="serviceProject" label="服务项目">
        <DictIdSelect
          dict="JGFFXM"
          dictType="tree"
          allowClear
          placeholder="请选择服务项目"
          disabled={disabled}
          multiple
        />
      </TItem>
      <TItem name="contactWays" label="联系方式">
        <FormItemWithTable
          title="新增联系方式"
          columns={[
            { title: '联系人', dataIndex: 'contactName' },
            { title: '联系电话', dataIndex: 'phone' },
          ]}
          disabled={disabled}
        >
          <TItem name="contactName" label="联系人" rules={[FormRules.required('必填')]}>
            <Input />
          </TItem>
          <TItem name="phone" label="联系电话" rules={[FormRules.required('必填')]}>
            <Input />
          </TItem>
        </FormItemWithTable>
      </TItem>
    </>
  );
}

export default Sociology;
