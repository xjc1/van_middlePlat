import React, { PureComponent } from 'react';
import {
  FormBtnGp,
  FormRules,
  RichText,
  TItem,
  utils,
  PopoverMultiTable,
  ArrayFormatTextArea,
  TFormList,
  HighLightRichText,
} from '@/components/tis_ui';
import { Form, Input } from 'antd';
import _ from 'lodash';
import {
  DictLazyCascader,
  DictSelect,
  MultiTableDictCascader,
  TSearchSelector,
  DictIdLazyCascader,
  MutiDictIdCascaderTable,
  FileUpload,
} from '@/components/bussinessComponents';
import AddRelationSingle from "@/components/bussinessComponents/Relation/AddRelationSingle";
import { warningType } from "@/utils/constantEnum";

const { Base64 } = utils;

class Index extends PureComponent {
  state = {
    open: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ open: true });
    }, 2000);
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        {/* <Of /> */}
        <Form
          initialValues={{
            regionsLazy: ['SH00SH', '310101002', '310106006'],
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
            threetype: [['1001', 'SY0001', 'JY000101', 'JY0001001']],
            lazyThreeType: 'JY0001001',
            aaa: [
              {
                innerInput: 'fda',
                innerThird: [{ value: 'SX0001001', label: '产前' }],
                key: 0,
              },
            ],
            drawerSelect: ['34344'],
            dictTest: ['5fc9aba943318911a7db506f'],
          }}
          onFinish={vals => {
            console.info(vals);
          }}
        >
          <TItem label="fffff" name="content">
            <AddRelationSingle
              type="policyLibrary"
              bulkAddType={warningType.matter}
            />
          </TItem>
          <FormBtnGp okType="submit" />
        </Form>
      </div>
    );
  }
}

export default Index;
