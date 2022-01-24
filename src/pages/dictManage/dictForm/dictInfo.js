import React from 'react';
import { Input, InputNumber, Select } from 'antd';
import { FormCard, TItem, UploadImage, FormRules } from '@/components/tis_ui';
import { dictStatus } from '@/utils/constantEnum';
import _ from 'lodash';
import { DictIdLazyCascader } from '@/components/bussinessComponents';
import { DICT } from '@/services/api';

function ExtendRead(props) {
  const { editAble, lazyTreeConfig, parentId, rootId, recordId, ...others } = props;

  const fetchDictWithOutId = dictId => {
    return new Promise((resolve, reject) => {
      DICT.findTreeDictionaryUsingPOST({ body: { id: dictId } })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const fetchDict = dictId => {
    return new Promise((resolve, reject) => {
      DICT.findOneTreeDictionaryUsingGET({ params: { id: dictId, oneLevel: true } })
        .then(data => {
          resolve([data]);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return (
    <FormCard title="字典信息" {...others}>
      <TItem name="name" label="字典名称" rules={[FormRules.required('必填')]}>
        <Input disabled={!editAble} />
      </TItem>
      <TItem name="code" label="字典代码" rules={[FormRules.required('必填')]}>
        <Input disabled={!editAble} />
      </TItem>
      {/* <TItem name="parentId" label="父级字典">
        <DictLazy lazyTreeConfig={lazyTreeConfig} disabled={!editAble} />
      </TItem> */}

      <TItem name="parentId" label="父级字典">
        <DictIdLazyCascader
          showCode
          dictId={rootId}
          fetchDict={rootId ? fetchDict : fetchDictWithOutId}
          onLoadData={fetchDictWithOutId}
          disabled={!editAble}
        />
      </TItem>
      <TItem name="sort" label="排序">
        <InputNumber disabled={!editAble} min={0} />
      </TItem>
      <TItem name="description" label="字典说明">
        <Input.TextArea autoSize={{ maxRows: 6 }} disabled={!editAble} />
      </TItem>
      <TItem name="status" label="字典状态" rules={[FormRules.required('必填')]}>
        <Select disabled={!editAble}>
          {_.map(dictStatus, (key, value) => (
            <Select.Option key={key} value={key}>
              {dictStatus.$names[value]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem name="picture" label="背景图片">
        <UploadImage disabled={!editAble} allowClear />
      </TItem>
    </FormCard>
  );
}

export default ExtendRead;
