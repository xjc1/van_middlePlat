import React from 'react';
import classNames from "classnames";
import { FormRules, TItem } from '@/components/tis_ui';
import { Select, Input, Form } from 'antd';
import _ from 'lodash';
import TSearchSelector from '../Dict/TSearchSelector';
import { warningFormat, commonNeedUnNeed, warningType } from '@/utils/constantEnum';
import FormatTypeSelect from './FormatTypeSelect';
import AuthMethodSelect from '@/pages/messageManage/messageForm/AuthMethodSelect';
import  AddRelations  from '../Relation/AddRelations';
import GStyles from '@/global.less';



function TSearchWithModeSelectItem({
                                     field = {},
                                     formItemConfig = {},
                                     type,
                                     relatedRequire = false,
                                     required = false,
                                     disabled,
                                     bulkAdd = false,
                                     layout = {},
                                     data = {},
                                     ...others
                                   }) {
  const { name: preName, fieldKey, ...fieldOthers } = field;
  const { name = [], label } = formItemConfig;
  const { format: formatType } = data;
  return (
    <Form.Item
      label={<span className={classNames(required && GStyles.requireLabel)}>{label}</span>}
      {...layout}
    >
      <TItem
        {...fieldOthers}
        name={[preName, ...name, 'format']}
        fieldKey={[fieldKey, ...name, 'format']}
        rules={required && [FormRules.required('必填')]}
        wrapperCol={{ span: 24 }}
      >
        <FormatTypeSelect allowClear disabled={disabled} type={type} />
      </TItem>
      {[warningFormat.default].includes(formatType) && (
        <TItem
          {...fieldOthers}
          name={[preName, ...name, 'relatedId']}
          fieldKey={[fieldKey, ...name, 'relatedId']}
          wrapperCol={{ span: 24 }}
          rules={[
            {
              required: relatedRequire,
              message: '必填',
            },
          ]}
        >
          {bulkAdd ? (
            <AddRelations
              showBulkAdd
              firstTranslate
              bulkAddType={warningType[type]}
              disabled={disabled}
              type={type}
              {...others}
            />
          ) : (
            <TSearchSelector disabled={disabled} type={type} {...others} />
          )}
        </TItem>
      )}
      {Object.values(warningFormat).includes(formatType) && (
        <TItem
          {...fieldOthers}
          name={[preName, ...name, 'authentication']}
          fieldKey={[fieldKey, ...name, 'authentication']}
          extra="认证方式"
          wrapperCol={{ span: 24 }}
        >
          <AuthMethodSelect mode="multiple" disabled={disabled} />
        </TItem>
      )}

      {[warningFormat.customize, warningFormat.pagePath, warningFormat.outsideApp].includes(
        formatType,
      ) && (
        <>
          <TItem
            {...fieldOthers}
            name={[preName, ...name, 'name']}
            fieldKey={[fieldKey, ...name, 'name']}
            extra="自定义名称"
            wrapperCol={{ span: 24 }}
          >
            <Input disabled={disabled} placeholder="请输入名称" />
          </TItem>
          <TItem
            {...fieldOthers}
            name={[preName, ...name, 'content']}
            fieldKey={[fieldKey, ...name, 'content']}
            extra="自定义路径"
            rules={[FormRules.required('必填')]}
            wrapperCol={{ span: 24 }}
          >
            <Input disabled={disabled} placeholder="请输入路径" />
          </TItem>
          <TItem
            {...fieldOthers}
            name={[preName, ...name, 'isAccessToken']}
            fieldKey={[fieldKey, ...name, 'isAccessToken']}
            extra="访问令牌"
            wrapperCol={{ span: 24 }}
          >
            <Select disabled={disabled} placeholder="请选择是否需要访问令牌" allowClear>
              {_.map(commonNeedUnNeed, (val, key) => (
                <Select.Option key={key} value={val}>
                  {commonNeedUnNeed.$names[key]}
                </Select.Option>
              ))}
            </Select>
          </TItem>
        </>
      )}
      {[warningFormat.outsideApp].includes(formatType) && (
        <TItem
          {...fieldOthers}
          name={[preName, ...name, 'appId']}
          fieldKey={[fieldKey, ...name, 'appId']}
          extra="应用ID"
          wrapperCol={{ span: 24 }}
        >
          <Input disabled={disabled} placeholder="请输入应用ID" />
        </TItem>
      )}
    </Form.Item>
  );
}

export default TSearchWithModeSelectItem;
