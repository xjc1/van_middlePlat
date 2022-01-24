import {Descriptions, Divider} from "antd";
import styles from "../infoLibrary.less";
import React from "react";
import { implementationLevel, appUserType } from '@/utils/constantEnum';

function baseInfoUtils({record, dictNames}) {
  const renderDict = (dict, val) => {
    const dictArray = dictNames[dict] || {};
    return dictArray[val] || val;
  };

  const formatText = (day, text) => (
    <>
      {day}
      {day && text}
    </>
  );

  const renderTitle = title => <Divider orientation="left">{title}</Divider>;
  return (
    <>
      <Descriptions title={renderTitle('基础信息')} bordered className={styles.descriptionsLayout}>
        <Descriptions.Item label="主题编码">{record.code}</Descriptions.Item>
        <Descriptions.Item label="主题名称">{record.name}</Descriptions.Item>
        <Descriptions.Item label="生命周期(分类)">
          {record.lifecycle && renderDict(record.lifecycle.key || '1000', record.lifecycle.value)}
        </Descriptions.Item>
        <Descriptions.Item label="服务对象">{appUserType.$v_names[record.object]}</Descriptions.Item>
        <Descriptions.Item label="实施层级">{implementationLevel.$v_names[record.executiveLevel]}</Descriptions.Item>
        <Descriptions.Item label="行政区划">{renderDict('SH00XZQH', record.regions)}</Descriptions.Item>
        <Descriptions.Item label="牵头部门">{renderDict('SHSSBMSH', record.headDept) }</Descriptions.Item>
        <Descriptions.Item label="联办机构">{record.cooperationOrg}</Descriptions.Item>
        <Descriptions.Item label="实施主体">{renderDict('SHSSBMSH', record.executiveSubject)}</Descriptions.Item>
        <Descriptions.Item label="承诺办理时间">{formatText(record.promiseDays, '天')}</Descriptions.Item>
        <Descriptions.Item label="网办程度">{renderDict('WBCD',record.netHandleExtent)}</Descriptions.Item>
        <Descriptions.Item label="事项/服务数">{formatText(record.count, '个')}</Descriptions.Item>
        <Descriptions.Item label="办理电话">{record.phone}</Descriptions.Item>
        <Descriptions.Item label="办理地址" span={2}>
          {record.address}
        </Descriptions.Item>
        <Descriptions.Item label="链接地址" span={3}>
          {record.url}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default baseInfoUtils
