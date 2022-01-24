import React from 'react';
import _ from 'lodash';
import { Select } from 'antd';
import { commonQuestionObject } from '@/utils/constantEnum';
import { TItem, FormCard } from '@/components/tis_ui';
import { DictSelect } from '@/components/bussinessComponents';
import AddQuestions from '../components/AddQuestion';

function QuestionForm(props) {
  const { editVisible } = props;
  return (
    <>
      <FormCard title="问句信息" style={{ border: 'unset' }}>
        <TItem
          name="objectType"
          label="对象类型"
          rules={[{ required: true, message: '对象类型不能为空!' }]}
        >
          <Select disabled={!editVisible}>
            {_.map(commonQuestionObject, (v, k) => (
              <Select.Option key={k} value={v}>
                {commonQuestionObject.$names[k]}
              </Select.Option>
            ))}
          </Select>
        </TItem>

        <TItem
          name="attributionDepartment"
          label="归属部门"
          rules={[{ required: true, message: '归属部门必填' }]}
        >
          <DictSelect
            dict="SHGSBMSH"
            dictType="tree"
            showSearch
            multiple
            treeNodeFilterProp="title"
          />
        </TItem>

        <TItem name="clientType" label="终端类型">
          <DictSelect dict="ZDLX" dictType="tree" multiple disabled={!editVisible} />
        </TItem>

        <TItem name="questions" label="常用问句">
          <AddQuestions disabled={!editVisible} />
        </TItem>
      </FormCard>
    </>
  );
}

export default QuestionForm;
