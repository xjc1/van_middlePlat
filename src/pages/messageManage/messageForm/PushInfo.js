import { TItem } from '@/components/tis_ui';
import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Checkbox, TimePicker } from 'antd';
import _ from 'lodash';
import { messagePushType, appUserType, commonTimeType } from '@/utils/constantEnum';
import PortraitXORTree from '@/components/bussinessComponents/PortraitTagXORTree';

const { RangePicker } = DatePicker;

function PushInfo({ isCheck, formData, formRef }) {
  const [pushWay, setPushWay] = useState(formData.pushType);
  const [isAllUser, setIsAllUser] = useState(false);
  const [timeType, setTimeType] = useState('');
  const [object, setObject] = useState(formData.objectType);

  useEffect(() => {
    if (formData.longTermEffective) {
      setTimeType(commonTimeType.long);
    } else if (formData.startTime) {
      setTimeType(commonTimeType.short);
    }
    if (formData.allUser) {
      setIsAllUser(true);
    } else if (formData.tags && formData.tags.length > 0) {
      setIsAllUser(false);
    }
  }, []);

  return (
    <>
      <TItem
        name="objectType"
        label="对象类型"
        rules={[{ required: true, message: '对象类型不能为空!' }]}
      >
        <Select
          allowClear
          disabled={isCheck}
          onChange={val => {
            // eslint-disable-next-line no-unused-expressions
            formRef.current.setFieldsValue({ tags: undefined });
            setObject(val);
          }}
        >
          {_.map(_.omit(appUserType, 'selfAndLegalPerson'), (v, k) => (
            <Select.Option key={k} value={v} label={appUserType.$names[k]}>
              {appUserType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      <TItem
        name="pushType"
        label="推送方式"
        rules={[{ required: true, message: '推送方式不能为空!' }]}
      >
        <Select allowClear disabled={isCheck} onChange={val => setPushWay(val)}>
          {_.map(messagePushType, (v, k) => (
            <Select.Option key={k} value={v} label={messagePushType.$names[k]}>
              {messagePushType.$names[k]}
            </Select.Option>
          ))}
        </Select>
      </TItem>
      {pushWay === messagePushType.common && (
        <TItem
          name="pushTime"
          label="推送时间"
          rules={[{ required: true, message: '推送时间不能为空!' }]}
        >
          <DatePicker disabled={isCheck} showTime format="YYYY-MM-DD HH:mm:ss" />
        </TItem>
      )}
      {pushWay === messagePushType.longTime && (
        <>
          <TItem
            col={18}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            name="rangeTime"
            label="推送时间"
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              disabled={isCheck || timeType === commonTimeType.long}
              onChange={val => setTimeType(val ? commonTimeType.short : '')}
            />
          </TItem>
          <TItem
            col={6}
            labelCol={{ span: 6 }}
            valuePropName="checked"
            wrapperCol={{ span: 15 }}
            name="longTermEffective"
          >
            <Checkbox
              disabled={isCheck || timeType === commonTimeType.short}
              onChange={e => setTimeType(e.target.checked ? commonTimeType.long : '')}
            >
              长期有效
            </Checkbox>
          </TItem>
          <TItem
            col={18}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
            name="pushTime"
            label="每日推送时间点"
            rules={[{ required: true, message: '每日推送时间点不能为空!' }]}
          >
            <TimePicker disabled={isCheck} />
          </TItem>
        </>
      )}
      <TItem
        col={18}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        name="tagConditions"
        label="用户群体"
      >
        <PortraitXORTree objectType={object} disabled={isCheck || isAllUser} />
      </TItem>
      <TItem
        col={6}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        name="allUser"
        valuePropName="checked"
      >
        <Checkbox
          onChange={e => {
            setIsAllUser(e.target.checked);
            if (e.target.checked) {
              formRef.current.setFieldsValue({ tagConditions: [] });
            }
          }}
          disabled={isCheck}
        >
          全部用户
        </Checkbox>
      </TItem>
    </>
  );
}
export default PushInfo;
