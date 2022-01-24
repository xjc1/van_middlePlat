import React, { useState } from 'react';
import { RichText, TabForm, TItem } from '@/components/tis_ui';
import { Input, InputNumber } from 'antd';
import {
  TSearchSelector,
  DictSelect,
  MutiDictIdCascaderTable,
} from '@/components/bussinessComponents';
import AddRelations from '@/components/bussinessComponents/Relation/AddRelations';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

function ExtraInfo(props) {
  const { editVisible, formRef } = props;
  const [typeText, setTypeText] = useState(formRef.getFieldValue(['supportOption', 'type']));

  return (
    <TabForm.Tab {...props}>
      <TItem name="material" label="申报材料" {...layout}>
        <Input.TextArea placeholder="请输入申报材料" disabled={!editVisible} autoSize />
      </TItem>
      <TItem name="guide" label="申报指南" {...layout}>
        <Input disabled={!editVisible} />
      </TItem>
      <TItem name="applySysName" label="申报系统名称" {...layout}>
        <Input placeholder="请输入申报系统名称" disabled={!editVisible} />
      </TItem>
      <TItem name="servicesUrl" label="申报系统网址" {...layout}>
        <Input placeholder="请输入申报系统网址" disabled={!editVisible} />
      </TItem>
      <TItem name="guideUrl" label="办事指南链接" {...layout}>
        <Input placeholder="请输入办事指南链接" disabled={!editVisible} />
      </TItem>
      <TItem name="process" label="办理流程" {...layout}>
        <RichText base64 readOnly={!editVisible} />
      </TItem>
      <TItem name="tuningWord" label="调节词" {...layout}>
        <Input.TextArea
          autoSize={{ minRows: 2 }}
          placeholder="请输入调节词"
          disabled={!editVisible}
        />
      </TItem>
      <TItem name="supportAmount" label="扶持力度分值" {...layout}>
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="请输入扶持力度分值"
          disabled={!editVisible}
        />
      </TItem>
      <TItem name={['supportOption', 'type']} label="扶持力度类别" {...layout}>
        <DictSelect
          onChange={value => {
            setTypeText(value);
            // 空值的话清空内容
            if (!value) {
              formRef.setFieldsValue({
                supportOption: {
                  content: undefined,
                },
              });
            }
          }}
          dict="FCLDLB"
          disabled={!editVisible}
        />
      </TItem>
      <TItem name={['supportOption', 'content']} label="扶持类别内容" {...layout}>
        <Input
          maxLength={8}
          disabled={!editVisible || !typeText}
          placeholder="请先选择类别,内容控制在8个字符内,以获得最佳展示效果"
        />
      </TItem>
      <TItem name="implementationDepartment" {...layout}>
        <MutiDictIdCascaderTable
          label="实施部门"
          showSearch
          name="classification"
          dict="SHSSBMSH"
          disabled={!editVisible}
        />
      </TItem>
      <TItem name="relatedPolicies" label="关联政策" {...layout}>
        <AddRelations type="policyLibrary" tableTitle="政策名" disabled={!editVisible} />
      </TItem>
      <TItem name="relationMatchMatter" label="关联事项" {...layout}>
        <TSearchSelector type="matter" disabled={!editVisible} />
      </TItem>
      <TItem name="relationMatchScene" label="关联场景" {...layout}>
        <TSearchSelector type="scene" disabled={!editVisible} />
      </TItem>
      <TItem name="relationMatchService" label="关联服务" {...layout}>
        <TSearchSelector type="convenience" disabled={!editVisible} />
      </TItem>
      <TItem name="preProjects" label="前置申报项目" {...layout}>
        <TSearchSelector type="project" disabled={!editVisible} />
      </TItem>
      <TItem name="preMatters" label="前置事项" {...layout}>
        <TSearchSelector type="matter" disabled={!editVisible} />
      </TItem>
      <TItem name="attributionDepartment" label="归属部门" tip="字典: SHGSBMSH" {...layout}>
        <DictSelect
          disabled={!editVisible}
          dict="SHGSBMSH"
          dictType="tree"
          showSearch
          multiple
          treeNodeFilterProp="title"
        />
      </TItem>
    </TabForm.Tab>
  );
}

export default ExtraInfo;
