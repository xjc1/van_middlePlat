import React, { PureComponent } from 'react';
import {
  FormRules,
  RichText,
  TabForm,
  TItem,
  Base64,
} from '@/components/tis_ui';
import {
  DictSelect, TSearchSelector,
} from '@/components/bussinessComponents';

import { DatePicker, Input } from 'antd';
import DepartmentTreeSelect from '@/pages/userManager/department/DepartmentTreeSelect';

class Tabsform extends PureComponent {
  render() {
    return (
      <div style={{ padding: '0 10%' }}>
        <TabForm
          defaultTabKey="aaa"
          formBtnStyle={{ right: 40 }}
          title="演示多标签页表单"
          initialValues={{
            policyWords: [
              '5dc3c5d01188e1602caa1ff8',
              '5dc3c5d01188e1602caa1ff5',
              '5dc3c5d01188e1602caa1ff4',
            ],
            project: ['5e042d50740cd67e1ef1a4f1'],
            article: ['5e463ac9f4e07f4318e10e2d', '5e463ac9f4e07f4318e10e2f'],
            synonym: [
              '5b9f5e56a55864e94920c7c6',
              '5b90f698a55864e9490d7a2a',
              '5b90f698a55864e9490d7d3f',
            ],
            policyCategory: 'FRZC1000',
            publishDepartment: 'CD001',
            threeType: 'SX0001001',
            threeTypeMultiple: ['SX0001001'],
            currencyTag: [
              ['TYHY1000002', 'TYHY1000002002'],
              ['TYHY1000002', 'TYHY1000002003'],
            ],
            lazyThreeType: 'JY0001001',
            aaa: [
              {
                innerInput: 'fda',
                innerThird: [{ value: 'SX0001001', label: '产前' }],
                key: 0,
              },
            ],
          }}
          onFinish={vals => {
            console.info(vals);
          }}
          onCancel={() => {
            console.info('cancel...');
          }}
        >
          <TabForm.Tab tabKey="aaa" title="formOne">
            <TItem name="testInput" label="xfdafda" rules={[FormRules.required('测试必填')]}>
              <Input />
            </TItem>
            <TItem name="policyWordsEmpty" label="百科词条[空]">
              <TSearchSelector type="policyWords" />
            </TItem>
            <TItem
              name="startTifafdafm22e"
              label="时间期限"
              rules={[{ type: 'array', required: true, message: 'Please select time!' }]}
            >
              <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </TItem>
            <TItem name="scene" label="主题">
              <TSearchSelector type="scene" />
            </TItem>
            <TItem name="matter" label="事项">
              <TSearchSelector type="matter" />
            </TItem>
            <TItem name="convenience" label="服务">
              <TSearchSelector type="convenience" />
            </TItem>
            <TItem name="policyLibrary" label="政策">
              <TSearchSelector type="policyLibrary" />
            </TItem>
            <TItem name="project" label="项目">
              <TSearchSelector type="project" />
            </TItem>
            <TItem name="synonym" label="问答">
              <TSearchSelector type="synonym" />
            </TItem>
            <TItem name="article" label="文章">
              <TSearchSelector type="article" />
            </TItem>
          </TabForm.Tab>
          <TabForm.Tab tabKey="bbb" title="formTwo">
            <TItem label="政策分类" name="policyCategory">
              <DictSelect dict="ZCFL" />
            </TItem>
            <TItem label="政策分类[空]" name="policyCategoryEmpty">
              <DictSelect dict="ZCFL" />
            </TItem>
            <TItem label="发布部门" name="publishDepartment">
              <DepartmentTreeSelect />
            </TItem>
            <TItem label="三级分类" name="threeType">
              <DictSelect dictType="tree" dict="1000" />
            </TItem>

            <TItem label="三级分类[lazy]" name="lazyThreeType">
              <DictSelect dictType="lazyTree" dict="1000" />
            </TItem>
            <TItem label="三级分类[多选]" name="threeTypeMultiple">
              <DictSelect dictType="tree" multiple dict="1000" />
            </TItem>
            <TItem style={{ display: 'flex', justifyContent: 'center' }} name="content">
              <RichText base64 contentStyle={{ height: 300 }} />
            </TItem>
            <TItem name="testInput222" label="xfdaffdafda" rules={[FormRules.required('测试必填')]}>
              <Input />
            </TItem>
          </TabForm.Tab>
        </TabForm>
      </div>
    );
  }
}

export default Tabsform;
