import { FormCard, FormRules, TItem } from '@/components/tis_ui';
import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { TSearchSelector, DictSelect } from '@/components/bussinessComponents';
import _ from 'lodash';
import { materialShareSource, materialType } from '@/utils/constantEnum';
import MaterialAssociation from './components/MaterialAssociation';

function MaterialInfo({ disabled, initialValues = {} }) {
  const { shareSource } = initialValues;
  const [showCert, setShowCert] = useState(() => {
    if (shareSource === materialShareSource.cert) {
      return true;
    }
    return false;
  });

  return (
    <FormCard title="材料信息" bordered={false}>
      <TItem name="name" label="材料名称" rules={[FormRules.required('材料名称必填')]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="code" label="材料编码" rules={[FormRules.required('材料编码必填')]}>
        <Input disabled={disabled} />
      </TItem>
      <TItem name="objectType" label="对象类型" rules={[FormRules.required('对象类型必填')]}>
        <DictSelect dict="DXLX0001" rootDict="DXLX0001" disabled={disabled} dictType="tree" />
      </TItem>
      <TItem name="classification" label="材料分类" rules={[FormRules.required('材料分类必填')]}>
        <Select placeholder="请选择材料分类" disabled={disabled}>
          {_.map(materialType, (v, k) => (
            <Select.Option key={k} value={v} label={materialType.$names[k]}>
              {materialType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="type" label="材料类型" rules={[FormRules.required('材料类型必填')]}>
        <DictSelect
          disabled={disabled}
          rootDict="CLLX"
          dict="CLLX"
          dictType="tree"
          allowClear
          placeholder="请选择材料类型"
        />
      </TItem>
      <TItem name="source" label="材料来源" rules={[FormRules.required('材料来源必填')]}>
        <DictSelect
          disabled={disabled}
          rootDict="CLLY"
          dict="CLLY"
          dictType="tree"
          allowClear
          placeholder="请选择材料来源"
        />
      </TItem>
      <TItem name="parentCode" label="所属分组">
        <MaterialAssociation disabled={disabled} classification={materialType.unStandard} />
      </TItem>
      <TItem name="administrativeLevel" label="行政层级">
        <DictSelect
          disabled={disabled}
          rootDict="XZCJ"
          dict="XZCJ"
          dictType="tree"
          allowClear
          placeholder="请选择行政层级"
        />
      </TItem>
      <TItem name="suitableRegion" label="适用区划">
        <DictSelect
          dictType="tree"
          rootDict="SH00XZQH"
          dict="SH00XZQH"
          allowClear
          disabled={disabled}
        />
      </TItem>
      <TItem name="policyIds" label="设定依据">
        <TSearchSelector type="policyLibrary" disabled={disabled} />
      </TItem>
      <TItem name="shareSource" label="共享来源渠道">
        <Select
          placeholder="请选择共享来源渠道"
          allowClear
          disabled={disabled}
          onChange={val => {
            if (val === materialShareSource.cert) {
              setShowCert(true);
            } else {
              setShowCert(false);
            }
          }}
        >
          {_.map(materialShareSource, (v, k) => (
            <Select.Option key={k} value={v} label={materialShareSource.$names[k]}>
              {materialShareSource.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      {showCert && (
        <TItem name="certDirId" label="证照ID">
          <Input disabled={disabled} />
        </TItem>
      )}
      <TItem name="issuingDepartment" label="发证部门">
        <DictSelect
          disabled={disabled}
          rootDict="SHFZBMSH"
          dict="SHFZBMSH"
          dictType="tree"
          allowClear
          placeholder="请选择发证部门"
        />
      </TItem>
      <TItem name="memo" label="备注">
        <Input disabled={disabled} />
      </TItem>
    </FormCard>
  );
}
export default MaterialInfo;
