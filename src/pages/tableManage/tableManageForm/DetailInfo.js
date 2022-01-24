import {FormCard, TItem, TLink} from '@/components/tis_ui';
import React, { useState } from 'react';
import {Button, message, Select, Divider, Input} from 'antd';
import _ from 'lodash';
import IDGenerator from '@/components/tis_ui/utils/IDGenerator';
import { PORTRAIT } from '@/services/api';
import { tableManageTableType } from '@/utils/constantEnum';

import SampleData from './components/SampleData';
import JsonInputPopover from './components/JsonInputPopover';
import SchemaTable from './components/SchemaTable';

function DetailInfo({ disabled, form, setIsNeedCheck }) {
  const [sampleDataColumns, setSampleDataColumns] = useState([]);
  const [isTis, setIsTis] = useState(() => {
    const isTisType = form.getFieldValue('type') === tableManageTableType.TIS;
    return isTisType;
  });
  async function tableEnNameCheck() {
    const enName = form.getFieldValue('enName');
    const result = await PORTRAIT.checkTisDbUsingGET({ params: { tableName: enName } });
    const parseResult = result ? JSON.parse(result) : [];
    if (parseResult.length === 0) {
      message.info('库表类型为自定义表单');
      setIsTis(false);
      setIsNeedCheck(false);
      form.setFieldsValue({ sampleData: [], type: tableManageTableType.CUSTOM });
    } else {
      message.success('匹配到对应TIS表单');
      setIsTis(true);
      setIsNeedCheck(false);
      const parseResultAppendKey = _.map(parseResult, item => ({
        ...item,
        key: IDGenerator.next('tableSchema'),
      }));
      form.setFieldsValue({ tableSchema: parseResultAppendKey, type: tableManageTableType.TIS });
    }
  }
  return (
    <FormCard title="库表详细信息" bordered={false}>
      {!disabled && (
        <TItem label="库表检测">
          <>
            <Button type="primary" onClick={tableEnNameCheck}>
              检测
            </Button>
            <Divider type="vertical" />

            {!isTis && (
              <JsonInputPopover
                title="自定义表单导入"
                example={`[{"field": "name", "type": "VARCHAR", "comment": "名称"}]`}
                onChange={val => {
                  form.setFieldsValue({ tableSchema: val, type: tableManageTableType.CUSTOM });
                }}
                btnText="自定义表单导入"
              />
            )}
          </>
        </TItem>
      )}
      <TItem name="type" label="库表类型">
        <Select disabled={disabled}>
          {_.map(_.omit(tableManageTableType, 'TIS_CUSTOM'), (v, k) => (
            <Select.Option key={k} value={v} disabled={v === tableManageTableType.TIS}>
              {tableManageTableType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TLink dependencies={['type']}>
        {({ type }) => {
          if (type !== tableManageTableType.INTERFACE) return <></>;
          return (
            <TItem name="interfaceConfig"
                   label="接口地址"
                   placeholder="仅支持GET接口"
                   rules={[{ required: true }]}>
              <Input disabled={disabled} />
            </TItem>);
        }}
      </TLink>
      <TItem name="tableSchema" label="表结构" tip="表结构用户唯一标识只能有一个">
        <SchemaTable
          setSampleDataColumns={setSampleDataColumns}
          disabled={disabled}
          isTis={isTis}
        />
      </TItem>
      <TItem name="sampleData" label="样例数据">
        <SampleData columns={sampleDataColumns} disabled={disabled} />
      </TItem>
    </FormCard>
  );
}
export default DetailInfo;
