import React, { useState } from 'react';
import { FormRules, TItem } from '@/components/tis_ui';
import { Select, Input } from 'antd';
import _ from 'lodash';
import { warningFormat, warningType, commonNeedUnNeed } from '@/utils/constantEnum';
import FormatTypeSelect from './FormatTypeSelect';
import AuthMethodSelect from '@/pages/messageManage/messageForm/AuthMethodSelect';
import  AddRelations  from '../Relation/AddRelations';
import  AddRelationSingle  from '../Relation/AddRelationSingle';
import { commonRelatedKeys, bulkAddType } from './const';

function MessageRelatedWithModeSelector({
  formItemConfig = {},
  type,
  relatedRequire = false,
  disabled,
  mode,
  ...others
}) {
  const { name = [], label, ...otherFormConfig } = formItemConfig;
  const [formatType, setFormatType] = useState(warningFormat.default);
  return (
    <TItem label={label} {...otherFormConfig}>
      <TItem name={[...name, 'format']}>
        <FormatTypeSelect disabled={disabled} type={type} onFormatChange={setFormatType} />
      </TItem>
      {formatType === warningFormat.default && (
        <TItem
          name={[...name, 'relatedId']}
          rules={[
            {
              required: relatedRequire,
              message: '必填',
            },
          ]}
        >
          {mode === 'single' ? (
            <AddRelationSingle disabled={disabled}
                               mode={mode}
                               type={type}
                               bulkAddType={bulkAddType[type]} {...others} />
          ) : (
            <AddRelations
              showBulkAdd
              firstTranslate
              bulkAddType={bulkAddType[type]}
              disabled={disabled}
              type={type}
              {...others}
            />
          )}
        </TItem>
      )}
      <TItem name={[...name, 'authentication']} extra="认证方式">
        <AuthMethodSelect mode="multiple" disabled={disabled} />
      </TItem>

      {formatType !== warningFormat.default &&
        _.without(commonRelatedKeys, warningType.message).includes(warningType[type]) && (
          <>
            <TItem name={[...name, 'name']} extra="自定义名称">
              <Input disabled={disabled} placeholder="请输入名称" />
            </TItem>
            <TItem
              name={[...name, 'content']}
              extra="自定义路径"
              rules={[FormRules.required('必填')]}
            >
              <Input disabled={disabled} placeholder="请输入路径" />
            </TItem>
          </>
        )}

      {_.without(commonRelatedKeys, warningType.message).includes(warningType[type]) &&
        formatType !== warningFormat.default && (
          <TItem name={[...name, 'isAccessToken']} extra="访问令牌">
            <Select disabled={disabled} placeholder="请选择是否需要访问令牌" allowClear>
              {_.map(commonNeedUnNeed, (val, key) => (
                <Select.Option key={key} value={val}>
                  {commonNeedUnNeed.$names[key]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        )}

      {_.without(commonRelatedKeys, warningType.message).includes(warningType[type]) &&
        formatType === warningFormat.outsideApp && (
          <TItem name={[...name, 'appId']} extra="应用ID">
            <Input disabled={disabled} placeholder="请输入应用ID" />
          </TItem>
        )}
    </TItem>
  );
}

export default MessageRelatedWithModeSelector;
